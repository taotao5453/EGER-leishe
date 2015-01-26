var MyGameConfig = (function () {
    function MyGameConfig() {
    }
    MyGameConfig.resetConfig = function () {
        this.speed = 5;
        this.friend_number = 0;
        this.life = 3;
    };
    MyGameConfig.weixinShare = function () {
        this.shareToWeixin();
    };
    MyGameConfig.weixinShareCustom = function (_desc) {
        this.shareToWeixin(_desc);
    };
    //分享到微信
    MyGameConfig.shareToWeixin = function (_desc, _backFun) {
        if (_desc === void 0) { _desc = ""; }
        if (_backFun === void 0) { _backFun = null; }
        var descriptionJson = RES.getRes("description");
        var title = descriptionJson["shareUrl"][0].txt;
        var desc = descriptionJson["shareUrl"][1].txt;
        if (_desc.length > 0) {
            desc = _desc;
        }
        var url = descriptionJson["shareUrl"][2].txt;
        var url2 = descriptionJson["shareUrl"][3].txt;
        Global.shareToWeiXin(title, desc, url, url2, 0, _backFun);
    };
    //领取奖品 -- 未使用
    MyGameConfig.lingjing = function () {
        var urlloader = new egret.URLLoader();
        var urlreq = new egret.URLRequest();
        urlreq.url = "http://www.baidu.com";
        urlloader.load(urlreq);
        var onComplete = function () {
            Global.alert("提示", "xxx！", null, 2);
        };
        urlloader.addEventListener(egret.Event.COMPLETE, onComplete, this);
    };
    //打开领取页面
    MyGameConfig.openLingjingUrl = function () {
        var descriptionJson = RES.getRes("description");
        var url = descriptionJson["string"][0].txt;
        window.open(url, "_blank");
    };
    //播放背景音乐
    MyGameConfig.playBgMusic = function (_play) {
        if (_play === void 0) { _play = true; }
        if (this.curSound == null) {
            this.curSound = RES.getRes("bgmusic");
        }
        if (_play) {
            if (this.curSound != null)
                this.curSound.play(true);
        }
        else {
            if (this.curSound != null)
                this.curSound.pause();
        }
    };
    MyGameConfig.movieClipFrame = 20; //动画播放帧率
    MyGameConfig.gameTime = 120; //游戏总时间
    MyGameConfig.stepTotal = 10000; //移动步数上限
    MyGameConfig.speedAddTime = 12; //每12秒移动速度增加
    MyGameConfig.wall_produce_time = 1600; //阻挡产生的基础间隔时间
    MyGameConfig.life = 3;
    MyGameConfig.speed_init = 4; //初始速度-卷轴移动速度
    MyGameConfig.speed_add = 0.4; //速度递增值
    MyGameConfig.speed = 4; //当前速度
    MyGameConfig.friend_number = 0; //碰撞成功的好友数量
    MyGameConfig.WALL_TYPE_STONE = 1;
    MyGameConfig.WALL_TYPE_WALL = 2;
    MyGameConfig.WALL_TYPE_FRIEND = 3;
    MyGameConfig.resultStep = 0; //步数
    return MyGameConfig;
})();
MyGameConfig.prototype.__class__ = "MyGameConfig";
//# sourceMappingURL=MyGameConfig.js.map