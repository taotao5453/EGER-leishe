var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GameApp.prototype.onAddToStage = function (event) {
        //����ģʽ����
        TaotaoManager4EGER.getInstance().setGameSceneToHorizantal(true); //��Ϊ������Ϸ
        //
        egret.Injector.mapClass(RES.AnalyzerBase, RES.PropertiesAnalyzer, RES.PropertiesAnalyzer.TYPE);
        this.stage.addChild(GameConfig.gameScene());
        //��ʼ��Resource��Դ���ؿ�
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * �����ļ���������,��ʼԤ����preload��Դ�顣
     */
    GameApp.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    };
    /**
     * preload��Դ����������
     */
    GameApp.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            PopUpManager.removePopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
        else if (event.groupName == "loading") {
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.loadGroup("preload");
        }
        //΢�ŷ���
        MyGameConfig.weixinShare();
    };
    /**
     * preload��Դ�����ؽ���
     */
    GameApp.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingPanel.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * ������Ϸ����
     */
    GameApp.prototype.createGameScene = function () {
        //����������
        var t_rect = new egret.Rectangle(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        egret.RenderFilter.getInstance().addDrawArea(t_rect);
        //������Ϸ����
        //
        PanelManager.initPanel();
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        //
        MyGameConfig.playBgMusic(); //���ű�������
    };
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";
//# sourceMappingURL=GameApp.js.map