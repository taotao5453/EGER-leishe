var MyGameManager = (function () {
    function MyGameManager() {
    }
    MyGameManager.getInstance = function () {
        if (this.g_instance == null) {
            this.g_instance = new MyGameManager;
        }
        return this.g_instance;
    };

    MyGameManager.prototype.initVerticalTips = function () {
        window["onorientationchange"] = function (e) {
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange, window["orientation"], false));
            if (GlobalData.isVerticalGame && GlobalData.initIsVertical && (window["orientation"] != 0)) {
                window.open(window.location.href);
            }
            if (GlobalData.isVerticalGame && GameConfig.isVertical()) {
                NativeApi.showVerticalTips2();
            } else if (GlobalData.isVerticalGame && !GameConfig.isVertical()) {
                NativeApi.removeVerticalTips();
            }
        };
    };
    return MyGameManager;
})();
//# sourceMappingURL=MyGameManager.js.map
