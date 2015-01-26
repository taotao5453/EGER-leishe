var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LingjiangPanel = (function (_super) {
    __extends(LingjiangPanel, _super);
    function LingjiangPanel() {
        _super.call(this, "game");
    }
    LingjiangPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg_award");
        this.addChild(this.bg);
        //输入框
        this.input_name = new egret.TextField;
        this.input_name.type = egret.TextFieldType.INPUT;
        this.input_name.width = 330;
        this.input_name.height = 36;
        this.input_name.size = 30;
        this.input_name.x = 288;
        this.input_name.y = 168;
        this.addChild(this.input_name);
        this.input_name.textColor = 0xffffff;
        this.input_phone = new egret.TextField;
        this.input_phone.type = egret.TextFieldType.INPUT;
        this.input_phone.width = this.input_name.width;
        this.input_phone.height = this.input_name.height;
        this.input_phone.size = 30;
        this.input_phone.x = this.input_name.x;
        this.input_phone.y = 256;
        this.addChild(this.input_phone);
        this.input_phone.textColor = 0xffffff;
        //
        this.btn_ok = new EButton(this, "btn_yes");
        this.btn_ok.x = this.w / 2 - this.btn_ok.width - 10;
        this.btn_ok.y = this.h - 80;
        this.addChild(this.btn_ok);
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okClicked, this);
        this.btn_no = new EButton(this, "btn_cancel");
        this.btn_no.x = this.w / 2 + 10;
        this.btn_no.y = this.btn_ok.y;
        this.addChild(this.btn_no);
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noClicked, this);
    };
    LingjiangPanel.prototype.okClicked = function (e) {
        var name_isok = true;
        var phone_isok = true;
        //
        if (this.input_name.text.length <= 1) {
            Global.alert("提示", "姓名必须大于1个字");
            name_isok = false;
        }
        if (this.input_phone.text.length == 0) {
            Global.alert("提示", "手机号不能为空");
            phone_isok = false;
        }
        else {
            var regEx = new RegExp("1[0-9]{10}");
            if (regEx.test(this.input_phone.text) == false) {
                Global.alert("提示", "手机号格式不正确");
                phone_isok = false;
            }
        }
        //
        if (phone_isok && name_isok) {
            this.sendUserInfo(this.input_name.text, this.input_phone.text);
            MyGameConfig.openLingjingUrl();
        }
    };
    LingjiangPanel.prototype.noClicked = function (e) {
        this.onExit();
    };
    LingjiangPanel.prototype.onExit = function () {
        Global.dispatchEvent(MainNotify.openGameOverPanelNotify, null, false);
        PopUpManager.removePopUp(this);
    };
    LingjiangPanel.prototype.sendUserInfo = function (_name, _phone) {
        var info = new Object();
        info = {
            "name": _name,
            "phone": _phone
        };
        ConnectUtils.setGamedata("userInfo", info, function (res) {
            console.log("setGamedata=" + res.toString());
            if (res == 1 || res == true) {
                Global.alert("提示", "提交成功", this.onExit);
            }
            else {
                Global.confirm("提示", "提交失败，或者您已提交过，点击确定返回上一界面", null, this.onExit);
            }
        });
    };
    return LingjiangPanel;
})(BasePanel);
LingjiangPanel.prototype.__class__ = "LingjiangPanel";
//# sourceMappingURL=LingjiangPanel.js.map