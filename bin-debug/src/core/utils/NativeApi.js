/**
  * 调用原生api方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 使用方法如：Global.setCookie()
  */
var NativeApi;
(function (NativeApi) {
    // // 储存数据需要key和value，都必须是字符串
    // export function setLocalData(key:string, value:string):void
    // { 
    // 	egret.localStorage.setItem(key,value);
    // }
    // // 读取数据
    // export function getLocalData(key:string):string
    // { 
    // 	return egret.localStorage.getItem(key);
    // }
    // // 删除数据
    // export function deleteLocalData(key:string):void
    // { 
    // 	egret.localStorage.removeItem(key);
    // }
    // // 将所有数据清空
    // export function clearLocalData():void
    // { 
    // 	egret.localStorage.clear();
    // }
    // //=======================以下内容是调用手机相册和摄像头获取图片方法===============================
    // //在index中增加
    // // <div style="display:none">
    // //     <input id="files-upload" type="file" width='0' height='0' multiple accept="image/.*;capture=camera" name="file"> 
    // //     <div id="result" name="result"></div> 
    // // </div>
    // //to do 多平台兼容不是很好 uc可以 微信不支持FileReader，目前不知道为什么暂且搁置
    // //参考网址
    // export var srcImg:egret.Bitmap = new egret.Bitmap();
    //    export function uploadFile(file):void {
    //       if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
    //           var reader = new FileReader();
    //           var self = this;
    //           reader.onload = (function () {
    //           		alert("数据读取完成");
    // 			var result=document.getElementById("result");  
    // 			result.innerHTML='<img id="photoImg" src="' + this.result +'" alt="" />';
    // 			var texture:egret.Texture = new egret.Texture();
    // 			texture._setBitmapData(document.getElementById("photoImg"));
    // 			NativeApi.srcImg.texture = texture;   
    //           });
    //           reader.readAsDataURL(file);
    //       }
    //   }
    // export function traverseFiles (files):void {
    //    if ((typeof files !== "undefined")&&(files.length > 0)) {
    //           uploadFile(files[0]);
    //   }else{
    //       alert("抱歉！当前系统不支持此功能！");
    //   }    
    // }
    // //调用摄像头  todo
    // export function fileUpload(srcImg):void{ 
    // 	this.srcImg = srcImg;
    //        var filesUpload = document.getElementById("files-upload");
    //        filesUpload.click();
    //        var self = this;
    //        filesUpload.addEventListener("change", function () {
    //          self.traverseFiles(this.files);
    //        }, false);
    // } 
    // //=======================以上内容是调用手机相册和摄像头获取图片方法===============================
    // //调用麦克风  
    // export function getMic():void {
    //    	//getUserMedia API 大部分手机不支持，所以暂不考虑
    //    } 
    //调用canvas截屏
    function getScreen() {
    }
    NativeApi.getScreen = getScreen;
    //调用打电话功能
    function callPhone(telNum) {
        window.open("tel:" + telNum, '_self');
    }
    NativeApi.callPhone = callPhone;
    //调用发短信功能
    function sendMessage(telNum) {
        window.open("sms:" + telNum, '_self');
    }
    NativeApi.sendMessage = sendMessage;
    //获取当前地址
    function getCurUrl() {
        return window.location.href;
    }
    NativeApi.getCurUrl = getCurUrl;
    //当前游戏角度
    NativeApi.curAngle = window["orientation"];
    //获得手机是横屏还是竖屏
    //角度为0说明是竖屏，+-90是横屏
    function isVertical() {
        var angle = window["orientation"];
        if (angle == 90) {
            return false;
        }
        else {
            return true;
        }
    }
    NativeApi.isVertical = isVertical;
    //监听MainNotify.onOrientationChange事件可以获得屏幕竖屏横屏变化和角度
    // var orientationFun:Function = function(e){
    //     // document.title = "" + GameConfig.curAngle;
    // document.title = "11--" + e.param;
    // };  
    // lcp.LListener.getInstance().addEventListener(MainNotify.onOrientationChange,orientationFun,this);
    // window["onorientationchange"] = function(e){
    // lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange,window["orientation"],false));
    // if(GlobalData.isVerticalGame && GlobalData.initIsVertical && (window["orientation"] != 0)){
    // 	window.open(window.location.href);
    // }
    // if(GlobalData.isVerticalGame&&GameConfig.isVertical()){
    //     NativeApi.showVerticalTips2();
    // }else if(GlobalData.isVerticalGame&&!GameConfig.isVertical()){
    // 	NativeApi.removeVerticalTips();
    // }
    // };  
    //显示竖屏提示
    function showVerticalTips1() {
        GameConfig.gameScene().uiLayer.visible = false;
        GameConfig.gameScene().topLayer.visible = false;
        GameConfig.gameScene().effectLayer.visible = false;
        GameConfig.gameScene().mainUILayer.visible = false;
        Global.verticalTipsPanel = new VerticalTipsPanel(false);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild(Global.verticalTipsPanel);
    }
    NativeApi.showVerticalTips1 = showVerticalTips1;
    //显示竖屏提示
    function showVerticalTips2() {
        GameConfig.gameScene().uiLayer.visible = false;
        GameConfig.gameScene().topLayer.visible = false;
        GameConfig.gameScene().effectLayer.visible = false;
        GameConfig.gameScene().mainUILayer.visible = false;
        Global.verticalTipsPanel = new VerticalTipsPanel(true);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild(Global.verticalTipsPanel);
    }
    NativeApi.showVerticalTips2 = showVerticalTips2;
    //移除竖屏提示
    function removeVerticalTips() {
        GameConfig.gameScene().uiLayer.visible = true;
        GameConfig.gameScene().topLayer.visible = true;
        GameConfig.gameScene().effectLayer.visible = true;
        GameConfig.gameScene().mainUILayer.visible = true;
        GameConfig.gameScene().maskLayer.removeChild(Global.verticalTipsPanel);
        Global.verticalTipsPanel = null;
    }
    NativeApi.removeVerticalTips = removeVerticalTips;
})(NativeApi || (NativeApi = {}));
//# sourceMappingURL=NativeApi.js.map