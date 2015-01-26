/**
 * Created by xiangtao on 2014.12.2.
 */
// 调用步骤
// 1.  引用I9 RIA SDK
// <script src="//wx.9ria.com/open/sdk.php?token=APPKEY&_env=sdktest">
// </script>

// 注：APPKEY在项目生成时由后端提供
// 2.  请求入口
// 上线访问地址：
// http://wx.9ria.com/open/start.php?name=APPNAME

// 测试访问地址：
//     http://wx.9ria.com/open/start.php? _env=sdktest&_debug=1& name=APPNAME&openid=OPENID&jumpurl=JUMPURL

// 注：APPNAME在项目生成时由后端提供；OPENID微信用户ID，测试时候可以固定，主要方便浏览器端的调试；JUMPURL：开发者进行游戏开发时的地址。
// 3.  调用方式
// I9RIA.setGamedata('test1', 'data2', function(res) {
// console.log(res);
// }); 

module ConnectUtils{
    /**
     * 获取存入的游戏数据
     * key      唯一键
     * fun      回调方法，默认不用传
     * */
    export function getGamedata(key:string,fun:Function = null):void{
        window["I9RIA"].getGamedata(key, fun);
    }

    /**
     * 存入与用户相关的游戏数据，便于下次用户访问时调用
     * key      唯一键
     * data     数据，Object类型
     * fun      回调方法，默认不用传
     */
    export function setGamedata(key:string, data,fun:Function = null):void{
        window["I9RIA"].setGamedata(key,data,fun);
    }

    /**
     * 保存单次游戏积分数据
     * lot_id           奖品类别，若不存在设置为 0
     * lot_count        积分 / 奖品数量
     * fun              回调方法，默认不用传
     * */
    export function setScore(lot_id:number, lot_count:number,fun:Function = null):void{
        window["I9RIA"].setScore(lot_id,lot_count , fun);
    }

    /**
     * 对游戏积分进行修改，比如点击支持数增加2，就传送2
     * lot_id           奖品类别，若不存在设置为 0
     * lot_count        积分 / 奖品数量
     * fun              回调方法，默认不用传
     * */
    export function addScore(lot_id:number, lot_count:number,fun:Function = null):void{
        window["I9RIA"].addScore(lot_id,lot_count , fun);
    }

    /**
     * 获取积分/某类奖品数量
     * lot_id           奖品类别，若不存在设置为 0
     * fun              回调方法，必须传
     * */
    export function getScore(lot_id:number,fun:Function):void{
        window["I9RIA"].getScore(lot_id , fun);
    }

    /**
     * 获取排行榜数据
     * type  排行榜类型
     * size  数据条数
     * fun   回调方法，必须传
     * */
    export function getRank(type:string,size:number,fun:Function):void{
        window["I9RIA"].getRank(type,size , fun);
    }

    /**
     * 记录游戏时间
     * type         游戏类型
     * trigger_id   数据条数
     * fun          回调方法，默认不用传
     * */
    export function setTrigger(type:number,trigger_id:number,fun:Function = null):void{
        window["I9RIA"].trigger(type,trigger_id , fun);
    }

    /**
     * 获取游戏剩余次数
     * fun   回调方法，必须传
     * */
    export function getTimes(fun:Function){
        window["I9RIA"].getTimes(fun);
    }

    /**
     * 获取游戏奖品列表
     * fun   回调方法，必须传
     * */
    export function getprizes(fun:Function){
        window["I9RIA"].getprizes(fun);
    }

    /**
     * 输入用户信息，兑换奖品
     * fun          回调方法，默认不用传
     * */

    export function exchange(data:string,fun:Function = null):void{
        window["I9RIA"].exchange(data, fun);
    }

    /**
     * 获取兑奖二维码
     * fun   回调方法，必须传
     * */
    export function qrcode(fun:Function){
        window["I9RIA"].qrcode(fun);
    }

    /**
     * 自定义统计日志
     * controller   统计过滤维度1
     * action       统计过滤维度2
     * fun          回调方法，必须传
     * */
    export function statlog(controller:string, action:string,fun:Function):void{
        window["I9RIA"].statlog(controller,action, fun);
    }

 }