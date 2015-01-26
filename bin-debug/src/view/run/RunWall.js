var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunWall = (function (_super) {
    __extends(RunWall, _super);
    function RunWall() {
        _super.call(this);
        this.self = this;
    }
    RunWall.prototype.initWall = function (_type) {
        this.type = _type;
        if (_type == MyGameConfig.WALL_TYPE_FRIEND) {
            var t_mc;
            var data = RES.getRes("man_json"); //获取动画文件的信息配置文件
            var texture = RES.getRes("man_png"); //获取动画文件的图片
            t_mc = new egret.MovieClip(data, texture); //创建MovieClip
            t_mc.frameRate = MyGameConfig.movieClipFrame;
            t_mc.gotoAndPlay("friend_mc");
            this.addChild(t_mc);
            this.y = egret.MainContext.instance.stage.stageHeight - 130; //350;
        }
        else if (_type == MyGameConfig.WALL_TYPE_STONE) {
            var t_bmp = new egret.Bitmap;
            t_bmp.texture = RES.getRes("game").getTexture("wall_1");
            this.addChild(t_bmp);
            this.y = egret.MainContext.instance.stage.stageHeight - 180; //300;
        }
        else {
            var t_bmp = new egret.Bitmap;
            t_bmp.texture = RES.getRes("game").getTexture("wall_2");
            this.addChild(t_bmp);
            this.y = egret.MainContext.instance.stage.stageHeight - 340; //138;
        }
        //egret.Ticker.getInstance().register(this.onEnterFrame, this);
    };
    RunWall.prototype.onEnterFrame = function (_advancedTime) {
        var t_s = _advancedTime / 16;
        this.x -= (MyGameConfig.speed * t_s);
        //
        if (this.x < -this.width) {
        }
    };
    return RunWall;
})(egret.Sprite);
RunWall.prototype.__class__ = "RunWall";
//# sourceMappingURL=RunWall.js.map