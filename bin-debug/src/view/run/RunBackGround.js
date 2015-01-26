var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunBackGround = (function (_super) {
    __extends(RunBackGround, _super);
    function RunBackGround(_asset) {
        _super.call(this);
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
    RunBackGround.prototype.setSpeed = function (_s) {
        this.speed = _s;
    };
    RunBackGround.prototype.onEnterFrame = function (_advancedTime) {
        var t_s = _advancedTime / 16;
        var t_dis = this.speed * t_s;
        this.sp.x -= t_dis;
        this.bgWidth -= t_dis;
        //
        var t_temp = this.bgWidth - GameConfig.curWidth();
        if (t_temp <= 20) {
            this.bg = new egret.Bitmap;
            this.bg.texture = RES.getRes(this.assetName);
            this.sp.addChild(this.bg);
            this.bg.x = this.sp.width;
            this.bgWidth = this.bg.width;
        }
    };
    return RunBackGround;
})(egret.DisplayObjectContainer);
RunBackGround.prototype.__class__ = "RunBackGround";
//# sourceMappingURL=RunBackGround.js.map