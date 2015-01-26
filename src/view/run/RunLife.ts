class RunLife extends BasePanel{

    private sp: egret.Sprite;
    constructor() {
        super("game");
        this.sp = new egret.Sprite;
        this.addChild(this.sp);
    }

    public update(_life: number= 3): void {
        if(_life < 0) {
            _life = 0;
        }
        TaotaoUtils.removeAllChildren(this.sp);
        //
        var t_bmp: egret.Bitmap;
        for (var i = 1; i <= 3; i++) {
            t_bmp = new egret.Bitmap;
            if (i <= _life) {
                t_bmp.texture = this.assets.getTexture("life");
            }else {
                t_bmp.texture = this.assets.getTexture("life_dead");
            }
            t_bmp.x = (i - 1) * 55;
            this.sp.addChild(t_bmp);
        }
    }
}