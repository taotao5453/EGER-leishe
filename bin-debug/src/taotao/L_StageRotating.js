var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lixin on 2014/11/11.
 */
var L_StageRotating = (function (_super) {
    __extends(L_StageRotating, _super);
    /*提示图形的名称，如果为none则绘制一个图形，横竖屏，检测频率。默认500ms*/
    function L_StageRotating(_name, _roation, frameRate) {
        if (_name === void 0) { _name = "none"; }
        if (_roation === void 0) { _roation = true; }
        if (frameRate === void 0) { frameRate = 500; }
        _super.call(this);
        /*
        * 初始过程中屏幕状态 true  横屏 false  竖屏
        * */
        this.GameRotation = false;
        this.timerRate = 0;
        /*
        * 保存实际的页面宽高
        * */
        this.ScenceWidth = 0;
        this.ScenceHeight = 0;
        this.id = 0;
        //
        this.promptSprite = null;
        this.bitmapNanme = _name;
        this.GameRotation = _roation;
        this.timerRate = frameRate;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    L_StageRotating.getInstance = function () {
        if (this.g_instance == null) {
            this.g_instance = new L_StageRotating;
        }
        return this.g_instance;
    };
    L_StageRotating.prototype.onAddToStage = function (event) {
        var _width = document.documentElement.clientWidth;
        var _height = document.documentElement.clientHeight;
        var _w = 800;
        var _h = 480;
        /*
        * 如果宽度小于高度，需要互换宽高，因为要在竖屏状态下横向显示游戏
        * */
        if (_width < _height) {
            //Settings.StageWidth = _w;
            //Settings.StageHeight = _h;
            Settings.isRotation = true;
        }
        else {
            //Settings.StageWidth = _w;
            //Settings.StageHeight = _h;
            Settings.isRotation = false;
        }
        this.timer = new egret.Timer(this.timerRate);
        //console.log(Settings.StageWidth,Settings.StageHeight,_width,_height);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    };
    L_StageRotating.prototype.onTimer = function (e) {
        this.ScenceWidth = document.documentElement.clientWidth;
        this.ScenceHeight = document.documentElement.clientHeight;
        /* console.log(this.ScenceWidth,this.ScenceHeight,Settings.isRotation,(this.ScenceWidth<this.ScenceHeight&&Settings.isRotation),
             (this.ScenceWidth<this.ScenceHeight&&!Settings.isRotation),(this.ScenceWidth>this.ScenceHeight&&!Settings.isRotation)
             ,(this.ScenceWidth>this.ScenceHeight&&Settings.isRotation)
         )*/
        //屏幕为竖屏，游戏已经旋转，可正常进行游戏
        if (this.ScenceWidth < this.ScenceHeight && Settings.isRotation) {
            if (this.promptSprite != null) {
                this.ReturnRun();
            }
            ;
        }
        else if (this.ScenceWidth < this.ScenceHeight && !Settings.isRotation) {
            if (this.promptSprite == null) {
                this.id = 1;
                this.ReturnStop();
            }
            ;
        }
        else if (this.ScenceWidth > this.ScenceHeight && !Settings.isRotation) {
            if (this.promptSprite != null) {
                this.ReturnRun();
            }
            ;
        }
        else if (this.ScenceWidth > this.ScenceHeight && Settings.isRotation) {
            if (this.promptSprite == null) {
                this.id = 2;
                this.ReturnStop();
            }
            ;
        }
    };
    //执行游戏被强制旋转，不能进行游戏
    L_StageRotating.prototype.ReturnStop = function () {
        this.dispatchEvent(new egret.Event("GameStop", false, false));
        var bg = TaotaoUtils.createRectangular(0, 0, Settings.StageWidth, Settings.StageHeight, 1, 0x5c5c5c);
        bg.touchEnabled = true;
        if (this.bitmapNanme == "none") {
            var txt;
            txt = TaotaoUtils.createTextLabel(txt, 0xffffff, "center", "请旋转屏幕并关闭自动旋转屏幕功能", 36, this.ScenceWidth);
            txt.y = 100;
            txt.x = 0;
        }
        this.promptSprite = new egret.Sprite();
        this.promptSprite.addChild(bg);
        this.promptSprite.addChild(txt);
        this.addChild(this.promptSprite);
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAndRun, this);
    };
    L_StageRotating.prototype.touchAndRun = function (e) {
        this.ReturnRun();
    };
    //发出事件，允许游戏继续运行
    L_StageRotating.prototype.ReturnRun = function () {
        this.removeChild(this.promptSprite);
        this.promptSprite = null;
        this.dispatchEvent(new egret.Event("GamePlay", false, false));
    };
    return L_StageRotating;
})(egret.DisplayObjectContainer);
L_StageRotating.prototype.__class__ = "L_StageRotating";
//# sourceMappingURL=L_StageRotating.js.map