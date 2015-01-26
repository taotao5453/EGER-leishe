var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by xiangtao on 2014.11.29.
 */
var WaitPanel = (function (_super) {
    __extends(WaitPanel, _super);
    //type 1:白色等待 2：蓝色等待
    function WaitPanel(type) {
        if (type === void 0) { type = 1; }
        _super.call(this);
        this.bg = new egret.Sprite();
        this.cartoonType = "loadingCircle1";
        this.w = 0;
        this.h = 0;
        switch (type) {
            case 1:
                {
                    this.cartoonType = "loadingCircle1";
                    break;
                }
            case 2:
                {
                    this.cartoonType = "loadingCircle2";
                    break;
                }
            default:
                {
                }
        }
        this.mySheet = RES.getRes("assets");
        this.createView();
    }
    WaitPanel.prototype.createView = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        this.bg.graphics.beginFill(0x000000, 0.2);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.waitImg = new egret.Bitmap;
        this.waitImg.anchorX = 0.5;
        this.waitImg.anchorY = 0.5;
        this.waitImg.texture = this.mySheet.getTexture(this.cartoonType);
        this.waitImg.x = this.w / 2;
        this.waitImg.y = this.h / 2;
        this.addChild(this.waitImg);
        EffectUtils.rotationEffect(this.waitImg, 1000);
    };
    return WaitPanel;
})(egret.Sprite);
WaitPanel.prototype.__class__ = "WaitPanel";
//# sourceMappingURL=WaitPanel.js.map