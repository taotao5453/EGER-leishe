/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var ObjectPool = (function () {
    function ObjectPool() {
        this._pool = {};
        this._list = [];
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    ObjectPool.prototype.onEnterFrame = function (advancedTime) {
        var list = this._list.concat();
        for (var i = 0, length = list.length; i < length; i++) {
            var obj = list[i];
            obj.onEnterFrame(advancedTime);
        }
    };
    ObjectPool.prototype.createObject = function (classFactory) {
        var result;
        var key = classFactory.key;
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result = arr.shift();
        }
        else {
            result = new classFactory();
            result.key = key;
        }
        result.onCreate();
        this._list.push(result);
        return result;
    };
    ObjectPool.prototype.destroyObject = function (obj) {
        var key = obj.key;
        if (this._pool[key] == null) {
            this._pool[key] = [];
        }
        this._pool[key].push(obj);
        obj.onDestroy();
        var index = this._list.indexOf(obj);
        if (index != -1) {
            this._list.splice(index, 1);
        }
    };
    ObjectPool.getInstance = function () {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    };
    return ObjectPool;
})();
//# sourceMappingURL=ObjectPool.js.map