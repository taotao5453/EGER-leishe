var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * @auth kuma cooron.com
 * @email artmemory@qq.com
 */
var CMovieClip = (function (_super) {
    __extends(CMovieClip, _super);
    function CMovieClip(data, asset) {
        _super.call(this);
        this._frameRate = 60;
        this._currentFrame = 1;
        this._currentLabelCount = 0;
        this._isPlaying = false;
        this._reverse = false;
        this._moiveGroupList = [];
        this._frameScriptFunctions = {};
        this._frameScriptParams = {};
        this._drawingFrame = 0;
        this._passTime = 0;
        this.data = data;
        this.sheet = new egret.SpriteSheet(asset);
        this._bitmap = new egret.Bitmap();
        this.addChild(this._bitmap);
        for (var obj in data["frames"]) {
            this._moiveGroupList.push(obj);
        }
        if (this._moiveGroupList.length > 0) {
            this._currentMovieGroup = this._moiveGroupList[0];
            this.draw(this._currentFrame, this._currentMovieGroup);
        }
        this.play();
    }
    /**
     * 跳转到指定帧播放
     * @param frame 帧号或者帧标签
     * @param movieGroup 要播放的帧所在的动画集
     */
    CMovieClip.prototype.gotoAndPlay = function (frame, movieGroup) {
        if (movieGroup === void 0) { movieGroup = undefined; }
        this.setMovieClipGroup(movieGroup);
        if (this.parseFrame(frame)) {
            this.play();
            this.draw(this._currentFrame, this._currentMovieGroup);
        }
    };
    /**
     * 跳转到指定帧停止
     * @param frame 帧号或者帧标签
     * @param movieGroup 要停止的帧所在的动画集
     */
    CMovieClip.prototype.gotoAndStop = function (frame, movieGroup) {
        if (movieGroup === void 0) { movieGroup = undefined; }
        this.setMovieClipGroup(movieGroup);
        if (this.parseFrame(frame)) {
            this.stop();
            this.draw(this._currentFrame, this._currentMovieGroup);
        }
    };
    CMovieClip.prototype.parseFrame = function (frame) {
        if (typeof frame === "number") {
            this._currentFrame = parseInt(frame, 10);
            return true;
        }
        if (typeof frame === "string") {
            var count = 0;
            for (var i = 0; i < this.data.frames[this._currentMovieGroup].childrenFrame.length; i++) {
                if (this.data.frames[this._currentMovieGroup].childrenFrame[i].action == String(frame)) {
                    count = i + 1;
                    break;
                }
            }
            if (count == 0) {
                egret.Logger.fatal(this._currentMovieGroup + "上找不到帧标签：", String(frame));
                return false;
            }
            this._currentFrame = count;
            return true;
        }
        egret.Logger.fatal("错误的参数类型，此函数只接受Number或者String类型的参数。当前输出参数类型为", typeof frame);
        return false;
    };
    /**
     * 继续播放
     */
    CMovieClip.prototype.play = function () {
        this._isPlaying = true;
        egret.Ticker.getInstance().register(this.update, this);
    };
    /**
     * 播放头停止在当前帧
     */
    CMovieClip.prototype.stop = function () {
        this._isPlaying = false;
        egret.Ticker.getInstance().unregister(this.update, this);
    };
    CMovieClip.prototype.update = function (advancedTime) {
        var oneFrameTime = 1000 / this._frameRate;
        var last = this._passTime % oneFrameTime;
        var num = Math.floor((last + advancedTime) / oneFrameTime);
        while (num >= 1) {
            this.nextFrame();
            num--;
        }
        this._passTime += advancedTime;
    };
    /**
     * 播放下一帧，在实际动画中，如果reverse为true，那么是向前移动一帧，否则向后移动一帧
     * @params repeat 是否循环
     */
    CMovieClip.prototype.prevFrame = function (repeat) {
        if (repeat === void 0) { repeat = true; }
        if (this.reverse) {
            this.setNext(repeat);
        }
        else {
            this.setPrev(repeat);
        }
    };
    /**
     * 播放上一帧，在实际动画中，如果reverse为true，那么是向后移动一帧，否则向前移动一帧
     * @params repeat 是否循环
     */
    CMovieClip.prototype.nextFrame = function (repeat) {
        if (repeat === void 0) { repeat = true; }
        if (this.reverse) {
            this.setPrev(repeat);
        }
        else {
            this.setNext(repeat);
        }
    };
    /**
     * 播放头后移动一帧
     * @param repeat
     */
    CMovieClip.prototype.setNext = function (repeat) {
        if (repeat === void 0) { repeat = true; }
        if (this._currentFrame < this.totalFrames) {
            this._currentFrame += 1;
        }
        else {
            if (repeat) {
                this._currentFrame = 1;
            }
        }
        this.draw(this._currentFrame, this._currentMovieGroup);
    };
    /**
     * 播放头前移动一帧
     * @params repeat 是否循环
     */
    CMovieClip.prototype.setPrev = function (repeat) {
        if (repeat === void 0) { repeat = true; }
        if (this._currentFrame > 1) {
            this._currentFrame -= 1;
        }
        else {
            if (repeat) {
                this._currentFrame = this.totalFrames;
            }
        }
        this.draw(this._currentFrame, this._currentMovieGroup);
    };
    /**
     * 向指定帧添加脚本
     * @param frame 帧标签和帧号
     * @param script    要添加是脚本函数
     */
    CMovieClip.prototype.addFrameScript = function (frame, script, params, movieGroup) {
        if (params === void 0) { params = undefined; }
        if (movieGroup === void 0) { movieGroup = undefined; }
        var mg = !movieGroup ? this._currentMovieGroup : movieGroup;
        var index = this.translateFrame(frame, mg);
        if (!script)
            return false;
        if (!mg)
            return false;
        if (!this._frameScriptFunctions[mg]) {
            this._frameScriptFunctions[mg] = [];
            this._frameScriptParams[mg] = [];
        }
        if (!this._frameScriptFunctions[mg][index]) {
            this._frameScriptFunctions[mg][index] = [];
            this._frameScriptParams[mg][index] = [];
        }
        var list = this._frameScriptFunctions[mg][index];
        if (list.indexOf(script) == -1) {
            list.push(script);
            this._frameScriptParams[mg][index].push(params);
            return true;
        }
        return false;
    };
    /**
     * 移除通过addFrameScript向指定帧上添加的脚本
     * @param frame 帧标签和帧号
     * @param script    要添加是脚本函数
     */
    CMovieClip.prototype.removeFrameScript = function (frame, script, params, movieGroup) {
        if (script === void 0) { script = undefined; }
        if (params === void 0) { params = undefined; }
        if (movieGroup === void 0) { movieGroup = undefined; }
        var mg = !movieGroup ? this._currentMovieGroup : movieGroup;
        var index = this.translateFrame(frame, mg);
        if (!script)
            return false;
        if (!mg)
            return false;
        if (!this._frameScriptFunctions[mg]) {
            return false;
        }
        if (!this._frameScriptFunctions[mg][index]) {
            return false;
        }
        var list = this._frameScriptFunctions[mg][index];
        if (list.indexOf(script) != -1) {
            var d = list.indexOf(script);
            list.splice(d, 1);
            this._frameScriptParams[mg][index].splice(d, 1);
            return true;
        }
        return false;
    };
    Object.defineProperty(CMovieClip.prototype, "totalFrames", {
        /**
         * 当前动画资源组包含的帧数量
         */
        get: function () {
            if (!this._currentMovieGroup) {
                return 0;
            }
            return this.data.frames[this._currentMovieGroup].totalFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CMovieClip.prototype, "currentFrame", {
        /**
         * 当前播放头所在的帧号
         */
        get: function () {
            return this._currentFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CMovieClip.prototype, "currentFrameLabel", {
        /**
         * 当前播放头所在帧的标签
         */
        get: function () {
            if (this._currentMovieGroup == undefined) {
                return null;
            }
            if (this.currentFrame == 1) {
                return this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame - 1].action;
            }
            if (this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame - 1].action == this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame - 2].action) {
                return null;
            }
            return this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame - 1].action;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CMovieClip.prototype, "currentLabel", {
        /**
         * 当前播放头所在帧标签序列
         */
        get: function () {
            return this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame - 1].action;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CMovieClip.prototype, "playing", {
        /**
         * 当前是否处于播放中
         */
        get: function () {
            return this._isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CMovieClip.prototype, "frameRate", {
        /**
         * 取得当前帧频
         * @returns {number}
         */
        get: function () {
            return this._frameRate;
        },
        /**
         * 设置当前帧频
         * @param value
         */
        set: function (value) {
            this._frameRate = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置当前动画资源组
     * @param value 动画资源组的名称
     */
    CMovieClip.prototype.setMovieClipGroup = function (value) {
        if (this.data.frames[value] == undefined || value == undefined) {
            return;
        }
        this._currentMovieGroup = value;
    };
    Object.defineProperty(CMovieClip.prototype, "movieClipGroup", {
        /**
         * 获取当前动画资源组
         */
        get: function () {
            return this._currentMovieGroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CMovieClip.prototype, "reverse", {
        /**
         * 获取当前播放顺序为正向还是反向
         */
        get: function () {
            return this._reverse;
        },
        /**
         * 设置当前播放顺序为正向还是反向
         * @param value
         */
        set: function (value) {
            this._reverse = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 将帧对象转换为帧号
     * @param frame
     */
    CMovieClip.prototype.translateFrame = function (frame, movieGroup) {
        if (movieGroup === void 0) { movieGroup = undefined; }
        if (typeof frame === "number") {
            return frame;
        }
        if (typeof frame === "string") {
            var mg = !movieGroup ? this._currentMovieGroup : movieGroup;
            if (this._moiveGroupList.indexOf(mg) == -1) {
                return 1;
            }
            for (var i = 0; i < this.data.frames[mg].totalFrame; i++) {
                if (this.data.frames[mg].childrenFrame[i].action == frame) {
                    return i + 1;
                }
            }
            return 1;
        }
        return 1;
    };
    CMovieClip.prototype.draw = function (frame, movieGroup) {
        if (frame == this._drawingFrame && movieGroup == this._drawingMovieGroup) {
            return;
        }
        if (!movieGroup) {
            egret.Logger.warning("MovieClip指定绘制的动画组不能为空");
            return;
        }
        if (this._moiveGroupList.indexOf(movieGroup) == -1) {
            egret.Logger.warning("MovieClip指定绘制的动画组不存在");
            return;
        }
        this._drawingFrame = frame;
        this._drawingMovieGroup = movieGroup;
        var frameData = this.data.frames[this._drawingMovieGroup].childrenFrame[this._drawingFrame - 1];
        var resData = this.data.res[frameData.res];
        var texture = this.sheet.getTexture(frameData.res);
        if (!texture) {
            texture = this.sheet.createTexture(frameData.res, resData.x, resData.y, resData.w, resData.h, frameData.x, frameData.y);
        }
        this._bitmap.texture = texture;
        if (this._frameScriptFunctions[this._drawingMovieGroup]) {
            if (this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame] != undefined) {
                var len = this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame].length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var params = this._frameScriptParams[this._drawingMovieGroup][this._drawingFrame][i];
                        if (params != undefined) {
                            this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame][i](params);
                        }
                        else {
                            this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame][i]();
                        }
                    }
                }
            }
        }
    };
    return CMovieClip;
})(egret.Sprite);
//# sourceMappingURL=CMovieClip.js.map