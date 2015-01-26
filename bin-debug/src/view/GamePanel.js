var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        _super.call(this, "game");
        this.time = 0;
        this.nextWallTime = 2000;
    }
    // 初始化面板
    GamePanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        //移动的背景
        this.backScene = new RunBackGroundScene;
        this.addChild(this.backScene);
        //路
        this.road = new egret.Bitmap;
        this.road.texture = this.assets.getTexture("road");
        this.road.y = this.h - this.road.height;
        this.addChild(this.road);
        //步数显示
        this.step_bg = new egret.Bitmap;
        this.step_bg.texture = this.assets.getTexture("score");
        this.addChild(this.step_bg);
        this.step_txt = new egret.TextField;
        this.step_txt.width = 196;
        this.step_txt.height = 40;
        this.step_txt.x = 0;
        this.step_txt.y = 83;
        this.addChild(this.step_txt);
        this.step_txt.size = 34;
        this.step_txt.bold = true;
        this.step_txt.textAlign = egret.HorizontalAlign.CENTER;
        //血量显示
        this.life_sp = new RunLife;
        this.life_sp.x = 318;
        this.life_sp.y = 20;
        this.addChild(this.life_sp);
        //显示添加了一个好友
        this.getFriend_sp = new RunGetFriend;
        this.getFriend_sp.x = this.w - this.getFriend_sp.width;
        this.getFriend_sp.y = 45;
        this.addChild(this.getFriend_sp);
        this.getFriend_sp.visible = false;
        //按钮--
        this.hitBtn = new EButton(this, "btn_hit"); //拍手
        this.hitBtn.x = 20;
        this.hitBtn.y = this.h - this.hitBtn.height;
        this.addChild(this.hitBtn);
        this.hitBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hitFunction, this);
        this.jumpBtn = new EButton(this, "btn_run"); //跳
        this.jumpBtn.x = this.w - this.jumpBtn.width - 10;
        this.jumpBtn.y = this.hitBtn.y;
        this.addChild(this.jumpBtn);
        this.jumpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jumpFunction, this);
        this.lowBtn = new EButton(this, "btn_low"); //滑行
        this.lowBtn.x = this.jumpBtn.x - this.lowBtn.width - 5;
        this.lowBtn.y = this.hitBtn.y;
        this.addChild(this.lowBtn);
        this.lowBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.lowFunction, this);
        //墙容器
        this.wallContainer = new egret.Sprite;
        this.addChild(this.wallContainer);
        //人
        this.man = new RunMan;
        this.man.x = 150;
        this.man.y = egret.MainContext.instance.stage.stageHeight - 120; //363;
        this.addChild(this.man);
        //
        var data = RES.getRes("man_json"); //获取动画文件的信息配置文件
        var texture = RES.getRes("man_png"); //获取动画文件的图片
        this.addFriend_mc = new egret.MovieClip(data, texture); //创建MovieClip
        this.addFriend_mc.gotoAndPlay("hit_mc");
        this.addFriend_mc.frameRate = 16;
        this.addFriend_mc.x = this.man.x + 60;
        this.addFriend_mc.y = this.man.y - 60;
        this.addChild(this.addFriend_mc);
        this.addFriend_mc.visible = false;
        this.add1_bmp = new egret.Bitmap;
        this.add1_bmp.texture = this.assets.getTexture("hit_add1");
        this.add1_bmp.visible = false;
        this.addChild(this.add1_bmp);
        //
        this.initEffect();
        //开始
        this.wallArr = new Array();
        MyGameConfig.resetConfig();
        this.startGame();
        //test
        this.step_txt.text = "00000";
        this.life_sp.update(MyGameConfig.life);
        this.getFriend_sp.setTxt("");
    };
    GamePanel.prototype.initEffect = function () {
    };
    //重新开始
    GamePanel.prototype.changeGameStateToPlay = function (e) {
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    };
    //暂停
    GamePanel.prototype.changeGameStateToStop = function (e) {
        egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
    };
    GamePanel.prototype.lowFunction = function () {
        this.man.low();
    };
    GamePanel.prototype.hitFunction = function () {
        this.man.hit();
    };
    GamePanel.prototype.jumpFunction = function () {
        this.man.jump();
    };
    GamePanel.prototype.startGame = function () {
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    };
    GamePanel.prototype.onEnterFrame = function (_advancedTime) {
        this.time += _advancedTime;
        var t_step = Math.floor(MyGameConfig.stepTotal * this.time / 1000 / MyGameConfig.gameTime);
        if (this.time > MyGameConfig.gameTime * 1000) {
            t_step = MyGameConfig.stepTotal;
            this.step_txt.text = t_step.toString();
            this.endGame(true);
        }
        this.step_txt.text = t_step.toString();
        //每12秒速度提升
        var t_per = Math.floor(this.time / 1000 / 12);
        MyGameConfig.speed = MyGameConfig.speed_init * (1 + MyGameConfig.speed_add * t_per);
        this.backScene.resetSpeed();
        //滚动近景/中景/远景
        this.backScene.onEnterFrame(_advancedTime);
        //生成阻挡/好友
        if (this.time > this.nextWallTime) {
            this.nextWallTime = this.time + MyGameConfig.wall_produce_time + 500 * (Math.random() * 2 - 1);
            var t_random = Math.random();
            var t_type = 1;
            if (t_random < 0.4) {
                t_type = 1;
            }
            else if (t_random > 0.6) {
                t_type = 2;
            }
            else {
                t_type = 3;
            }
            //t_type = 2;//test
            var t_wall = new RunWall;
            t_wall.initWall(t_type);
            t_wall.x = this.w;
            this.wallContainer.addChild(t_wall);
            //console.log("添加wall type="+t_type);
            this.wallArr.push(t_wall);
        }
        for (var k = 0; k < this.wallArr.length; k++) {
            var t_temp = this.wallArr[k];
            if (t_temp != null) {
                t_temp.onEnterFrame(_advancedTime);
            }
            ;
        }
        this.checkHit();
    };
    //判断墙体碰撞
    GamePanel.prototype.checkHit = function () {
        if (this.man.isWudi) {
            return;
        }
        var t_index = 0;
        var t_wall;
        for (var i = 0; i < this.wallArr.length; i++) {
            t_wall = this.wallArr[i];
            if (t_wall == null) {
                this.wallArr.splice(i, 1);
            }
            else {
                var t_boo = this.isOverlap(t_wall);
                if (t_wall.type == MyGameConfig.WALL_TYPE_STONE) {
                    if (t_boo == true && this.man.isJumping == false) {
                        this.manHitWall();
                    }
                }
                else if (t_wall.type == MyGameConfig.WALL_TYPE_WALL) {
                    if (t_boo == true && this.man.isLowing == false) {
                        this.manHitWall();
                    }
                }
                else {
                    if (t_boo == true && this.man.isHitting == true) {
                        this.addFriend(t_wall);
                    }
                }
                t_index++;
            }
        }
    };
    GamePanel.prototype.isOverlap = function (_wall) {
        var t_offsetL = 3; //值越大难度越小
        var t_offsetR = 5;
        if (this.man.x > _wall.x + t_offsetL && this.man.x < _wall.x + _wall.width - t_offsetR) {
            return true;
        }
        if (this.man.x + this.man.width > _wall.x + t_offsetL && this.man.x + this.man.width < _wall.x + _wall.width - t_offsetR) {
            return true;
        }
        return false;
    };
    /**
        * 撞到啦，见血
    */
    GamePanel.prototype.manHitWall = function () {
        //console.log("撞到啦~~" + Math.random());
        this.man.wudi();
        MyGameConfig.life--;
        this.life_sp.update(MyGameConfig.life);
        if (MyGameConfig.life == 0) {
            this.man.die();
            var onComplete = function () {
                this.endGame();
            };
            egret.Tween.get(this).wait(1000).call(onComplete, this);
        }
    };
    GamePanel.prototype.addFriend = function (_t_wall) {
        if (this.lastFriend == _t_wall) {
            return;
        }
        this.lastFriend = _t_wall;
        MyGameConfig.friend_number++;
        this.addFriend_mc.visible = true;
        this.addFriend_mc.alpha = 1;
        this.addFriend_mc.scaleX = this.addFriend_mc.scaleY = 0.2;
        this.add1_bmp.x = this.man.x;
        this.add1_bmp.y = this.man.y - 130;
        this.add1_bmp.visible = true;
        this.getFriend_sp.x = this.w;
        this.getFriend_sp.visible = true;
        this.getFriend_sp.alpha = 1;
        //
        var onComplete = function () {
            egret.Tween.get(this.addFriend_mc).to({ alpha: 0 }, 200);
        };
        egret.Tween.get(this.addFriend_mc).to({ scaleX: 1, scaleY: 1 }, 300).call(onComplete, this);
        //
        var onComplete2 = function () {
            this.add1_bmp.visible = false;
        };
        egret.Tween.get(this.add1_bmp).to({ y: this.add1_bmp.y - 50 }, 500).call(onComplete2, this);
        //
        var onComplete3 = function () {
            egret.Tween.get(this.getFriend_sp).to({ alpha: 0 }, 1000);
        };
        egret.Tween.get(this.getFriend_sp).to({ x: this.w - this.getFriend_sp.width }, 700, egret.Ease.backIn).call(onComplete3, this);
    };
    GamePanel.prototype.endGame = function (_isWin) {
        if (_isWin === void 0) { _isWin = false; }
        egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
        MyGameConfig.resultStep = parseInt(this.step_txt.text);
        Global.dispatchEvent(MainNotify.openGameOverPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
    };
    return GamePanel;
})(BasePanel);
GamePanel.prototype.__class__ = "GamePanel";
//# sourceMappingURL=GamePanel.js.map