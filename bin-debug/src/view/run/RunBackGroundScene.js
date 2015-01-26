var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunBackGroundScene = (function (_super) {
    __extends(RunBackGroundScene, _super);
    function RunBackGroundScene() {
        _super.call(this);
        //远景
        this.far_sp = new RunBackGround("gameBg_down");
        this.addChild(this.far_sp);
        //中景
        this.middle_sp = new RunBackGround("gameBg_middle");
        this.addChild(this.middle_sp);
        //近景
        this.near_sp = new RunBackGround("gameBg_top");
        this.addChild(this.near_sp);
        //
        this.resetSpeed();
    }
    RunBackGroundScene.prototype.onEnterFrame = function (_advancedTime) {
        this.far_sp.onEnterFrame(_advancedTime);
        this.middle_sp.onEnterFrame(_advancedTime);
        this.near_sp.onEnterFrame(_advancedTime);
    };
    RunBackGroundScene.prototype.resetSpeed = function () {
        this.far_sp.setSpeed(MyGameConfig.speed - 2);
        this.middle_sp.setSpeed(MyGameConfig.speed - 1);
        this.near_sp.setSpeed(MyGameConfig.speed);
    };
    return RunBackGroundScene;
})(egret.DisplayObjectContainer);
RunBackGroundScene.prototype.__class__ = "RunBackGroundScene";
//# sourceMappingURL=RunBackGroundScene.js.map