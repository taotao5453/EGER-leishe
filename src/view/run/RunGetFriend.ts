class RunGetFriend extends BasePanel{

    private bg: egret.Bitmap;
    private txt: HtmlText;
    constructor() {
        super("game");
        //
        this.bg = new egret.Bitmap;
        this.bg.texture = this.assets.getTexture("bg_addfriend");
        this.addChild(this.bg);

        this.txt = new HtmlText([]);
        this.txt.width = 200;
        this.txt.height = 25;
        this.txt.x = this.bg.width - this.txt.width;
        this.txt.y = 32;
        this.addChild(this.txt);
    }

    public setTxt(_str:string="XXX"): void {
        this.txt.setData([["添加了一个NABU好友", 0xffffff, 16, true, 0], [_str, 0xffffff, 18, true, 0]]);
    }
} 