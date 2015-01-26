var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunGetFriend = (function (_super) {
    __extends(RunGetFriend, _super);
    function RunGetFriend() {
        _super.call(this, "game");
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
    RunGetFriend.prototype.setTxt = function (_str) {
        if (_str === void 0) { _str = "XXX"; }
        this.txt.setData([["添加了一个NABU好友", 0xffffff, 16, true, 0], [_str, 0xffffff, 18, true, 0]]);
    };
    return RunGetFriend;
})(BasePanel);
RunGetFriend.prototype.__class__ = "RunGetFriend";
//# sourceMappingURL=RunGetFriend.js.map