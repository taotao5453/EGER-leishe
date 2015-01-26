  /**
	* 调用原生api方法汇总
	* by dily
	* (c) copyright 2014 - 2035
	* All Rights Reserved. 
	* 使用方法如：Global.setCookie()
    */

module NativeApi {

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
	export function getScreen():void {
      
    } 	

	//调用打电话功能
	export function callPhone(telNum:number):void {
    	window.open("tel:"+telNum,'_self') 
    } 

	//调用发短信功能
	export function sendMessage(telNum:number):void {
    	window.open("sms:"+telNum,'_self') 
    } 	

	//获取当前地址
	export function getCurUrl():string {
		return window.location.href;
    } 	

	//当前游戏角度
	export var curAngle:number = window["orientation"];	

	//获得手机是横屏还是竖屏
	//角度为0说明是竖屏，+-90是横屏
	export function isVertical():boolean{ 
		var angle = window["orientation"]; 
		if(angle == 90){
			return false;
		}else{
			return true;
		}
	} 

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
	export function showVerticalTips1():void{ 
		GameConfig.gameScene().uiLayer.visible = false;
		GameConfig.gameScene().topLayer.visible = false;
		GameConfig.gameScene().effectLayer.visible = false;
		GameConfig.gameScene().mainUILayer.visible = false;
        Global.verticalTipsPanel = new VerticalTipsPanel(false);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild( Global.verticalTipsPanel );
	} 

	//显示竖屏提示
	export function showVerticalTips2():void{ 
		GameConfig.gameScene().uiLayer.visible = false;
		GameConfig.gameScene().topLayer.visible = false;
		GameConfig.gameScene().effectLayer.visible = false;
		GameConfig.gameScene().mainUILayer.visible = false;
        Global.verticalTipsPanel = new VerticalTipsPanel(true);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild( Global.verticalTipsPanel );
	} 

	//移除竖屏提示
	export function removeVerticalTips():void{ 
		GameConfig.gameScene().uiLayer.visible = true;
		GameConfig.gameScene().topLayer.visible = true;
		GameConfig.gameScene().effectLayer.visible = true;
        GameConfig.gameScene().mainUILayer.visible = true;
        GameConfig.gameScene().maskLayer.removeChild(Global.verticalTipsPanel);
        Global.verticalTipsPanel = null;
	} 

	//监听MainNotify.onDeviceMotion事件可以获得摇一摇事件
    //需要在index中增加如下代码
	// <script type="text/javascript">
	//     if (window.DeviceMotionEvent) {
	//         window.addEventListener('devicemotion', deviceMotionHandler, false);
	//     } else {
	//         alert('本设备不支持devicemotion事件');
	//     }
	//     function deviceMotionHandler(eventData) {
	//         window["rootContainer"].deviceMotionHandler(eventData);
	//     }
	// </script>
	//需要在gameMain中增加如下代码
    // private SHAKE_THRESHOLD = 3000;
    // private last_update = 0;
    // private temp_x = 0;
    // private temp_y = 0;
    // private temp_z = 0;
    // private last_x = 0;
    // private last_y = 0;
    // private last_z = 0;
    // public deviceMotionHandler(eventData):void{
    //     var acceleration = eventData.accelerationIncludingGravity;
    //     var curTime = new Date().getTime();
    //     if ((curTime - this.last_update) > 100) {
    //         var diffTime = curTime - this.last_update;
    //         this.last_update = curTime;
    //         this.temp_x = acceleration.x;
    //         this.temp_y = acceleration.y;
    //         this.temp_z = acceleration.z;
    //         var speed = Math.abs(this.temp_x + this.temp_y + this.temp_z - this.last_x - this.last_y - this.last_z) / diffTime * 10000;

    //         if (speed > this.SHAKE_THRESHOLD) {
    //             // alert("摇动了");
    //             lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onDeviceMotion,eventData,false));
    //         }
    //         this.last_x = this.temp_x;
    //         this.last_y = this.temp_y;
    //         this.last_z = this.temp_z;
    //     }
    // }	


    //监听MainNotify.onDeviceOrientation事件可以获得陀螺仪数据
    // var orientationFun:Function = function(e){
    //     var angleX:number = e.param.beta;
	//     var angleY:number = e.param.gamma;
	//     var angleZ:number = e.param.alpha;
    // };  
    // lcp.LListener.getInstance().addEventListener(MainNotify.onDeviceOrientation,orientationFun,this);
    //需要就打开
    // window["ondeviceorientation"] = function(e){
    //     lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onDeviceOrientation,{beta:Math.floor(e.beta), gamma:Math.floor(e.gamma), alpha:Math.floor(e.alpha)},false));
    // };  	

}