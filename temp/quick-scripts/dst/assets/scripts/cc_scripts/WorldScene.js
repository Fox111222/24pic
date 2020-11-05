
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cc_scripts/WorldScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '123dc5s/w9KdqInlEE7CDXP', 'WorldScene');
// scripts/cc_scripts/WorldScene.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var KBEngine = require("kbengine"); //var bindjs=require("eval")


var bindjs = require("eval2");

cc.Class({
  "extends": cc.Component,
  properties: {
    seat1: {
      "default": null,
      type: cc.Node
    },
    seat2: {
      "default": null,
      type: cc.Node
    }
    /*
    setting:{
        default: null,
        type: cc.Prefab,
    },
    chat:{
        default: null,
        type: cc.Prefab,
    },
    */

    /*
    player: {
        default: null,
        type: cc.Node,
    },
    
    pipiPrefab: {
        default: null,
        type: cc.Prefab,
    },
      popPrefab: {
        default: null,
        type: cc.Prefab,
    },
    archerPrefab: {
        default: null,
        type: cc.Prefab,
    },
      archerPrefab2: {
        default: null,
        type: cc.Prefab,
    },
      joyStickPrefab: {
        default: null,
        type: cc.Prefab,
    },
    touchRange: {
        default: null,
        type: cc.Prefab,
    },
    camera: {
        default: null,
        type: cc.Camera,
    },
      cameraControl: {
        default: null,
        type: cc.Node,
    },
      gameState: {
        default: null,
        type: cc.Node,
    },
      gameHint: cc.Label,
    */

  },
  showwangfa: function showwangfa() {
    this.introduce.active = true;
  },
  hidewangfa: function hidewangfa() {
    this.introduce.active = false;
  },
  showsetting: function showsetting() {
    // window.AudioMgr.playSFX("ui_click")
    this.isshowsetting = !this.settingNode.active;
    this.settingNode.active = this.isshowsetting;
  },
  showchat: function showchat() {
    //window.AudioMgr.playSFX("ui_click")
    this.isshowchat = !this.chatNode.active;
    this.chatNode.active = this.isshowchat;
    cc.log("showchat");
  },
  onLoad: function onLoad() {
    this.roomKeyc = "";
    this.installEvents();
    this.RoomID = cc.find("Canvas/bg2/RoomID").getComponent(cc.Label);
    this.yaoqing = cc.find("Canvas/bg2/yaoqing");
    this.yaoqing.active = false;
    this.introduce = this.node.getChildByName("introduce");
    this.introduce.active = false;

    if (window.type == 1) {
      this.matching = this.node.getChildByName("bg2").getChildByName("matching");
    } else {
      this.matching = this.node.getChildByName("bg2").getChildByName("matching2");
    } //this.node.getChildByName("bg2").getChildByName("matching").active=true


    this.matching.active = true;
    this.matching.stopAllActions();
    var action1 = cc.fadeIn(0.5); //渐显

    var action2 = cc.fadeOut(0.5); //渐隐效果

    var repeat = cc.repeatForever(cc.sequence(action2, action1));
    this.matching.runAction(repeat);
    /*
    this._MusicDict = {}
    var _this = this;
    cc.loader.loadResDir('sound/', function (count, totalCount, res) {
                        }, function (err, res) {
                            if (err == null) {
                                _this._MusicDict = {};
                                res.forEach(clip => {
                                _this._MusicDict[clip.name] = clip;
                                });
                            } else {
                                console.error(err);
                            }
                        })
    */
    //window.AudioMgr.playBGM("bgMain")

    this._timeLabel = cc.find("Canvas/bg2/time").getComponent(cc.Label);
    this.isshowsetting = false; //this.settingNode=cc.instantiate(this.setting)
    //this.node.addChild(this.settingNode)
    //this.settingNode=this.node.getChildByName("bg2").getChildByName("settings")

    this.settingNode = cc.find("Canvas/settings");
    this.settingNode.active = this.isshowsetting;
    this.isshowchat = false; //this.chatNode=cc.instantiate(this.chat)
    //this.node.addChild(this.chatNode)

    this.chatNode = cc.find("Canvas/chat");
    this.chatNode.active = this.isshowchat;

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.enableWxShare();
    }

    this.card1 = this.node.getChildByName("card1");
    this.card2 = this.node.getChildByName("card2");
    this.card3 = this.node.getChildByName("card3");
    this.card4 = this.node.getChildByName("card4");
    this.card1.active = false;
    this.card2.active = false;
    this.card3.active = false;
    this.card4.active = false;
    this.opt = this.node.getChildByName("bg2").getChildByName("opt");
    this.opt.active = false;
    this.label = this.node.getChildByName("bg2").getChildByName("expstr").getComponent(cc.Label);
    this.act = [];
    this.card1num = 0;
    this.card2num = 0;
    this.card3num = 0;
    this.card4num = 0;
    this.lasttouchcard = null;
    this.card1.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard1, this);
    this.card2.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard2, this);
    this.card3.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard3, this);
    this.card4.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard4, this);
    this.card1selected = false;
    this.card2selected = false;
    this.card3selected = false;
    this.card4selected = false;
    this.gameState = this.node.getComponent("GameState");
    this.clock = this.node.getChildByName("bg2").getChildByName("clock");
    this.clock.active = false;
    var sp = null;

    for (var i = 1061; i < 1115; i++) {
      sp = this.node.getChildByName("card_" + i + "@2x");
      sp.active = false;
    }

    this.card1origpos = this.card1.position;
    this.card2origpos = this.card2.position;
    this.card3origpos = this.card3.position;
    this.card4origpos = this.card4.position;
    window.delta = this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").getComponent(cc.Sprite).spriteFrame.getOriginalSize().height * 0.8; //

    var out = cc.v2(0, 0); //var seat1cardpos=cc.v2(0, 0)

    var seat1cardpos = this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").position;
    this.node.getChildByName("bg2").getChildByName("seat1").convertToWorldSpaceAR(seat1cardpos, out);
    this.seat1cardpos = this.node.convertToNodeSpaceAR(out);
    this.seat1cardpos.y = this.seat1cardpos.y - this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").getComponent(cc.Sprite).spriteFrame.getOriginalSize().height * 0.8; //this.node.getChildByName("bg2").getChildByName("seat1").y=this.node.getChildByName("bg2").getChildByName("seat1").y+window.delta
    //var seat2cardpos=cc.v2(0, 0)

    out = cc.v2(0, 0);
    var seat2cardpos = this.node.getChildByName("bg2").getChildByName("seat2").getChildByName("card").position;
    this.node.getChildByName("bg2").getChildByName("seat2").convertToWorldSpaceAR(seat2cardpos, out);
    this.seat2cardpos = this.node.convertToNodeSpaceAR(out); //cc.log("ddddddddddddddddddddthis.seat2cardpos=",this.seat2cardpos.x,this.seat2cardpos.y)
    //cc.log("ddddddddddddddddddddthis.seat1cardpos=",this.seat1cardpos.x,this.seat1cardpos.y)
    //cc.log("ddddddddddddddddddddthis..card1origpos=",this.card1origpos.x,this.card1origpos.y)
    //cc.log("ddddddddddddddddddddthis..card2origpos=",this.card2origpos.x,this.card2origpos.y)
    //cc.log("ddddddddddddddddddddthis..card2origpos=",this.card3origpos.x,this.card3origpos.y)
    //cc.log("ddddddddddddddddddddthis..card2origpos=",this.card4origpos.x,this.card4origpos.y)

    this.gameHint = this.node.getChildByName("gameHint").getComponent(cc.Label);
    this.gameHint.node.opacity = 0;
    this.gameHint.node.active = false;
    this.seat1 = this.node.getChildByName("bg2").getChildByName("seat1");
    this.seat1.active = false;
    this.seat2 = this.node.getChildByName("bg2").getChildByName("seat2");
    this.seat2.active = false;

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.enableWxShare();
      if (window.type == 2) this.yaoqing.active = true;
    } // this.seat2cardpos=this.node.getChildByName("bg2").getChildByName("seat2").getChildByName("card").getPosition()

    /*
    this.keyBoardListener = null;
    this.mouseListener = null;
    this.entities = {};
    this.playerControl = null;
    this.curAvatarID = 0;
    this.cameraControl = this.camera.getComponent("CameraControl");
      this.enablePhysicManager();
    //this.enablePhysicsDebugDraw();
    this.installEvents();
    this.items = new Array();
    //this.node.getChildByName("sky_bg").on(cc.Node.EventType.TOUCH_START, this.pickUped, this);
      */

  },
  onTouchEndedcard1: function onTouchEndedcard1() {
    //window.AudioMgr.playSFX("ui_click")
    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card1selected == false) {
      this.lasttouchcard = this.card1;
      this.card1selected = true;
      this.card1.setScale(1);
      this.act.push(this.card1num);
    }
    /*
    else{
       this.card1selected=false
       this.card1.setScale(0.8)
       var index = this.act.indexOf(this.card1num)
       if (index > -1) {
           this.act.splice(index, 1);
       }
    }*/

  },
  onTouchEndedcard2: function onTouchEndedcard2() {
    //window.AudioMgr.playSFX("ui_click")
    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card2selected == false) {
      this.card2selected = true;
      this.card2.setScale(1);
      this.act.push(this.card2num);
      this.lasttouchcard = this.card2;
    }
    /*else{
        this.card2selected=false
        this.card2.setScale(0.8)
        var index = this.act.indexOf(this.card2num)
        if (index > -1) {
            this.act.splice(index, 1);
        }
    }*/

  },
  onTouchEndedcard3: function onTouchEndedcard3() {
    //window.AudioMgr.playSFX("ui_click")
    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card3selected == false) {
      this.card3selected = true;
      this.card3.setScale(1);
      this.act.push(this.card3num);
      this.lasttouchcard = this.card3;
    }
    /*else{
        this.card3selected=false
        this.card3.setScale(0.8)
        var index = this.act.indexOf(this.card3num)
        if (index > -1) {
            this.act.splice(index, 1);
        }
    }*/

  },
  onTouchEndedcard4: function onTouchEndedcard4() {
    //window.AudioMgr.playSFX("ui_click")
    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }
    /*
    var ind = this.act.indexOf(this.card4num)
    if (ind > -1) {
        return
    }
    */


    if (this.card4selected == false) {
      this.card4selected = true;
      this.card4.setScale(1);
      this.act.push(this.card4num);
      this.lasttouchcard = this.card4;
    }
    /*else{
        this.card4selected=false
        this.card4.setScale(0.8)
        var index = this.act.indexOf(this.card4num)
        if (index > -1) {
            this.act.splice(index, 1);
        }
    }*/

  },
  getBatteryPercent: function getBatteryPercent() {
    if (cc.sys.isNative) {
      if (cc.sys.os == cc.sys.OS_ANDROID) {
        return jsb.reflection.callStaticMethod(this.ANDROID_API, "getBatteryPercent", "()F");
      } else if (cc.sys.os == cc.sys.OS_IOS) {
        return jsb.reflection.callStaticMethod(this.IOS_API, "getBatteryPercent");
      }
    }

    return 0.9;
  },
  update: function update(dt) {
    this.label.string = this.act.join("");
    var minutes = Math.floor(Date.now() / 1000 / 60);

    if (this._lastMinute != minutes) {
      this._lastMinute = minutes;
      var date = new Date();
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      this._timeLabel.string = "" + h + ":" + m;
    }

    var power = cc.find("Canvas/bg2/power");
    power.scaleX = this.getBatteryPercent();
  },
  onaddact: function onaddact() {
    //window.AudioMgr.playSFX("ui_click")
    this.act.push("+");
  },
  onreduceact: function onreduceact() {
    //window.AudioMgr.playSFX("ui_click")
    this.act.push("-");
  },
  onmulact: function onmulact() {
    //window.AudioMgr.playSFX("ui_click")
    this.act.push("*");
  },
  ondivact: function ondivact() {
    //window.AudioMgr.playSFX("ui_click")
    this.act.push("/");
  },
  onlefact: function onlefact() {
    //window.AudioMgr.playSFX("ui_click")
    this.act.push("(");
  },
  onrigact: function onrigact() {
    //window.AudioMgr.playSFX("ui_click")
    this.act.push(")");
  },
  ondelact: function ondelact() {
    //window.AudioMgr.playSFX("ui_click")
    var num = this.act.pop();

    if (this.lasttouchcard == null) {
      return;
    }

    this.lasttouchcard.setScale(0.8);
    if (this.lasttouchcard == this.card1) this.card1selected = false;
    if (this.lasttouchcard == this.card2) this.card2selected = false;
    if (this.lasttouchcard == this.card3) this.card3selected = false;
    if (this.lasttouchcard == this.card4) this.card4selected = false;
    this.lasttouchcard = null;
  },
  onsureact: function onsureact() {
    if (this.card1selected == false || this.card2selected == false || this.card3selected == false || this.card4selected == false) {
      this.gameHint.node.active = true;
      this.gameHint.string = "四张牌都必须使用一次，请重新计算";
      this.gameHint.node.opacity = 255;
      var action = cc.fadeTo(8.0, 0);
      this.gameHint.node.runAction(action);
      this.card1selected = false;
      this.card2selected = false;
      this.card3selected = false;
      this.card4selected = false;
      this.card1.setScale(0.8);
      this.card2.setScale(0.8);
      this.card3.setScale(0.8);
      this.card4.setScale(0.8);
      this.act = [];
      return;
    } //window.AudioMgr.playSFX("ui_click")


    this.card1selected = false;
    this.card2selected = false;
    this.card3selected = false;
    this.card4selected = false;
    this.card1.setScale(0.8);
    this.card2.setScale(0.8);
    this.card3.setScale(0.8);
    this.card4.setScale(0.8);
    var str = this.act.join("");
    var res = 0;

    try {
      //var res=eval(str);
      //var res= window.binding.eval(str)
      res = window.eval2(str); //cc.log("ttttttttttttttt",res)
    } catch (_unused) {
      //res="syntax error"
      this.gameHint.node.active = true;
      this.gameHint.string = "输入无效，请重新计算";
      this.gameHint.node.opacity = 255;
      var action = cc.fadeTo(8.0, 0);
      this.gameHint.node.runAction(action);
      this.act = [];
    } //alert();


    this.act = []; //this.act.push(res)

    if (res == 24) {
      var player = KBEngine.app.player();

      if (player) {
        player.onsureact(str);
      }
    } else {
      this.gameHint.node.active = true;
      this.gameHint.string = "计算结果为" + res + "不正确，请重新计算";
      this.gameHint.node.opacity = 255;
      var action = cc.fadeTo(8.0, 0);
      this.gameHint.node.runAction(action);
    } //cc.log("submit=",res)

  },
  pickUped: function pickUped(event) {//cc.log("worldsence.pickuped")
  },
  installEvents: function installEvents() {
    KBEngine.Event.register("onAvatarEnterWorld", this, "onAvatarEnterWorld");
    KBEngine.Event.register("onEnterWorld", this, "onEnterWorld");
    KBEngine.Event.register("onLeaveWorld", this, "onLeaveWorld");
    KBEngine.Event.register("game_begin_push", this, "game_begin_push");
    KBEngine.Event.register("entity_updateholds", this, "entity_updateholds");
    KBEngine.Event.register("newTurn", this, "newTurn");
    KBEngine.Event.register("playerReadyStateChange", this, "playerReadyStateChange");
    KBEngine.Event.register("onotherNetcut", this, "onotherNetcut");
    KBEngine.Event.register("onGameOver", this, "onGameOver");
    KBEngine.Event.register("onDisconnected", this, "onDisconnected");
    KBEngine.Event.register("onConnectionState", this, "onConnectionState");
    KBEngine.Event.register("onReloginBaseappFailed", this, "onReloginBaseappFailed");
    KBEngine.Event.register("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
    KBEngine.Event.register("onAvatarContinueGame", this, "onAvatarContinueGame");
    KBEngine.Event.register("onquick_chat", this, "onquick_chat");
    KBEngine.Event.register("onemoji", this, "onemoji");
    KBEngine.Event.register("oniptChat", this, "oniptChat");
    KBEngine.Event.register("onEnterWorld2", this, "onEnterWorld2");
    KBEngine.Event.register("updategamestuts", this, "updategamestuts");
    KBEngine.Event.register("entity_updateroomkey", this, "entity_updateroomkey");
    KBEngine.Event.register("onsyncsureact", this, "onsyncsureact");
    KBEngine.Event.register("onjoinPrivateRoom", this, "onjoinPrivateRoom");
  },
  entity_updateroomkey: function entity_updateroomkey(roomKeyc, avatar) {
    cc.log("entity_updateroomkeyentity_updateroomkey=", roomKeyc);
    this.RoomID.string = "房间号:" + roomKeyc.join("");
    this.roomKeyc = roomKeyc.join("");
  },
  enableWxShare: function enableWxShare() {
    wx.showShareMenu({
      withShareTicket: true
    });
    var self = this;
    wx.onShareAppMessage(function () {
      return {
        title: "才艺24点小PK",
        imageUrl: SHARE_PICTURE //roomID:sekf.RoomID.string,

      };
    });
  },
  enablePhysicManager: function enablePhysicManager() {
    //cc.log("test1")
    //cc.director.getCollisionManager().enabled = true;
    //cc.director.getPhysicsManager().enabled = true;
    cc.director.getPhysicsManager().enabled = true;
    var manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },
  enablePhysicsDebugDraw: function enablePhysicsDebugDraw() {
    cc.log("test2");
    var manager = cc.director.getCollisionManager();
    manager.enabledDebugDraw = true;
    manager.enabledDrawBoundingBox = true;
    cc.director.getPhysicsManager().debugDrawFlags = // cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    cc.PhysicsManager.DrawBits.e_centerOfMassBit | // cc.PhysicsManager.DrawBits.e_jointBit |
    cc.PhysicsManager.DrawBits.e_shapeBit | cc.PhysicsManager.DrawBits.e_rayCast;
  },
  unInstallEvents: function unInstallEvents() {
    KBEngine.Event.deregister("onAvatarEnterWorld", this, "onAvatarEnterWorld");
    KBEngine.Event.deregister("onEnterWorld", this, "onEnterWorld");
    KBEngine.Event.deregister("onLeaveWorld", this, "onLeaveWorld");
    KBEngine.Event.deregister("game_begin_push", this, "game_begin_push");
    KBEngine.Event.deregister("entity_updateholds", this, "entity_updateholds");
    KBEngine.Event.deregister("newTurn", this, "newTurn");
    KBEngine.Event.deregister("playerReadyStateChange", this, "playerReadyStateChange");
    KBEngine.Event.deregister("onotherNetcut", this);
    KBEngine.Event.deregister("onGameOver", this);
    KBEngine.Event.deregister("onDisconnected", this, "onDisconnected");
    KBEngine.Event.deregister("onConnectionState", this, "onConnectionState");
    KBEngine.Event.deregister("onReloginBaseappFailed", this, "onReloginBaseappFailed");
    KBEngine.Event.deregister("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
    KBEngine.Event.deregister("onAvatarContinueGame", this, "onAvatarContinueGame");
    KBEngine.Event.deregister("onquick_chat", this, "onquick_chat");
    KBEngine.Event.deregister("onemoji", this, "onemoji");
    KBEngine.Event.deregister("oniptChat", this, "oniptChat");
    KBEngine.Event.deregister("onEnterWorld2", this, "onEnterWorld2");
    KBEngine.Event.deregister("updategamestuts", this, "updategamestuts");
    KBEngine.Event.deregister("entity_updateroomkey", this, "entity_updateroomkey");
    KBEngine.Event.deregister("onsyncsureact", this, "onsyncsureact");
    KBEngine.Event.deregister("onjoinPrivateRoom", this, "onjoinPrivateRoom");
  },
  onjoinPrivateRoom: function onjoinPrivateRoom(num) {
    cc.director.loadScene("StartScene", function () {
      window.loginres = num;
      cc.log("startscene===>wordscene");
    });
    this.unInstallEvents();
  },
  onquick_chat: function onquick_chat(eid, idx) {
    //cc.log("7777777777777777777777777777777777777777quick_chat=",eid,idx)
    var strstr = this.node.getComponent("Chat").getQuickChatInfo(idx)["content"]; //cc.log("888888888888888888888888888888888888quick_chat=",strstr)

    if (KBEngine.app.player().id == eid) {
      this.seat1.getComponent("Seat").chat(strstr); //this.seat1.getComponent("Seat").refresh();  
    } else {
      this.seat2.getComponent("Seat").chat(strstr); //this.seat2.getComponent("Seat").refresh();  
    }
  },
  onemoji: function onemoji(eid, name) {
    //cc.log("888888888888888888888888888888888888emoji=",name)
    if (KBEngine.app.player().id == eid) {
      this.seat1.getComponent("Seat").emoji(name); //this.seat1.getComponent("Seat").refresh();  
    } else {
      this.seat2.getComponent("Seat").emoji(name); //this.seat2.getComponent("Seat").refresh();  
    }
  },
  oniptChat: function oniptChat(eid, strstr) {
    cc.log("888888888888888888888888888888888888eiptChat=", strstr);

    if (KBEngine.app.player().id == eid) {
      this.seat1.getComponent("Seat").chat(strstr); // this.seat1.getComponent("Seat").refresh();  
    } else {
      this.seat2.getComponent("Seat").chat(strstr); //this.seat2.getComponent("Seat").refresh();     
    }
  },
  playerReadyStateChange: function playerReadyStateChange(eid, state) {
    cc.log("playerReadyStateChange");

    if (KBEngine.app.player().id == eid) {
      this.seat1.active = true;
      this.seat1.getComponent("Seat")._isReady = true;
      this.seat1.getComponent("Seat").refresh();
    } else {
      this.seat2.active = true;
      this.seat2.getComponent("Seat")._isReady = true;
      this.seat2.getComponent("Seat").refresh();
    }
  },
  onupdateGamestates: function onupdateGamestates(curID, time) {
    cc.log("onupdateGamestates");
    this.newTurn(curID, time);
  },
  updategamestuts: function updategamestuts(num) {
    if (num == 1) {
      //服务器正在playing中
      this.node.getChildByName("start").active = false;
    } else {
      //一局已结束
      this.node.getChildByName("start").active = true;
    }
  },
  onotherNetcut: function onotherNetcut(curID) {
    cc.log("onotherNetcut。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。");

    if (curID == 0) {
      this.gameHint.string = "其他玩逃命，游戏马上结束.......";
      this.seat2.active = false;
    } else {
      this.gameHint.node.active = true;
      this.gameHint.string = "玩家" + KBEngine.app.entities[curID].accountName + "掉线，请等待.......";
    }

    this.gameHint.node.opacity = 255;
    var action = cc.fadeTo(13.0, 0);
    this.gameHint.node.runAction(action); //this.gameState.newTurn(15);
  },
  onsyncsureact: function onsyncsureact(strs) {
    cc.log("world::onsyncsureact", strs); //this.gameHint.node.opacity=255
    //this.gameHint.string = strs
    //var action = cc.fadeTo(8.0, 0);
    //this.gameHint.node.runAction(action);
  },
  onDisconnected: function onDisconnected() {
    KBEngine.INFO_MSG("disconnect! will try to reconnect..."); //var action = cc.fadeTo(1.0, 0);

    this.gameHint.node.opacity = 255;
    this.gameHint.string = "disconnect! will try to reconnect...";
    this.Destroyplayer();
    KBEngine.app.reloginBaseapp();
  },
  onReloginBaseappTimer: function onReloginBaseappTimer(self) {
    KBEngine.INFO_MSG("will try to reconnect(" + this.reloginCount + ")...");
  },
  onReloginBaseappFailed: function onReloginBaseappFailed(failedcode) {
    KBEngine.INFO_MSG("reogin is failed(断线重连失败), err=" + KBEngine.app.serverErr(failedcode));
  },
  onReloginBaseappSuccessfully: function onReloginBaseappSuccessfully() {
    KBEngine.INFO_MSG("reogin is successfully!(断线重连成功!)");
    this.gameHint.node.opacity = 255;
    this.gameHint.node.active = true;
    var action = cc.fadeTo(8.0, 0);
    this.gameHint.string = "reogin is successfully!(断线重连成功!)";
    this.gameHint.node.runAction(action);
  },
  onConnectionState: function onConnectionState(success) {
    if (!success) {
      KBEngine.ERROR_MSG("Connect(" + KBEngine.app.ip + ":" + KBEngine.app.port + ") is error! (连接错误)");
      this.onDisconnected();
    } else {
      KBEngine.INFO_MSG("Connect successfully, please wait...(连接成功，请等候...)");
    }
  },
  reqChangeReadyState: function reqChangeReadyState() {
    this.node.getChildByName("start").active = false;
    var player = KBEngine.app.player();

    if (player) {
      player.reqChangeReadyState();
    }

    this.seat1.getComponent("Seat").setReady(true);
    this.seat1.getComponent("Seat").refresh();
  },
  entity_updateholds: function entity_updateholds(holds, entity) {
    cc.log("entity_updateholds", entity.id, holds);

    if (entity.className == "Avatar") {
      if (entity.id == KBEngine.app.player().id) {
        //this.seat1.active=true
        this.seat1.getComponent("Seat")._holds = holds;
        this.seat1.getComponent("Seat").refresh();
      } else {
        //scalex==-1,
        //this.seat2.active=true
        this.seat2.getComponent("Seat")._holds = holds;
        this.seat2.getComponent("Seat").refresh();
      }
    }
  },
  game_begin_push: function game_begin_push(entity) {
    cc.log("WorldScene::game_begin_push"); //this.seat1.active=true
    //this.seat2.active=true
    //this.seat1.getComponent("Seat")._holds=entity.holds

    this.seat1.getComponent("Seat")._isReady = false;
    this.seat1.getComponent("Seat").refresh();
    this.seat2.getComponent("Seat")._isReady = false;
    this.seat2.getComponent("Seat").refresh();
  },
  onEnterWorld: function onEnterWorld(entity) {
    //SCALE=1;
    cc.log("onEnterWorld entity.id=", entity.id);

    if (!entity.isPlayer()) {
      var ae = null;

      if (KBEngine.app.player().id == entity.id) {
        this.seat1.active = true; //this.seat1.getComponent("Seat")._isReady=false

        this.seat1.getComponent("Seat")._userName = entity.accountName;
        this.seat1.getComponent("Seat").avatarUrl = entity.avatarUrl;
        this.seat1.getComponent("Seat").refresh(); //this.entities[entity.id] = entity;  

        cc.log("WorldScene::onEnterWorld=", this.seat1.getComponent("Seat")._isReady);
      } else {
        //scalex==-1,
        this.matching.active = false;
        this.seat2.active = true; //this.seat2.getComponent("Seat")._isReady=true

        this.seat2.getComponent("Seat")._userName = entity.accountName;
        this.seat2.getComponent("Seat").avatarUrl = entity.avatarUrl;
        this.seat2.getComponent("Seat").refresh(); //this.entities[entity.id] = entity; 

        cc.log("WorldScene::onEnterWorld=", this.seat2.getComponent("Seat")._isReady);
      }
    }
  },
  onEnterWorld2: function onEnterWorld2(entityID) {
    cc.log("onEnterWorld2");
    var entity = KBEngine.app.entities[entityID]; //SCALE=1;

    cc.log("onEnterWorld entity.id=", entity.id);

    if (KBEngine.app.player().id == entity.id) {
      this.seat1.active = true; //this.seat1.getComponent("Seat")._isReady=false

      this.seat1.getComponent("Seat")._userName = entity.accountName;
      this.seat1.getComponent("Seat").avatarUrl = entity.avatarUrl;
      this.seat1.getComponent("Seat").refresh(); //this.entities[entity.id] = entity;  

      cc.log("WorldScene::onEnterWorld=", this.seat1.getComponent("Seat")._isReady);
    } else {
      //scalex==-1,
      this.matching.active = false;
      this.seat2.active = true; //this.seat2.getComponent("Seat")._isReady=true

      this.seat2.getComponent("Seat")._userName = entity.accountName;
      this.seat2.getComponent("Seat").avatarUrl = entity.avatarUrl;
      this.seat2.getComponent("Seat").refresh(); //this.entities[entity.id] = entity; 

      cc.log("WorldScene::onEnterWorld=", this.seat2.getComponent("Seat")._isReady);
    }
  },
  onLeaveWorld: function onLeaveWorld(entity) {
    cc.log("onLeaveWorld", entity.id, entity.className);
    this.matching.active = true;
    this.matching.stopAllActions();
    var action1 = cc.fadeIn(0.5); //渐显

    var action2 = cc.fadeOut(0.5); //渐隐效果

    var repeat = cc.repeatForever(cc.sequence(action1, action2));
    this.matching.runAction(repeat);
    this.seat2.active = false;
    /*
    cc.log("onLeaveWorld",entity.id,entity.className)
    if(this.entities[entity.id] && entity.className == "Avatar"){
        this.entities[entity.id].removeFromParent()
        this.entities[entity.id]=null
    }  
    */
  },
  onAvatarEnterWorld: function onAvatarEnterWorld(avatar) {
    cc.log("onAvatarEnterWorld");
    this.createPlayer(avatar);
  },
  updatePosition: function updatePosition(entity) {},
  set_position: function set_position(entity) {},
  setCameraTarget: function setCameraTarget(entityID) {},
  checkPlayerHasItem: function checkPlayerHasItem(left) {//cc.log("test14")
  },
  newTurn: function newTurn(avatar, eid, second, card01, card02, card03, card04) {
    //window.AudioMgr.stopBGM()
    //window.AudioMgr.playSFX("turn")
    this.gameState.newTurn(second);
    this.clock.active = true;

    if (!this.gameState.isGameStart()) {
      this.gameState.setGameStart(true); //var action = cc.fadeTo(1.0, 0);
      //this.label.string = "游戏开始 !!!";
      //this.label.node.runAction(action);
    }

    this.card1selected = false;
    this.card2selected = false;
    this.card3selected = false;
    this.card4selected = false;
    this.card1.setScale(0.8);
    this.card2.setScale(0.8);
    this.card3.setScale(0.8);
    this.card4.setScale(0.8);
    this.card1.active = true;
    this.card2.active = true;
    this.card3.active = true;
    this.card4.active = true;
    this.card01 = card01;
    this.card02 = card02;
    this.card03 = card03;
    this.card04 = card04; ////////////////////////////

    var A_act1 = null;
    var A_act2 = null;
    var A_act3 = null;
    var A_act4 = null;
    var B_act1 = null;
    var B_act2 = null;
    var B_act3 = null;
    var B_act4 = null;
    var x1 = this.seat1cardpos.x;
    var y1 = this.seat1cardpos.y;
    var x2 = this.seat2cardpos.x;
    var y2 = this.seat2cardpos.y;
    var card1origposx = this.card1origpos.x;
    var card1origposy = this.card1origpos.y;
    var card2origposx = this.card2origpos.x;
    var card2origposy = this.card2origpos.y;
    var card3origposx = this.card3origpos.x;
    var card3origposy = this.card3origpos.y;
    var card4origposx = this.card4origpos.x;
    var card4origposy = this.card4origpos.y;
    cc.log("this.curid=", eid);
    cc.log("ddddddddddddddddddddthis.seat2cardpos=", x1, y1);
    cc.log("ddddddddddddddddddddthis.seat1cardpos=", x2, y2);
    cc.log("ddddddddddddddddddddthis..card1origpos=", card1origposx, card1origposy);
    cc.log("ddddddddddddddddddddthis..card2origpos=", card2origposx, card2origposy);
    cc.log("ddddddddddddddddddddthis..card2origpos=", card3origposx, card3origposy);
    cc.log("ddddddddddddddddddddthis..card2origpos=", card4origposx, card4origposy);
    this.card1.stopAllActions();
    this.card2.stopAllActions();
    this.card3.stopAllActions();
    this.card4.stopAllActions();

    if (eid == 0) {
      //各回各家
      A_act1 = cc.moveTo(1, cc.v2(x1, y1));
      A_act2 = cc.moveTo(1, cc.v2(x1, y1));
      A_act3 = cc.moveTo(1, cc.v2(x2, y2));
      A_act4 = cc.moveTo(1, cc.v2(x2, y2));
    } else if (eid == KBEngine.app.player().id) {
      cc.log("eid==KBEngine.app.player().id,moveto seat1", eid, KBEngine.app.player().id);
      A_act1 = cc.moveTo(1, cc.v2(x1, y1));
      A_act2 = cc.moveTo(1, cc.v2(x1, y1));
      A_act3 = cc.moveTo(1, cc.v2(x1, y1));
      A_act4 = cc.moveTo(1, cc.v2(x1, y1));
    } else {
      cc.log("eid!=KBEngine.app.player().id,moveto seat2", eid, KBEngine.app.player().id);
      A_act1 = cc.moveTo(1, cc.v2(x2, y2));
      A_act2 = cc.moveTo(1, cc.v2(x2, y2));
      A_act3 = cc.moveTo(1, cc.v2(x2, y2));
      A_act4 = cc.moveTo(1, cc.v2(x2, y2));
    }

    var self = this;
    this.card1num = 2 + parseInt((card01 + 1000 - 1061) / 4); //1,2,3,4

    this.card2num = 2 + parseInt((card02 + 1000 - 1061) / 4);
    this.card3num = 2 + parseInt((card03 + 1000 - 1061) / 4);
    this.card4num = 2 + parseInt((card04 + 1000 - 1061) / 4);

    if (this.card1num > 10) {
      this.card1num = 1;
    }

    if (this.card2num > 10) {
      this.card2num = 1;
    }

    if (this.card3num > 10) {
      this.card3num = 1;
    }

    if (this.card4num > 10) {
      this.card4num = 1;
    }

    var funcount1 = cc.callFunc(function (target) {
      this.seat1.getComponent("Seat").refreshcount1();
      this.seat2.getComponent("Seat").refreshcount1();
    }, this);
    var funcount2 = cc.callFunc(function (target) {
      this.seat1.getComponent("Seat").refreshcount2();
      this.seat2.getComponent("Seat").refreshcount2();
    }, this);
    var self = this;
    var fun1 = cc.callFunc(function (target) {
      target.x = x1, target.y = y1;
      card01 = card01 + 1000;
      var url = "card_" + card01 + "@2x";
      target.getComponent(cc.Sprite).spriteFrame = self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame;
      /*
      cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
      self.card1.getComponent(cc.Sprite).spriteFrame= spriteFrame
      }); */
    }, this.card1);
    var fun2 = cc.callFunc(function (target) {
      target.x = x1;
      target.y = y1;
      card02 = card02 + 1000;
      var url = "card_" + card02 + "@2x";
      target.getComponent(cc.Sprite).spriteFrame = self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame;
    }, this.card2);
    var fun3 = cc.callFunc(function (target) {
      target.x = x2;
      target.y = y2;
      card03 = card03 + 1000;
      var url = "card_" + card03 + "@2x";
      target.getComponent(cc.Sprite).spriteFrame = self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame;
    }, this.card3);
    var fun4 = cc.callFunc(function (target) {
      target.x = x2;
      target.y = y2;
      card04 = card04 + 1000;
      var url = "card_" + card04 + "@2x";
      target.getComponent(cc.Sprite).spriteFrame = self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame;
    }, this.card4);
    var fun11 = cc.callFunc(function (target) {
      target.x = card1origposx;
      target.y = card1origposy;
    }, this.card1);
    var fun22 = cc.callFunc(function (target) {
      target.x = card2origposx;
      target.y = card2origposy;
    }, this.card2);
    var fun33 = cc.callFunc(function (target) {
      target.x = card3origposx;
      target.y = card3origposy;
    }, this.card3);
    var fun44 = cc.callFunc(function (target) {
      target.x = card4origposx;
      target.y = card4origposy;
    }, this.card4);
    B_act1 = cc.moveTo(1, cc.v2(card1origposx, card1origposy));
    B_act2 = cc.moveTo(1, cc.v2(card2origposx, card2origposy));
    B_act3 = cc.moveTo(1, cc.v2(card3origposx, card3origposy));
    B_act4 = cc.moveTo(1, cc.v2(card4origposx, card4origposy));

    if (eid == 12345) {
      //各回各家2张
      this.card1.runAction(cc.sequence(fun1, B_act1, fun11, funcount2));
      this.card2.runAction(cc.sequence(fun2, B_act2, fun22, funcount2));
      this.card3.runAction(cc.sequence(fun3, B_act3, fun33, funcount2));
      this.card4.runAction(cc.sequence(fun4, B_act4, fun44, funcount2));
    } else {
      //一家四张
      this.card1.runAction(cc.sequence(A_act1, fun1, funcount1, cc.delayTime(1), B_act1, fun11, funcount2));
      this.card2.runAction(cc.sequence(A_act2, fun2, funcount1, cc.delayTime(1), B_act2, fun22, funcount2));
      this.card3.runAction(cc.sequence(A_act3, fun3, funcount1, cc.delayTime(1), B_act3, fun33, funcount2));
      this.card4.runAction(cc.sequence(A_act4, fun4, funcount1, cc.delayTime(1), B_act4, fun44, funcount2));
    } /////////////////////////////


    cc.log("wwwwwwnewTurn", avatar.id, second, card01, card02, card03, card04);
    this.opt.active = true;
    this.act = [];
  },
  resetItem: function resetItem() {},
  otherAvatarOnPickUpItem: function otherAvatarOnPickUpItem(avatarID, itemID, position) {},
  otherAvatarThrowItem: function otherAvatarThrowItem(avatarID, itemID, force) {},
  otherAvatarOnStopWalk: function otherAvatarOnStopWalk(avatarID, pos) {},
  otherAvatarOnStartWalk: function otherAvatarOnStartWalk(avatarID, moveFlag) {},
  otherAvatarRecoverItem: function otherAvatarRecoverItem(avatarID, itemID) {//cc.log("test18")
  },
  otherAvatarOnLeftJump: function otherAvatarOnLeftJump(avatarID) {},
  otherAvatarOnRightJump: function otherAvatarOnRightJump(avatarID) {},
  onRecvDamage: function onRecvDamage(avatarID, harm, hp) {//cc.log("WorldScene::otherAvatarRecvDamage: avatarID=%d, harm=%d, hp=%d ", avatarID, harm, hp);
  },
  onAvatarDie: function onAvatarDie(avatarID) {//cc.log("WorldScene::onAvatarDie, avatarid=%d", avatarID)
  },
  onGameOver: function onGameOver(avatarID, isWin, hp, totalTime, totalHarm, score) {
    if (avatarID == KBEngine.app.player().id) {
      HP = hp;
      TOTAL_TIME = totalTime;
      OtherHP = totalHarm;
      SCORE = score;
      LVlevel = Math.round(100 * SCORE);
      this.unInstallEvents();

      if (isWin) {
        cc.director.loadScene("WinScene");
      } else {
        cc.director.loadScene("LoseScene");
      }
    } //cc.log("8888888888888888888888888888888888888888888888888888888888888888888888888888888888888")
    //this.disEnableControlPlayer();
    //this.unInstallEvents();


    this.player = null;
  },
  onResetItem: function onResetItem(itemID, position) {///SCALE=1;
    //item.setPosition(position.x*SCALE, position.z*SCALE);
  },
  Destroyplayer: function Destroyplayer() {
    /*
    cc.log("Avatar client die so destroy WorldScene playerprefab")
    if(this.player) {
        this.player.removeFromParent(true)
    }
    */
  },
  invatefriend: function invatefriend() {
    //this.yaoqing.active=false
    var self = this;
    wx.shareAppMessage({
      title: self.RoomID.string,
      imageUrl: SHARE_PICTURE,
      //query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,// 别人点击链接时会得到的数据
      //query: "nick=" + nick + "&gender=" + gender + "&city=" + city,
      query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,
      success: function success(res) {
        wx.showToast({
          title: "分享成功"
        });
        cc.log("分享成功" + res);
        this.yaoqing.active = false;
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
      },
      fail: function fail(res) {
        cc.log("分享失败" + res);
        this.yaoqing.active = true;
      }
    });
  },
  createPlayer: function createPlayer(avatar) {
    // SCALE=1;
    cc.log("new createPlayer this.player=，avatar.modelID=", this.player, avatar.modelID);

    if (!this.player) {
      if (avatar.id == KBEngine.app.player().id) {
        this.seat1.active = true;
        this.seat1.getComponent("Seat")._userName = avatar.accountName;
        this.seat1.getComponent("Seat").avatarUrl = avatar.avatarUrl; //this.seat1.getComponent("Seat")._isReady=true

        this.seat1.getComponent("Seat").refresh();
        this.player = this.seat1; //this.entities[avatar.id]=this.player 
      } else {
        this.seat2.active = true; //this.seat2.getComponent("Seat")._isReady=true

        this.seat2.getComponent("Seat")._userName = avatar.accountName;
        this.seat2.getComponent("Seat").avatarUrl = avatar.avatarUrl;
        this.seat2.getComponent("Seat").refresh();
        this.player = this.seat2; //this.entities[avatar.id]=this.player 
      } //var ctrl= this.player.addComponent("AvatarControl");
      //var action= this.player.addComponent("AvatarAction");


      this.player.setPosition(avatar.position.x * SCALE, avatar.position.z * SCALE); //this.entities[avatar.id] = this.player;
    }

    cc.log("after createPlayer this.player=，avatar.modelID=", this.player, avatar.modelID);
  },
  onAvatarContinueGame: function onAvatarContinueGame(avatar) {
    this.createPlayer(avatar);
  },
  enableControlPlayer: function enableControlPlayer() {},
  disEnableControlPlayer: function disEnableControlPlayer() {}
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcV29ybGRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJiaW5kanMiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNlYXQxIiwidHlwZSIsIk5vZGUiLCJzZWF0MiIsInNob3d3YW5nZmEiLCJpbnRyb2R1Y2UiLCJhY3RpdmUiLCJoaWRld2FuZ2ZhIiwic2hvd3NldHRpbmciLCJpc3Nob3dzZXR0aW5nIiwic2V0dGluZ05vZGUiLCJzaG93Y2hhdCIsImlzc2hvd2NoYXQiLCJjaGF0Tm9kZSIsImxvZyIsIm9uTG9hZCIsInJvb21LZXljIiwiaW5zdGFsbEV2ZW50cyIsIlJvb21JRCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInlhb3FpbmciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJ3aW5kb3ciLCJtYXRjaGluZyIsInN0b3BBbGxBY3Rpb25zIiwiYWN0aW9uMSIsImZhZGVJbiIsImFjdGlvbjIiLCJmYWRlT3V0IiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwiX3RpbWVMYWJlbCIsInN5cyIsInBsYXRmb3JtIiwiV0VDSEFUX0dBTUUiLCJlbmFibGVXeFNoYXJlIiwiY2FyZDEiLCJjYXJkMiIsImNhcmQzIiwiY2FyZDQiLCJvcHQiLCJsYWJlbCIsImFjdCIsImNhcmQxbnVtIiwiY2FyZDJudW0iLCJjYXJkM251bSIsImNhcmQ0bnVtIiwibGFzdHRvdWNoY2FyZCIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfRU5EIiwib25Ub3VjaEVuZGVkY2FyZDEiLCJvblRvdWNoRW5kZWRjYXJkMiIsIm9uVG91Y2hFbmRlZGNhcmQzIiwib25Ub3VjaEVuZGVkY2FyZDQiLCJjYXJkMXNlbGVjdGVkIiwiY2FyZDJzZWxlY3RlZCIsImNhcmQzc2VsZWN0ZWQiLCJjYXJkNHNlbGVjdGVkIiwiZ2FtZVN0YXRlIiwiY2xvY2siLCJzcCIsImkiLCJjYXJkMW9yaWdwb3MiLCJwb3NpdGlvbiIsImNhcmQyb3JpZ3BvcyIsImNhcmQzb3JpZ3BvcyIsImNhcmQ0b3JpZ3BvcyIsImRlbHRhIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJnZXRPcmlnaW5hbFNpemUiLCJoZWlnaHQiLCJvdXQiLCJ2MiIsInNlYXQxY2FyZHBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwieSIsInNlYXQyY2FyZHBvcyIsImdhbWVIaW50Iiwib3BhY2l0eSIsImxlbmd0aCIsInNldFNjYWxlIiwicHVzaCIsImdldEJhdHRlcnlQZXJjZW50IiwiaXNOYXRpdmUiLCJvcyIsIk9TX0FORFJPSUQiLCJqc2IiLCJyZWZsZWN0aW9uIiwiY2FsbFN0YXRpY01ldGhvZCIsIkFORFJPSURfQVBJIiwiT1NfSU9TIiwiSU9TX0FQSSIsInVwZGF0ZSIsImR0Iiwic3RyaW5nIiwiam9pbiIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwibm93IiwiX2xhc3RNaW51dGUiLCJkYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJwb3dlciIsInNjYWxlWCIsIm9uYWRkYWN0Iiwib25yZWR1Y2VhY3QiLCJvbm11bGFjdCIsIm9uZGl2YWN0Iiwib25sZWZhY3QiLCJvbnJpZ2FjdCIsIm9uZGVsYWN0IiwibnVtIiwicG9wIiwib25zdXJlYWN0IiwiYWN0aW9uIiwiZmFkZVRvIiwic3RyIiwicmVzIiwiZXZhbDIiLCJwbGF5ZXIiLCJhcHAiLCJwaWNrVXBlZCIsImV2ZW50IiwiRXZlbnQiLCJyZWdpc3RlciIsImVudGl0eV91cGRhdGVyb29ta2V5IiwiYXZhdGFyIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwic2VsZiIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJpbWFnZVVybCIsIlNIQVJFX1BJQ1RVUkUiLCJlbmFibGVQaHlzaWNNYW5hZ2VyIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJtYW5hZ2VyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZVBoeXNpY3NEZWJ1Z0RyYXciLCJlbmFibGVkRGVidWdEcmF3IiwiZW5hYmxlZERyYXdCb3VuZGluZ0JveCIsImRlYnVnRHJhd0ZsYWdzIiwiUGh5c2ljc01hbmFnZXIiLCJEcmF3Qml0cyIsImVfY2VudGVyT2ZNYXNzQml0IiwiZV9zaGFwZUJpdCIsImVfcmF5Q2FzdCIsInVuSW5zdGFsbEV2ZW50cyIsImRlcmVnaXN0ZXIiLCJvbmpvaW5Qcml2YXRlUm9vbSIsImxvYWRTY2VuZSIsImxvZ2lucmVzIiwib25xdWlja19jaGF0IiwiZWlkIiwiaWR4Iiwic3Ryc3RyIiwiZ2V0UXVpY2tDaGF0SW5mbyIsImlkIiwiY2hhdCIsIm9uZW1vamkiLCJuYW1lIiwiZW1vamkiLCJvbmlwdENoYXQiLCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlIiwic3RhdGUiLCJfaXNSZWFkeSIsInJlZnJlc2giLCJvbnVwZGF0ZUdhbWVzdGF0ZXMiLCJjdXJJRCIsInRpbWUiLCJuZXdUdXJuIiwidXBkYXRlZ2FtZXN0dXRzIiwib25vdGhlck5ldGN1dCIsImVudGl0aWVzIiwiYWNjb3VudE5hbWUiLCJvbnN5bmNzdXJlYWN0Iiwic3RycyIsIm9uRGlzY29ubmVjdGVkIiwiSU5GT19NU0ciLCJEZXN0cm95cGxheWVyIiwicmVsb2dpbkJhc2VhcHAiLCJvblJlbG9naW5CYXNlYXBwVGltZXIiLCJyZWxvZ2luQ291bnQiLCJvblJlbG9naW5CYXNlYXBwRmFpbGVkIiwiZmFpbGVkY29kZSIsInNlcnZlckVyciIsIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkiLCJvbkNvbm5lY3Rpb25TdGF0ZSIsInN1Y2Nlc3MiLCJFUlJPUl9NU0ciLCJpcCIsInBvcnQiLCJyZXFDaGFuZ2VSZWFkeVN0YXRlIiwic2V0UmVhZHkiLCJlbnRpdHlfdXBkYXRlaG9sZHMiLCJob2xkcyIsImVudGl0eSIsImNsYXNzTmFtZSIsIl9ob2xkcyIsImdhbWVfYmVnaW5fcHVzaCIsIm9uRW50ZXJXb3JsZCIsImlzUGxheWVyIiwiYWUiLCJfdXNlck5hbWUiLCJhdmF0YXJVcmwiLCJvbkVudGVyV29ybGQyIiwiZW50aXR5SUQiLCJvbkxlYXZlV29ybGQiLCJvbkF2YXRhckVudGVyV29ybGQiLCJjcmVhdGVQbGF5ZXIiLCJ1cGRhdGVQb3NpdGlvbiIsInNldF9wb3NpdGlvbiIsInNldENhbWVyYVRhcmdldCIsImNoZWNrUGxheWVySGFzSXRlbSIsImxlZnQiLCJzZWNvbmQiLCJjYXJkMDEiLCJjYXJkMDIiLCJjYXJkMDMiLCJjYXJkMDQiLCJpc0dhbWVTdGFydCIsInNldEdhbWVTdGFydCIsIkFfYWN0MSIsIkFfYWN0MiIsIkFfYWN0MyIsIkFfYWN0NCIsIkJfYWN0MSIsIkJfYWN0MiIsIkJfYWN0MyIsIkJfYWN0NCIsIngxIiwieCIsInkxIiwieDIiLCJ5MiIsImNhcmQxb3JpZ3Bvc3giLCJjYXJkMW9yaWdwb3N5IiwiY2FyZDJvcmlncG9zeCIsImNhcmQyb3JpZ3Bvc3kiLCJjYXJkM29yaWdwb3N4IiwiY2FyZDNvcmlncG9zeSIsImNhcmQ0b3JpZ3Bvc3giLCJjYXJkNG9yaWdwb3N5IiwibW92ZVRvIiwicGFyc2VJbnQiLCJmdW5jb3VudDEiLCJjYWxsRnVuYyIsInRhcmdldCIsInJlZnJlc2hjb3VudDEiLCJmdW5jb3VudDIiLCJyZWZyZXNoY291bnQyIiwiZnVuMSIsInVybCIsImZ1bjIiLCJmdW4zIiwiZnVuNCIsImZ1bjExIiwiZnVuMjIiLCJmdW4zMyIsImZ1bjQ0IiwiZGVsYXlUaW1lIiwicmVzZXRJdGVtIiwib3RoZXJBdmF0YXJPblBpY2tVcEl0ZW0iLCJhdmF0YXJJRCIsIml0ZW1JRCIsIm90aGVyQXZhdGFyVGhyb3dJdGVtIiwiZm9yY2UiLCJvdGhlckF2YXRhck9uU3RvcFdhbGsiLCJwb3MiLCJvdGhlckF2YXRhck9uU3RhcnRXYWxrIiwibW92ZUZsYWciLCJvdGhlckF2YXRhclJlY292ZXJJdGVtIiwib3RoZXJBdmF0YXJPbkxlZnRKdW1wIiwib3RoZXJBdmF0YXJPblJpZ2h0SnVtcCIsIm9uUmVjdkRhbWFnZSIsImhhcm0iLCJocCIsIm9uQXZhdGFyRGllIiwib25HYW1lT3ZlciIsImlzV2luIiwidG90YWxUaW1lIiwidG90YWxIYXJtIiwic2NvcmUiLCJIUCIsIlRPVEFMX1RJTUUiLCJPdGhlckhQIiwiU0NPUkUiLCJMVmxldmVsIiwicm91bmQiLCJvblJlc2V0SXRlbSIsImludmF0ZWZyaWVuZCIsInNoYXJlQXBwTWVzc2FnZSIsInF1ZXJ5Iiwic2hvd1RvYXN0IiwiZmFpbCIsIm1vZGVsSUQiLCJzZXRQb3NpdGlvbiIsIlNDQUxFIiwieiIsIm9uQXZhdGFyQ29udGludWVHYW1lIiwiZW5hYmxlQ29udHJvbFBsYXllciIsImRpc0VuYWJsZUNvbnRyb2xQbGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0QixFQUNBOzs7QUFDQSxJQUFJQyxNQUFNLEdBQUNELE9BQU8sQ0FBQyxPQUFELENBQWxCOztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFO0FBQ0gsaUJBQVMsSUFETjtBQUVIQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGTixLQURDO0FBTVJDLElBQUFBLEtBQUssRUFBRTtBQUNILGlCQUFTLElBRE47QUFFSEYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRk47QUFJUDs7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcEJRLEdBSFA7QUEwRUxFLEVBQUFBLFVBQVUsRUFBQyxzQkFBVTtBQUNqQixTQUFLQyxTQUFMLENBQWVD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cVAsQ0FBaEIsR0FBa0JELEtBQW5FLEVBcEJhLENBcUJiO0FBQ0g7O0FBQ0Q3VCxJQUFBQSxFQUFFLENBQUNrQixHQUFILENBQU8saURBQVAsRUFBeUQsS0FBS3NILE1BQTlELEVBQXFFTyxNQUFNLENBQUM0SyxPQUE1RTtBQUNILEdBeHFDSTtBQTBxQ0xJLEVBQUFBLG9CQUFvQixFQUFFLDhCQUFTaEwsTUFBVCxFQUFpQjtBQUNwQyxTQUFLc0YsWUFBTCxDQUFrQnRGLE1BQWxCO0FBQ0YsR0E1cUNJO0FBOHFDTGlMLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFXLENBRS9CLENBaHJDSTtBQWtyQ0xDLEVBQUFBLHNCQUFzQixFQUFFLGtDQUFXLENBRWxDO0FBcHJDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbnZhciBLQkVuZ2luZSA9IHJlcXVpcmUoXCJrYmVuZ2luZVwiKTtcclxuLy92YXIgYmluZGpzPXJlcXVpcmUoXCJldmFsXCIpXHJcbnZhciBiaW5kanM9cmVxdWlyZShcImV2YWwyXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzZWF0MToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlYXQyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKlxyXG4gICAgICAgIHNldHRpbmc6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGF0OntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHBsYXllcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgcGlwaVByZWZhYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcG9wUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFyY2hlclByZWZhYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXJjaGVyUHJlZmFiMjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgam95U3RpY2tQcmVmYWI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG91Y2hSYW5nZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW1lcmE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ2FtZXJhLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNhbWVyYUNvbnRyb2w6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lU3RhdGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lSGludDogY2MuTGFiZWwsXHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcbiAgICBzaG93d2FuZ2ZhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPXRydWVcclxuICAgIH0sXHJcbiAgICBoaWRld2FuZ2ZhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPWZhbHNlXHJcbiAgICB9LFxyXG4gICAgc2hvd3NldHRpbmc6ZnVuY3Rpb24oKXtcclxuICAgICAgIC8vIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmlzc2hvd3NldHRpbmcgPSAhdGhpcy5zZXR0aW5nTm9kZS5hY3RpdmU7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nTm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd3NldHRpbmc7XHJcblxyXG4gICAgfSxcclxuICAgIHNob3djaGF0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0ID0gIXRoaXMuY2hhdE5vZGUuYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuY2hhdE5vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3djaGF0O1xyXG4gICAgICAgIGNjLmxvZyhcInNob3djaGF0XCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tS2V5Yz1cIlwiXHJcbiAgICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5Sb29tSUQ9Y2MuZmluZChcIkNhbnZhcy9iZzIvUm9vbUlEXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuXHJcbiAgICAgICAgdGhpcy55YW9xaW5nPWNjLmZpbmQoXCJDYW52YXMvYmcyL3lhb3FpbmdcIilcclxuICAgICAgICB0aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImludHJvZHVjZVwiKVxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlLmFjdGl2ZT1mYWxzZVxyXG5cclxuICAgICAgICBpZih3aW5kb3cudHlwZT09MSl7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hpbmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwibWF0Y2hpbmdcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hpbmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwibWF0Y2hpbmcyXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwibWF0Y2hpbmdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5mYWRlSW4oMC41KTsvL+a4kOaYvlxyXG4gICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgwLjUpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjIsYWN0aW9uMSkpXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5ydW5BY3Rpb24ocmVwZWF0KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMuX011c2ljRGljdCA9IHt9XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0Rpcignc291bmQvJywgZnVuY3Rpb24gKGNvdW50LCB0b3RhbENvdW50LCByZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fTXVzaWNEaWN0ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKGNsaXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fTXVzaWNEaWN0W2NsaXAubmFtZV0gPSBjbGlwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAqL1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlCR00oXCJiZ01haW5cIilcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZUxhYmVsID0gY2MuZmluZChcIkNhbnZhcy9iZzIvdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuaXNzaG93c2V0dGluZz1mYWxzZVxyXG4gICAgICAgIC8vdGhpcy5zZXR0aW5nTm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnNldHRpbmcpXHJcbiAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5zZXR0aW5nTm9kZSlcclxuICAgICAgICAvL3RoaXMuc2V0dGluZ05vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2V0dGluZ3NcIilcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlPWNjLmZpbmQoXCJDYW52YXMvc2V0dGluZ3NcIilcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZSA9IHRoaXMuaXNzaG93c2V0dGluZztcclxuXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0PWZhbHNlXHJcbiAgICAgICAgLy90aGlzLmNoYXROb2RlPWNjLmluc3RhbnRpYXRlKHRoaXMuY2hhdClcclxuICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZCh0aGlzLmNoYXROb2RlKVxyXG4gICAgICAgIHRoaXMuY2hhdE5vZGU9Y2MuZmluZChcIkNhbnZhcy9jaGF0XCIpXHJcbiAgICAgICAgdGhpcy5jaGF0Tm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd2NoYXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVd4U2hhcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYXJkMT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkMVwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZDJcIilcclxuICAgICAgICB0aGlzLmNhcmQzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmQzXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkND10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkNFwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDEuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDMuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcIm9wdFwiKVxyXG4gICAgICAgIHRoaXMub3B0LmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJleHBzdHJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgICAgICAgdGhpcy5jYXJkMW51bT0wO1xyXG4gICAgICAgIHRoaXMuY2FyZDJudW09MDtcclxuICAgICAgICB0aGlzLmNhcmQzbnVtPTA7XHJcbiAgICAgICAgdGhpcy5jYXJkNG51bT0wO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQ9bnVsbFxyXG5cclxuICAgICAgICB0aGlzLmNhcmQxLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkMSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYXJkMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkY2FyZDIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FyZDMub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRlZGNhcmQzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNhcmQ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkNCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkdhbWVTdGF0ZVwiKTtcclxuICAgICAgICB0aGlzLmNsb2NrPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcImNsb2NrXCIpXHJcbiAgICAgICAgdGhpcy5jbG9jay5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBzcD1udWxsXHJcbiAgICAgICAgZm9yKHZhciBpPTEwNjE7aTwxMTE1O2krKyl7XHJcbiAgICAgICAgICAgIHNwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfXCIraStcIkAyeFwiKVxyXG4gICAgICAgICAgICBzcC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FyZDFvcmlncG9zPXRoaXMuY2FyZDEucG9zaXRpb25cclxuICAgICAgICB0aGlzLmNhcmQyb3JpZ3Bvcz10aGlzLmNhcmQyLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5jYXJkM29yaWdwb3M9dGhpcy5jYXJkMy5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMuY2FyZDRvcmlncG9zPXRoaXMuY2FyZDQucG9zaXRpb25cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgd2luZG93LmRlbHRhPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5nZXRPcmlnaW5hbFNpemUoKS5oZWlnaHQqMC44XHJcbiAgICAgICAgLy9cclxuICAgICAgICB2YXIgb3V0PWNjLnYyKDAsIDApXHJcbiAgICAgICAgLy92YXIgc2VhdDFjYXJkcG9zPWNjLnYyKDAsIDApXHJcbiAgICAgICAgdmFyIHNlYXQxY2FyZHBvcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikucG9zaXRpb25cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIgKHNlYXQxY2FyZHBvcywgb3V0KVxyXG4gICAgICAgIHRoaXMuc2VhdDFjYXJkcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihvdXQpXHJcbiAgICAgICAgdGhpcy5zZWF0MWNhcmRwb3MueT10aGlzLnNlYXQxY2FyZHBvcy55LXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5nZXRPcmlnaW5hbFNpemUoKS5oZWlnaHQqMC44XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS55PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLnkrd2luZG93LmRlbHRhXHJcbiAgICAgICAgLy92YXIgc2VhdDJjYXJkcG9zPWNjLnYyKDAsIDApXHJcbiAgICAgICAgb3V0PWNjLnYyKDAsIDApXHJcbiAgICAgICAgdmFyIHNlYXQyY2FyZHBvcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikucG9zaXRpb25cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIgKHNlYXQyY2FyZHBvcywgb3V0KVxyXG4gICAgICAgIHRoaXMuc2VhdDJjYXJkcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihvdXQpXHJcblxyXG5cclxuICAgICAgICAvL2NjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy5zZWF0MmNhcmRwb3M9XCIsdGhpcy5zZWF0MmNhcmRwb3MueCx0aGlzLnNlYXQyY2FyZHBvcy55KVxyXG4gICAgICAgIC8vY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLnNlYXQxY2FyZHBvcz1cIix0aGlzLnNlYXQxY2FyZHBvcy54LHRoaXMuc2VhdDFjYXJkcG9zLnkpXHJcbiAgICAgICAgLy9jYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQxb3JpZ3Bvcz1cIix0aGlzLmNhcmQxb3JpZ3Bvcy54LHRoaXMuY2FyZDFvcmlncG9zLnkpXHJcbiAgICAgICAgLy9jYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIix0aGlzLmNhcmQyb3JpZ3Bvcy54LHRoaXMuY2FyZDJvcmlncG9zLnkpXHJcbiAgICAgICAgLy9jYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIix0aGlzLmNhcmQzb3JpZ3Bvcy54LHRoaXMuY2FyZDNvcmlncG9zLnkpXHJcbiAgICAgICAgLy9jYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIix0aGlzLmNhcmQ0b3JpZ3Bvcy54LHRoaXMuY2FyZDRvcmlncG9zLnkpXHJcblxyXG5cclxuICAgICAgICB0aGlzLmdhbWVIaW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdhbWVIaW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhdDE9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpXHJcbiAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLnNlYXQyPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKVxyXG4gICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVd4U2hhcmUoKTtcclxuICAgICAgICAgICAgaWYod2luZG93LnR5cGU9PTIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgLy8gdGhpcy5zZWF0MmNhcmRwb3M9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldFBvc2l0aW9uKClcclxuICAgICAgICBcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMua2V5Qm9hcmRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tb3VzZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVudGl0aWVzID0ge307XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJDb250cm9sID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1ckF2YXRhcklEID0gMDtcclxuICAgICAgICB0aGlzLmNhbWVyYUNvbnRyb2wgPSB0aGlzLmNhbWVyYS5nZXRDb21wb25lbnQoXCJDYW1lcmFDb250cm9sXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmVuYWJsZVBoeXNpY01hbmFnZXIoKTtcclxuICAgICAgICAvL3RoaXMuZW5hYmxlUGh5c2ljc0RlYnVnRHJhdygpO1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvL3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNreV9iZ1wiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5waWNrVXBlZCwgdGhpcyk7XHJcblxyXG4gICAgICAgICovXHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaEVuZGVkY2FyZDE6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQxc2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDFcclxuICAgICAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDFudW0pXHJcbiAgICAgICAgfS8qXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFjdC5pbmRleE9mKHRoaXMuY2FyZDFudW0pXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaEVuZGVkY2FyZDI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQyc2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDJudW0pXHJcbiAgICAgICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD10aGlzLmNhcmQyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmFjdC5pbmRleE9mKHRoaXMuY2FyZDJudW0pXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQzOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgaWYodGhpcy5hY3QubGVuZ3RoLTE+PTApe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDFudW0gfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDJudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkM251bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQ0bnVtKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jYXJkM3NlbGVjdGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMSlcclxuICAgICAgICAgICAgdGhpcy5hY3QucHVzaCh0aGlzLmNhcmQzbnVtKVxyXG4gICAgICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQ9dGhpcy5jYXJkM1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hY3QuaW5kZXhPZih0aGlzLmNhcmQzbnVtKVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG5cclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkNDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIGluZCA9IHRoaXMuYWN0LmluZGV4T2YodGhpcy5jYXJkNG51bSlcclxuICAgICAgICBpZiAoaW5kID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYodGhpcy5jYXJkNHNlbGVjdGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDQuc2V0U2NhbGUoMSlcclxuICAgICAgICAgICAgdGhpcy5hY3QucHVzaCh0aGlzLmNhcmQ0bnVtKVxyXG4gICAgICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQ9dGhpcy5jYXJkNFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKmVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hY3QuaW5kZXhPZih0aGlzLmNhcmQ0bnVtKVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgfSxcclxuICAgIGdldEJhdHRlcnlQZXJjZW50OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuQU5EUk9JRF9BUEksIFwiZ2V0QmF0dGVyeVBlcmNlbnRcIiwgXCIoKUZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLklPU19BUEksIFwiZ2V0QmF0dGVyeVBlcmNlbnRcIik7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDAuOTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nPXRoaXMuYWN0LmpvaW4oXCJcIilcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKS8xMDAwLzYwKTtcclxuICAgICAgICBpZih0aGlzLl9sYXN0TWludXRlICE9IG1pbnV0ZXMpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0TWludXRlID0gbWludXRlcztcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgaCA9IGggPCAxMD8gXCIwXCIraDpoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgbSA9IG0gPCAxMD8gXCIwXCIrbTptO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lTGFiZWwuc3RyaW5nID0gXCJcIiArIGggKyBcIjpcIiArIG07ICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBvd2VyID0gY2MuZmluZChcIkNhbnZhcy9iZzIvcG93ZXJcIilcclxuICAgICAgICBwb3dlci5zY2FsZVggPSB0aGlzLmdldEJhdHRlcnlQZXJjZW50KCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9uYWRkYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIitcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25yZWR1Y2VhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmFjdC5wdXNoKFwiLVwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBvbm11bGFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIqXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uZGl2YWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIi9cIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25sZWZhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmFjdC5wdXNoKFwiKFwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBvbnJpZ2FjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIpXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uZGVsYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdmFyIG51bT10aGlzLmFjdC5wb3AoKVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkMSkgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgaWYodGhpcy5sYXN0dG91Y2hjYXJkPT10aGlzLmNhcmQyKSB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDMpIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkNCkgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPW51bGxcclxuXHJcbiAgICB9LFxyXG4gICAgb25zdXJlYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5jYXJkMXNlbGVjdGVkPT1mYWxzZXx8dGhpcy5jYXJkMnNlbGVjdGVkPT1mYWxzZXx8dGhpcy5jYXJkM3NlbGVjdGVkPT1mYWxzZXx8dGhpcy5jYXJkNHNlbGVjdGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi5Zub5byg54mM6YO95b+F6aG75L2/55So5LiA5qyh77yM6K+36YeN5paw6K6h566XXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkM3NlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDQuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB0aGlzLmFjdD1bXVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG5cclxuICAgICAgICB0aGlzLmNhcmQxLnNldFNjYWxlKDAuOClcclxuICAgICAgICB0aGlzLmNhcmQyLnNldFNjYWxlKDAuOClcclxuICAgICAgICB0aGlzLmNhcmQzLnNldFNjYWxlKDAuOClcclxuICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDAuOClcclxuXHJcbiAgICAgICAgdmFyIHN0cj10aGlzLmFjdC5qb2luKFwiXCIpXHJcbiAgICAgICAgdmFyIHJlcz0wO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgLy92YXIgcmVzPWV2YWwoc3RyKTtcclxuICAgICAgICAgICAgLy92YXIgcmVzPSB3aW5kb3cuYmluZGluZy5ldmFsKHN0cilcclxuICAgICAgICAgICAgcmVzPXdpbmRvdy5ldmFsMihzdHIpXHJcbiAgICAgICAgICAgIC8vY2MubG9nKFwidHR0dHR0dHR0dHR0dHR0XCIscmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaHtcclxuICAgICAgICAgICAgLy9yZXM9XCJzeW50YXggZXJyb3JcIlxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIui+k+WFpeaXoOaViO+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWxlcnQoKTtcclxuICAgICAgICB0aGlzLmFjdD1bXVxyXG4gICAgICAgIC8vdGhpcy5hY3QucHVzaChyZXMpXHJcbiAgICAgICAgaWYocmVzPT0yNCl7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIub25zdXJlYWN0KHN0cilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLorqHnrpfnu5PmnpzkuLpcIiArIHJlcyArIFwi5LiN5q2j56Gu77yM6K+36YeN5paw6K6h566XXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5sb2coXCJzdWJtaXQ9XCIscmVzKVxyXG5cclxuICAgIH0sXHJcbiAgICBwaWNrVXBlZDpmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJ3b3JsZHNlbmNlLnBpY2t1cGVkXCIpXHJcblxyXG4gICAgfSxcclxuICAgIGluc3RhbGxFdmVudHMgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQXZhdGFyRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTGVhdmVXb3JsZFwiLCB0aGlzLCBcIm9uTGVhdmVXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImdhbWVfYmVnaW5fcHVzaFwiLCB0aGlzLCBcImdhbWVfYmVnaW5fcHVzaFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImVudGl0eV91cGRhdGVob2xkc1wiLCB0aGlzLCBcImVudGl0eV91cGRhdGVob2xkc1wiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm5ld1R1cm5cIiwgdGhpcywgXCJuZXdUdXJuXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiLCB0aGlzLCBcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbm90aGVyTmV0Y3V0XCIsIHRoaXMsIFwib25vdGhlck5ldGN1dFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uR2FtZU92ZXJcIiwgdGhpcywgXCJvbkdhbWVPdmVyXCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uRGlzY29ubmVjdGVkXCIsIHRoaXMsIFwib25EaXNjb25uZWN0ZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQ29ubmVjdGlvblN0YXRlXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGVcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25BdmF0YXJDb250aW51ZUdhbWVcIiwgdGhpcywgXCJvbkF2YXRhckNvbnRpbnVlR2FtZVwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbnF1aWNrX2NoYXRcIiwgdGhpcywgXCJvbnF1aWNrX2NoYXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmVtb2ppXCIsIHRoaXMsIFwib25lbW9qaVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uaXB0Q2hhdFwiLCB0aGlzLCBcIm9uaXB0Q2hhdFwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkVudGVyV29ybGQyXCIsIHRoaXMsIFwib25FbnRlcldvcmxkMlwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcInVwZGF0ZWdhbWVzdHV0c1wiLCB0aGlzLCBcInVwZGF0ZWdhbWVzdHV0c1wiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImVudGl0eV91cGRhdGVyb29ta2V5XCIsIHRoaXMsIFwiZW50aXR5X3VwZGF0ZXJvb21rZXlcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbnN5bmNzdXJlYWN0XCIsIHRoaXMsIFwib25zeW5jc3VyZWFjdFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uam9pblByaXZhdGVSb29tXCIsIHRoaXMsIFwib25qb2luUHJpdmF0ZVJvb21cIik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgZW50aXR5X3VwZGF0ZXJvb21rZXk6ZnVuY3Rpb24ocm9vbUtleWMsYXZhdGFyKXtcclxuICAgICAgICBjYy5sb2coXCJlbnRpdHlfdXBkYXRlcm9vbWtleWVudGl0eV91cGRhdGVyb29ta2V5PVwiLHJvb21LZXljKVxyXG4gICAgICAgIHRoaXMuUm9vbUlELnN0cmluZz1cIuaIv+mXtOWPtzpcIityb29tS2V5Yy5qb2luKFwiXCIpXHJcbiAgICAgICAgdGhpcy5yb29tS2V5Yz1yb29tS2V5Yy5qb2luKFwiXCIpXHJcblxyXG4gICAgfSxcclxuICAgIGVuYWJsZVd4U2hhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OnRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgIHd4Lm9uU2hhcmVBcHBNZXNzYWdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5omN6Im6MjTngrnlsI9QS1wiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6U0hBUkVfUElDVFVSRSxcclxuICAgICAgICAgICAgICAgIC8vcm9vbUlEOnNla2YuUm9vbUlELnN0cmluZyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcblxyXG4gICAgZW5hYmxlUGh5c2ljTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwidGVzdDFcIilcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9dHJ1ZTtcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVQaHlzaWNzRGVidWdEcmF3OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJ0ZXN0MlwiKVxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfcGFpckJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfY2VudGVyT2ZNYXNzQml0IHxcclxuICAgICAgICAgICAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfc2hhcGVCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3JheUNhc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG5cclxuICAgIHVuSW5zdGFsbEV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25FbnRlcldvcmxkXCIsIHRoaXMsIFwib25FbnRlcldvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcImdhbWVfYmVnaW5fcHVzaFwiLCB0aGlzLCBcImdhbWVfYmVnaW5fcHVzaFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsIHRoaXMsIFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiLCB0aGlzLCBcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9ub3RoZXJOZXRjdXRcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uR2FtZU92ZXJcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uRGlzY29ubmVjdGVkXCIsIHRoaXMsIFwib25EaXNjb25uZWN0ZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbnF1aWNrX2NoYXRcIiwgdGhpcywgXCJvbnF1aWNrX2NoYXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uZW1vamlcIiwgdGhpcywgXCJvbmVtb2ppXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkVudGVyV29ybGQyXCIsIHRoaXMsIFwib25FbnRlcldvcmxkMlwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwidXBkYXRlZ2FtZXN0dXRzXCIsIHRoaXMsIFwidXBkYXRlZ2FtZXN0dXRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uam9pblByaXZhdGVSb29tXCIsIHRoaXMsIFwib25qb2luUHJpdmF0ZVJvb21cIik7XHJcbiAgICB9LFxyXG4gICAgb25qb2luUHJpdmF0ZVJvb206ZnVuY3Rpb24obnVtKXtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3RhcnRTY2VuZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2dpbnJlcz1udW1cclxuICAgICAgICAgICAgY2MubG9nKFwic3RhcnRzY2VuZT09PT53b3Jkc2NlbmVcIilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9ucXVpY2tfY2hhdDpmdW5jdGlvbihlaWQsaWR4KXtcclxuICAgICAgICAvL2NjLmxvZyhcIjc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzdxdWlja19jaGF0PVwiLGVpZCxpZHgpXHJcbiAgICAgICAgdmFyIHN0cnN0cj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiQ2hhdFwiKS5nZXRRdWlja0NoYXRJbmZvKGlkeClbXCJjb250ZW50XCJdXHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhxdWlja19jaGF0PVwiLHN0cnN0cilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbmVtb2ppOmZ1bmN0aW9uKGVpZCxuYW1lKXtcclxuICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OGVtb2ppPVwiLG5hbWUpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmVtb2ppKG5hbWUpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuZW1vamkobmFtZSlcclxuICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uaXB0Q2hhdDpmdW5jdGlvbihlaWQsc3Ryc3RyKXtcclxuICAgICAgICBjYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhlaXB0Q2hhdD1cIixzdHJzdHIpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgIC8vIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheWVyUmVhZHlTdGF0ZUNoYW5nZTpmdW5jdGlvbihlaWQsc3RhdGUpe1xyXG4gICAgICAgIGNjLmxvZyhcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkgeyAgIFxyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlIFxyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPXRydWUgXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgXHJcbiAgICAgICAgfSAgICBcclxuXHJcbiAgICB9LFxyXG4gICAgb251cGRhdGVHYW1lc3RhdGVzOmZ1bmN0aW9uKGN1cklELHRpbWUpe1xyXG4gICAgICAgIGNjLmxvZyhcIm9udXBkYXRlR2FtZXN0YXRlc1wiKVxyXG4gICAgICAgIHRoaXMubmV3VHVybihjdXJJRCx0aW1lKVxyXG5cclxuICAgIH0sXHJcbiAgICB1cGRhdGVnYW1lc3R1dHM6ZnVuY3Rpb24obnVtKXtcclxuICAgICAgICBpZihudW09PTEpey8v5pyN5Yqh5Zmo5q2j5ZyocGxheWluZ+S4rVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsvL+S4gOWxgOW3sue7k+adn1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbm90aGVyTmV0Y3V0OmZ1bmN0aW9uKGN1cklEKXtcclxuICAgICAgICBjYy5sb2coXCJvbm90aGVyTmV0Y3V044CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CCXCIpXHJcbiAgICAgICAgaWYoY3VySUQ9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi5YW25LuW546p6YCD5ZG977yM5ri45oiP6ams5LiK57uT5p2fLi4uLi4uLlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLnjqnlrrZcIitLQkVuZ2luZS5hcHAuZW50aXRpZXNbY3VySURdLmFjY291bnROYW1lICtcIuaOiee6v++8jOivt+etieW+hS4uLi4uLi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxMy4wLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgLy90aGlzLmdhbWVTdGF0ZS5uZXdUdXJuKDE1KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbnN5bmNzdXJlYWN0OmZ1bmN0aW9uKHN0cnMpe1xyXG4gICAgICAgIGNjLmxvZyhcIndvcmxkOjpvbnN5bmNzdXJlYWN0XCIsIHN0cnMpXHJcbiAgICAgICAgLy90aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAvL3RoaXMuZ2FtZUhpbnQuc3RyaW5nID0gc3Ryc1xyXG4gICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfSxcclxuICAgIG9uRGlzY29ubmVjdGVkIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJkaXNjb25uZWN0ISB3aWxsIHRyeSB0byByZWNvbm5lY3QuLi5cIik7XHJcbiAgICAgICAgLy92YXIgYWN0aW9uID0gY2MuZmFkZVRvKDEuMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcImRpc2Nvbm5lY3QhIHdpbGwgdHJ5IHRvIHJlY29ubmVjdC4uLlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGVzdHJveXBsYXllcigpXHJcbiAgICAgICAgS0JFbmdpbmUuYXBwLnJlbG9naW5CYXNlYXBwKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblJlbG9naW5CYXNlYXBwVGltZXIgOiBmdW5jdGlvbihzZWxmKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJ3aWxsIHRyeSB0byByZWNvbm5lY3QoXCIgKyB0aGlzLnJlbG9naW5Db3VudCArIFwiKS4uLlwiKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgZmFpbGVkKOaWree6v+mHjei/nuWksei0pSksIGVycj1cIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSkpOyAgIFxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwicmVvZ2luIGlzIHN1Y2Nlc3NmdWxseSEo5pat57q/6YeN6L+e5oiQ5YqfISlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHRcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcInJlb2dpbiBpcyBzdWNjZXNzZnVsbHkhKOaWree6v+mHjei/nuaIkOWKnyEpXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBvbkNvbm5lY3Rpb25TdGF0ZSA6IGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcclxuICAgICAgICBpZighc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBLQkVuZ2luZS5FUlJPUl9NU0coXCJDb25uZWN0KFwiICsgS0JFbmdpbmUuYXBwLmlwICsgXCI6XCIgKyBLQkVuZ2luZS5hcHAucG9ydCArIFwiKSBpcyBlcnJvciEgKOi/nuaOpemUmeivrylcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJDb25uZWN0IHN1Y2Nlc3NmdWxseSwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5oiQ5Yqf77yM6K+3562J5YCZLi4uKVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVxQ2hhbmdlUmVhZHlTdGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgcGxheWVyLnJlcUNoYW5nZVJlYWR5U3RhdGUoKVxyXG4gICAgICAgIH0gICBcclxuICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuc2V0UmVhZHkodHJ1ZSlcclxuICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgICBcclxuICAgIH0sXHJcbiAgICBlbnRpdHlfdXBkYXRlaG9sZHM6ZnVuY3Rpb24oaG9sZHMsZW50aXR5KXtcclxuICAgICAgICBjYy5sb2coXCJlbnRpdHlfdXBkYXRlaG9sZHNcIixlbnRpdHkuaWQsaG9sZHMpXHJcbiAgICAgICAgaWYoZW50aXR5LmNsYXNzTmFtZSA9PSBcIkF2YXRhclwiKSB7XHJcbiAgICAgICAgICAgIGlmKGVudGl0eS5pZD09S0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKSB7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9aG9sZHNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXsgIC8vc2NhbGV4PT0tMSxcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9ob2xkcz1ob2xkc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgIH0sXHJcbiAgICBnYW1lX2JlZ2luX3B1c2g6ZnVuY3Rpb24oZW50aXR5KXtcclxuICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpnYW1lX2JlZ2luX3B1c2hcIilcclxuICAgICAgICAvL3RoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAvL3RoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAvL3RoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9ZW50aXR5LmhvbGRzXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PWZhbHNlXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgXHJcblxyXG4gICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgIH0sXHJcbiAgICBvbkVudGVyV29ybGQ6IGZ1bmN0aW9uIChlbnRpdHkpIHtcclxuICAgICAgICAvL1NDQUxFPTE7XHJcbiAgICAgICAgY2MubG9nKFwib25FbnRlcldvcmxkIGVudGl0eS5pZD1cIixlbnRpdHkuaWQpXHJcbiAgICAgICAgaWYoIWVudGl0eS5pc1BsYXllcigpKSB7XHJcbiAgICAgICAgICAgIHZhciBhZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZD09ZW50aXR5LmlkKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9ZW50aXR5LmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1lbnRpdHkuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5OyAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6b25FbnRlcldvcmxkPVwiLHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeSlcclxuICAgICAgICAgICAgfWVsc2V7ICAvL3NjYWxleD09LTEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGluZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHk7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkVudGVyV29ybGQyOiBmdW5jdGlvbiAoZW50aXR5SUQpIHtcclxuICAgICAgICBjYy5sb2coXCJvbkVudGVyV29ybGQyXCIpXHJcbiAgICAgICAgdmFyIGVudGl0eT1LQkVuZ2luZS5hcHAuZW50aXRpZXNbZW50aXR5SURdXHJcbiAgICAgICAgLy9TQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm9uRW50ZXJXb3JsZCBlbnRpdHkuaWQ9XCIsZW50aXR5LmlkKVxyXG4gICAgICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVudGl0eS5pZCkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgIH1lbHNleyAgLy9zY2FsZXg9PS0xLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hpbmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1lbnRpdHkuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWVudGl0eS5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5OyBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpvbkVudGVyV29ybGQ9XCIsdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5KVxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgIH0sXHJcbiAgICBvbkxlYXZlV29ybGQ6IGZ1bmN0aW9uIChlbnRpdHkpIHtcclxuICAgICAgICBjYy5sb2coXCJvbkxlYXZlV29ybGRcIixlbnRpdHkuaWQsZW50aXR5LmNsYXNzTmFtZSlcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICB0aGlzLm1hdGNoaW5nLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLmZhZGVJbigwLjUpOy8v5riQ5pi+XHJcbiAgICAgICAgdmFyIGFjdGlvbjIgPSBjYy5mYWRlT3V0KDAuNSk7Ly/muJDpmpDmlYjmnpxcclxuICAgICAgICB2YXIgcmVwZWF0PWNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYWN0aW9uMSxhY3Rpb24yKSlcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLnJ1bkFjdGlvbihyZXBlYXQpO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY2MubG9nKFwib25MZWF2ZVdvcmxkXCIsZW50aXR5LmlkLGVudGl0eS5jbGFzc05hbWUpXHJcbiAgICAgICAgaWYodGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdICYmIGVudGl0eS5jbGFzc05hbWUgPT0gXCJBdmF0YXJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXS5yZW1vdmVGcm9tUGFyZW50KClcclxuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdPW51bGxcclxuICAgICAgICB9ICBcclxuICAgICAgICAqLyAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25BdmF0YXJFbnRlcldvcmxkIDogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICAgY2MubG9nKFwib25BdmF0YXJFbnRlcldvcmxkXCIpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoYXZhdGFyKTtcclxuICAgIH0sXHJcblxyXG4gICBcclxuICAgIHVwZGF0ZVBvc2l0aW9uIDogZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICAgICBcclxuICAgIH0sXHQgIFxyXG4gICAgXHJcbiAgICBzZXRfcG9zaXRpb246IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRDYW1lcmFUYXJnZXQ6IGZ1bmN0aW9uKGVudGl0eUlEKXtcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1BsYXllckhhc0l0ZW06IGZ1bmN0aW9uKGxlZnQpIHtcclxuICAgICAgICAvL2NjLmxvZyhcInRlc3QxNFwiKVxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgbmV3VHVybjogZnVuY3Rpb24oYXZhdGFyLGVpZCwgc2Vjb25kLGNhcmQwMSxjYXJkMDIsY2FyZDAzLGNhcmQwNCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3Iuc3RvcEJHTSgpXHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInR1cm5cIilcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUubmV3VHVybihzZWNvbmQpO1xyXG4gICAgICAgIHRoaXMuY2xvY2suYWN0aXZlPXRydWVcclxuICAgICAgICBpZighdGhpcy5nYW1lU3RhdGUuaXNHYW1lU3RhcnQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5zZXRHYW1lU3RhcnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxLjAsIDApO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWwuc3RyaW5nID0gXCLmuLjmiI/lvIDlp4sgISEhXCI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sYWJlbC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmNhcmQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5jYXJkMy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuY2FyZDQuYWN0aXZlPXRydWVcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhcmQwMT1jYXJkMDE7XHJcbiAgICAgICAgdGhpcy5jYXJkMDI9Y2FyZDAyO1xyXG4gICAgICAgIHRoaXMuY2FyZDAzPWNhcmQwMztcclxuICAgICAgICB0aGlzLmNhcmQwND1jYXJkMDQ7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIHZhciBBX2FjdDE9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDI9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDM9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDQ9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDE9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDI9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDM9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDQ9bnVsbFxyXG5cclxuICAgICAgICB2YXIgeDE9dGhpcy5zZWF0MWNhcmRwb3MueDtcclxuICAgICAgICB2YXIgeTE9dGhpcy5zZWF0MWNhcmRwb3MueVxyXG5cclxuICAgICAgICB2YXIgeDI9dGhpcy5zZWF0MmNhcmRwb3MueDtcclxuICAgICAgICB2YXIgeTI9dGhpcy5zZWF0MmNhcmRwb3MueVxyXG4gICAgICAgIHZhciBjYXJkMW9yaWdwb3N4PXRoaXMuY2FyZDFvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDFvcmlncG9zeT10aGlzLmNhcmQxb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkMm9yaWdwb3N4PXRoaXMuY2FyZDJvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDJvcmlncG9zeT10aGlzLmNhcmQyb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkM29yaWdwb3N4PXRoaXMuY2FyZDNvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDNvcmlncG9zeT10aGlzLmNhcmQzb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkNG9yaWdwb3N4PXRoaXMuY2FyZDRvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDRvcmlncG9zeT10aGlzLmNhcmQ0b3JpZ3Bvcy55XHJcbiAgICAgICAgY2MubG9nKFwidGhpcy5jdXJpZD1cIixlaWQpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLnNlYXQyY2FyZHBvcz1cIix4MSx5MSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuc2VhdDFjYXJkcG9zPVwiLHgyLHkyKVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDFvcmlncG9zPVwiLGNhcmQxb3JpZ3Bvc3gsY2FyZDFvcmlncG9zeSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIixjYXJkMm9yaWdwb3N4LGNhcmQyb3JpZ3Bvc3kpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsY2FyZDNvcmlncG9zeCxjYXJkM29yaWdwb3N5KVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDJvcmlncG9zPVwiLGNhcmQ0b3JpZ3Bvc3gsY2FyZDRvcmlncG9zeSlcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgaWYoZWlkPT0wKXsvL+WQhOWbnuWQhOWutlxyXG4gXHJcblxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG5cclxuICAgICAgICAgICAgQV9hY3QzPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3Q0PWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihlaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVpZD09S0JFbmdpbmUuYXBwLnBsYXllcigpLmlkLG1vdmV0byBzZWF0MVwiLGVpZCxLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpXHJcbiAgICAgICAgICAgIEFfYWN0MT1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0Mj1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0ND1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2coXCJlaWQhPUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCxtb3ZldG8gc2VhdDJcIixlaWQsS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKVxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmNhcmQxbnVtPTIrcGFyc2VJbnQoKGNhcmQwMSsxMDAwLTEwNjEpLzQpICAvLzEsMiwzLDRcclxuICAgICAgICB0aGlzLmNhcmQybnVtPTIrcGFyc2VJbnQoKGNhcmQwMisxMDAwLTEwNjEpLzQpXHJcbiAgICAgICAgdGhpcy5jYXJkM251bT0yK3BhcnNlSW50KChjYXJkMDMrMTAwMC0xMDYxKS80KVxyXG4gICAgICAgIHRoaXMuY2FyZDRudW09MitwYXJzZUludCgoY2FyZDA0KzEwMDAtMTA2MSkvNClcclxuICAgICAgICBpZiAodGhpcy5jYXJkMW51bT4xMCkge3RoaXMuY2FyZDFudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkMm51bT4xMCkge3RoaXMuY2FyZDJudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkM251bT4xMCkge3RoaXMuY2FyZDNudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkNG51bT4xMCkge3RoaXMuY2FyZDRudW09MX1cclxuXHJcbiAgICAgICAgdmFyIGZ1bmNvdW50MT1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MSgpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoY291bnQxKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bmNvdW50Mj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MigpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoY291bnQyKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgIHZhciBmdW4xPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgxLFxyXG4gICAgICAgICAgICB0YXJnZXQueT15MTtcclxuICAgICAgICAgICAgY2FyZDAxPWNhcmQwMSsxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDErXCJAMnhcIlxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLGNjLlNwcml0ZUZyYW1lLGZ1bmN0aW9uKGVycixzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICBzZWxmLmNhcmQxLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPSBzcHJpdGVGcmFtZVxyXG4gICAgICAgICAgICB9KTsgKi9cclxuICAgICAgICB9LCB0aGlzLmNhcmQxKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBmdW4yPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgxXHJcbiAgICAgICAgICAgIHRhcmdldC55PXkxXHJcbiAgICAgICAgICAgIGNhcmQwMj1jYXJkMDIrMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAyK1wiQDJ4XCJcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMik7XHJcbiAgICAgICAgdmFyIGZ1bjM9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9eDJcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTJcclxuICAgICAgICAgICAgY2FyZDAzPWNhcmQwMysxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDMrXCJAMnhcIlxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICB9LCB0aGlzLmNhcmQzKTtcclxuICAgICAgICB2YXIgZnVuND1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MlxyXG4gICAgICAgICAgICB0YXJnZXQueT15MlxyXG4gICAgICAgICAgICBjYXJkMDQ9Y2FyZDA0KzEwMDA7XHJcbiAgICAgICAgICAgIHZhciB1cmw9XCJjYXJkX1wiK2NhcmQwNCtcIkAyeFwiXHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodXJsKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDQpO1xyXG5cclxuICAgICAgICB2YXIgZnVuMTE9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDFvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkMW9yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGZ1bjIyPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQyb3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDJvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDIpO1xyXG4gICAgICAgIHZhciBmdW4zMz1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD1jYXJkM29yaWdwb3N4XHJcbiAgICAgICAgICAgIHRhcmdldC55PWNhcmQzb3JpZ3Bvc3lcclxuICAgICAgICB9LCB0aGlzLmNhcmQzKTtcclxuICAgICAgICB2YXIgZnVuNDQ9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDRvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkNG9yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkNCk7XHJcblxyXG4gICAgICAgIEJfYWN0MT1jYy5tb3ZlVG8oMSxjYy52MihjYXJkMW9yaWdwb3N4LGNhcmQxb3JpZ3Bvc3kpKVxyXG4gICAgICAgIEJfYWN0Mj1jYy5tb3ZlVG8oMSxjYy52MihjYXJkMm9yaWdwb3N4LGNhcmQyb3JpZ3Bvc3kpKVxyXG4gICAgICAgIEJfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52MihjYXJkM29yaWdwb3N4LGNhcmQzb3JpZ3Bvc3kpKVxyXG4gICAgICAgIEJfYWN0ND1jYy5tb3ZlVG8oMSxjYy52MihjYXJkNG9yaWdwb3N4LGNhcmQ0b3JpZ3Bvc3kpKVxyXG5cclxuICAgICAgICBpZihlaWQ9PTEyMzQ1KXsvL+WQhOWbnuWQhOWutjLlvKBcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuMSxCX2FjdDEsZnVuMTEsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuMixCX2FjdDIsZnVuMjIsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkMy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuMyxCX2FjdDMsZnVuMzMsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkNC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuNCxCX2FjdDQsZnVuNDQsZnVuY291bnQyKSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7IC8v5LiA5a625Zub5bygXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0MSxmdW4xLGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3QxLGZ1bjExLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0MixmdW4yLGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3QyLGZ1bjIyLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0MyxmdW4zLGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3QzLGZ1bjMzLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0NCxmdW40LGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3Q0LGZ1bjQ0LGZ1bmNvdW50MikpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBjYy5sb2coXCJ3d3d3d3duZXdUdXJuXCIsYXZhdGFyLmlkLCBzZWNvbmQsY2FyZDAxLGNhcmQwMixjYXJkMDMsY2FyZDA0KVxyXG5cclxuICAgICAgICB0aGlzLm9wdC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgXHJcbiAgICAgICBcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJlc2V0SXRlbTogZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb3RoZXJBdmF0YXJPblBpY2tVcEl0ZW06IGZ1bmN0aW9uKGF2YXRhcklELCBpdGVtSUQsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyVGhyb3dJdGVtOiBmdW5jdGlvbihhdmF0YXJJRCwgaXRlbUlELCBmb3JjZSl7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyT25TdG9wV2FsazogZnVuY3Rpb24oYXZhdGFySUQsIHBvcyl7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyT25TdGFydFdhbGs6IGZ1bmN0aW9uKGF2YXRhcklELCBtb3ZlRmxhZyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyUmVjb3Zlckl0ZW06IGZ1bmN0aW9uKGF2YXRhcklELCBpdGVtSUQpIHtcclxuICAgICAgICAvL2NjLmxvZyhcInRlc3QxOFwiKVxyXG4gICAgfSxcclxuXHJcbiAgICBvdGhlckF2YXRhck9uTGVmdEp1bXA6IGZ1bmN0aW9uKGF2YXRhcklEKXtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb3RoZXJBdmF0YXJPblJpZ2h0SnVtcDogZnVuY3Rpb24oYXZhdGFySUQpe1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvblJlY3ZEYW1hZ2U6IGZ1bmN0aW9uKGF2YXRhcklELCBoYXJtLCBocCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiV29ybGRTY2VuZTo6b3RoZXJBdmF0YXJSZWN2RGFtYWdlOiBhdmF0YXJJRD0lZCwgaGFybT0lZCwgaHA9JWQgXCIsIGF2YXRhcklELCBoYXJtLCBocCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQXZhdGFyRGllOiBmdW5jdGlvbihhdmF0YXJJRCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiV29ybGRTY2VuZTo6b25BdmF0YXJEaWUsIGF2YXRhcmlkPSVkXCIsIGF2YXRhcklEKVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkdhbWVPdmVyOiBmdW5jdGlvbihhdmF0YXJJRCwgaXNXaW4sIGhwLCB0b3RhbFRpbWUsIHRvdGFsSGFybSwgc2NvcmUpIHtcclxuICAgICAgICBpZihhdmF0YXJJRCA9PSBLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpIHtcclxuICAgICAgICAgICAgSFAgPSBocDtcclxuICAgICAgICAgICAgVE9UQUxfVElNRSA9IHRvdGFsVGltZTtcclxuICAgICAgICAgICAgT3RoZXJIUCA9IHRvdGFsSGFybTtcclxuICAgICAgICAgICAgU0NPUkUgPSBzY29yZTtcclxuICAgICAgICAgICAgTFZsZXZlbD1NYXRoLnJvdW5kKDEwMCpTQ09SRSlcclxuICAgICAgICAgICAgdGhpcy51bkluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICAgICAgaWYoaXNXaW4pIHtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIldpblNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9zZVNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwiODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OFwiKVxyXG4gICAgICAgIC8vdGhpcy5kaXNFbmFibGVDb250cm9sUGxheWVyKCk7XHJcbiAgICAgICAgLy90aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgb25SZXNldEl0ZW06IGZ1bmN0aW9uKGl0ZW1JRCwgcG9zaXRpb24pIHtcclxuICAgICAgICAvLy9TQ0FMRT0xO1xyXG4gICAgICAgXHJcbiAgICBcclxuICAgICAgICAvL2l0ZW0uc2V0UG9zaXRpb24ocG9zaXRpb24ueCpTQ0FMRSwgcG9zaXRpb24ueipTQ0FMRSk7XHJcbiAgICB9LFxyXG5cclxuICAgIERlc3Ryb3lwbGF5ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNjLmxvZyhcIkF2YXRhciBjbGllbnQgZGllIHNvIGRlc3Ryb3kgV29ybGRTY2VuZSBwbGF5ZXJwcmVmYWJcIilcclxuICAgICAgICBpZih0aGlzLnBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZW1vdmVGcm9tUGFyZW50KHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcblxyXG4gICAgfSxcclxuICAgIGludmF0ZWZyaWVuZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vdGhpcy55YW9xaW5nLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgdGl0bGU6IHNlbGYuUm9vbUlELnN0cmluZyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IFNIQVJFX1BJQ1RVUkUsXHJcbiAgICAgICAgICAgIC8vcXVlcnk6IFwiUm9vbWlkPVwiICsgc2VsZi5yb29tS2V5YyArIFwiJlVzZXJOYW1lPVwiICsgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsLy8g5Yir5Lq654K55Ye76ZO+5o6l5pe25Lya5b6X5Yiw55qE5pWw5o2uXHJcbiAgICAgICAgICAgIC8vcXVlcnk6IFwibmljaz1cIiArIG5pY2sgKyBcIiZnZW5kZXI9XCIgKyBnZW5kZXIgKyBcIiZjaXR5PVwiICsgY2l0eSxcclxuICAgICAgICAgICAgcXVlcnk6XCJSb29taWQ9XCIrIHNlbGYucm9vbUtleWMrXCImVXNlck5hbWU9XCIrIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLliIbkuqvmiJDlip9cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWIhuS6q+aIkOWKn1wiICsgcmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6KaB5rGC5bCP56iL5bqP6L+U5Zue5YiG5Lqr55uu5qCH5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5YiG5Lqr5aSx6LSlXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55YW9xaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlUGxheWVyOiBmdW5jdGlvbihhdmF0YXIpIHtcclxuICAgICAgIC8vIFNDQUxFPTE7XHJcbiAgICAgICAgY2MubG9nKFwibmV3IGNyZWF0ZVBsYXllciB0aGlzLnBsYXllcj3vvIxhdmF0YXIubW9kZWxJRD1cIix0aGlzLnBsYXllcixhdmF0YXIubW9kZWxJRCApXHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllcikge1xyXG4gICAgICAgICAgICBpZihhdmF0YXIuaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1hdmF0YXIuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9YXZhdGFyLmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gIHRoaXMuc2VhdDE7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXT10aGlzLnBsYXllciBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWF2YXRhci5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1hdmF0YXIuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSAgdGhpcy5zZWF0MjtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1thdmF0YXIuaWRdPXRoaXMucGxheWVyIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIGN0cmw9IHRoaXMucGxheWVyLmFkZENvbXBvbmVudChcIkF2YXRhckNvbnRyb2xcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbj0gdGhpcy5wbGF5ZXIuYWRkQ29tcG9uZW50KFwiQXZhdGFyQWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRQb3NpdGlvbihhdmF0YXIucG9zaXRpb24ueCpTQ0FMRSwgYXZhdGFyLnBvc2l0aW9uLnoqU0NBTEUpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXSA9IHRoaXMucGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2coXCJhZnRlciBjcmVhdGVQbGF5ZXIgdGhpcy5wbGF5ZXI977yMYXZhdGFyLm1vZGVsSUQ9XCIsdGhpcy5wbGF5ZXIsYXZhdGFyLm1vZGVsSUQgKVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkF2YXRhckNvbnRpbnVlR2FtZTogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICB0aGlzLmNyZWF0ZVBsYXllcihhdmF0YXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVDb250cm9sUGxheWVyOiBmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBkaXNFbmFibGVDb250cm9sUGxheWVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=