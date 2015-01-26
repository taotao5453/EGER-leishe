
class StartPanel extends BasePanel{

    public constructor(){
        super("game");
    }

    private bg: egret.Bitmap;
    private shuoming: egret.Bitmap;
    private adImg: egret.Bitmap;
    private startBtn: EButton;

    // private inputTF:egret.TextField;
    // 初始化面板
    public initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg_start");
        this.addChild(this.bg);   

        this.adImg = new egret.Bitmap;
        this.adImg.texture = this.assets.getTexture("ad");
        this.adImg.anchorX = 0.5;
        this.adImg.x = this.w / 2;
        this.adImg.y = 10;
        this.addChild(this.adImg);

        this.shuoming = new egret.Bitmap;
        this.shuoming.texture = this.assets.getTexture("shuoming");
        this.shuoming.anchorX = 0.5;
        this.shuoming.x = this.w / 2;
        this.shuoming.y = this.adImg.y + this.adImg.height;
        this.addChild(this.shuoming);

        this.startBtn = new EButton(this,"btn_start");
        this.startBtn.x = this.w/2 - this.startBtn.width/2;
        this.startBtn.y = this.h - this.startBtn.height;        
        this.addChild(this.startBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouchTap, this); 

        this.initEffect();
    }

    private initEffect(): void{
        this.adImg.y = -100;
        this.startBtn.alpha = 0;
        var onComplete:Function = function(){
            egret.Tween.get(this.startBtn).to({ alpha: 1 }, 300);
        };
        egret.Tween.get(this.adImg).to({y:10},300,egret.Ease.backOut).call(onComplete,this);   
    }

    public onStartBtnTouchTap(e: egret.TouchEvent): void{
        Global.dispatchEvent(MainNotify.openGamePanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }


}

