class MyGameConfig {

    public static movieClipFrame: number = 20;//动画播放帧率

    public static gameTime: number = 120;//游戏总时间
    public static stepTotal: number = 10000;//移动步数上限
    public static speedAddTime: number = 12;//每12秒移动速度增加
    public static wall_produce_time: number = 1600;//阻挡产生的基础间隔时间

    public static life: number = 3;

    public static speed_init: number = 4;//初始速度-卷轴移动速度
    public static speed_add: number = 0.4;//速度递增值
    public static speed: number = 4;//当前速度

    public static friend_number: number = 0; //碰撞成功的好友数量

    private wallType: number; //阻挡类型
    public static WALL_TYPE_STONE: number = 1;
    public static WALL_TYPE_WALL: number = 2;
    public static WALL_TYPE_FRIEND: number = 3;

    public static resultStep: number = 0;//步数

    private static curSound: egret.Sound;

    public static resetConfig(): void {
        this.speed = 5;
        this.friend_number = 0;
        this.life = 3;
    }

    public static weixinShare(): void {
        this.shareToWeixin();
    }

    public static weixinShareCustom(_desc:string): void {
        this.shareToWeixin(_desc);
    }

    //分享到微信
    private static shareToWeixin(_desc:string="", _backFun: Function= null): void {
        var descriptionJson = RES.getRes("description");
        var title: string = descriptionJson["shareUrl"][0].txt;
        var desc: string = descriptionJson["shareUrl"][1].txt;
        if (_desc.length > 0) {
            desc = _desc;
        }
        var url: string = descriptionJson["shareUrl"][2].txt;
        var url2: string = descriptionJson["shareUrl"][3].txt;
        Global.shareToWeiXin(title, desc, url, url2, 0, _backFun);
    }

    //领取奖品 -- 未使用
    public static lingjing(): void {
        var urlloader: egret.URLLoader = new egret.URLLoader();
        var urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.url = "http://www.baidu.com";
        urlloader.load(urlreq);
        var onComplete: Function = function () {
            Global.alert("提示", "xxx！", null, 2);
        }
        urlloader.addEventListener(egret.Event.COMPLETE, onComplete, this);
    }

    //打开领取页面
    public static openLingjingUrl(): void {
        var descriptionJson = RES.getRes("description");
        var url: string = descriptionJson["string"][0].txt;
        window.open(url, "_blank");
    }

    //播放背景音乐
    public static playBgMusic(_play: boolean= true): void {
        if (this.curSound == null) {
            this.curSound = RES.getRes("bgmusic");
        }
        if (_play) {
            if (this.curSound != null) this.curSound.play(true);
        } else {
        if (this.curSound != null) this.curSound.pause();
        }
    }
}