class RunMan extends egret.DisplayObjectContainer{

    private mc: egret.MovieClip;

    public isJumping: boolean = false;
    public isLowing: boolean = false;
    public isHitting: boolean = false;
    public isWudi: boolean = false;
    public isDead: boolean = false;
    constructor() {
        super();
        var data = RES.getRes("man_json");//获取动画文件的信息配置文件
        var texture = RES.getRes("man_png");//获取动画文件的图片
        this.mc = new egret.MovieClip(data, texture);//创建MovieClip
        this.mc.frameRate = MyGameConfig.movieClipFrame;
        this.addChild(this.mc);
        //
        this.run();
    }

    public run(): void {
        this.mc.gotoAndPlay("man_run");
    }

    public jump(): void {
        if(this.isJumping || this.isDead) {
            return;
        }
        this.isJumping = true;
        this.mc.gotoAndPlay("man_jump");
        var onComplete: Function = function () {
            this.isJumping = false;
            this.run();
        };
        egret.Tween.get(this.mc).wait(700).call(onComplete, this);
    }

    public low(): void {
        if(this.isJumping || this.isDead) {
            return;
        }
        this.isLowing = true;
        this.mc.gotoAndPlay("man_low");
        var onComplete: Function = function () {
            this.run();
            this.isLowing = false;
        };
        egret.Tween.get(this.mc).wait(800).call(onComplete, this);
    }

    public hit(): void {
        if(this.isDead) {
            return;
        }
        this.isHitting = true;
        this.mc.gotoAndPlay("man_hit");
        var onComplete: Function = function () {
            this.run();
            this.isHitting = false;
        };
        egret.Tween.get(this.mc).wait(300).call(onComplete, this);
    }

    public wudi(): void {
        this.isWudi = true;
        var t_time: number = 1000;
        EffectUtils.blinkEffect(this.mc, t_time);
        var onComplete: Function = function () {
            this.isWudi = false;
        };
        egret.Tween.get(this.mc).wait(t_time).call(onComplete, this);
    }

    public die(): void {
        this.isDead = true;
        this.mc.gotoAndPlay("man_dead");
    }
}