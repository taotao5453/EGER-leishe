var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        _super.call(this, "game");
    }
    // private inputTF:egret.TextField;
    // 初始化面板
    StartPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg_start");
        this.addChild(this.bg);
        this.adImg = new egret.Bitmap;
        this.adImg.texture = this.assets.getTexture("ad");
        this.adImg.anchorX = 0.5;
        this.adImg.x = this.w / 2;
        this.adImg.y = 10;
        this.addChild(this.adImg);
        this.shuoming = new egret.Bitmap;
        this.shuoming.texture = this.assets.getTexture("shuoming");
        this.shuoming.anchorX = 0.5;
        this.shuoming.x = this.w / 2;
        this.shuoming.y = this.adImg.y + this.adImg.height;
        this.addChild(this.shuoming);
        this.startBtn = new EButton(this, "btn_start");
        this.startBtn.x = this.w / 2 - this.startBtn.width / 2;
        this.startBtn.y = this.h - this.startBtn.height;
        this.addChild(this.startBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouchTap, this);
        this.initEffect();
    };
    StartPanel.prototype.initEffect = function () {
        this.adImg.y = -100;
        this.startBtn.alpha = 0;
        var onComplete = function () {
            egret.Tween.get(this.startBtn).to({ alpha: 1 }, 300);
        };
        egret.Tween.get(this.adImg).to({ y: 10 }, 300, egret.Ease.backOut).call(onComplete, this);
    };
    StartPanel.prototype.onStartBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    return StartPanel;
})(BasePanel);
StartPanel.prototype.__class__ = "StartPanel";
//# sourceMappingURL=StartPanel.js.map