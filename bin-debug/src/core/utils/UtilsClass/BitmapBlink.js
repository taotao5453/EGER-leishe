var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 有来有去 on 2014/11/5.
 */
var BitmapBlink = (function (_super) {
    __extends(BitmapBlink, _super);
    /*** @param target 目标位图
    * @param time 闪啊闪的时间
    * @isAuto 是否立即执行，默认是ture，也可以设置false，外部调用start方法
    */
    function BitmapBlink(target, time, isAuto) {
        if (isAuto === void 0) { isAuto = true; }
        _super.call(this);
        this._target = target;
        this._time = time;
        if (isAuto) {
            this.start();
        }
    }
    BitmapBlink.prototype.start = function () {
        this._currTime = egret.getTimer();
        this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
    };
    BitmapBlink.prototype.runDown = function (e) {
        this._target.alpha -= 0.045;
        if (this.checkOver()) {
            return;
        }
        if (this._target.alpha <= 0.3) {
            this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
            this._target.addEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
        }
    };
    BitmapBlink.prototype.runUp = function (e) {
        this._target.alpha += 0.045;
        if (this.checkOver()) {
            return;
        }
        if (this._target.alpha >= 1) {
            this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
            this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        }
    };
    BitmapBlink.prototype.checkOver = function () {
        var nowTime = egret.getTimer();
        if (nowTime - this._currTime >= this._time) {
            this.destroy();
            return true;
        }
        return false;
    };
    BitmapBlink.prototype.destroy = function () {
        this._target.alpha = 1;
        this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
        this.dispatchEventWith(egret.Event.COMPLETE, false, this._target);
        this._target = null;
    };
    return BitmapBlink;
})(egret.EventDispatcher);
BitmapBlink.prototype.__class__ = "BitmapBlink";
//# sourceMappingURL=BitmapBlink.js.map