class RunBackGroundScene extends egret.DisplayObjectContainer{

    private far_sp: RunBackGround;
    private middle_sp: RunBackGround;
    private near_sp: RunBackGround;

    constructor() {
        super();
        //远景
        this.far_sp = new RunBackGround("gameBg_down");
        this.addChild(this.far_sp);
        //中景
        this.middle_sp = new RunBackGround("gameBg_middle");
        this.addChild(this.middle_sp);
        //近景
        this.near_sp = new RunBackGround("gameBg_top");
        this.addChild(this.near_sp);

        //
        this.resetSpeed();
    }

    public onEnterFrame(_advancedTime: number): void {
        this.far_sp.onEnterFrame(_advancedTime);
        this.middle_sp.onEnterFrame(_advancedTime);
        this.near_sp.onEnterFrame(_advancedTime);
    }

    public resetSpeed(): void {
        this.far_sp.setSpeed(MyGameConfig.speed - 2);
        this.middle_sp.setSpeed(MyGameConfig.speed - 1);
        this.near_sp.setSpeed(MyGameConfig.speed);
    }
}