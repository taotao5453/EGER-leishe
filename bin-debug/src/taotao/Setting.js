/**
 * Created by lixin on 2014/10/30.
 */
var Settings = (function () {
    function Settings() {
    }
    //获取本应用url
    Settings.getGameUrl = function (_b) {
        return window.location.href.toString();
    };
    //是否是手持设备
    Settings.isMobile = function () {
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            return true;
        }
        return false;
    };
    //fps显示
    Settings.FPS_show = function () {
        egret.Profiler.getInstance().run(); //顯示FPS顯示
    };
    //舞台宽度
    Settings.StageWidth = 800;
    //舞台高度
    Settings.StageHeight = 480;
    //实际宽高
    Settings.DesginWidth = 0;
    Settings.DesginHeight = 0;
    //手机是否被旋转
    Settings.isRotation = false;
    return Settings;
})();
Settings.prototype.__class__ = "Settings";
//# sourceMappingURL=Setting.js.map