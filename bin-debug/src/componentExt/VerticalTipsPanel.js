var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
  * 竖屏提示类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 竖屏玩游戏时友好提示界面
  */
var VerticalTipsPanel = (function (_super) {
    __extends(VerticalTipsPanel, _super);
    function VerticalTipsPanel(needExchange) {
        if (needExchange === void 0) { needExchange = false; }
        _super.call(this);
        this.bg = new egret.Sprite();
        this.w = 0;
        this.h = 0;
        this.needExchange = false;
        this.needExchange = needExchange;
        // this.mySheet = RES.getRes("load");
        this.createView();
    }
    VerticalTipsPanel.prototype.createView = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        // this.bg.graphics.beginFill(0x313131, 1);
        // this.bg.graphics.drawRect(0, 0, this.w, this.h);
        // this.bg.graphics.endFill();
        // this.bg.width = this.w;
        // this.bg.height = this.h;
        // this.addChild(this.bg);
        // this.touchEnabled = true;
        // this.pgBg = new egret.Bitmap;
        // this.pgBg.anchorX = 0.5;
        // this.pgBg.anchorY = 0.5;
        // this.pgBg.texture = this.mySheet.getTexture("pgBg");
        // this.pgBg.x = this.w / 2;
        // this.pgBg.y = this.h / 2;
        // this.addChild(this.pgBg);
        // this.pgBar = new egret.Bitmap;
        // this.pgBar.anchorX = 0.5;
        // this.pgBar.anchorY = 0.5;
        // this.pgBar.texture = this.mySheet.getTexture("pgBar");
        // this.pgBar.x = this.w / 2 - 34;
        // this.pgBar.y = this.h / 2;
        // this.addChild(this.pgBar);
        this.textField = new egret.TextField();
        this.textField.size = 36;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.textAlign = "center";
        this.textField.text = "亲，请开启手机的自动旋转屏幕功能，并将手机横向放置可以正常游戏啦！";
        if (this.needExchange) {
            this.textField.width = (this.w > this.h ? this.h : this.w);
            this.textField.x = 0;
            this.textField.y = this.h / 2 - this.textField.height / 2 - 10;
        }
        else {
            this.textField.width = 480;
            this.textField.x = this.w / 2 - this.textField.width / 2;
            this.textField.y = this.h / 2 - this.textField.height / 2 - 10;
        }
    };
    return VerticalTipsPanel;
})(egret.Sprite);
VerticalTipsPanel.prototype.__class__ = "VerticalTipsPanel";
//# sourceMappingURL=VerticalTipsPanel.js.map