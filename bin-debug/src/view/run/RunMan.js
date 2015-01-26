var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunMan = (function (_super) {
    __extends(RunMan, _super);
    function RunMan() {
        _super.call(this);
        this.isJumping = false;
        this.isLowing = false;
        this.isHitting = false;
        this.isWudi = false;
        this.isDead = false;
        var data = RES.getRes("man_json"); //获取动画文件的信息配置文件
        var texture = RES.getRes("man_png"); //获取动画文件的图片
        this.mc = new egret.MovieClip(data, texture); //创建MovieClip
        this.mc.frameRate = MyGameConfig.movieClipFrame;
        this.addChild(this.mc);
        //
        this.run();
    }
    RunMan.prototype.run = function () {
        this.mc.gotoAndPlay("man_run");
    };
    RunMan.prototype.jump = function () {
        if (this.isJumping || this.isDead) {
            return;
        }
        this.isJumping = true;
        this.mc.gotoAndPlay("man_jump");
        var onComplete = function () {
            this.isJumping = false;
            this.run();
        };
        egret.Tween.get(this.mc).wait(700).call(onComplete, this);
    };
    RunMan.prototype.low = function () {
        if (this.isJumping || this.isDead) {
            return;
        }
        this.isLowing = true;
        this.mc.gotoAndPlay("man_low");
        var onComplete = function () {
            this.run();
            this.isLowing = false;
        };
        egret.Tween.get(this.mc).wait(800).call(onComplete, this);
    };
    RunMan.prototype.hit = function () {
        if (this.isDead) {
            return;
        }
        this.isHitting = true;
        this.mc.gotoAndPlay("man_hit");
        var onComplete = function () {
            this.run();
            this.isHitting = false;
        };
        egret.Tween.get(this.mc).wait(300).call(onComplete, this);
    };
    RunMan.prototype.wudi = function () {
        this.isWudi = true;
        var t_time = 1000;
        EffectUtils.blinkEffect(this.mc, t_time);
        var onComplete = function () {
            this.isWudi = false;
        };
        egret.Tween.get(this.mc).wait(t_time).call(onComplete, this);
    };
    RunMan.prototype.die = function () {
        this.isDead = true;
        this.mc.gotoAndPlay("man_dead");
    };
    return RunMan;
})(egret.DisplayObjectContainer);
RunMan.prototype.__class__ = "RunMan";
//# sourceMappingURL=RunMan.js.map