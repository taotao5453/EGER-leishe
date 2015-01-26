    /**
     * @auth kuma cooron.com
     * @email artmemory@qq.com
     */
    class CMovieClip extends egret.Sprite{
    private data:any;
    private sheet:egret.SpriteSheet;
    private _bitmap:egret.Bitmap;
    private _frameRate:number = 60;
    private _currentFrame:number=1;
    private _currentLabelCount:number = 0;
    private _currentMovieGroup:string;
    private _isPlaying:boolean = false;
    private _reverse:boolean = false;
    private _moiveGroupList = [];
    private _frameScriptFunctions:Object = {};
    private _frameScriptParams:Object = {};
    private _drawingFrame:number=0;
    private _drawingMovieGroup:string;
    private _passTime:number=0;

    public  constructor(data: any, asset: egret.Texture){
        super();
        this.data = data;
        this.sheet = new egret.SpriteSheet(asset);
        this._bitmap = new egret.Bitmap();
        this.addChild(this._bitmap);
        for (var obj in data["frames"]){
            this._moiveGroupList.push(obj);
        }
        if(this._moiveGroupList.length > 0){
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
    public gotoAndPlay(frame:any, movieGroup:string = undefined):void{
        this.setMovieClipGroup(movieGroup);
        if(this.parseFrame(frame)){
            this.play();
            this.draw(this._currentFrame, this._currentMovieGroup);
        }
    }

    /**
     * 跳转到指定帧停止
     * @param frame 帧号或者帧标签
     * @param movieGroup 要停止的帧所在的动画集
     */
    public gotoAndStop(frame:any, movieGroup:string = undefined):void{
        this.setMovieClipGroup(movieGroup);
        if(this.parseFrame(frame)){
            this.stop();
            this.draw(this._currentFrame, this._currentMovieGroup);
        }
    }

    private parseFrame(frame:any):boolean{
        if(typeof frame === "number"){
            this._currentFrame =  parseInt(frame,10);
            return true;
        }

        if(typeof frame === "string"){
            var count:number = 0;
            for(var i=0; i < this.data.frames[this._currentMovieGroup].childrenFrame.length; i++){
                if(this.data.frames[this._currentMovieGroup].childrenFrame[i].action == String(frame)){
                    count=i+1;
                    break;
                }
            }
            if(count == 0){
                egret.Logger.fatal(this._currentMovieGroup+"上找不到帧标签：", String(frame));
                return false;
            }
            this._currentFrame = count;
            return true;
        }

        egret.Logger.fatal("错误的参数类型，此函数只接受Number或者String类型的参数。当前输出参数类型为", typeof frame);
        return false;
    }

    /**
     * 继续播放
     */
    public play():void{
        this._isPlaying = true;
        egret.Ticker.getInstance().register(this.update, this);
    }

    /**
     * 播放头停止在当前帧
     */
    public stop():void{
        this._isPlaying = false;
        egret.Ticker.getInstance().unregister(this.update, this);
    }

    private update(advancedTime):void{
        var oneFrameTime = 1000 / this._frameRate;
        var last = this._passTime % oneFrameTime;
        var num = Math.floor((last + advancedTime) / oneFrameTime);
        while (num >= 1) {
            this.nextFrame();
            num--;
        }
        this._passTime += advancedTime;
    }

    /**
     * 播放下一帧，在实际动画中，如果reverse为true，那么是向前移动一帧，否则向后移动一帧
     * @params repeat 是否循环
     */
    public prevFrame(repeat:boolean = true):void{
        if(this.reverse){
            this.setNext(repeat);
        }else{
            this.setPrev(repeat);
        }
    }

    /**
     * 播放上一帧，在实际动画中，如果reverse为true，那么是向后移动一帧，否则向前移动一帧
     * @params repeat 是否循环
     */
    public nextFrame(repeat:boolean = true):void{
        if(this.reverse){
            this.setPrev(repeat);
        }else{
            this.setNext(repeat);
        }
    }

    /**
     * 播放头后移动一帧
     * @param repeat
     */
    private setNext(repeat:boolean = true):void
    {
        if(this._currentFrame < this.totalFrames){
            this._currentFrame+=1;
        }else{
            if(repeat){
                this._currentFrame=1;
            }
        }
        this.draw(this._currentFrame, this._currentMovieGroup);
    }

    /**
     * 播放头前移动一帧
     * @params repeat 是否循环
     */
    private setPrev(repeat:boolean = true):void{
        if(this._currentFrame > 1 ){
            this._currentFrame-=1;
        }else{
            if(repeat){
                this._currentFrame=this.totalFrames;
            }
        }
        this.draw(this._currentFrame, this._currentMovieGroup);
    }

    /**
     * 向指定帧添加脚本
     * @param frame 帧标签和帧号
     * @param script    要添加是脚本函数
     */
    public addFrameScript(frame:Object, script:Function, params:any = undefined, movieGroup:string = undefined):boolean{
        var mg = !movieGroup?this._currentMovieGroup:movieGroup;
        var index = this.translateFrame(frame,mg);
        if(!script) return false;
        if(!mg) return false;
        if(!this._frameScriptFunctions[mg]){
            this._frameScriptFunctions[mg] = [];
            this._frameScriptParams[mg] = [];
        }
        if(!this._frameScriptFunctions[mg][index]){
            this._frameScriptFunctions[mg][index] = [];
            this._frameScriptParams[mg][index] = [];
        }
        var list = this._frameScriptFunctions[mg][index];
        if(list.indexOf(script)==-1){
            list.push(script);
            this._frameScriptParams[mg][index].push(params);
            return true;
        }
        return false;
    }

    /**
     * 移除通过addFrameScript向指定帧上添加的脚本
     * @param frame 帧标签和帧号
     * @param script    要添加是脚本函数
     */
    public removeFrameScript(frame:Object, script:Function = undefined, params:any = undefined, movieGroup:string = undefined){
        var mg = !movieGroup?this._currentMovieGroup:movieGroup;
        var index = this.translateFrame(frame,mg);
        if(!script) return false;
        if(!mg) return false;
        if(!this._frameScriptFunctions[mg]){
            return false;
        }
        if(!this._frameScriptFunctions[mg][index]){
            return false;
        }
        var list = this._frameScriptFunctions[mg][index];
        if(list.indexOf(script)!=-1){
            var d:number = list.indexOf(script);
            list.splice(d,1);
            this._frameScriptParams[mg][index].splice(d,1);
            return true;
        }
        return false;
    }

    /**
     * 当前动画资源组包含的帧数量
     */
    public get totalFrames():number{
        if(!this._currentMovieGroup){
            return 0;
        }
        return this.data.frames[this._currentMovieGroup].totalFrame;
    }

    /**
     * 当前播放头所在的帧号
     */
    public get currentFrame():number{
        return this._currentFrame;
    }

    /**
     * 当前播放头所在帧的标签
     */
    public get currentFrameLabel():String{
        if(this._currentMovieGroup == undefined){
            return null;
        }
        if(this.currentFrame == 1){
            return this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame-1].action;
        }
        if(this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame-1].action == this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame-2].action){
            return null;
        }
        return this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame-1].action;
    }

    /**
     * 当前播放头所在帧标签序列
     */
    public get currentLabel():String{
        return this.data.frames[this._currentMovieGroup].childrenFrame[this.currentFrame-1].action;
    }

    /**
     * 当前是否处于播放中
     */
    public get playing():boolean{
        return this._isPlaying;
    }

    /**
     * 设置当前帧频
     * @param value
     */
    public set frameRate(value:number){
        this._frameRate = value;
    }

    /**
     * 取得当前帧频
     * @returns {number}
     */
    public get frameRate():number{
        return this._frameRate;
    }

    /**
     * 设置当前动画资源组
     * @param value 动画资源组的名称
     */
    private setMovieClipGroup(value:string)
    {
        if (this.data.frames[value] == undefined || value == undefined){
            return;
        }
        this._currentMovieGroup = value;
    }

    /**
     * 获取当前动画资源组
     */
    public get movieClipGroup():string{
        return this._currentMovieGroup;
    }

    /**
     * 获取当前播放顺序为正向还是反向
     */
    public get reverse():boolean{
        return this._reverse;
    }

    /**
     * 设置当前播放顺序为正向还是反向
     * @param value
     */
    public set reverse(value:boolean){
        this._reverse = value;
    }

    /**
     * 将帧对象转换为帧号
     * @param frame
     */
    private translateFrame(frame:any, movieGroup:string = undefined):number{
        if(typeof frame === "number"){
            return frame;
        }
        if(typeof frame === "string"){
            var mg = !movieGroup?this._currentMovieGroup:movieGroup;
            if(this._moiveGroupList.indexOf(mg) == -1){
                return 1;
            }
            for(var i=0; i < this.data.frames[mg].totalFrame;i++ ){
                if(this.data.frames[mg].childrenFrame[i].action == frame){
                    return i+1;
                }
            }
            return 1;
        }
        return 1;
    }

    private draw(frame:number, movieGroup:string):void{
        if(frame == this._drawingFrame && movieGroup == this._drawingMovieGroup){
            return;
        }
        if(!movieGroup){
            egret.Logger.warning("MovieClip指定绘制的动画组不能为空");
            return;
        }
        if(this._moiveGroupList.indexOf(movieGroup) == -1){
            egret.Logger.warning("MovieClip指定绘制的动画组不存在");
            return;
        }

        this._drawingFrame = frame;
        this._drawingMovieGroup = movieGroup;
        var frameData = this.data.frames[this._drawingMovieGroup].childrenFrame[this._drawingFrame-1];
        var resData = this.data.res[frameData.res];
        var texture = this.sheet.getTexture(frameData.res);
        if (!texture) {
            texture = this.sheet.createTexture(frameData.res, resData.x, resData.y, resData.w, resData.h,frameData.x,frameData.y);
        }
        this._bitmap.texture = texture;

        if(this._frameScriptFunctions[this._drawingMovieGroup]){
           if(this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame] != undefined){
               var len = this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame].length;
               if(len >0){
                    for(var i=0; i < len; i++){
                        var params:any = this._frameScriptParams[this._drawingMovieGroup][this._drawingFrame][i];
                       if(params != undefined){
                            this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame][i](params);
                       }else{
                           this._frameScriptFunctions[this._drawingMovieGroup][this._drawingFrame][i]();
                       }
                    }
               }
           }
        }
    }
}
