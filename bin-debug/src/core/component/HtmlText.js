/**
  * 单行多颜色文本类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 多种颜色文本，超链接，回调
  * todo:超链接、下划线、回调等
  */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlText = (function (_super) {
    __extends(HtmlText, _super);
    /**
    * contentArr       多文本数组 [描述，颜色，字体大小，是否加粗，描边宽度，描边颜色，是否有下划线[颜色和字体颜色一致][todo]，回调方法[todo]]
    * fontSize         文本字体大小
    * isBold           是否加粗
    * stroke           描边宽度
    * strokeColor      描边颜色
    * 如：[["black",0x000000,30,false,1,0x000000],["green",0x55ff00,30,false,1,0x000000]]
    * 注意：定位y的时候按照最高的文字定位
    */
    function HtmlText(contentArr, fontSize, isBold, stroke, strokeColor) {
        if (fontSize === void 0) { fontSize = 30; }
        if (isBold === void 0) { isBold = false; }
        if (stroke === void 0) { stroke = 0; }
        if (strokeColor === void 0) { strokeColor = 0x000000; }
        _super.call(this);
        this.tfArr = [];
        this.setData(contentArr, fontSize, isBold, stroke, strokeColor);
    }
    HtmlText.prototype.setData = function (contentArr, fontSize, isBold, stroke, strokeColor) {
        if (fontSize === void 0) { fontSize = 30; }
        if (isBold === void 0) { isBold = false; }
        if (stroke === void 0) { stroke = 0; }
        if (strokeColor === void 0) { strokeColor = 0x000000; }
        var len1 = this.tfArr.length;
        for (var i = 0; i < len1; i++) {
            this.removeChild(this.tfArr[i]);
        }
        this.tfArr = [];
        var lastX = 0;
        var baseH = 0; //最终高度基准
        //解析html标签
        var len2 = contentArr.length;
        for (var i = 0; i < len2; i++) {
            var contentRender = contentArr[i];
            //处理文本数组
            if (contentRender[0] == null) {
                contentRender[0] = "";
            }
            if (contentRender[1] == null) {
                contentRender[1] = 0xFFFFFF;
            }
            if (contentRender[2] == null) {
                contentRender[2] = fontSize;
            }
            if (contentRender[3] == null) {
                contentRender[3] = false;
            }
            if (contentRender[4] == null) {
                contentRender[4] = 1;
            }
            if (contentRender[5] == null) {
                contentRender[5] = 0x000000;
            }
            var tf = new egret.TextField();
            this.addChild(tf);
            tf.text = contentRender[0];
            tf.textColor = contentRender[1];
            tf.size = contentRender[2];
            tf.bold = contentRender[3];
            tf.stroke = contentRender[4];
            tf.strokeColor = contentRender[5];
            tf.x = lastX;
            lastX += tf.width;
            this.tfArr[i] = tf;
            //y值定位
            if (baseH < tf.height) {
                baseH = tf.height;
            }
        }
        for (var i = 0; i < len2; i++) {
            var tempTf = this.tfArr[i];
            tempTf.y = baseH - tempTf.height;
        }
    };
    return HtmlText;
})(egret.DisplayObjectContainer);
HtmlText.prototype.__class__ = "HtmlText";
//# sourceMappingURL=HtmlText.js.map