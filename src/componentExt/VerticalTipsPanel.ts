  /**
    * 竖屏提示类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 竖屏玩游戏时友好提示界面
    */
class VerticalTipsPanel extends egret.Sprite {

    // private mySheet: egret.SpriteSheet;
    // private pgBg: egret.Bitmap;
    // private pgBar: egret.Bitmap;
    private textField: egret.TextField;
    private bg: egret.Sprite = new egret.Sprite();
    private w: number = 0;
    private h: number = 0;
    private needExchange:boolean = false;
    constructor(needExchange:boolean = false) {
        super();
        this.needExchange = needExchange;
        // this.mySheet = RES.getRes("load");
        this.createView();
    }

    private createView(): void {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;            

        // this.bg.graphics.beginFill(0x313131, 1);
        // this.bg.graphics.drawRect(0, 0, this.w, this.h);
        // this.bg.graphics.endFill();
        // this.bg.width = this.w;
        // this.bg.height = this.h;
        // this.addChild(this.bg);
        // this.touchEnabled = true;

        // this.pgBg = new egret.Bitmap;
        // this.pgBg.anchorX = 0.5;
        // this.pgBg.anchorY = 0.5;
        // this.pgBg.texture = this.mySheet.getTexture("pgBg");
        // this.pgBg.x = this.w / 2;
        // this.pgBg.y = this.h / 2;
        // this.addChild(this.pgBg);

        // this.pgBar = new egret.Bitmap;
        // this.pgBar.anchorX = 0.5;
        // this.pgBar.anchorY = 0.5;
        // this.pgBar.texture = this.mySheet.getTexture("pgBar");
        // this.pgBar.x = this.w / 2 - 34;
        // this.pgBar.y = this.h / 2;
        // this.addChild(this.pgBar);

        this.textField = new egret.TextField();
        this.textField.size = 36;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.textAlign = "center";
        this.textField.text = "亲，请开启手机的自动旋转屏幕功能，并将手机横向放置可以正常游戏啦！";

        if (this.needExchange) {
            this.textField.width = (this.w >this.h? this.h : this.w);
            this.textField.x = 0;
            this.textField.y = this.h / 2 - this.textField.height / 2 - 10;
        } else {
            this.textField.width = 480;
            this.textField.x = this.w / 2 - this.textField.width / 2;
            this.textField.y = this.h / 2 - this.textField.height / 2 - 10;         
        }
    }

    // public setProgress(current, total): void {
    //     var rate: number = Math.round((current / total) * 100);
    //     this.textField.text = rate + "%";
    //     this.pgBar.width = 282 * (current / total);
    // }
}