/**
 * Created by xiangtao on 2014.11.29.
 */
class WaitPanel extends egret.Sprite {

    private mySheet: egret.SpriteSheet;
    private waitImg: egret.Bitmap;
    private bg: egret.Sprite = new egret.Sprite();
    private cartoonType:string = "loadingCircle1";
    private w: number = 0;
    private h: number = 0;
    //type 1:白色等待 2：蓝色等待
    constructor(type:number = 1) {
        super();
        switch (type)
        {
            case 1: {
                this.cartoonType = "loadingCircle1";
                break;
            }
            case 2: {
                this.cartoonType = "loadingCircle2";
                break;
            }
            default: {
                // TODO: Implemente default case
            }
        }
        this.mySheet = RES.getRes("assets");
        this.createView();
    }

    private createView(): void {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.bg.graphics.beginFill(0x000000, 0.2);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;

        this.waitImg = new egret.Bitmap;
        this.waitImg.anchorX = 0.5;
        this.waitImg.anchorY = 0.5;
        this.waitImg.texture = this.mySheet.getTexture(this.cartoonType);
        this.waitImg.x = this.w / 2;
        this.waitImg.y = this.h / 2;
        this.addChild(this.waitImg);

        EffectUtils.rotationEffect(this.waitImg,1000);
    }

}