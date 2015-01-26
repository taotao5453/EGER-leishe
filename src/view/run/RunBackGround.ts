class RunBackGround extends egret.DisplayObjectContainer {

    private sp: egret.Sprite;
    private bg: egret.Bitmap;

    private assetName: string;
    private speed: number;
    private bgWidth: number;
    constructor(_asset:string) {
        super();
        this.assetName = _asset;
        //
        this.sp = new egret.Sprite;
        this.addChild(this.sp);
        //
        this.bg = new egret.Bitmap;
        this.bg.texture = RES.getRes(_asset);
        this.sp.addChild(this.bg);
        this.bgWidth = this.bg.width;
    }

    public setSpeed(_s: number): void {
        this.speed = _s;
    }

    public onEnterFrame(_advancedTime:number): void {
        var t_s: number = _advancedTime / 16;
        var t_dis: number = this.speed * t_s;
        this.sp.x -= t_dis;
        this.bgWidth -= t_dis;
        //
        var t_temp: number = this.bgWidth - GameConfig.curWidth();
        if (t_temp <= 20) {
            this.bg = new egret.Bitmap;
            this.bg.texture = RES.getRes(this.assetName);
            this.sp.addChild(this.bg);
            this.bg.x = this.sp.width;
            this.bgWidth = this.bg.width;
        }
    }
}