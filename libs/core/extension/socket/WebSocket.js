var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var egret;
(function (egret) {
    var WebSocket = (function (_super) {
        __extends(WebSocket, _super);
        function WebSocket(host, port) {
            if (host === void 0) { host = ""; }
            if (port === void 0) { port = 0; }
            _super.call(this);
            this._writeMessage = "";
            this._readMessage = "";
            this._connected = false;
            this._isReadySend = false;
            this._connected = false;
            this._writeMessage = "";
            this._readMessage = "";
            if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
                this.socket = new egret.HTML5WebSocket();
            }
            else {
                this.socket = new egret.NativeSocket();
            }
            this.socket.addCallBacks(this.onConnect, this.onClose, this.onSocketData, this.onError, this);
        }
        /**
         * 将套接字连接到指定的主机和端口
         * @param host 要连接到的主机的名称或 IP 地址
         * @param port 要连接到的端口号
         * @method egret.WebSocket#connect
         */
        WebSocket.prototype.connect = function (host, port) {
            this.socket.connect(host, port);
        };
        /**
         * 关闭套接字
         * @method egret.WebSocket#close
         */
        WebSocket.prototype.close = function () {
            this.socket.close();
        };
        WebSocket.prototype.onConnect = function () {
            this._connected = true;
            this.dispatchEventWith(egret.Event.CONNECT);
        };
        WebSocket.prototype.onClose = function () {
            this._connected = false;
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        WebSocket.prototype.onError = function () {
            this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
        };
        WebSocket.prototype.onSocketData = function (message) {
            this._readMessage += message;
            egret.ProgressEvent.dispatchProgressEvent(this, egret.ProgressEvent.SOCKET_DATA);
        };
        /**
         * 对套接字输出缓冲区中积累的所有数据进行刷新
         * @method egret.WebSocket#flush
         */
        WebSocket.prototype.flush = function () {
            if (!this._connected) {
                egret.Logger.warning("请先连接Socket");
                return;
            }
            this.socket.send(this._writeMessage);
            this._writeMessage = "";
            this._isReadySend = false;
        };
        /**
         * 将字符串数据写入套接字
         * @param message 要写入套接字的字符串
         * @method egret.WebSocket#writeUTF
         */
        WebSocket.prototype.writeUTF = function (message) {
            if (!this._connected) {
                egret.Logger.warning("请先连接Socket");
                return;
            }
            this._writeMessage += message;
            this.flush();
            return;
            if (this._isReadySend) {
                return;
            }
            this._isReadySend = true;
            egret.callLater(this.flush, this);
        };
        /**
         * 从套接字读取一个 UTF-8 字符串
         * @returns {string}
         * @method egret.WebSocket#readUTF
         */
        WebSocket.prototype.readUTF = function () {
            var message = this._readMessage;
            this._readMessage = "";
            return message;
        };
        Object.defineProperty(WebSocket.prototype, "connected", {
            /**
             * [只读] 表示此 Socket 对象目前是否已连接
             */
            get: function () {
                return this._connected;
            },
            enumerable: true,
            configurable: true
        });
        return WebSocket;
    })(egret.EventDispatcher);
    egret.WebSocket = WebSocket;
    WebSocket.prototype.__class__ = "egret.WebSocket";
})(egret || (egret = {}));
