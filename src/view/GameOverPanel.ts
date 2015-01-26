class GameOverPanel extends BasePanel{

    public constructor(){
        super("game");
    }

    private bg: egret.Bitmap;
    private bg2: egret.Bitmap;

    private playAgainBtn:EButton;
    private lingquBtn:EButton;
    private shareBtn: EButton;

    private succBmp: egret.Bitmap;
    private failBmp: egret.Bitmap;
    private scoreBmp: egret.Bitmap;
    private labelBmp: egret.Bitmap;

    private scoreTF: egret.TextField;
    private resultTF: egret.TextField;

    private shareCover: egret.Bitmap;

    // 初始化面板
    public initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   

        this.bg2 = new egret.Bitmap;
        this.bg2.texture = this.assets.getTexture("bg_gameover");
        this.addChild(this.bg2);
        //
        this.succBmp = new egret.Bitmap;
        this.succBmp.texture = this.assets.getTexture("succ");
        this.succBmp.anchorX = 0.5;
        this.succBmp.x = this.w / 2;
        this.succBmp.y = 0;
        this.addChild(this.succBmp);
        this.succBmp.visible = false;

        this.failBmp = new egret.Bitmap;
        this.failBmp.texture = this.assets.getTexture("fail");
        this.failBmp.anchorX = 0.5;
        this.failBmp.x = this.w / 2;
        this.failBmp.y = 0;
        this.addChild(this.failBmp);
        this.failBmp.visible = false;
        //
        this.playAgainBtn = new EButton(this, "btn_playAgain");
        this.playAgainBtn.x = 20;
        this.addChild(this.playAgainBtn);
        this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playAgainHandler, this);

        this.lingquBtn = new EButton(this, "btn_lingjiang");
        this.lingquBtn.x = this.w / 2 - this.lingquBtn.width / 2;
        this.addChild(this.lingquBtn);
        this.lingquBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lingquHandler, this);

        this.shareBtn = new EButton(this, "btn_tongzhi");
        this.shareBtn.x = this.w - this.shareBtn.width - 20;
        this.addChild(this.shareBtn);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
        
        //分数
        this.scoreBmp = new egret.Bitmap;
        this.scoreBmp.texture = this.assets.getTexture("score");
        this.scoreBmp.x = this.w / 2 - this.scoreBmp.width / 2;
        this.scoreBmp.y = this.h - 355;
        this.addChild(this.scoreBmp);

        this.scoreTF = new egret.TextField;
        this.scoreTF.width = this.scoreBmp.width;
        this.scoreTF.height = 40;
        this.scoreTF.x = this.scoreBmp.x;
        this.scoreTF.y = this.scoreBmp.y + 85;
        this.addChild(this.scoreTF);
        this.scoreTF.size = 34;
        this.scoreTF.bold = true;
        this.scoreTF.textAlign = egret.HorizontalAlign.CENTER;

        //评价
        this.labelBmp = new egret.Bitmap;
        this.labelBmp.texture = this.assets.getTexture("label_rect");
        this.labelBmp.x = this.w / 2 - this.labelBmp.width / 2;
        this.labelBmp.y = this.h - 160;
        this.addChild(this.labelBmp);

        this.resultTF = new egret.TextField;
        this.resultTF.width = this.labelBmp.width - 80;
        this.resultTF.height = 70;
        this.resultTF.x = this.labelBmp.x + 40;
        this.resultTF.y = this.labelBmp.y + 17;
        this.addChild(this.resultTF);
        this.resultTF.size = 18;
        this.resultTF.textAlign = egret.HorizontalAlign.CENTER;
        this.resultTF.multiline = true;
        this.resultTF.bold = true;
        this.resultTF.lineSpacing = 12;

        //遮挡-分享提示
        this.shareCover = new egret.Bitmap;
        this.shareCover.texture = RES.getRes("share_cover");
        var t_scale: number = this.w / this.shareCover.width;
        this.shareCover.width *= t_scale;
        this.shareCover.height *= t_scale;
        this.addChild(this.shareCover);
        this.shareCover.touchEnabled = true;
        this.shareCover.visible = false;

        this.initEffect();

        //
        this.scoreTF.text = MyGameConfig.resultStep.toString();
        var t_str: string = "您完成今日行走任务，并结识了" + MyGameConfig.friend_number + "个NABU好友。带上NABU，让我们一起为健康努力！";
        this.resultTF.text = t_str;
    }

    private initEffect(): void{
        var t_bmp: egret.Bitmap;
        var t_str: string;
        if (MyGameConfig.resultStep >= MyGameConfig.stepTotal) {
            t_bmp = this.succBmp;
            t_str = "在NABU手环的监测下，今日记录了" + MyGameConfig.resultStep+"步，并结识了"+MyGameConfig.friend_number+"位好友，快来和我一起漫步城市吧！";
        } else {
            t_bmp = this.failBmp;
            t_str = "在NABU手环的监测下，今日记录了" + MyGameConfig.resultStep+"步，距离每日万步的目标越来越近了！让我们一起跑起来！";
        }
        MyGameConfig.weixinShareCustom(t_str);
        //
        t_bmp.visible = true;
        this.addChild(t_bmp);
        t_bmp.y = -100;
        this.playAgainBtn.y = this.h;
        this.lingquBtn.y = this.h;
        this.shareBtn.y = this.h;
        var onComplete:Function = function(){
            egret.Tween.get(this.playAgainBtn).to({y: this.h - 75},300,egret.Ease.backOut);
            egret.Tween.get(this.lingquBtn).to({y: this.h - 75},500,egret.Ease.backOut);
            egret.Tween.get(this.shareBtn).to({y: this.h - 75},700,egret.Ease.backOut);
        };
        egret.Tween.get(t_bmp).to({y:0},800,egret.Ease.backOut).call(onComplete,this);   
    }

    private playAgainHandler(e: egret.TouchEvent): void {
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeGameOverPanelNotify,null,false);
    }

    private lingquHandler(e: egret.TouchEvent): void {
        PopUpManager.addPopUp(new LingjiangPanel, false, 0, 0, 0);
        Global.dispatchEvent(MainNotify.closeGameOverPanelNotify, null, false);
        return;
        //
        if (MyGameConfig.resultStep < MyGameConfig.stepTotal) {
            Global.alert("提示", "您没有完成今天的行走任务，无法领取奖品！", null, 2);
        } else {
            PopUpManager.addPopUp(new LingjiangPanel, false, 0, 0, 0);
            Global.dispatchEvent(MainNotify.closeGameOverPanelNotify, null, false);
        }
    }

    private shareHandler(e): void {
        this.shareCover.visible = true;
        this.shareCover.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCover, this);
    }

    private touchCover(e): void {
        this.shareCover.visible = false;
    }

}


