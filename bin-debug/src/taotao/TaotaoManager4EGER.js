var TaotaoManager4EGER = (function () {
    function TaotaoManager4EGER() {
    }
    TaotaoManager4EGER.getInstance = function () {
        if (this.g_instance == null) {
            this.g_instance = new TaotaoManager4EGER;
        }
        return this.g_instance;
    };
    /**
     * 横竖屏模式设置 true=横屏   false=竖屏
    */
    TaotaoManager4EGER.prototype.setGameSceneToHorizantal = function (_isVertical) {
        this.setVerticalMode(true);
        this.setInitIsVertical();
        this.initVerticalTips();
    };
    //EGER-设置本应用为横屏应用
    TaotaoManager4EGER.prototype.setVerticalMode = function (_is) {
        GlobalData.isVerticalGame = _is;
    };
    //EGER-初始化时是否为竖屏
    TaotaoManager4EGER.prototype.setInitIsVertical = function () {
        if (GameConfig.isVertical()) {
            GlobalData.initIsVertical = true;
        }
    };
    //EGER-横屏游戏的旋转屏提示
    TaotaoManager4EGER.prototype.initVerticalTips = function () {
        if (GlobalData.isVerticalGame && GameConfig.isVertical()) {
            NativeApi.showVerticalTips1();
        }
        window["onorientationchange"] = function (e) {
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange, window["orientation"], false));
            if (GlobalData.isVerticalGame && GlobalData.initIsVertical && (window["orientation"] != 0)) {
                window.open(window.location.href, "_self");
            }
            if (GlobalData.isVerticalGame && GameConfig.isVertical2()) {
                NativeApi.showVerticalTips2();
            }
            else if (GlobalData.isVerticalGame && !GameConfig.isVertical2()) {
                NativeApi.removeVerticalTips();
            }
            //var _width = document.documentElement.clientWidth;
            //var _height = document.documentElement.clientHeight;
            //Global.alert("_width=" + _width + ",_height=" + _height);
            //var angle = window["orientation"];
            //Global.alert("_angle=" + angle);
        };
    };
    return TaotaoManager4EGER;
})();
TaotaoManager4EGER.prototype.__class__ = "TaotaoManager4EGER";
//# sourceMappingURL=TaotaoManager4EGER.js.map