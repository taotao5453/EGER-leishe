/**
 * Created by xiangtao on 2014.11.30.
 */
var TaotaoUtils;
(function (TaotaoUtils) {
    function removeAllChildren(_displayObj) {
        var t_len = _displayObj.numChildren;
        for (var i = 0; i < t_len; i++) {
            _displayObj.removeChildAt(0);
        }
    }
    TaotaoUtils.removeAllChildren = removeAllChildren;
    /*����һ�� ����*/
    function createRectangular(_x, _y, _w, _h, _alpha, _color) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_w === void 0) { _w = 480; }
        if (_h === void 0) { _h = 640; }
        if (_alpha === void 0) { _alpha = 1; }
        if (_color === void 0) { _color = 0x000000; }
        var sprite1 = new egret.Sprite(); //��Flashһ����alphaĬ��ֵΪ1
        sprite1.graphics.beginFill(_color, _alpha);
        sprite1.graphics.drawRect(_x, _y, _w, _h);
        sprite1.graphics.endFill();
        sprite1.width = _w;
        sprite1.height = _h;
        return sprite1;
    }
    TaotaoUtils.createRectangular = createRectangular;
    /*
   ����һ���ı�������ɫ�����뷽ʽ��left,center,right)���ݣ����ִ�С���ı����ȣ������ж����������л��У�
   ������ɫ��0������)���߳ߴ�(0������)x y ��ת�Ƕ� б��
   */
    function createTextLabel(label1, _color, _algin, _text, _size, _width, _strokeColor, _stroke, _x, _y, _rotaion, _skewX) {
        if (_color === void 0) { _color = 0x000000; }
        if (_algin === void 0) { _algin = "left"; }
        if (_text === void 0) { _text = "none"; }
        if (_size === void 0) { _size = 14; }
        if (_width === void 0) { _width = 0; }
        if (_strokeColor === void 0) { _strokeColor = 0; }
        if (_stroke === void 0) { _stroke = 0; }
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_rotaion === void 0) { _rotaion = 0; }
        if (_skewX === void 0) { _skewX = 0; }
        label1 = new egret.TextField(); //����TextFieldʵ��
        label1.textColor = _color;
        label1.textAlign = _algin;
        label1.text = _text;
        label1.size = _size;
        if (_width != 0) {
            label1.width = _width;
        }
        ;
        if (_strokeColor != 0 && _stroke != 0) {
            label1.strokeColor = _strokeColor;
            label1.stroke = _stroke;
        }
        ;
        label1.rotation = _rotaion;
        if (_skewX != 0) {
            label1.skewX = _skewX;
        }
        ;
        label1.x = _x;
        label1.y = _y;
        return label1;
    }
    TaotaoUtils.createTextLabel = createTextLabel;
    function openFPS() {
        egret.Profiler.getInstance().run();
    }
    TaotaoUtils.openFPS = openFPS;
    function isMobile() {
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            return true;
        }
        return false;
    }
    TaotaoUtils.isMobile = isMobile;
})(TaotaoUtils || (TaotaoUtils = {}));
//# sourceMappingURL=TaotaoUtils.js.map