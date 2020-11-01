
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
    this.installEvents();
    this.RoomID = cc.find("Canvas/bg2/RoomID").getComponent(cc.Label);
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
  },
  enableWxShare: function enableWxShare() {
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.onShareAppMessage(function () {
      return {
        title: "投石作战",
        imageUrl: SHARE_PICTURE
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcV29ybGRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJiaW5kanMiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNlYXQxIiwidHlwZSIsIk5vZGUiLCJzZWF0MiIsInNob3d3YW5nZmEiLCJpbnRyb2R1Y2UiLCJhY3RpdmUiLCJoaWRld2FuZ2ZhIiwic2hvd3NldHRpbmciLCJpc3Nob3dzZXR0aW5nIiwic2V0dGluZ05vZGUiLCJzaG93Y2hhdCIsImlzc2hvd2NoYXQiLCJjaGF0Tm9kZSIsImxvZyIsIm9uTG9hZCIsImluc3RhbGxFdmVudHMiLCJSb29tSUQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJ3aW5kb3ciLCJtYXRjaGluZyIsInN0b3BBbGxBY3Rpb25zIiwiYWN0aW9uMSIsImZhZGVJbiIsImFjdGlvbjIiLCJmYWRlT3V0IiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwiX3RpbWVMYWJlbCIsInN5cyIsInBsYXRmb3JtIiwiV0VDSEFUX0dBTUUiLCJlbmFibGVXeFNoYXJlIiwiY2FyZDEiLCJjYXJkMiIsImNhcmQzIiwiY2FyZDQiLCJvcHQiLCJsYWJlbCIsImFjdCIsImNhcmQxbnVtIiwiY2FyZDJudW0iLCJjYXJkM251bSIsImNhcmQ0bnVtIiwibGFzdHRvdWNoY2FyZCIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfRU5EIiwib25Ub3VjaEVuZGVkY2FyZDEiLCJvblRvdWNoRW5kZWRjYXJkMiIsIm9uVG91Y2hFbmRlZGNhcmQzIiwib25Ub3VjaEVuZGVkY2FyZDQiLCJjYXJkMXNlbGVjdGVkIiwiY2FyZDJzZWxlY3RlZCIsImNhcmQzc2VsZWN0ZWQiLCJjYXJkNHNlbGVjdGVkIiwiZ2FtZVN0YXRlIiwiY2xvY2siLCJzcCIsImkiLCJjYXJkMW9yaWdwb3MiLCJwb3NpdGlvbiIsImNhcmQyb3JpZ3BvcyIsImNhcmQzb3JpZ3BvcyIsImNhcmQ0b3JpZ3BvcyIsImRlbHRhIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJnZXRPcmlnaW5hbFNpemUiLCJoZWlnaHQiLCJvdXQiLCJ2MiIsInNlYXQxY2FyZHBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwieSIsInNlYXQyY2FyZHBvcyIsImdhbWVIaW50Iiwib3BhY2l0eSIsImxlbmd0aCIsInNldFNjYWxlIiwicHVzaCIsImdldEJhdHRlcnlQZXJjZW50IiwiaXNOYXRpdmUiLCJvcyIsIk9TX0FORFJPSUQiLCJqc2IiLCJyZWZsZWN0aW9uIiwiY2FsbFN0YXRpY01ldGhvZCIsIkFORFJPSURfQVBJIiwiT1NfSU9TIiwiSU9TX0FQSSIsInVwZGF0ZSIsImR0Iiwic3RyaW5nIiwiam9pbiIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwibm93IiwiX2xhc3RNaW51dGUiLCJkYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJwb3dlciIsInNjYWxlWCIsIm9uYWRkYWN0Iiwib25yZWR1Y2VhY3QiLCJvbm11bGFjdCIsIm9uZGl2YWN0Iiwib25sZWZhY3QiLCJvbnJpZ2FjdCIsIm9uZGVsYWN0IiwibnVtIiwicG9wIiwib25zdXJlYWN0IiwiYWN0aW9uIiwiZmFkZVRvIiwic3RyIiwicmVzIiwiZXZhbDIiLCJwbGF5ZXIiLCJhcHAiLCJwaWNrVXBlZCIsImV2ZW50IiwiRXZlbnQiLCJyZWdpc3RlciIsImVudGl0eV91cGRhdGVyb29ta2V5Iiwicm9vbUtleWMiLCJhdmF0YXIiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJvblNoYXJlQXBwTWVzc2FnZSIsInRpdGxlIiwiaW1hZ2VVcmwiLCJTSEFSRV9QSUNUVVJFIiwiZW5hYmxlUGh5c2ljTWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJlbmFibGVkIiwibWFuYWdlciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVQaHlzaWNzRGVidWdEcmF3IiwiZW5hYmxlZERlYnVnRHJhdyIsImVuYWJsZWREcmF3Qm91bmRpbmdCb3giLCJkZWJ1Z0RyYXdGbGFncyIsIlBoeXNpY3NNYW5hZ2VyIiwiRHJhd0JpdHMiLCJlX2NlbnRlck9mTWFzc0JpdCIsImVfc2hhcGVCaXQiLCJlX3JheUNhc3QiLCJ1bkluc3RhbGxFdmVudHMiLCJkZXJlZ2lzdGVyIiwib25qb2luUHJpdmF0ZVJvb20iLCJsb2FkU2NlbmUiLCJsb2dpbnJlcyIsIm9ucXVpY2tfY2hhdCIsImVpZCIsImlkeCIsInN0cnN0ciIsImdldFF1aWNrQ2hhdEluZm8iLCJpZCIsImNoYXQiLCJvbmVtb2ppIiwibmFtZSIsImVtb2ppIiwib25pcHRDaGF0IiwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZSIsInN0YXRlIiwiX2lzUmVhZHkiLCJyZWZyZXNoIiwib251cGRhdGVHYW1lc3RhdGVzIiwiY3VySUQiLCJ0aW1lIiwibmV3VHVybiIsInVwZGF0ZWdhbWVzdHV0cyIsIm9ub3RoZXJOZXRjdXQiLCJlbnRpdGllcyIsImFjY291bnROYW1lIiwib25zeW5jc3VyZWFjdCIsInN0cnMiLCJvbkRpc2Nvbm5lY3RlZCIsIklORk9fTVNHIiwiRGVzdHJveXBsYXllciIsInJlbG9naW5CYXNlYXBwIiwib25SZWxvZ2luQmFzZWFwcFRpbWVyIiwic2VsZiIsInJlbG9naW5Db3VudCIsIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWQiLCJmYWlsZWRjb2RlIiwic2VydmVyRXJyIiwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSIsIm9uQ29ubmVjdGlvblN0YXRlIiwic3VjY2VzcyIsIkVSUk9SX01TRyIsImlwIiwicG9ydCIsInJlcUNoYW5nZVJlYWR5U3RhdGUiLCJzZXRSZWFkeSIsImVudGl0eV91cGRhdGVob2xkcyIsImhvbGRzIiwiZW50aXR5IiwiY2xhc3NOYW1lIiwiX2hvbGRzIiwiZ2FtZV9iZWdpbl9wdXNoIiwib25FbnRlcldvcmxkIiwiaXNQbGF5ZXIiLCJhZSIsIl91c2VyTmFtZSIsImF2YXRhclVybCIsIm9uRW50ZXJXb3JsZDIiLCJlbnRpdHlJRCIsIm9uTGVhdmVXb3JsZCIsIm9uQXZhdGFyRW50ZXJXb3JsZCIsImNyZWF0ZVBsYXllciIsInVwZGF0ZVBvc2l0aW9uIiwic2V0X3Bvc2l0aW9uIiwic2V0Q2FtZXJhVGFyZ2V0IiwiY2hlY2tQbGF5ZXJIYXNJdGVtIiwibGVmdCIsInNlY29uZCIsImNhcmQwMSIsImNhcmQwMiIsImNhcmQwMyIsImNhcmQwNCIsImlzR2FtZVN0YXJ0Iiwic2V0R2FtZVN0YXJ0IiwiQV9hY3QxIiwiQV9hY3QyIiwiQV9hY3QzIiwiQV9hY3Q0IiwiQl9hY3QxIiwiQl9hY3QyIiwiQl9hY3QzIiwiQl9hY3Q0IiwieDEiLCJ4IiwieTEiLCJ4MiIsInkyIiwiY2FyZDFvcmlncG9zeCIsImNhcmQxb3JpZ3Bvc3kiLCJjYXJkMm9yaWdwb3N4IiwiY2FyZDJvcmlncG9zeSIsImNhcmQzb3JpZ3Bvc3giLCJjYXJkM29yaWdwb3N5IiwiY2FyZDRvcmlncG9zeCIsImNhcmQ0b3JpZ3Bvc3kiLCJtb3ZlVG8iLCJwYXJzZUludCIsImZ1bmNvdW50MSIsImNhbGxGdW5jIiwidGFyZ2V0IiwicmVmcmVzaGNvdW50MSIsImZ1bmNvdW50MiIsInJlZnJlc2hjb3VudDIiLCJmdW4xIiwidXJsIiwiZnVuMiIsImZ1bjMiLCJmdW40IiwiZnVuMTEiLCJmdW4yMiIsImZ1bjMzIiwiZnVuNDQiLCJkZWxheVRpbWUiLCJyZXNldEl0ZW0iLCJvdGhlckF2YXRhck9uUGlja1VwSXRlbSIsImF2YXRhcklEIiwiaXRlbUlEIiwib3RoZXJBdmF0YXJUaHJvd0l0ZW0iLCJmb3JjZSIsIm90aGVyQXZhdGFyT25TdG9wV2FsayIsInBvcyIsIm90aGVyQXZhdGFyT25TdGFydFdhbGsiLCJtb3ZlRmxhZyIsIm90aGVyQXZhdGFyUmVjb3Zlckl0ZW0iLCJvdGhlckF2YXRhck9uTGVmdEp1bXAiLCJvdGhlckF2YXRhck9uUmlnaHRKdW1wIiwib25SZWN2RGFtYWdlIiwiaGFybSIsImhwIiwib25BdmF0YXJEaWUiLCJvbkdhbWVPdmVyIiwiaXNXaW4iLCJ0b3RhbFRpbWUiLCJ0b3RhbEhhcm0iLCJzY29yZSIsIkhQIiwiVE9UQUxfVElNRSIsIk90aGVySFAiLCJTQ09SRSIsIkxWbGV2ZWwiLCJyb3VuZCIsIm9uUmVzZXRJdGVtIiwibW9kZWxJRCIsInNldFBvc2l0aW9uIiwiU0NBTEUiLCJ6Iiwib25BdmF0YXJDb250aW51ZUdhbWUiLCJlbmFibGVDb250cm9sUGxheWVyIiwiZGlzRW5hYmxlQ29udHJvbFBsYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCLEVBQ0E7OztBQUNBLElBQUlDLE1BQU0sR0FBQ0QsT0FBTyxDQUFDLE9BQUQsQ0FBbEI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUU7QUFDSCxpQkFBUyxJQUROO0FBRUhDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZOLEtBREM7QUFNUkMsSUFBQUEsS0FBSyxFQUFFO0FBQ0gsaUJBQVMsSUFETjtBQUVIRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGTjtBQUlQOzs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFwQlEsR0FIUDtBQTBFTEUsRUFBQUEsVUFBVSxFQUFDLHNCQUFVO0FBQ2pCLFNBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUFzQixJQUF0QjtBQUNILEdBNUVJO0FBNkVMQyxFQUFBQSxVQUFVLEVBQUMsc0JBQVU7QUFDakIsU0FBS0Ys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RS9CLENBeG9DSTtBQTBvQ0xDLEVBQUFBLHNCQUFzQixFQUFFLGtDQUFXLENBRWxDO0FBNW9DSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbnZhciBLQkVuZ2luZSA9IHJlcXVpcmUoXCJrYmVuZ2luZVwiKTtcclxuLy92YXIgYmluZGpzPXJlcXVpcmUoXCJldmFsXCIpXHJcbnZhciBiaW5kanM9cmVxdWlyZShcImV2YWwyXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzZWF0MToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlYXQyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKlxyXG4gICAgICAgIHNldHRpbmc6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGF0OntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHBsYXllcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgcGlwaVByZWZhYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcG9wUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFyY2hlclByZWZhYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXJjaGVyUHJlZmFiMjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgam95U3RpY2tQcmVmYWI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG91Y2hSYW5nZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW1lcmE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ2FtZXJhLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNhbWVyYUNvbnRyb2w6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lU3RhdGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lSGludDogY2MuTGFiZWwsXHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcbiAgICBzaG93d2FuZ2ZhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPXRydWVcclxuICAgIH0sXHJcbiAgICBoaWRld2FuZ2ZhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPWZhbHNlXHJcbiAgICB9LFxyXG4gICAgc2hvd3NldHRpbmc6ZnVuY3Rpb24oKXtcclxuICAgICAgIC8vIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmlzc2hvd3NldHRpbmcgPSAhdGhpcy5zZXR0aW5nTm9kZS5hY3RpdmU7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nTm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd3NldHRpbmc7XHJcblxyXG4gICAgfSxcclxuICAgIHNob3djaGF0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0ID0gIXRoaXMuY2hhdE5vZGUuYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuY2hhdE5vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3djaGF0O1xyXG4gICAgICAgIGNjLmxvZyhcInNob3djaGF0XCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5Sb29tSUQ9Y2MuZmluZChcIkNhbnZhcy9iZzIvUm9vbUlEXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmludHJvZHVjZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbnRyb2R1Y2VcIilcclxuICAgICAgICB0aGlzLmludHJvZHVjZS5hY3RpdmU9ZmFsc2VcclxuXHJcbiAgICAgICAgaWYod2luZG93LnR5cGU9PTEpe1xyXG4gICAgICAgICAgICB0aGlzLm1hdGNoaW5nPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcIm1hdGNoaW5nXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1hdGNoaW5nPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcIm1hdGNoaW5nMlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcIm1hdGNoaW5nXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMubWF0Y2hpbmcuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHZhciBhY3Rpb24xID0gY2MuZmFkZUluKDAuNSk7Ly/muJDmmL5cclxuICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLmZhZGVPdXQoMC41KTsvL+a4kOmakOaViOaenFxyXG4gICAgICAgIHZhciByZXBlYXQ9Y2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShhY3Rpb24yLGFjdGlvbjEpKVxyXG4gICAgICAgIHRoaXMubWF0Y2hpbmcucnVuQWN0aW9uKHJlcGVhdCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLl9NdXNpY0RpY3QgPSB7fVxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoJ3NvdW5kLycsIGZ1bmN0aW9uIChjb3VudCwgdG90YWxDb3VudCwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX011c2ljRGljdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChjbGlwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX011c2ljRGljdFtjbGlwLm5hbWVdID0gY2xpcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKi9cclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5QkdNKFwiYmdNYWluXCIpXHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVMYWJlbCA9IGNjLmZpbmQoXCJDYW52YXMvYmcyL3RpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmlzc2hvd3NldHRpbmc9ZmFsc2VcclxuICAgICAgICAvL3RoaXMuc2V0dGluZ05vZGU9Y2MuaW5zdGFudGlhdGUodGhpcy5zZXR0aW5nKVxyXG4gICAgICAgIC8vdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuc2V0dGluZ05vZGUpXHJcbiAgICAgICAgLy90aGlzLnNldHRpbmdOb2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNldHRpbmdzXCIpXHJcbiAgICAgICAgdGhpcy5zZXR0aW5nTm9kZT1jYy5maW5kKFwiQ2FudmFzL3NldHRpbmdzXCIpXHJcbiAgICAgICAgdGhpcy5zZXR0aW5nTm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd3NldHRpbmc7XHJcblxyXG4gICAgICAgIHRoaXMuaXNzaG93Y2hhdD1mYWxzZVxyXG4gICAgICAgIC8vdGhpcy5jaGF0Tm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLmNoYXQpXHJcbiAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5jaGF0Tm9kZSlcclxuICAgICAgICB0aGlzLmNoYXROb2RlPWNjLmZpbmQoXCJDYW52YXMvY2hhdFwiKVxyXG4gICAgICAgIHRoaXMuY2hhdE5vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3djaGF0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVXeFNoYXJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FyZDE9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZDFcIilcclxuICAgICAgICB0aGlzLmNhcmQyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmQyXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkMz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkM1wiKVxyXG4gICAgICAgIHRoaXMuY2FyZDQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZDRcIilcclxuICAgICAgICB0aGlzLmNhcmQxLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmNhcmQyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmNhcmQzLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmNhcmQ0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLm9wdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJvcHRcIilcclxuICAgICAgICB0aGlzLm9wdC5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwiZXhwc3RyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmFjdD1bXVxyXG4gICAgICAgIHRoaXMuY2FyZDFudW09MDtcclxuICAgICAgICB0aGlzLmNhcmQybnVtPTA7XHJcbiAgICAgICAgdGhpcy5jYXJkM251bT0wO1xyXG4gICAgICAgIHRoaXMuY2FyZDRudW09MDtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPW51bGxcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkY2FyZDEsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FyZDIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRlZGNhcmQyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNhcmQzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkMywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYXJkNC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkY2FyZDQsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJHYW1lU3RhdGVcIik7XHJcbiAgICAgICAgdGhpcy5jbG9jaz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjbG9ja1wiKVxyXG4gICAgICAgIHRoaXMuY2xvY2suYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgc3A9bnVsbFxyXG4gICAgICAgIGZvcih2YXIgaT0xMDYxO2k8MTExNTtpKyspe1xyXG4gICAgICAgICAgICBzcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX1wiK2krXCJAMnhcIilcclxuICAgICAgICAgICAgc3AuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhcmQxb3JpZ3Bvcz10aGlzLmNhcmQxLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5jYXJkMm9yaWdwb3M9dGhpcy5jYXJkMi5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMuY2FyZDNvcmlncG9zPXRoaXMuY2FyZDMucG9zaXRpb25cclxuICAgICAgICB0aGlzLmNhcmQ0b3JpZ3Bvcz10aGlzLmNhcmQ0LnBvc2l0aW9uXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHdpbmRvdy5kZWx0YT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuZ2V0T3JpZ2luYWxTaXplKCkuaGVpZ2h0KjAuOFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdmFyIG91dD1jYy52MigwLCAwKVxyXG4gICAgICAgIC8vdmFyIHNlYXQxY2FyZHBvcz1jYy52MigwLCAwKVxyXG4gICAgICAgIHZhciBzZWF0MWNhcmRwb3M9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikuY29udmVydFRvV29ybGRTcGFjZUFSIChzZWF0MWNhcmRwb3MsIG91dClcclxuICAgICAgICB0aGlzLnNlYXQxY2FyZHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIob3V0KVxyXG4gICAgICAgIHRoaXMuc2VhdDFjYXJkcG9zLnk9dGhpcy5zZWF0MWNhcmRwb3MueS10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuZ2V0T3JpZ2luYWxTaXplKCkuaGVpZ2h0KjAuOFxyXG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikueT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS55K3dpbmRvdy5kZWx0YVxyXG4gICAgICAgIC8vdmFyIHNlYXQyY2FyZHBvcz1jYy52MigwLCAwKVxyXG4gICAgICAgIG91dD1jYy52MigwLCAwKVxyXG4gICAgICAgIHZhciBzZWF0MmNhcmRwb3M9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDJcIikuY29udmVydFRvV29ybGRTcGFjZUFSIChzZWF0MmNhcmRwb3MsIG91dClcclxuICAgICAgICB0aGlzLnNlYXQyY2FyZHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIob3V0KVxyXG5cclxuXHJcbiAgICAgICAgLy9jYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuc2VhdDJjYXJkcG9zPVwiLHRoaXMuc2VhdDJjYXJkcG9zLngsdGhpcy5zZWF0MmNhcmRwb3MueSlcclxuICAgICAgICAvL2NjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy5zZWF0MWNhcmRwb3M9XCIsdGhpcy5zZWF0MWNhcmRwb3MueCx0aGlzLnNlYXQxY2FyZHBvcy55KVxyXG4gICAgICAgIC8vY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMW9yaWdwb3M9XCIsdGhpcy5jYXJkMW9yaWdwb3MueCx0aGlzLmNhcmQxb3JpZ3Bvcy55KVxyXG4gICAgICAgIC8vY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsdGhpcy5jYXJkMm9yaWdwb3MueCx0aGlzLmNhcmQyb3JpZ3Bvcy55KVxyXG4gICAgICAgIC8vY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsdGhpcy5jYXJkM29yaWdwb3MueCx0aGlzLmNhcmQzb3JpZ3Bvcy55KVxyXG4gICAgICAgIC8vY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsdGhpcy5jYXJkNG9yaWdwb3MueCx0aGlzLmNhcmQ0b3JpZ3Bvcy55KVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lSGludD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lSGludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXQxPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKVxyXG4gICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5zZWF0Mj0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDJcIilcclxuICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVXeFNoYXJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIC8vIHRoaXMuc2VhdDJjYXJkcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQyXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmtleUJvYXJkTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW91c2VMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IHt9O1xyXG4gICAgICAgIHRoaXMucGxheWVyQ29udHJvbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJBdmF0YXJJRCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sID0gdGhpcy5jYW1lcmEuZ2V0Q29tcG9uZW50KFwiQ2FtZXJhQ29udHJvbFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmFibGVQaHlzaWNNYW5hZ2VyKCk7XHJcbiAgICAgICAgLy90aGlzLmVuYWJsZVBoeXNpY3NEZWJ1Z0RyYXcoKTtcclxuICAgICAgICB0aGlzLmluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICB0aGlzLml0ZW1zID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJza3lfYmdcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMucGlja1VwZWQsIHRoaXMpO1xyXG5cclxuICAgICAgICAqL1xyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQxOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgaWYodGhpcy5hY3QubGVuZ3RoLTE+PTApe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDFudW0gfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDJudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkM251bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQ0bnVtKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jYXJkMXNlbGVjdGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD10aGlzLmNhcmQxXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMSlcclxuICAgICAgICAgICAgdGhpcy5hY3QucHVzaCh0aGlzLmNhcmQxbnVtKVxyXG4gICAgICAgIH0vKlxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hY3QuaW5kZXhPZih0aGlzLmNhcmQxbnVtKVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgaWYodGhpcy5hY3QubGVuZ3RoLTE+PTApe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDFudW0gfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDJudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkM251bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQ0bnVtKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jYXJkMnNlbGVjdGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIuc2V0U2NhbGUoMSlcclxuICAgICAgICAgICAgdGhpcy5hY3QucHVzaCh0aGlzLmNhcmQybnVtKVxyXG4gICAgICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQ9dGhpcy5jYXJkMlxyXG4gICAgICAgIH1cclxuICAgICAgICAvKmVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hY3QuaW5kZXhPZih0aGlzLmNhcmQybnVtKVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG5cclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkMzpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDNzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkM251bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDNcclxuICAgICAgICB9XHJcbiAgICAgICAgLyplbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuYWN0LmluZGV4T2YodGhpcy5jYXJkM251bSlcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuXHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaEVuZGVkY2FyZDQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBpbmQgPSB0aGlzLmFjdC5pbmRleE9mKHRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgaWYgKGluZCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmKHRoaXMuY2FyZDRzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDRcclxuICAgICAgICB9XHJcbiAgICAgICAgLyplbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuYWN0LmluZGV4T2YodGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgIH0sXHJcbiAgICBnZXRCYXR0ZXJ5UGVyY2VudDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIGlmKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLkFORFJPSURfQVBJLCBcImdldEJhdHRlcnlQZXJjZW50XCIsIFwiKClGXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1Mpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5JT1NfQVBJLCBcImdldEJhdHRlcnlQZXJjZW50XCIpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwLjk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZz10aGlzLmFjdC5qb2luKFwiXCIpXHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKERhdGUubm93KCkvMTAwMC82MCk7XHJcbiAgICAgICAgaWYodGhpcy5fbGFzdE1pbnV0ZSAhPSBtaW51dGVzKXtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdE1pbnV0ZSA9IG1pbnV0ZXM7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGggPSBoIDwgMTA/IFwiMFwiK2g6aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIG0gPSBtIDwgMTA/IFwiMFwiK206bTtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUxhYmVsLnN0cmluZyA9IFwiXCIgKyBoICsgXCI6XCIgKyBtOyAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwb3dlciA9IGNjLmZpbmQoXCJDYW52YXMvYmcyL3Bvd2VyXCIpXHJcbiAgICAgICAgcG93ZXIuc2NhbGVYID0gdGhpcy5nZXRCYXR0ZXJ5UGVyY2VudCgpO1xyXG5cclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbmFkZGFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIrXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9ucmVkdWNlYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIi1cIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25tdWxhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmFjdC5wdXNoKFwiKlwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBvbmRpdmFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIvXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9ubGVmYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIihcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25yaWdhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmFjdC5wdXNoKFwiKVwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBvbmRlbGFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHZhciBudW09dGhpcy5hY3QucG9wKClcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkLnNldFNjYWxlKDAuOClcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDEpIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkMikgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgaWYodGhpcy5sYXN0dG91Y2hjYXJkPT10aGlzLmNhcmQzKSB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDQpIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD1udWxsXHJcblxyXG4gICAgfSxcclxuICAgIG9uc3VyZWFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuY2FyZDFzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDJzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDNzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDRzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIuWbm+W8oOeJjOmDveW/hemhu+S9v+eUqOS4gOasoe+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcblxyXG4gICAgICAgIHZhciBzdHI9dGhpcy5hY3Quam9pbihcIlwiKVxyXG4gICAgICAgIHZhciByZXM9MDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vdmFyIHJlcz1ldmFsKHN0cik7XHJcbiAgICAgICAgICAgIC8vdmFyIHJlcz0gd2luZG93LmJpbmRpbmcuZXZhbChzdHIpXHJcbiAgICAgICAgICAgIHJlcz13aW5kb3cuZXZhbDIoc3RyKVxyXG4gICAgICAgICAgICAvL2NjLmxvZyhcInR0dHR0dHR0dHR0dHR0dFwiLHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2h7XHJcbiAgICAgICAgICAgIC8vcmVzPVwic3ludGF4IGVycm9yXCJcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLovpPlhaXml6DmlYjvvIzor7fph43mlrDorqHnrpdcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdD1bXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FsZXJ0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICAvL3RoaXMuYWN0LnB1c2gocmVzKVxyXG4gICAgICAgIGlmKHJlcz09MjQpe1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm9uc3VyZWFjdChzdHIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi6K6h566X57uT5p6c5Li6XCIgKyByZXMgKyBcIuS4jeato+ehru+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwic3VibWl0PVwiLHJlcylcclxuXHJcbiAgICB9LFxyXG4gICAgcGlja1VwZWQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIC8vY2MubG9nKFwid29ybGRzZW5jZS5waWNrdXBlZFwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBpbnN0YWxsRXZlbnRzIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkF2YXRhckVudGVyV29ybGRcIiwgdGhpcywgXCJvbkF2YXRhckVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkVudGVyV29ybGRcIiwgdGhpcywgXCJvbkVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJnYW1lX2JlZ2luX3B1c2hcIiwgdGhpcywgXCJnYW1lX2JlZ2luX3B1c2hcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlaG9sZHNcIiwgdGhpcywgXCJlbnRpdHlfdXBkYXRlaG9sZHNcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIiwgdGhpcywgXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25vdGhlck5ldGN1dFwiLCB0aGlzLCBcIm9ub3RoZXJOZXRjdXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkdhbWVPdmVyXCIsIHRoaXMsIFwib25HYW1lT3ZlclwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkRpc2Nvbm5lY3RlZFwiLCB0aGlzLCBcIm9uRGlzY29ubmVjdGVkXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZVwiLCB0aGlzLCBcIm9uQ29ubmVjdGlvblN0YXRlXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25xdWlja19jaGF0XCIsIHRoaXMsIFwib25xdWlja19jaGF0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25lbW9qaVwiLCB0aGlzLCBcIm9uZW1vamlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25FbnRlcldvcmxkMlwiLCB0aGlzLCBcIm9uRW50ZXJXb3JsZDJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJ1cGRhdGVnYW1lc3R1dHNcIiwgdGhpcywgXCJ1cGRhdGVnYW1lc3R1dHNcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmpvaW5Qcml2YXRlUm9vbVwiLCB0aGlzLCBcIm9uam9pblByaXZhdGVSb29tXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGVudGl0eV91cGRhdGVyb29ta2V5OmZ1bmN0aW9uKHJvb21LZXljLGF2YXRhcil7XHJcbiAgICAgICAgY2MubG9nKFwiZW50aXR5X3VwZGF0ZXJvb21rZXllbnRpdHlfdXBkYXRlcm9vbWtleT1cIixyb29tS2V5YylcclxuICAgICAgICB0aGlzLlJvb21JRC5zdHJpbmc9XCLmiL/pl7Tlj7c6XCIrcm9vbUtleWMuam9pbihcIlwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBlbmFibGVXeFNoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDp0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaKleefs+S9nOaImFwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6U0hBUkVfUElDVFVSRSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcblxyXG4gICAgZW5hYmxlUGh5c2ljTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwidGVzdDFcIilcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9dHJ1ZTtcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVQaHlzaWNzRGVidWdEcmF3OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJ0ZXN0MlwiKVxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfcGFpckJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfY2VudGVyT2ZNYXNzQml0IHxcclxuICAgICAgICAgICAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfc2hhcGVCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3JheUNhc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG5cclxuICAgIHVuSW5zdGFsbEV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25FbnRlcldvcmxkXCIsIHRoaXMsIFwib25FbnRlcldvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcImdhbWVfYmVnaW5fcHVzaFwiLCB0aGlzLCBcImdhbWVfYmVnaW5fcHVzaFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsIHRoaXMsIFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiLCB0aGlzLCBcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9ub3RoZXJOZXRjdXRcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uR2FtZU92ZXJcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uRGlzY29ubmVjdGVkXCIsIHRoaXMsIFwib25EaXNjb25uZWN0ZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbnF1aWNrX2NoYXRcIiwgdGhpcywgXCJvbnF1aWNrX2NoYXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uZW1vamlcIiwgdGhpcywgXCJvbmVtb2ppXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkVudGVyV29ybGQyXCIsIHRoaXMsIFwib25FbnRlcldvcmxkMlwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwidXBkYXRlZ2FtZXN0dXRzXCIsIHRoaXMsIFwidXBkYXRlZ2FtZXN0dXRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uam9pblByaXZhdGVSb29tXCIsIHRoaXMsIFwib25qb2luUHJpdmF0ZVJvb21cIik7XHJcbiAgICB9LFxyXG4gICAgb25qb2luUHJpdmF0ZVJvb206ZnVuY3Rpb24obnVtKXtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3RhcnRTY2VuZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2dpbnJlcz1udW1cclxuICAgICAgICAgICAgY2MubG9nKFwic3RhcnRzY2VuZT09PT53b3Jkc2NlbmVcIilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9ucXVpY2tfY2hhdDpmdW5jdGlvbihlaWQsaWR4KXtcclxuICAgICAgICAvL2NjLmxvZyhcIjc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzdxdWlja19jaGF0PVwiLGVpZCxpZHgpXHJcbiAgICAgICAgdmFyIHN0cnN0cj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiQ2hhdFwiKS5nZXRRdWlja0NoYXRJbmZvKGlkeClbXCJjb250ZW50XCJdXHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhxdWlja19jaGF0PVwiLHN0cnN0cilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbmVtb2ppOmZ1bmN0aW9uKGVpZCxuYW1lKXtcclxuICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OGVtb2ppPVwiLG5hbWUpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmVtb2ppKG5hbWUpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuZW1vamkobmFtZSlcclxuICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uaXB0Q2hhdDpmdW5jdGlvbihlaWQsc3Ryc3RyKXtcclxuICAgICAgICBjYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhlaXB0Q2hhdD1cIixzdHJzdHIpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgIC8vIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheWVyUmVhZHlTdGF0ZUNoYW5nZTpmdW5jdGlvbihlaWQsc3RhdGUpe1xyXG4gICAgICAgIGNjLmxvZyhcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkgeyAgIFxyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlIFxyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPXRydWUgXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgXHJcbiAgICAgICAgfSAgICBcclxuXHJcbiAgICB9LFxyXG4gICAgb251cGRhdGVHYW1lc3RhdGVzOmZ1bmN0aW9uKGN1cklELHRpbWUpe1xyXG4gICAgICAgIGNjLmxvZyhcIm9udXBkYXRlR2FtZXN0YXRlc1wiKVxyXG4gICAgICAgIHRoaXMubmV3VHVybihjdXJJRCx0aW1lKVxyXG5cclxuICAgIH0sXHJcbiAgICB1cGRhdGVnYW1lc3R1dHM6ZnVuY3Rpb24obnVtKXtcclxuICAgICAgICBpZihudW09PTEpey8v5pyN5Yqh5Zmo5q2j5ZyocGxheWluZ+S4rVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsvL+S4gOWxgOW3sue7k+adn1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbm90aGVyTmV0Y3V0OmZ1bmN0aW9uKGN1cklEKXtcclxuICAgICAgICBjYy5sb2coXCJvbm90aGVyTmV0Y3V044CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CCXCIpXHJcbiAgICAgICAgaWYoY3VySUQ9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi5YW25LuW546p6YCD5ZG977yM5ri45oiP6ams5LiK57uT5p2fLi4uLi4uLlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLnjqnlrrZcIitLQkVuZ2luZS5hcHAuZW50aXRpZXNbY3VySURdLmFjY291bnROYW1lICtcIuaOiee6v++8jOivt+etieW+hS4uLi4uLi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxMy4wLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgLy90aGlzLmdhbWVTdGF0ZS5uZXdUdXJuKDE1KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbnN5bmNzdXJlYWN0OmZ1bmN0aW9uKHN0cnMpe1xyXG4gICAgICAgIGNjLmxvZyhcIndvcmxkOjpvbnN5bmNzdXJlYWN0XCIsIHN0cnMpXHJcbiAgICAgICAgLy90aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAvL3RoaXMuZ2FtZUhpbnQuc3RyaW5nID0gc3Ryc1xyXG4gICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfSxcclxuICAgIG9uRGlzY29ubmVjdGVkIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJkaXNjb25uZWN0ISB3aWxsIHRyeSB0byByZWNvbm5lY3QuLi5cIik7XHJcbiAgICAgICAgLy92YXIgYWN0aW9uID0gY2MuZmFkZVRvKDEuMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcImRpc2Nvbm5lY3QhIHdpbGwgdHJ5IHRvIHJlY29ubmVjdC4uLlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGVzdHJveXBsYXllcigpXHJcbiAgICAgICAgS0JFbmdpbmUuYXBwLnJlbG9naW5CYXNlYXBwKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblJlbG9naW5CYXNlYXBwVGltZXIgOiBmdW5jdGlvbihzZWxmKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJ3aWxsIHRyeSB0byByZWNvbm5lY3QoXCIgKyB0aGlzLnJlbG9naW5Db3VudCArIFwiKS4uLlwiKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgZmFpbGVkKOaWree6v+mHjei/nuWksei0pSksIGVycj1cIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSkpOyAgIFxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwicmVvZ2luIGlzIHN1Y2Nlc3NmdWxseSEo5pat57q/6YeN6L+e5oiQ5YqfISlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHRcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcInJlb2dpbiBpcyBzdWNjZXNzZnVsbHkhKOaWree6v+mHjei/nuaIkOWKnyEpXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBvbkNvbm5lY3Rpb25TdGF0ZSA6IGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcclxuICAgICAgICBpZighc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBLQkVuZ2luZS5FUlJPUl9NU0coXCJDb25uZWN0KFwiICsgS0JFbmdpbmUuYXBwLmlwICsgXCI6XCIgKyBLQkVuZ2luZS5hcHAucG9ydCArIFwiKSBpcyBlcnJvciEgKOi/nuaOpemUmeivrylcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJDb25uZWN0IHN1Y2Nlc3NmdWxseSwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5oiQ5Yqf77yM6K+3562J5YCZLi4uKVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVxQ2hhbmdlUmVhZHlTdGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgcGxheWVyLnJlcUNoYW5nZVJlYWR5U3RhdGUoKVxyXG4gICAgICAgIH0gICBcclxuICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuc2V0UmVhZHkodHJ1ZSlcclxuICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgICBcclxuICAgIH0sXHJcbiAgICBlbnRpdHlfdXBkYXRlaG9sZHM6ZnVuY3Rpb24oaG9sZHMsZW50aXR5KXtcclxuICAgICAgICBjYy5sb2coXCJlbnRpdHlfdXBkYXRlaG9sZHNcIixlbnRpdHkuaWQsaG9sZHMpXHJcbiAgICAgICAgaWYoZW50aXR5LmNsYXNzTmFtZSA9PSBcIkF2YXRhclwiKSB7XHJcbiAgICAgICAgICAgIGlmKGVudGl0eS5pZD09S0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKSB7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9aG9sZHNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXsgIC8vc2NhbGV4PT0tMSxcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9ob2xkcz1ob2xkc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgIH0sXHJcbiAgICBnYW1lX2JlZ2luX3B1c2g6ZnVuY3Rpb24oZW50aXR5KXtcclxuICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpnYW1lX2JlZ2luX3B1c2hcIilcclxuICAgICAgICAvL3RoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAvL3RoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAvL3RoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9ZW50aXR5LmhvbGRzXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PWZhbHNlXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgXHJcblxyXG4gICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgIH0sXHJcbiAgICBvbkVudGVyV29ybGQ6IGZ1bmN0aW9uIChlbnRpdHkpIHtcclxuICAgICAgICAvL1NDQUxFPTE7XHJcbiAgICAgICAgY2MubG9nKFwib25FbnRlcldvcmxkIGVudGl0eS5pZD1cIixlbnRpdHkuaWQpXHJcbiAgICAgICAgaWYoIWVudGl0eS5pc1BsYXllcigpKSB7XHJcbiAgICAgICAgICAgIHZhciBhZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZD09ZW50aXR5LmlkKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9ZW50aXR5LmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1lbnRpdHkuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5OyAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6b25FbnRlcldvcmxkPVwiLHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeSlcclxuICAgICAgICAgICAgfWVsc2V7ICAvL3NjYWxleD09LTEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGluZy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHk7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkVudGVyV29ybGQyOiBmdW5jdGlvbiAoZW50aXR5SUQpIHtcclxuICAgICAgICBjYy5sb2coXCJvbkVudGVyV29ybGQyXCIpXHJcbiAgICAgICAgdmFyIGVudGl0eT1LQkVuZ2luZS5hcHAuZW50aXRpZXNbZW50aXR5SURdXHJcbiAgICAgICAgLy9TQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm9uRW50ZXJXb3JsZCBlbnRpdHkuaWQ9XCIsZW50aXR5LmlkKVxyXG4gICAgICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVudGl0eS5pZCkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgIH1lbHNleyAgLy9zY2FsZXg9PS0xLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hpbmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1lbnRpdHkuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWVudGl0eS5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5OyBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpvbkVudGVyV29ybGQ9XCIsdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5KVxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgIH0sXHJcbiAgICBvbkxlYXZlV29ybGQ6IGZ1bmN0aW9uIChlbnRpdHkpIHtcclxuICAgICAgICBjYy5sb2coXCJvbkxlYXZlV29ybGRcIixlbnRpdHkuaWQsZW50aXR5LmNsYXNzTmFtZSlcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICB0aGlzLm1hdGNoaW5nLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLmZhZGVJbigwLjUpOy8v5riQ5pi+XHJcbiAgICAgICAgdmFyIGFjdGlvbjIgPSBjYy5mYWRlT3V0KDAuNSk7Ly/muJDpmpDmlYjmnpxcclxuICAgICAgICB2YXIgcmVwZWF0PWNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYWN0aW9uMSxhY3Rpb24yKSlcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLnJ1bkFjdGlvbihyZXBlYXQpO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY2MubG9nKFwib25MZWF2ZVdvcmxkXCIsZW50aXR5LmlkLGVudGl0eS5jbGFzc05hbWUpXHJcbiAgICAgICAgaWYodGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdICYmIGVudGl0eS5jbGFzc05hbWUgPT0gXCJBdmF0YXJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXS5yZW1vdmVGcm9tUGFyZW50KClcclxuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdPW51bGxcclxuICAgICAgICB9ICBcclxuICAgICAgICAqLyAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25BdmF0YXJFbnRlcldvcmxkIDogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICAgY2MubG9nKFwib25BdmF0YXJFbnRlcldvcmxkXCIpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoYXZhdGFyKTtcclxuICAgIH0sXHJcblxyXG4gICBcclxuICAgIHVwZGF0ZVBvc2l0aW9uIDogZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICAgICBcclxuICAgIH0sXHQgIFxyXG4gICAgXHJcbiAgICBzZXRfcG9zaXRpb246IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRDYW1lcmFUYXJnZXQ6IGZ1bmN0aW9uKGVudGl0eUlEKXtcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1BsYXllckhhc0l0ZW06IGZ1bmN0aW9uKGxlZnQpIHtcclxuICAgICAgICAvL2NjLmxvZyhcInRlc3QxNFwiKVxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgbmV3VHVybjogZnVuY3Rpb24oYXZhdGFyLGVpZCwgc2Vjb25kLGNhcmQwMSxjYXJkMDIsY2FyZDAzLGNhcmQwNCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3Iuc3RvcEJHTSgpXHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInR1cm5cIilcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUubmV3VHVybihzZWNvbmQpO1xyXG4gICAgICAgIHRoaXMuY2xvY2suYWN0aXZlPXRydWVcclxuICAgICAgICBpZighdGhpcy5nYW1lU3RhdGUuaXNHYW1lU3RhcnQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5zZXRHYW1lU3RhcnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxLjAsIDApO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWwuc3RyaW5nID0gXCLmuLjmiI/lvIDlp4sgISEhXCI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sYWJlbC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmNhcmQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5jYXJkMy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuY2FyZDQuYWN0aXZlPXRydWVcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhcmQwMT1jYXJkMDE7XHJcbiAgICAgICAgdGhpcy5jYXJkMDI9Y2FyZDAyO1xyXG4gICAgICAgIHRoaXMuY2FyZDAzPWNhcmQwMztcclxuICAgICAgICB0aGlzLmNhcmQwND1jYXJkMDQ7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIHZhciBBX2FjdDE9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDI9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDM9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDQ9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDE9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDI9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDM9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDQ9bnVsbFxyXG5cclxuICAgICAgICB2YXIgeDE9dGhpcy5zZWF0MWNhcmRwb3MueDtcclxuICAgICAgICB2YXIgeTE9dGhpcy5zZWF0MWNhcmRwb3MueVxyXG5cclxuICAgICAgICB2YXIgeDI9dGhpcy5zZWF0MmNhcmRwb3MueDtcclxuICAgICAgICB2YXIgeTI9dGhpcy5zZWF0MmNhcmRwb3MueVxyXG4gICAgICAgIHZhciBjYXJkMW9yaWdwb3N4PXRoaXMuY2FyZDFvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDFvcmlncG9zeT10aGlzLmNhcmQxb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkMm9yaWdwb3N4PXRoaXMuY2FyZDJvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDJvcmlncG9zeT10aGlzLmNhcmQyb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkM29yaWdwb3N4PXRoaXMuY2FyZDNvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDNvcmlncG9zeT10aGlzLmNhcmQzb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkNG9yaWdwb3N4PXRoaXMuY2FyZDRvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDRvcmlncG9zeT10aGlzLmNhcmQ0b3JpZ3Bvcy55XHJcbiAgICAgICAgY2MubG9nKFwidGhpcy5jdXJpZD1cIixlaWQpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLnNlYXQyY2FyZHBvcz1cIix4MSx5MSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuc2VhdDFjYXJkcG9zPVwiLHgyLHkyKVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDFvcmlncG9zPVwiLGNhcmQxb3JpZ3Bvc3gsY2FyZDFvcmlncG9zeSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIixjYXJkMm9yaWdwb3N4LGNhcmQyb3JpZ3Bvc3kpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsY2FyZDNvcmlncG9zeCxjYXJkM29yaWdwb3N5KVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDJvcmlncG9zPVwiLGNhcmQ0b3JpZ3Bvc3gsY2FyZDRvcmlncG9zeSlcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgaWYoZWlkPT0wKXsvL+WQhOWbnuWQhOWutlxyXG4gXHJcblxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG5cclxuICAgICAgICAgICAgQV9hY3QzPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3Q0PWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihlaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVpZD09S0JFbmdpbmUuYXBwLnBsYXllcigpLmlkLG1vdmV0byBzZWF0MVwiLGVpZCxLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpXHJcbiAgICAgICAgICAgIEFfYWN0MT1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0Mj1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0ND1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2coXCJlaWQhPUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCxtb3ZldG8gc2VhdDJcIixlaWQsS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKVxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmNhcmQxbnVtPTIrcGFyc2VJbnQoKGNhcmQwMSsxMDAwLTEwNjEpLzQpICAvLzEsMiwzLDRcclxuICAgICAgICB0aGlzLmNhcmQybnVtPTIrcGFyc2VJbnQoKGNhcmQwMisxMDAwLTEwNjEpLzQpXHJcbiAgICAgICAgdGhpcy5jYXJkM251bT0yK3BhcnNlSW50KChjYXJkMDMrMTAwMC0xMDYxKS80KVxyXG4gICAgICAgIHRoaXMuY2FyZDRudW09MitwYXJzZUludCgoY2FyZDA0KzEwMDAtMTA2MSkvNClcclxuICAgICAgICBpZiAodGhpcy5jYXJkMW51bT4xMCkge3RoaXMuY2FyZDFudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkMm51bT4xMCkge3RoaXMuY2FyZDJudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkM251bT4xMCkge3RoaXMuY2FyZDNudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkNG51bT4xMCkge3RoaXMuY2FyZDRudW09MX1cclxuXHJcbiAgICAgICAgdmFyIGZ1bmNvdW50MT1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MSgpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoY291bnQxKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bmNvdW50Mj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MigpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoY291bnQyKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgIHZhciBmdW4xPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgxLFxyXG4gICAgICAgICAgICB0YXJnZXQueT15MTtcclxuICAgICAgICAgICAgY2FyZDAxPWNhcmQwMSsxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDErXCJAMnhcIlxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLGNjLlNwcml0ZUZyYW1lLGZ1bmN0aW9uKGVycixzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICBzZWxmLmNhcmQxLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPSBzcHJpdGVGcmFtZVxyXG4gICAgICAgICAgICB9KTsgKi9cclxuICAgICAgICB9LCB0aGlzLmNhcmQxKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBmdW4yPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgxXHJcbiAgICAgICAgICAgIHRhcmdldC55PXkxXHJcbiAgICAgICAgICAgIGNhcmQwMj1jYXJkMDIrMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAyK1wiQDJ4XCJcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMik7XHJcbiAgICAgICAgdmFyIGZ1bjM9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9eDJcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTJcclxuICAgICAgICAgICAgY2FyZDAzPWNhcmQwMysxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDMrXCJAMnhcIlxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICB9LCB0aGlzLmNhcmQzKTtcclxuICAgICAgICB2YXIgZnVuND1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MlxyXG4gICAgICAgICAgICB0YXJnZXQueT15MlxyXG4gICAgICAgICAgICBjYXJkMDQ9Y2FyZDA0KzEwMDA7XHJcbiAgICAgICAgICAgIHZhciB1cmw9XCJjYXJkX1wiK2NhcmQwNCtcIkAyeFwiXHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodXJsKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDQpO1xyXG5cclxuICAgICAgICB2YXIgZnVuMTE9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDFvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkMW9yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGZ1bjIyPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQyb3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDJvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDIpO1xyXG4gICAgICAgIHZhciBmdW4zMz1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD1jYXJkM29yaWdwb3N4XHJcbiAgICAgICAgICAgIHRhcmdldC55PWNhcmQzb3JpZ3Bvc3lcclxuICAgICAgICB9LCB0aGlzLmNhcmQzKTtcclxuICAgICAgICB2YXIgZnVuNDQ9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDRvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkNG9yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkNCk7XHJcblxyXG4gICAgICAgIEJfYWN0MT1jYy5tb3ZlVG8oMSxjYy52MihjYXJkMW9yaWdwb3N4LGNhcmQxb3JpZ3Bvc3kpKVxyXG4gICAgICAgIEJfYWN0Mj1jYy5tb3ZlVG8oMSxjYy52MihjYXJkMm9yaWdwb3N4LGNhcmQyb3JpZ3Bvc3kpKVxyXG4gICAgICAgIEJfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52MihjYXJkM29yaWdwb3N4LGNhcmQzb3JpZ3Bvc3kpKVxyXG4gICAgICAgIEJfYWN0ND1jYy5tb3ZlVG8oMSxjYy52MihjYXJkNG9yaWdwb3N4LGNhcmQ0b3JpZ3Bvc3kpKVxyXG5cclxuICAgICAgICBpZihlaWQ9PTEyMzQ1KXsvL+WQhOWbnuWQhOWutjLlvKBcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuMSxCX2FjdDEsZnVuMTEsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuMixCX2FjdDIsZnVuMjIsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkMy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuMyxCX2FjdDMsZnVuMzMsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkNC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZnVuNCxCX2FjdDQsZnVuNDQsZnVuY291bnQyKSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7IC8v5LiA5a625Zub5bygXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0MSxmdW4xLGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3QxLGZ1bjExLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0MixmdW4yLGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3QyLGZ1bjIyLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0MyxmdW4zLGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3QzLGZ1bjMzLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKEFfYWN0NCxmdW40LGZ1bmNvdW50MSxjYy5kZWxheVRpbWUoMSksQl9hY3Q0LGZ1bjQ0LGZ1bmNvdW50MikpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBjYy5sb2coXCJ3d3d3d3duZXdUdXJuXCIsYXZhdGFyLmlkLCBzZWNvbmQsY2FyZDAxLGNhcmQwMixjYXJkMDMsY2FyZDA0KVxyXG5cclxuICAgICAgICB0aGlzLm9wdC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgXHJcbiAgICAgICBcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJlc2V0SXRlbTogZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb3RoZXJBdmF0YXJPblBpY2tVcEl0ZW06IGZ1bmN0aW9uKGF2YXRhcklELCBpdGVtSUQsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyVGhyb3dJdGVtOiBmdW5jdGlvbihhdmF0YXJJRCwgaXRlbUlELCBmb3JjZSl7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyT25TdG9wV2FsazogZnVuY3Rpb24oYXZhdGFySUQsIHBvcyl7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyT25TdGFydFdhbGs6IGZ1bmN0aW9uKGF2YXRhcklELCBtb3ZlRmxhZyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG90aGVyQXZhdGFyUmVjb3Zlckl0ZW06IGZ1bmN0aW9uKGF2YXRhcklELCBpdGVtSUQpIHtcclxuICAgICAgICAvL2NjLmxvZyhcInRlc3QxOFwiKVxyXG4gICAgfSxcclxuXHJcbiAgICBvdGhlckF2YXRhck9uTGVmdEp1bXA6IGZ1bmN0aW9uKGF2YXRhcklEKXtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb3RoZXJBdmF0YXJPblJpZ2h0SnVtcDogZnVuY3Rpb24oYXZhdGFySUQpe1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvblJlY3ZEYW1hZ2U6IGZ1bmN0aW9uKGF2YXRhcklELCBoYXJtLCBocCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiV29ybGRTY2VuZTo6b3RoZXJBdmF0YXJSZWN2RGFtYWdlOiBhdmF0YXJJRD0lZCwgaGFybT0lZCwgaHA9JWQgXCIsIGF2YXRhcklELCBoYXJtLCBocCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQXZhdGFyRGllOiBmdW5jdGlvbihhdmF0YXJJRCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiV29ybGRTY2VuZTo6b25BdmF0YXJEaWUsIGF2YXRhcmlkPSVkXCIsIGF2YXRhcklEKVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkdhbWVPdmVyOiBmdW5jdGlvbihhdmF0YXJJRCwgaXNXaW4sIGhwLCB0b3RhbFRpbWUsIHRvdGFsSGFybSwgc2NvcmUpIHtcclxuICAgICAgICBpZihhdmF0YXJJRCA9PSBLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpIHtcclxuICAgICAgICAgICAgSFAgPSBocDtcclxuICAgICAgICAgICAgVE9UQUxfVElNRSA9IHRvdGFsVGltZTtcclxuICAgICAgICAgICAgT3RoZXJIUCA9IHRvdGFsSGFybTtcclxuICAgICAgICAgICAgU0NPUkUgPSBzY29yZTtcclxuICAgICAgICAgICAgTFZsZXZlbD1NYXRoLnJvdW5kKDEwMCpTQ09SRSlcclxuICAgICAgICAgICAgdGhpcy51bkluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICAgICAgaWYoaXNXaW4pIHtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIldpblNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9zZVNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwiODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OFwiKVxyXG4gICAgICAgIC8vdGhpcy5kaXNFbmFibGVDb250cm9sUGxheWVyKCk7XHJcbiAgICAgICAgLy90aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgb25SZXNldEl0ZW06IGZ1bmN0aW9uKGl0ZW1JRCwgcG9zaXRpb24pIHtcclxuICAgICAgICAvLy9TQ0FMRT0xO1xyXG4gICAgICAgXHJcbiAgICBcclxuICAgICAgICAvL2l0ZW0uc2V0UG9zaXRpb24ocG9zaXRpb24ueCpTQ0FMRSwgcG9zaXRpb24ueipTQ0FMRSk7XHJcbiAgICB9LFxyXG5cclxuICAgIERlc3Ryb3lwbGF5ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNjLmxvZyhcIkF2YXRhciBjbGllbnQgZGllIHNvIGRlc3Ryb3kgV29ybGRTY2VuZSBwbGF5ZXJwcmVmYWJcIilcclxuICAgICAgICBpZih0aGlzLnBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZW1vdmVGcm9tUGFyZW50KHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcblxyXG4gICAgfSxcclxuICAgIGNyZWF0ZVBsYXllcjogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICAvLyBTQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm5ldyBjcmVhdGVQbGF5ZXIgdGhpcy5wbGF5ZXI977yMYXZhdGFyLm1vZGVsSUQ9XCIsdGhpcy5wbGF5ZXIsYXZhdGFyLm1vZGVsSUQgKVxyXG5cclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgaWYoYXZhdGFyLmlkPT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9YXZhdGFyLmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWF2YXRhci5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9ICB0aGlzLnNlYXQxO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2F2YXRhci5pZF09dGhpcy5wbGF5ZXIgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1hdmF0YXIuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9YXZhdGFyLmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gIHRoaXMuc2VhdDI7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXT10aGlzLnBsYXllciBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3ZhciBjdHJsPSB0aGlzLnBsYXllci5hZGRDb21wb25lbnQoXCJBdmF0YXJDb250cm9sXCIpO1xyXG4gICAgICAgICAgICAvL3ZhciBhY3Rpb249IHRoaXMucGxheWVyLmFkZENvbXBvbmVudChcIkF2YXRhckFjdGlvblwiKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0UG9zaXRpb24oYXZhdGFyLnBvc2l0aW9uLngqU0NBTEUsIGF2YXRhci5wb3NpdGlvbi56KlNDQUxFKTtcclxuICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2F2YXRhci5pZF0gPSB0aGlzLnBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9nKFwiYWZ0ZXIgY3JlYXRlUGxheWVyIHRoaXMucGxheWVyPe+8jGF2YXRhci5tb2RlbElEPVwiLHRoaXMucGxheWVyLGF2YXRhci5tb2RlbElEIClcclxuICAgIH0sXHJcblxyXG4gICAgb25BdmF0YXJDb250aW51ZUdhbWU6IGZ1bmN0aW9uKGF2YXRhcikge1xyXG4gICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoYXZhdGFyKTtcclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlQ29udHJvbFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgZGlzRW5hYmxlQ29udHJvbFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG59KTtcclxuIl19