class RunWall extends egret.Sprite{

    private self;
    public type: number;
    constructor() {
        super();
        this.self = this;
    }

    public initWall(_type: number): void {
        this.type = _type;
        
        if (_type == MyGameConfig.WALL_TYPE_FRIEND) {
            var t_mc: egret.MovieClip;
            var data = RES.getRes("man_json");//获取动画文件的信息配置文件
            var texture = RES.getRes("man_png");//获取动画文件的图片
            t_mc = new egret.MovieClip(data, texture);//创建MovieClip
            t_mc.frameRate = MyGameConfig.movieClipFrame;
            t_mc.gotoAndPlay("friend_mc");
            this.addChild(t_mc);
            this.y = egret.MainContext.instance.stage.stageHeight - 130;//350;
        } else if (_type == MyGameConfig.WALL_TYPE_STONE) {
            var t_bmp: egret.Bitmap = new egret.Bitmap;
            t_bmp.texture = RES.getRes("game").getTexture("wall_1");
            this.addChild(t_bmp);
            this.y = egret.MainContext.instance.stage.stageHeight - 180;//300;
        } else {
            var t_bmp: egret.Bitmap = new egret.Bitmap;
            t_bmp.texture = RES.getRes("game").getTexture("wall_2");
            this.addChild(t_bmp);
            this.y = egret.MainContext.instance.stage.stageHeight - 340//138;
        }
        //egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }

    public onEnterFrame(_advancedTime:number): void {
        var t_s: number = _advancedTime / 16;
        this.x -= (MyGameConfig.speed * t_s);
        //
        if(this.x < -this.width) {
            //egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
            /*
            if(this.parent) {
                this.parent.removeChild(this);
                this.self = null;
            }*/
        }
    }

}