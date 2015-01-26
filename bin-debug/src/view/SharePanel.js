var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        _super.call(this);
    }
    // 初始化面板
    SharePanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.startBtn = new egret.Bitmap();
        this.startBtn.texture = this.assets.getTexture("startBtn");
        this.startBtn.x = this.w / 2 - this.startBtn.width / 2;
        this.startBtn.y = this.h / 2 - this.startBtn.height / 2;
        this.addChild(this.startBtn);
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouchTap, this);
    };
    SharePanel.prototype.onStartBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    return SharePanel;
})(BasePanel);
SharePanel.prototype.__class__ = "SharePanel";
//# sourceMappingURL=SharePanel.js.map