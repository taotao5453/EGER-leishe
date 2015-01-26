var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunLife = (function (_super) {
    __extends(RunLife, _super);
    function RunLife() {
        _super.call(this, "game");
        this.sp = new egret.Sprite;
        this.addChild(this.sp);
    }
    RunLife.prototype.update = function (_life) {
        if (_life === void 0) { _life = 3; }
        if (_life < 0) {
            _life = 0;
        }
        TaotaoUtils.removeAllChildren(this.sp);
        //
        var t_bmp;
        for (var i = 1; i <= 3; i++) {
            t_bmp = new egret.Bitmap;
            if (i <= _life) {
                t_bmp.texture = this.assets.getTexture("life");
            }
            else {
                t_bmp.texture = this.assets.getTexture("life_dead");
            }
            t_bmp.x = (i - 1) * 55;
            this.sp.addChild(t_bmp);
        }
    };
    return RunLife;
})(BasePanel);
RunLife.prototype.__class__ = "RunLife";
//# sourceMappingURL=RunLife.js.map