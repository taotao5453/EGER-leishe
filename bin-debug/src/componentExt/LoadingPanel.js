var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by xiangtao on 2014.11.29.
 */
var LoadingPanel = (function (_super) {
    __extends(LoadingPanel, _super);
    function LoadingPanel() {
        _super.call(this);
        this.bg = new egret.Sprite();
        this.w = 0;
        this.h = 0;
        this.mySheet = RES.getRes("load");
        this.createView();
    }
    LoadingPanel.prototype.createView = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        this.bg.graphics.beginFill(0x313131, 1);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.pgBg = new egret.Bitmap;
        this.pgBg.anchorX = 0.5;
        this.pgBg.anchorY = 0.5;
        this.pgBg.texture = this.mySheet.getTexture("pgBg");
        this.pgBg.x = this.w / 2;
        this.pgBg.y = this.h / 2;
        this.addChild(this.pgBg);
        this.pgBar = new egret.Bitmap;
        this.pgBar.anchorX = 0.5;
        this.pgBar.anchorY = 0.5;
        this.pgBar.texture = this.mySheet.getTexture("pgBar");
        this.pgBar.x = this.w / 2 - 34;
        this.pgBar.y = this.h / 2;
        this.addChild(this.pgBar);
        this.textField = new egret.TextField();
        this.textField.size = 24;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 100;
        this.textField.x = this.w / 2 - this.textField.width / 2;
        this.textField.y = this.h / 2 - this.textField.height / 2 - 10;
        this.textField.textAlign = "center";
        this.textField.text = "0%";
    };
    LoadingPanel.prototype.setProgress = function (current, total) {
        var rate = Math.round((current / total) * 100);
        //console.log(current, total);
        this.textField.text = rate + "%";
        this.pgBar.width = 282 * (current / total);
    };
    return LoadingPanel;
})(egret.Sprite);
LoadingPanel.prototype.__class__ = "LoadingPanel";
//# sourceMappingURL=LoadingPanel.js.map