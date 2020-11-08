
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
  },
  showwangfa: function showwangfa() {
    window.AudioMgr.playSFX("ui_click");
    this.introduce.active = true;
  },
  hidewangfa: function hidewangfa() {
    window.AudioMgr.playSFX("ui_click");
    this.introduce.active = false;
  },
  showsetting: function showsetting() {
    window.AudioMgr.playSFX("ui_click");
    this.isshowsetting = !this.settingNode.active;
    this.settingNode.active = this.isshowsetting;
  },
  showchat: function showchat() {
    window.AudioMgr.playSFX("ui_click");
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
    window.AudioMgr.playBGM("bgBet");
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
    this.seat2cardpos = this.node.convertToNodeSpaceAR(out);
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
    }
  },
  onTouchEndedcard1: function onTouchEndedcard1() {
    window.AudioMgr.playSFX("ui_click");

    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card1selected == false) {
      this.lasttouchcard = this.card1;
      this.card1selected = true;
      this.card1.setScale(1);
      this.act.push(this.card1num);
    }
  },
  onTouchEndedcard2: function onTouchEndedcard2() {
    window.AudioMgr.playSFX("ui_click");

    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card2selected == false) {
      this.card2selected = true;
      this.card2.setScale(1);
      this.act.push(this.card2num);
      this.lasttouchcard = this.card2;
    }
  },
  onTouchEndedcard3: function onTouchEndedcard3() {
    window.AudioMgr.playSFX("ui_click");

    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card3selected == false) {
      this.card3selected = true;
      this.card3.setScale(1);
      this.act.push(this.card3num);
      this.lasttouchcard = this.card3;
    }
  },
  onTouchEndedcard4: function onTouchEndedcard4() {
    window.AudioMgr.playSFX("ui_click");

    if (this.act.length - 1 >= 0) {
      if (this.act[this.act.length - 1] == this.card1num || this.act[this.act.length - 1] == this.card2num || this.act[this.act.length - 1] == this.card3num || this.act[this.act.length - 1] == this.card4num) return;
    }

    if (this.card4selected == false) {
      this.card4selected = true;
      this.card4.setScale(1);
      this.act.push(this.card4num);
      this.lasttouchcard = this.card4;
    }
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
    window.AudioMgr.playSFX("ui_click");
    this.act.push("+");
  },
  onreduceact: function onreduceact() {
    window.AudioMgr.playSFX("ui_click");
    this.act.push("-");
  },
  onmulact: function onmulact() {
    window.AudioMgr.playSFX("ui_click");
    this.act.push("*");
  },
  ondivact: function ondivact() {
    window.AudioMgr.playSFX("ui_click");
    this.act.push("/");
  },
  onlefact: function onlefact() {
    window.AudioMgr.playSFX("ui_click");
    this.act.push("(");
  },
  onrigact: function onrigact() {
    window.AudioMgr.playSFX("ui_click");
    this.act.push(")");
  },
  ondelact: function ondelact() {
    window.AudioMgr.playSFX("ui_click");
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
    window.AudioMgr.playSFX("ui_click");

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
    wx.showShareMenu();
    cc.loader.loadRes("sound/share", function (err, data) {
      // wx.shareAppMessage({   //打开小游戏自动分享
      wx.onShareAppMessage(function (res) {
        return {
          title: "24点 智力小PK",
          imageUrl: data.url,
          //query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,// 别人点击链接时会得到的数据
          //query: "nick=" + nick + "&gender=" + gender + "&city=" + city,
          //query:"Roomid="+ self.roomKeyc+"&UserName="+ KBEngine.app.entities[KBEngine.app.player().id].accountName,
          success: function success(res) {
            cc.log("分享成功" + res); //this.yaoqing.active=false                      
          },
          fail: function fail(res) {
            cc.log("分享失败" + res); //this.yaoqing.active=true
          }
        };
      });
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
    //cc.log("888888888888888888888888888888888888eiptChat=",strstr)
    if (KBEngine.app.player().id == eid) {
      this.seat1.getComponent("Seat").chat(strstr); // this.seat1.getComponent("Seat").refresh();  
    } else {
      this.seat2.getComponent("Seat").chat(strstr); //this.seat2.getComponent("Seat").refresh();     
    }
  },
  playerReadyStateChange: function playerReadyStateChange(eid, state) {
    //cc.log("playerReadyStateChange")
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
    //cc.log("onupdateGamestates")
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
    this.gameHint.string = "disconnect! will try to reconnect..."; //this.Destroyplayer()

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
    window.AudioMgr.playSFX("ui_click");
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
    this.node.getChildByName("start").active = false;

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
  invatefriend: function invatefriend() {
    window.AudioMgr.playSFX("ui_click"); //this.yaoqing.active=false

    var self = this; ///////////////////////////

    cc.loader.loadRes("sound/share", function (err, data) {
      var selff = self;
      wx.shareAppMessage({
        title: self.RoomID.string,
        imageUrl: data.url,
        //query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,// 别人点击链接时会得到的数据
        //query: "nick=" + nick + "&gender=" + gender + "&city=" + city,
        query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,
        success: function success(res) {
          cc.log("分享成功" + res);
          selff.yaoqing.active = false;
        },
        fail: function fail(res) {
          cc.log("分享失败" + res); //this.yaoqing.active=true
        }
      });
    }); /////////////////////////

    /*
    wx.shareAppMessage({
        title: self.RoomID.string,
        imageUrl: data.url,
        //query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,// 别人点击链接时会得到的数据
        //query: "nick=" + nick + "&gender=" + gender + "&city=" + city,
        query:"Roomid="+ self.roomKeyc+"&UserName="+ KBEngine.app.entities[KBEngine.app.player().id].accountName,
        success(res) {               
           
            
            cc.log("分享成功" + res);
            this.yaoqing.active=false               
            
              },
        fail(res) {
            cc.log("分享失败" + res);
            //this.yaoqing.active=true
        }
        
    });
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
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcV29ybGRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJiaW5kanMiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNlYXQxIiwidHlwZSIsIk5vZGUiLCJzZWF0MiIsInNob3d3YW5nZmEiLCJ3aW5kb3ciLCJBdWRpb01nciIsInBsYXlTRlgiLCJpbnRyb2R1Y2UiLCJhY3RpdmUiLCJoaWRld2FuZ2ZhIiwic2hvd3NldHRpbmciLCJpc3Nob3dzZXR0aW5nIiwic2V0dGluZ05vZGUiLCJzaG93Y2hhdCIsImlzc2hvd2NoYXQiLCJjaGF0Tm9kZSIsImxvZyIsIm9uTG9hZCIsInJvb21LZXljIiwiaW5zdGFsbEV2ZW50cyIsIlJvb21JRCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInlhb3FpbmciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJtYXRjaGluZyIsInN0b3BBbGxBY3Rpb25zIiwiYWN0aW9uMSIsImZhZGVJbiIsImFjdGlvbjIiLCJmYWRlT3V0IiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwicGxheUJHTSIsIl90aW1lTGFiZWwiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiZW5hYmxlV3hTaGFyZSIsImNhcmQxIiwiY2FyZDIiLCJjYXJkMyIsImNhcmQ0Iiwib3B0IiwibGFiZWwiLCJhY3QiLCJjYXJkMW51bSIsImNhcmQybnVtIiwiY2FyZDNudW0iLCJjYXJkNG51bSIsImxhc3R0b3VjaGNhcmQiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIm9uVG91Y2hFbmRlZGNhcmQxIiwib25Ub3VjaEVuZGVkY2FyZDIiLCJvblRvdWNoRW5kZWRjYXJkMyIsIm9uVG91Y2hFbmRlZGNhcmQ0IiwiY2FyZDFzZWxlY3RlZCIsImNhcmQyc2VsZWN0ZWQiLCJjYXJkM3NlbGVjdGVkIiwiY2FyZDRzZWxlY3RlZCIsImdhbWVTdGF0ZSIsImNsb2NrIiwic3AiLCJpIiwiY2FyZDFvcmlncG9zIiwicG9zaXRpb24iLCJjYXJkMm9yaWdwb3MiLCJjYXJkM29yaWdwb3MiLCJjYXJkNG9yaWdwb3MiLCJkZWx0YSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZ2V0T3JpZ2luYWxTaXplIiwiaGVpZ2h0Iiwib3V0IiwidjIiLCJzZWF0MWNhcmRwb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInkiLCJzZWF0MmNhcmRwb3MiLCJnYW1lSGludCIsIm9wYWNpdHkiLCJsZW5ndGgiLCJzZXRTY2FsZSIsInB1c2giLCJnZXRCYXR0ZXJ5UGVyY2VudCIsImlzTmF0aXZlIiwib3MiLCJPU19BTkRST0lEIiwianNiIiwicmVmbGVjdGlvbiIsImNhbGxTdGF0aWNNZXRob2QiLCJBTkRST0lEX0FQSSIsIk9TX0lPUyIsIklPU19BUEkiLCJ1cGRhdGUiLCJkdCIsInN0cmluZyIsImpvaW4iLCJtaW51dGVzIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsIm5vdyIsIl9sYXN0TWludXRlIiwiZGF0ZSIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicG93ZXIiLCJzY2FsZVgiLCJvbmFkZGFjdCIsIm9ucmVkdWNlYWN0Iiwib25tdWxhY3QiLCJvbmRpdmFjdCIsIm9ubGVmYWN0Iiwib25yaWdhY3QiLCJvbmRlbGFjdCIsIm51bSIsInBvcCIsIm9uc3VyZWFjdCIsImFjdGlvbiIsImZhZGVUbyIsInN0ciIsInJlcyIsImV2YWwyIiwicGxheWVyIiwiYXBwIiwicGlja1VwZWQiLCJldmVudCIsIkV2ZW50IiwicmVnaXN0ZXIiLCJlbnRpdHlfdXBkYXRlcm9vbWtleSIsImF2YXRhciIsInd4Iiwic2hvd1NoYXJlTWVudSIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJkYXRhIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidXJsIiwic3VjY2VzcyIsImZhaWwiLCJlbmFibGVQaHlzaWNNYW5hZ2VyIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJtYW5hZ2VyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZVBoeXNpY3NEZWJ1Z0RyYXciLCJlbmFibGVkRGVidWdEcmF3IiwiZW5hYmxlZERyYXdCb3VuZGluZ0JveCIsImRlYnVnRHJhd0ZsYWdzIiwiUGh5c2ljc01hbmFnZXIiLCJEcmF3Qml0cyIsImVfY2VudGVyT2ZNYXNzQml0IiwiZV9zaGFwZUJpdCIsImVfcmF5Q2FzdCIsInVuSW5zdGFsbEV2ZW50cyIsImRlcmVnaXN0ZXIiLCJvbmpvaW5Qcml2YXRlUm9vbSIsImxvYWRTY2VuZSIsImxvZ2lucmVzIiwib25xdWlja19jaGF0IiwiZWlkIiwiaWR4Iiwic3Ryc3RyIiwiZ2V0UXVpY2tDaGF0SW5mbyIsImlkIiwiY2hhdCIsIm9uZW1vamkiLCJuYW1lIiwiZW1vamkiLCJvbmlwdENoYXQiLCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlIiwic3RhdGUiLCJfaXNSZWFkeSIsInJlZnJlc2giLCJvbnVwZGF0ZUdhbWVzdGF0ZXMiLCJjdXJJRCIsInRpbWUiLCJuZXdUdXJuIiwidXBkYXRlZ2FtZXN0dXRzIiwib25vdGhlck5ldGN1dCIsImVudGl0aWVzIiwiYWNjb3VudE5hbWUiLCJvbnN5bmNzdXJlYWN0Iiwic3RycyIsIm9uRGlzY29ubmVjdGVkIiwiSU5GT19NU0ciLCJyZWxvZ2luQmFzZWFwcCIsIm9uUmVsb2dpbkJhc2VhcHBUaW1lciIsInNlbGYiLCJyZWxvZ2luQ291bnQiLCJvblJlbG9naW5CYXNlYXBwRmFpbGVkIiwiZmFpbGVkY29kZSIsInNlcnZlckVyciIsIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkiLCJvbkNvbm5lY3Rpb25TdGF0ZSIsIkVSUk9SX01TRyIsImlwIiwicG9ydCIsInJlcUNoYW5nZVJlYWR5U3RhdGUiLCJzZXRSZWFkeSIsImVudGl0eV91cGRhdGVob2xkcyIsImhvbGRzIiwiZW50aXR5IiwiY2xhc3NOYW1lIiwiX2hvbGRzIiwiZ2FtZV9iZWdpbl9wdXNoIiwib25FbnRlcldvcmxkIiwiaXNQbGF5ZXIiLCJhZSIsIl91c2VyTmFtZSIsImF2YXRhclVybCIsIm9uRW50ZXJXb3JsZDIiLCJlbnRpdHlJRCIsIm9uTGVhdmVXb3JsZCIsIm9uQXZhdGFyRW50ZXJXb3JsZCIsImNyZWF0ZVBsYXllciIsInVwZGF0ZVBvc2l0aW9uIiwic2V0X3Bvc2l0aW9uIiwic2V0Q2FtZXJhVGFyZ2V0IiwiY2hlY2tQbGF5ZXJIYXNJdGVtIiwibGVmdCIsInNlY29uZCIsImNhcmQwMSIsImNhcmQwMiIsImNhcmQwMyIsImNhcmQwNCIsImlzR2FtZVN0YXJ0Iiwic2V0R2FtZVN0YXJ0IiwiQV9hY3QxIiwiQV9hY3QyIiwiQV9hY3QzIiwiQV9hY3Q0IiwiQl9hY3QxIiwiQl9hY3QyIiwiQl9hY3QzIiwiQl9hY3Q0IiwieDEiLCJ4IiwieTEiLCJ4MiIsInkyIiwiY2FyZDFvcmlncG9zeCIsImNhcmQxb3JpZ3Bvc3kiLCJjYXJkMm9yaWdwb3N4IiwiY2FyZDJvcmlncG9zeSIsImNhcmQzb3JpZ3Bvc3giLCJjYXJkM29yaWdwb3N5IiwiY2FyZDRvcmlncG9zeCIsImNhcmQ0b3JpZ3Bvc3kiLCJtb3ZlVG8iLCJwYXJzZUludCIsImZ1bmNvdW50MSIsImNhbGxGdW5jIiwidGFyZ2V0IiwicmVmcmVzaGNvdW50MSIsImZ1bmNvdW50MiIsInJlZnJlc2hjb3VudDIiLCJmdW4xIiwiZnVuMiIsImZ1bjMiLCJmdW40IiwiZnVuMTEiLCJmdW4yMiIsImZ1bjMzIiwiZnVuNDQiLCJkZWxheVRpbWUiLCJvbkdhbWVPdmVyIiwiYXZhdGFySUQiLCJpc1dpbiIsImhwIiwidG90YWxUaW1lIiwidG90YWxIYXJtIiwic2NvcmUiLCJIUCIsIlRPVEFMX1RJTUUiLCJPdGhlckhQIiwiU0NPUkUiLCJMVmxldmVsIiwicm91bmQiLCJpbnZhdGVmcmllbmQiLCJzZWxmZiIsInNoYXJlQXBwTWVzc2FnZSIsInF1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LEVBQUFBLG9CQUFvQixFQUFFLDhCQUFTakssTUFBVCxFQUFpQjtBQUNwQyxTQUFLeUYsWUFBTCxDQUFrQnpGLE1BQWxCO0FBQ0Y7QUE3Z0NJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxudmFyIEtCRW5naW5lID0gcmVxdWlyZShcImtiZW5naW5lXCIpO1xyXG4vL3ZhciBiaW5kanM9cmVxdWlyZShcImV2YWxcIilcclxudmFyIGJpbmRqcz1yZXF1aXJlKFwiZXZhbDJcIilcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNlYXQxOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VhdDI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNob3d3YW5nZmE6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPXRydWVcclxuICAgIH0sXHJcbiAgICBoaWRld2FuZ2ZhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlLmFjdGl2ZT1mYWxzZVxyXG4gICAgfSxcclxuICAgIHNob3dzZXR0aW5nOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuaXNzaG93c2V0dGluZyA9ICF0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZTtcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZSA9IHRoaXMuaXNzaG93c2V0dGluZztcclxuXHJcbiAgICB9LFxyXG4gICAgc2hvd2NoYXQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0ID0gIXRoaXMuY2hhdE5vZGUuYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuY2hhdE5vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3djaGF0O1xyXG4gICAgICAgIGNjLmxvZyhcInNob3djaGF0XCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tS2V5Yz1cIlwiXHJcbiAgICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5Sb29tSUQ9Y2MuZmluZChcIkNhbnZhcy9iZzIvUm9vbUlEXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuXHJcbiAgICAgICAgdGhpcy55YW9xaW5nPWNjLmZpbmQoXCJDYW52YXMvYmcyL3lhb3FpbmdcIilcclxuICAgICAgICB0aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImludHJvZHVjZVwiKVxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlLmFjdGl2ZT1mYWxzZVxyXG5cclxuICAgICAgICBpZih3aW5kb3cudHlwZT09MSl7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hpbmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwibWF0Y2hpbmdcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hpbmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwibWF0Y2hpbmcyXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwibWF0Y2hpbmdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5mYWRlSW4oMC41KTsvL+a4kOaYvlxyXG4gICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgwLjUpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjIsYWN0aW9uMSkpXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5ydW5BY3Rpb24ocmVwZWF0KTtcclxuICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5QkdNKFwiYmdCZXRcIilcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZUxhYmVsID0gY2MuZmluZChcIkNhbnZhcy9iZzIvdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuaXNzaG93c2V0dGluZz1mYWxzZVxyXG4gICAgICAgIC8vdGhpcy5zZXR0aW5nTm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnNldHRpbmcpXHJcbiAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5zZXR0aW5nTm9kZSlcclxuICAgICAgICAvL3RoaXMuc2V0dGluZ05vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2V0dGluZ3NcIilcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlPWNjLmZpbmQoXCJDYW52YXMvc2V0dGluZ3NcIilcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZSA9IHRoaXMuaXNzaG93c2V0dGluZztcclxuXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0PWZhbHNlXHJcbiAgICAgICAgLy90aGlzLmNoYXROb2RlPWNjLmluc3RhbnRpYXRlKHRoaXMuY2hhdClcclxuICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZCh0aGlzLmNoYXROb2RlKVxyXG4gICAgICAgIHRoaXMuY2hhdE5vZGU9Y2MuZmluZChcIkNhbnZhcy9jaGF0XCIpXHJcbiAgICAgICAgdGhpcy5jaGF0Tm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd2NoYXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVd4U2hhcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYXJkMT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkMVwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZDJcIilcclxuICAgICAgICB0aGlzLmNhcmQzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmQzXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkND10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkNFwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDEuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDMuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcIm9wdFwiKVxyXG4gICAgICAgIHRoaXMub3B0LmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJleHBzdHJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgICAgICAgdGhpcy5jYXJkMW51bT0wO1xyXG4gICAgICAgIHRoaXMuY2FyZDJudW09MDtcclxuICAgICAgICB0aGlzLmNhcmQzbnVtPTA7XHJcbiAgICAgICAgdGhpcy5jYXJkNG51bT0wO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQ9bnVsbFxyXG5cclxuICAgICAgICB0aGlzLmNhcmQxLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkMSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYXJkMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkY2FyZDIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FyZDMub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRlZGNhcmQzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNhcmQ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkNCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkdhbWVTdGF0ZVwiKTtcclxuICAgICAgICB0aGlzLmNsb2NrPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcImNsb2NrXCIpXHJcbiAgICAgICAgdGhpcy5jbG9jay5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBzcD1udWxsXHJcbiAgICAgICAgZm9yKHZhciBpPTEwNjE7aTwxMTE1O2krKyl7XHJcbiAgICAgICAgICAgIHNwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfXCIraStcIkAyeFwiKVxyXG4gICAgICAgICAgICBzcC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FyZDFvcmlncG9zPXRoaXMuY2FyZDEucG9zaXRpb25cclxuICAgICAgICB0aGlzLmNhcmQyb3JpZ3Bvcz10aGlzLmNhcmQyLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5jYXJkM29yaWdwb3M9dGhpcy5jYXJkMy5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMuY2FyZDRvcmlncG9zPXRoaXMuY2FyZDQucG9zaXRpb25cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgd2luZG93LmRlbHRhPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5nZXRPcmlnaW5hbFNpemUoKS5oZWlnaHQqMC44XHJcbiAgICAgICAgLy9cclxuICAgICAgICB2YXIgb3V0PWNjLnYyKDAsIDApXHJcbiAgICAgICAgLy92YXIgc2VhdDFjYXJkcG9zPWNjLnYyKDAsIDApXHJcbiAgICAgICAgdmFyIHNlYXQxY2FyZHBvcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikucG9zaXRpb25cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIgKHNlYXQxY2FyZHBvcywgb3V0KVxyXG4gICAgICAgIHRoaXMuc2VhdDFjYXJkcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihvdXQpXHJcbiAgICAgICAgdGhpcy5zZWF0MWNhcmRwb3MueT10aGlzLnNlYXQxY2FyZHBvcy55LXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5nZXRPcmlnaW5hbFNpemUoKS5oZWlnaHQqMC44XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS55PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLnkrd2luZG93LmRlbHRhXHJcbiAgICAgICAgLy92YXIgc2VhdDJjYXJkcG9zPWNjLnYyKDAsIDApXHJcbiAgICAgICAgb3V0PWNjLnYyKDAsIDApXHJcbiAgICAgICAgdmFyIHNlYXQyY2FyZHBvcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikucG9zaXRpb25cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIgKHNlYXQyY2FyZHBvcywgb3V0KVxyXG4gICAgICAgIHRoaXMuc2VhdDJjYXJkcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihvdXQpXHJcblxyXG5cclxuICAgICAgICB0aGlzLmdhbWVIaW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdhbWVIaW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhdDE9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpXHJcbiAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLnNlYXQyPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKVxyXG4gICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVd4U2hhcmUoKTtcclxuICAgICAgICAgICAgaWYod2luZG93LnR5cGU9PTIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaEVuZGVkY2FyZDE6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgaWYodGhpcy5hY3QubGVuZ3RoLTE+PTApe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDFudW0gfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDJudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkM251bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQ0bnVtKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jYXJkMXNlbGVjdGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD10aGlzLmNhcmQxXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMSlcclxuICAgICAgICAgICAgdGhpcy5hY3QucHVzaCh0aGlzLmNhcmQxbnVtKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkMjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQyc2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDJudW0pXHJcbiAgICAgICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD10aGlzLmNhcmQyXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkMzpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQzc2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5jYXJkM3NlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDNudW0pXHJcbiAgICAgICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD10aGlzLmNhcmQzXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkNDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQ0c2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5jYXJkNHNlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD10aGlzLmNhcmQ0XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEJhdHRlcnlQZXJjZW50OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuQU5EUk9JRF9BUEksIFwiZ2V0QmF0dGVyeVBlcmNlbnRcIiwgXCIoKUZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLklPU19BUEksIFwiZ2V0QmF0dGVyeVBlcmNlbnRcIik7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDAuOTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nPXRoaXMuYWN0LmpvaW4oXCJcIilcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKS8xMDAwLzYwKTtcclxuICAgICAgICBpZih0aGlzLl9sYXN0TWludXRlICE9IG1pbnV0ZXMpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0TWludXRlID0gbWludXRlcztcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgaCA9IGggPCAxMD8gXCIwXCIraDpoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgbSA9IG0gPCAxMD8gXCIwXCIrbTptO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lTGFiZWwuc3RyaW5nID0gXCJcIiArIGggKyBcIjpcIiArIG07ICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBvd2VyID0gY2MuZmluZChcIkNhbnZhcy9iZzIvcG93ZXJcIilcclxuICAgICAgICBwb3dlci5zY2FsZVggPSB0aGlzLmdldEJhdHRlcnlQZXJjZW50KCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9uYWRkYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIrXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9ucmVkdWNlYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCItXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9ubXVsYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIqXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uZGl2YWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIvXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9ubGVmYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIoXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9ucmlnYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYWN0LnB1c2goXCIpXCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uZGVsYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHZhciBudW09dGhpcy5hY3QucG9wKClcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkLnNldFNjYWxlKDAuOClcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDEpIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkMikgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgaWYodGhpcy5sYXN0dG91Y2hjYXJkPT10aGlzLmNhcmQzKSB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDQpIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD1udWxsXHJcblxyXG4gICAgfSxcclxuICAgIG9uc3VyZWFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmNhcmQxc2VsZWN0ZWQ9PWZhbHNlfHx0aGlzLmNhcmQyc2VsZWN0ZWQ9PWZhbHNlfHx0aGlzLmNhcmQzc2VsZWN0ZWQ9PWZhbHNlfHx0aGlzLmNhcmQ0c2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLlm5vlvKDniYzpg73lv4Xpobvkvb/nlKjkuIDmrKHvvIzor7fph43mlrDorqHnrpdcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkM3NlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDIuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDQuc2V0U2NhbGUoMC44KVxyXG5cclxuICAgICAgICB2YXIgc3RyPXRoaXMuYWN0LmpvaW4oXCJcIilcclxuICAgICAgICB2YXIgcmVzPTA7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAvL3ZhciByZXM9ZXZhbChzdHIpO1xyXG4gICAgICAgICAgICAvL3ZhciByZXM9IHdpbmRvdy5iaW5kaW5nLmV2YWwoc3RyKVxyXG4gICAgICAgICAgICByZXM9d2luZG93LmV2YWwyKHN0cilcclxuICAgICAgICAgICAgLy9jYy5sb2coXCJ0dHR0dHR0dHR0dHR0dHRcIixyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoe1xyXG4gICAgICAgICAgICAvL3Jlcz1cInN5bnRheCBlcnJvclwiXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi6L6T5YWl5peg5pWI77yM6K+36YeN5paw6K6h566XXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hbGVydCgpO1xyXG4gICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgICAgICAgLy90aGlzLmFjdC5wdXNoKHJlcylcclxuICAgICAgICBpZihyZXM9PTI0KXtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuICAgICAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgICAgIHBsYXllci5vbnN1cmVhY3Qoc3RyKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIuiuoeeul+e7k+aenOS4ulwiICsgcmVzICsgXCLkuI3mraPnoa7vvIzor7fph43mlrDorqHnrpdcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhcInN1Ym1pdD1cIixyZXMpXHJcblxyXG4gICAgfSxcclxuICAgIHBpY2tVcGVkOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAvL2NjLmxvZyhcIndvcmxkc2VuY2UucGlja3VwZWRcIilcclxuXHJcbiAgICB9LFxyXG4gICAgaW5zdGFsbEV2ZW50cyA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25BdmF0YXJFbnRlcldvcmxkXCIsIHRoaXMsIFwib25BdmF0YXJFbnRlcldvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25FbnRlcldvcmxkXCIsIHRoaXMsIFwib25FbnRlcldvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25MZWF2ZVdvcmxkXCIsIHRoaXMsIFwib25MZWF2ZVdvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwiZ2FtZV9iZWdpbl9wdXNoXCIsIHRoaXMsIFwiZ2FtZV9iZWdpbl9wdXNoXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsIHRoaXMsIFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwibmV3VHVyblwiLCB0aGlzLCBcIm5ld1R1cm5cIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIsIHRoaXMsIFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9ub3RoZXJOZXRjdXRcIiwgdGhpcywgXCJvbm90aGVyTmV0Y3V0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25HYW1lT3ZlclwiLCB0aGlzLCBcIm9uR2FtZU92ZXJcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25EaXNjb25uZWN0ZWRcIiwgdGhpcywgXCJvbkRpc2Nvbm5lY3RlZFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkF2YXRhckNvbnRpbnVlR2FtZVwiLCB0aGlzLCBcIm9uQXZhdGFyQ29udGludWVHYW1lXCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9ucXVpY2tfY2hhdFwiLCB0aGlzLCBcIm9ucXVpY2tfY2hhdFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uZW1vamlcIiwgdGhpcywgXCJvbmVtb2ppXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25pcHRDaGF0XCIsIHRoaXMsIFwib25pcHRDaGF0XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uRW50ZXJXb3JsZDJcIiwgdGhpcywgXCJvbkVudGVyV29ybGQyXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwidXBkYXRlZ2FtZXN0dXRzXCIsIHRoaXMsIFwidXBkYXRlZ2FtZXN0dXRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZXJvb21rZXlcIiwgdGhpcywgXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiKTtcclxuICAgICAgICBcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uc3luY3N1cmVhY3RcIiwgdGhpcywgXCJvbnN5bmNzdXJlYWN0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25qb2luUHJpdmF0ZVJvb21cIiwgdGhpcywgXCJvbmpvaW5Qcml2YXRlUm9vbVwiKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBlbnRpdHlfdXBkYXRlcm9vbWtleTpmdW5jdGlvbihyb29tS2V5YyxhdmF0YXIpe1xyXG4gICAgICAgIGNjLmxvZyhcImVudGl0eV91cGRhdGVyb29ta2V5ZW50aXR5X3VwZGF0ZXJvb21rZXk9XCIscm9vbUtleWMpXHJcbiAgICAgICAgdGhpcy5Sb29tSUQuc3RyaW5nPVwi5oi/6Ze05Y+3OlwiK3Jvb21LZXljLmpvaW4oXCJcIilcclxuICAgICAgICB0aGlzLnJvb21LZXljPXJvb21LZXljLmpvaW4oXCJcIilcclxuXHJcbiAgICB9LFxyXG4gICAgZW5hYmxlV3hTaGFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoKTtcclxuXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJzb3VuZC9zaGFyZVwiLGZ1bmN0aW9uKGVycixkYXRhKXtcclxuICAgICAgICAgICAvLyB3eC5zaGFyZUFwcE1lc3NhZ2UoeyAgIC8v5omT5byA5bCP5ri45oiP6Ieq5Yqo5YiG5LqrXHJcbiAgICAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiMjTngrkg5pm65Yqb5bCPUEtcIixcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBkYXRhLnVybCxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwiUm9vbWlkPVwiICsgc2VsZi5yb29tS2V5YyArIFwiJlVzZXJOYW1lPVwiICsgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsLy8g5Yir5Lq654K55Ye76ZO+5o6l5pe25Lya5b6X5Yiw55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OlwiUm9vbWlkPVwiKyBzZWxmLnJvb21LZXljK1wiJlVzZXJOYW1lPVwiKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvmiJDlip9cIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5YiG5Lqr5aSx6LSlXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy55YW9xaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICB9LFxyXG5cclxuICAgIGVuYWJsZVBoeXNpY01hbmFnZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2NjLmxvZyhcInRlc3QxXCIpXHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmVuYWJsZWQgPXRydWU7XHJcbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlUGh5c2ljc0RlYnVnRHJhdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2MubG9nKFwidGVzdDJcIilcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZGVidWdEcmF3RmxhZ3MgPVxyXG4gICAgICAgICAgICAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2FhYmJCaXQgfFxyXG4gICAgICAgICAgICAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3BhaXJCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2NlbnRlck9mTWFzc0JpdCB8XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfam9pbnRCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3NoYXBlQml0IHxcclxuICAgICAgICAgICAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9yYXlDYXN0O1xyXG4gICAgfSxcclxuXHJcbiAgICBcclxuXHJcbiAgICB1bkluc3RhbGxFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkF2YXRhckVudGVyV29ybGRcIiwgdGhpcywgXCJvbkF2YXRhckVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25MZWF2ZVdvcmxkXCIsIHRoaXMsIFwib25MZWF2ZVdvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJnYW1lX2JlZ2luX3B1c2hcIiwgdGhpcywgXCJnYW1lX2JlZ2luX3B1c2hcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcImVudGl0eV91cGRhdGVob2xkc1wiLCB0aGlzLCBcImVudGl0eV91cGRhdGVob2xkc1wiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwibmV3VHVyblwiLCB0aGlzLCBcIm5ld1R1cm5cIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIiwgdGhpcywgXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbm90aGVyTmV0Y3V0XCIsIHRoaXMpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkdhbWVPdmVyXCIsIHRoaXMpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkRpc2Nvbm5lY3RlZFwiLCB0aGlzLCBcIm9uRGlzY29ubmVjdGVkXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQ29ubmVjdGlvblN0YXRlXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGVcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkF2YXRhckNvbnRpbnVlR2FtZVwiLCB0aGlzLCBcIm9uQXZhdGFyQ29udGludWVHYW1lXCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25xdWlja19jaGF0XCIsIHRoaXMsIFwib25xdWlja19jaGF0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbmVtb2ppXCIsIHRoaXMsIFwib25lbW9qaVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25pcHRDaGF0XCIsIHRoaXMsIFwib25pcHRDaGF0XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25FbnRlcldvcmxkMlwiLCB0aGlzLCBcIm9uRW50ZXJXb3JsZDJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcInVwZGF0ZWdhbWVzdHV0c1wiLCB0aGlzLCBcInVwZGF0ZWdhbWVzdHV0c1wiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZXJvb21rZXlcIiwgdGhpcywgXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uc3luY3N1cmVhY3RcIiwgdGhpcywgXCJvbnN5bmNzdXJlYWN0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbmpvaW5Qcml2YXRlUm9vbVwiLCB0aGlzLCBcIm9uam9pblByaXZhdGVSb29tXCIpO1xyXG4gICAgfSxcclxuICAgIG9uam9pblByaXZhdGVSb29tOmZ1bmN0aW9uKG51bSl7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlN0YXJ0U2NlbmVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9naW5yZXM9bnVtXHJcbiAgICAgICAgICAgIGNjLmxvZyhcInN0YXJ0c2NlbmU9PT0+d29yZHNjZW5lXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51bkluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbnF1aWNrX2NoYXQ6ZnVuY3Rpb24oZWlkLGlkeCl7XHJcbiAgICAgICAgLy9jYy5sb2coXCI3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3cXVpY2tfY2hhdD1cIixlaWQsaWR4KVxyXG4gICAgICAgIHZhciBzdHJzdHI9dGhpcy5ub2RlLmdldENvbXBvbmVudChcIkNoYXRcIikuZ2V0UXVpY2tDaGF0SW5mbyhpZHgpW1wiY29udGVudFwiXVxyXG4gICAgICAgIC8vY2MubG9nKFwiODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4cXVpY2tfY2hhdD1cIixzdHJzdHIpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25lbW9qaTpmdW5jdGlvbihlaWQsbmFtZSl7XHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhlbW9qaT1cIixuYW1lKVxyXG4gICAgICAgIGlmKEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZD09ZWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5lbW9qaShuYW1lKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmVtb2ppKG5hbWUpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbmlwdENoYXQ6ZnVuY3Rpb24oZWlkLHN0cnN0cil7XHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhlaXB0Q2hhdD1cIixzdHJzdHIpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgIC8vIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmNoYXQoc3Ryc3RyKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheWVyUmVhZHlTdGF0ZUNoYW5nZTpmdW5jdGlvbihlaWQsc3RhdGUpe1xyXG4gICAgICAgIC8vY2MubG9nKFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiKVxyXG4gICAgICAgIGlmKEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZD09ZWlkKSB7ICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPXRydWUgXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZSBcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICBcclxuICAgICAgICB9ICAgIFxyXG5cclxuICAgIH0sXHJcbiAgICBvbnVwZGF0ZUdhbWVzdGF0ZXM6ZnVuY3Rpb24oY3VySUQsdGltZSl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJvbnVwZGF0ZUdhbWVzdGF0ZXNcIilcclxuICAgICAgICB0aGlzLm5ld1R1cm4oY3VySUQsdGltZSlcclxuXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlZ2FtZXN0dXRzOmZ1bmN0aW9uKG51bSl7XHJcbiAgICAgICAgaWYobnVtPT0xKXsvL+acjeWKoeWZqOato+WcqHBsYXlpbmfkuK1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhcnRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7Ly/kuIDlsYDlt7Lnu5PmnZ9cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhcnRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25vdGhlck5ldGN1dDpmdW5jdGlvbihjdXJJRCl7XHJcbiAgICAgICAgY2MubG9nKFwib25vdGhlck5ldGN1dOOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAglwiKVxyXG4gICAgICAgIGlmKGN1cklEPT0wKXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIuWFtuS7lueOqemAg+WRve+8jOa4uOaIj+mprOS4iue7k+adny4uLi4uLi5cIjtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi546p5a62XCIrS0JFbmdpbmUuYXBwLmVudGl0aWVzW2N1cklEXS5hY2NvdW50TmFtZSArXCLmjonnur/vvIzor7fnrYnlvoUuLi4uLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oMTMuMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lU3RhdGUubmV3VHVybigxNSk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgb25zeW5jc3VyZWFjdDpmdW5jdGlvbihzdHJzKXtcclxuICAgICAgICBjYy5sb2coXCJ3b3JsZDo6b25zeW5jc3VyZWFjdFwiLCBzdHJzKVxyXG4gICAgICAgIC8vdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgLy90aGlzLmdhbWVIaW50LnN0cmluZyA9IHN0cnNcclxuICAgICAgICAvL3ZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAvL3RoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2Nvbm5lY3RlZCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZGlzY29ubmVjdCEgd2lsbCB0cnkgdG8gcmVjb25uZWN0Li4uXCIpO1xyXG4gICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxLjAsIDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCJkaXNjb25uZWN0ISB3aWxsIHRyeSB0byByZWNvbm5lY3QuLi5cIjtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuRGVzdHJveXBsYXllcigpXHJcbiAgICAgICAgS0JFbmdpbmUuYXBwLnJlbG9naW5CYXNlYXBwKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblJlbG9naW5CYXNlYXBwVGltZXIgOiBmdW5jdGlvbihzZWxmKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJ3aWxsIHRyeSB0byByZWNvbm5lY3QoXCIgKyB0aGlzLnJlbG9naW5Db3VudCArIFwiKS4uLlwiKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgZmFpbGVkKOaWree6v+mHjei/nuWksei0pSksIGVycj1cIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSkpOyAgIFxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwicmVvZ2luIGlzIHN1Y2Nlc3NmdWxseSEo5pat57q/6YeN6L+e5oiQ5YqfISlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHRcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcInJlb2dpbiBpcyBzdWNjZXNzZnVsbHkhKOaWree6v+mHjei/nuaIkOWKnyEpXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBvbkNvbm5lY3Rpb25TdGF0ZSA6IGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcclxuICAgICAgICBpZighc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBLQkVuZ2luZS5FUlJPUl9NU0coXCJDb25uZWN0KFwiICsgS0JFbmdpbmUuYXBwLmlwICsgXCI6XCIgKyBLQkVuZ2luZS5hcHAucG9ydCArIFwiKSBpcyBlcnJvciEgKOi/nuaOpemUmeivrylcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJDb25uZWN0IHN1Y2Nlc3NmdWxseSwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5oiQ5Yqf77yM6K+3562J5YCZLi4uKVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVxQ2hhbmdlUmVhZHlTdGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgIHBsYXllci5yZXFDaGFuZ2VSZWFkeVN0YXRlKClcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnNldFJlYWR5KHRydWUpXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgXHJcbiAgICB9LFxyXG4gICAgZW50aXR5X3VwZGF0ZWhvbGRzOmZ1bmN0aW9uKGhvbGRzLGVudGl0eSl7XHJcbiAgICAgICAgY2MubG9nKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsZW50aXR5LmlkLGhvbGRzKVxyXG4gICAgICAgIGlmKGVudGl0eS5jbGFzc05hbWUgPT0gXCJBdmF0YXJcIikge1xyXG4gICAgICAgICAgICBpZihlbnRpdHkuaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkgeyAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2hvbGRzPWhvbGRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgICBcclxuICAgICAgICAgICAgfWVsc2V7ICAvL3NjYWxleD09LTEsXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9aG9sZHNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgXHJcbiAgICB9LFxyXG4gICAgZ2FtZV9iZWdpbl9wdXNoOmZ1bmN0aW9uKGVudGl0eSl7XHJcbiAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6Z2FtZV9iZWdpbl9wdXNoXCIpXHJcbiAgICAgICAgLy90aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy90aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2hvbGRzPWVudGl0eS5ob2xkc1xyXG4gICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7IFxyXG5cclxuICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICB9LFxyXG4gICAgb25FbnRlcldvcmxkOiBmdW5jdGlvbiAoZW50aXR5KSB7XHJcbiAgICAgICAgLy9TQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm9uRW50ZXJXb3JsZCBlbnRpdHkuaWQ9XCIsZW50aXR5LmlkKVxyXG4gICAgICAgIGlmKCFlbnRpdHkuaXNQbGF5ZXIoKSkge1xyXG4gICAgICAgICAgICB2YXIgYWUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVudGl0eS5pZCkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgIH1lbHNleyAgLy9zY2FsZXg9PS0xLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hpbmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1lbnRpdHkuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWVudGl0eS5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5OyBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpvbkVudGVyV29ybGQ9XCIsdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5KVxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25FbnRlcldvcmxkMjogZnVuY3Rpb24gKGVudGl0eUlEKSB7XHJcbiAgICAgICAgY2MubG9nKFwib25FbnRlcldvcmxkMlwiKVxyXG4gICAgICAgIHZhciBlbnRpdHk9S0JFbmdpbmUuYXBwLmVudGl0aWVzW2VudGl0eUlEXVxyXG4gICAgICAgIC8vU0NBTEU9MTtcclxuICAgICAgICBjYy5sb2coXCJvbkVudGVyV29ybGQgZW50aXR5LmlkPVwiLGVudGl0eS5pZClcclxuICAgICAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1lbnRpdHkuaWQpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1lbnRpdHkuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWVudGl0eS5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHk7ICBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpvbkVudGVyV29ybGQ9XCIsdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5KVxyXG4gICAgICAgICAgICB9ZWxzZXsgIC8vc2NhbGV4PT0tMSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9ZW50aXR5LmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1lbnRpdHkuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6b25FbnRlcldvcmxkPVwiLHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeSlcclxuICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICB9LFxyXG4gICAgb25MZWF2ZVdvcmxkOiBmdW5jdGlvbiAoZW50aXR5KSB7XHJcbiAgICAgICAgY2MubG9nKFwib25MZWF2ZVdvcmxkXCIsZW50aXR5LmlkLGVudGl0eS5jbGFzc05hbWUpXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5mYWRlSW4oMC41KTsvL+a4kOaYvlxyXG4gICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgwLjUpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjEsYWN0aW9uMikpXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5ydW5BY3Rpb24ocmVwZWF0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNjLmxvZyhcIm9uTGVhdmVXb3JsZFwiLGVudGl0eS5pZCxlbnRpdHkuY2xhc3NOYW1lKVxyXG4gICAgICAgIGlmKHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXSAmJiBlbnRpdHkuY2xhc3NOYW1lID09IFwiQXZhdGFyXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eS5pZF0ucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXT1udWxsXHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgKi8gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQXZhdGFyRW50ZXJXb3JsZCA6IGZ1bmN0aW9uKGF2YXRhcikge1xyXG4gICAgICAgIGNjLmxvZyhcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKGF2YXRhcik7XHJcbiAgICB9LFxyXG5cclxuICAgXHJcbiAgICB1cGRhdGVQb3NpdGlvbiA6IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgICAgXHJcbiAgICB9LFx0ICBcclxuICAgIFxyXG4gICAgc2V0X3Bvc2l0aW9uOiBmdW5jdGlvbihlbnRpdHkpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0Q2FtZXJhVGFyZ2V0OiBmdW5jdGlvbihlbnRpdHlJRCl7XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tQbGF5ZXJIYXNJdGVtOiBmdW5jdGlvbihsZWZ0KSB7XHJcbiAgICAgICAgLy9jYy5sb2coXCJ0ZXN0MTRcIilcclxuICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG5ld1R1cm46IGZ1bmN0aW9uKGF2YXRhcixlaWQsIHNlY29uZCxjYXJkMDEsY2FyZDAyLGNhcmQwMyxjYXJkMDQpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnN0b3BCR00oKVxyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ0dXJuXCIpXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLm5ld1R1cm4oc2Vjb25kKTtcclxuICAgICAgICB0aGlzLmNsb2NrLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhcnRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZVN0YXRlLmlzR2FtZVN0YXJ0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuc2V0R2FtZVN0YXJ0KHRydWUpO1xyXG4gICAgICAgICAgICAvL3ZhciBhY3Rpb24gPSBjYy5mYWRlVG8oMS4wLCAwKTtcclxuICAgICAgICAgICAgLy90aGlzLmxhYmVsLnN0cmluZyA9IFwi5ri45oiP5byA5aeLICEhIVwiO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWwubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkM3NlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDIuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDQuc2V0U2NhbGUoMC44KVxyXG5cclxuICAgICAgICB0aGlzLmNhcmQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5jYXJkMi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuY2FyZDMuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmNhcmQ0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYXJkMDE9Y2FyZDAxO1xyXG4gICAgICAgIHRoaXMuY2FyZDAyPWNhcmQwMjtcclxuICAgICAgICB0aGlzLmNhcmQwMz1jYXJkMDM7XHJcbiAgICAgICAgdGhpcy5jYXJkMDQ9Y2FyZDA0O1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICB2YXIgQV9hY3QxPW51bGxcclxuICAgICAgICB2YXIgQV9hY3QyPW51bGxcclxuICAgICAgICB2YXIgQV9hY3QzPW51bGxcclxuICAgICAgICB2YXIgQV9hY3Q0PW51bGxcclxuICAgICAgICB2YXIgQl9hY3QxPW51bGxcclxuICAgICAgICB2YXIgQl9hY3QyPW51bGxcclxuICAgICAgICB2YXIgQl9hY3QzPW51bGxcclxuICAgICAgICB2YXIgQl9hY3Q0PW51bGxcclxuXHJcbiAgICAgICAgdmFyIHgxPXRoaXMuc2VhdDFjYXJkcG9zLng7XHJcbiAgICAgICAgdmFyIHkxPXRoaXMuc2VhdDFjYXJkcG9zLnlcclxuXHJcbiAgICAgICAgdmFyIHgyPXRoaXMuc2VhdDJjYXJkcG9zLng7XHJcbiAgICAgICAgdmFyIHkyPXRoaXMuc2VhdDJjYXJkcG9zLnlcclxuICAgICAgICB2YXIgY2FyZDFvcmlncG9zeD10aGlzLmNhcmQxb3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQxb3JpZ3Bvc3k9dGhpcy5jYXJkMW9yaWdwb3MueVxyXG5cclxuICAgICAgICB2YXIgY2FyZDJvcmlncG9zeD10aGlzLmNhcmQyb3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQyb3JpZ3Bvc3k9dGhpcy5jYXJkMm9yaWdwb3MueVxyXG5cclxuICAgICAgICB2YXIgY2FyZDNvcmlncG9zeD10aGlzLmNhcmQzb3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQzb3JpZ3Bvc3k9dGhpcy5jYXJkM29yaWdwb3MueVxyXG5cclxuICAgICAgICB2YXIgY2FyZDRvcmlncG9zeD10aGlzLmNhcmQ0b3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQ0b3JpZ3Bvc3k9dGhpcy5jYXJkNG9yaWdwb3MueVxyXG4gICAgICAgIGNjLmxvZyhcInRoaXMuY3VyaWQ9XCIsZWlkKVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy5zZWF0MmNhcmRwb3M9XCIseDEseTEpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLnNlYXQxY2FyZHBvcz1cIix4Mix5MilcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQxb3JpZ3Bvcz1cIixjYXJkMW9yaWdwb3N4LGNhcmQxb3JpZ3Bvc3kpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsY2FyZDJvcmlncG9zeCxjYXJkMm9yaWdwb3N5KVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDJvcmlncG9zPVwiLGNhcmQzb3JpZ3Bvc3gsY2FyZDNvcmlncG9zeSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIixjYXJkNG9yaWdwb3N4LGNhcmQ0b3JpZ3Bvc3kpXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuY2FyZDIuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuY2FyZDMuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuY2FyZDQuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIGlmKGVpZD09MCl7Ly/lkITlm57lkITlrrZcclxuIFxyXG5cclxuICAgICAgICAgICAgQV9hY3QxPWNjLm1vdmVUbygxLGNjLnYyKHgxLHkxKSlcclxuICAgICAgICAgICAgQV9hY3QyPWNjLm1vdmVUbygxLGNjLnYyKHgxLHkxKSlcclxuXHJcbiAgICAgICAgICAgIEFfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52Mih4Mix5MikpXHJcbiAgICAgICAgICAgIEFfYWN0ND1jYy5tb3ZlVG8oMSxjYy52Mih4Mix5MikpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZWlkPT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCJlaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCxtb3ZldG8gc2VhdDFcIixlaWQsS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKVxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2MubG9nKFwiZWlkIT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQsbW92ZXRvIHNlYXQyXCIsZWlkLEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZClcclxuICAgICAgICAgICAgQV9hY3QxPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3QyPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3QzPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3Q0PWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMW51bT0yK3BhcnNlSW50KChjYXJkMDErMTAwMC0xMDYxKS80KSAgLy8xLDIsMyw0XHJcbiAgICAgICAgdGhpcy5jYXJkMm51bT0yK3BhcnNlSW50KChjYXJkMDIrMTAwMC0xMDYxKS80KVxyXG4gICAgICAgIHRoaXMuY2FyZDNudW09MitwYXJzZUludCgoY2FyZDAzKzEwMDAtMTA2MSkvNClcclxuICAgICAgICB0aGlzLmNhcmQ0bnVtPTIrcGFyc2VJbnQoKGNhcmQwNCsxMDAwLTEwNjEpLzQpXHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDFudW0+MTApIHt0aGlzLmNhcmQxbnVtPTF9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDJudW0+MTApIHt0aGlzLmNhcmQybnVtPTF9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDNudW0+MTApIHt0aGlzLmNhcmQzbnVtPTF9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDRudW0+MTApIHt0aGlzLmNhcmQ0bnVtPTF9XHJcblxyXG4gICAgICAgIHZhciBmdW5jb3VudDE9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2hjb3VudDEoKVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MSgpXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBmdW5jb3VudDI9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2hjb3VudDIoKVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MigpXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBzZWxmPXRoaXNcclxuICAgICAgICB2YXIgZnVuMT1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MSxcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTE7XHJcbiAgICAgICAgICAgIGNhcmQwMT1jYXJkMDErMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAxK1wiQDJ4XCJcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgc2VsZi5jYXJkMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT0gc3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMSk7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZnVuMj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MVxyXG4gICAgICAgICAgICB0YXJnZXQueT15MVxyXG4gICAgICAgICAgICBjYXJkMDI9Y2FyZDAyKzEwMDA7XHJcbiAgICAgICAgICAgIHZhciB1cmw9XCJjYXJkX1wiK2NhcmQwMitcIkAyeFwiXHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodXJsKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDIpO1xyXG4gICAgICAgIHZhciBmdW4zPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgyXHJcbiAgICAgICAgICAgIHRhcmdldC55PXkyXHJcbiAgICAgICAgICAgIGNhcmQwMz1jYXJkMDMrMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAzK1wiQDJ4XCJcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMyk7XHJcbiAgICAgICAgdmFyIGZ1bjQ9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9eDJcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTJcclxuICAgICAgICAgICAgY2FyZDA0PWNhcmQwNCsxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDQrXCJAMnhcIlxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICB9LCB0aGlzLmNhcmQ0KTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bjExPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQxb3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDFvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBmdW4yMj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD1jYXJkMm9yaWdwb3N4XHJcbiAgICAgICAgICAgIHRhcmdldC55PWNhcmQyb3JpZ3Bvc3lcclxuICAgICAgICB9LCB0aGlzLmNhcmQyKTtcclxuICAgICAgICB2YXIgZnVuMzM9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDNvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkM29yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMyk7XHJcbiAgICAgICAgdmFyIGZ1bjQ0PWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQ0b3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDRvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDQpO1xyXG5cclxuICAgICAgICBCX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDFvcmlncG9zeCxjYXJkMW9yaWdwb3N5KSlcclxuICAgICAgICBCX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDJvcmlncG9zeCxjYXJkMm9yaWdwb3N5KSlcclxuICAgICAgICBCX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDNvcmlncG9zeCxjYXJkM29yaWdwb3N5KSlcclxuICAgICAgICBCX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDRvcmlncG9zeCxjYXJkNG9yaWdwb3N5KSlcclxuXHJcbiAgICAgICAgaWYoZWlkPT0xMjM0NSl7Ly/lkITlm57lkITlrrYy5bygXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjEsQl9hY3QxLGZ1bjExLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjIsQl9hY3QyLGZ1bjIyLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjMsQl9hY3QzLGZ1bjMzLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjQsQl9hY3Q0LGZ1bjQ0LGZ1bmNvdW50MikpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAvL+S4gOWutuWbm+W8oFxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDEsZnVuMSxmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0MSxmdW4xMSxmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDIsZnVuMixmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0MixmdW4yMixmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDMsZnVuMyxmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0MyxmdW4zMyxmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDQsZnVuNCxmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0NCxmdW40NCxmdW5jb3VudDIpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgY2MubG9nKFwid3d3d3d3bmV3VHVyblwiLGF2YXRhci5pZCwgc2Vjb25kLGNhcmQwMSxjYXJkMDIsY2FyZDAzLGNhcmQwNClcclxuXHJcbiAgICAgICAgdGhpcy5vcHQuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmFjdD1bXVxyXG4gIFxyXG4gICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uR2FtZU92ZXI6IGZ1bmN0aW9uKGF2YXRhcklELCBpc1dpbiwgaHAsIHRvdGFsVGltZSwgdG90YWxIYXJtLCBzY29yZSkge1xyXG4gICAgICAgIGlmKGF2YXRhcklEID09IEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkge1xyXG4gICAgICAgICAgICBIUCA9IGhwO1xyXG4gICAgICAgICAgICBUT1RBTF9USU1FID0gdG90YWxUaW1lO1xyXG4gICAgICAgICAgICBPdGhlckhQID0gdG90YWxIYXJtO1xyXG4gICAgICAgICAgICBTQ09SRSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBMVmxldmVsPU1hdGgucm91bmQoMTAwKlNDT1JFKVxyXG4gICAgICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgICAgICBpZihpc1dpbikge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV2luU2NlbmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb3NlU2NlbmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4XCIpXHJcbiAgICAgICAgLy90aGlzLmRpc0VuYWJsZUNvbnRyb2xQbGF5ZXIoKTtcclxuICAgICAgICAvL3RoaXMudW5JbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIGludmF0ZWZyaWVuZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICAvL3RoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwic291bmQvc2hhcmVcIixmdW5jdGlvbihlcnIsZGF0YSl7XHJcbiAgICAgICAgICAgIHZhciBzZWxmZj1zZWxmO1xyXG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHNlbGYuUm9vbUlELnN0cmluZyxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBkYXRhLnVybCxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwiUm9vbWlkPVwiICsgc2VsZi5yb29tS2V5YyArIFwiJlVzZXJOYW1lPVwiICsgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsLy8g5Yir5Lq654K55Ye76ZO+5o6l5pe25Lya5b6X5Yiw55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgICAgICBxdWVyeTpcIlJvb21pZD1cIisgc2VsZi5yb29tS2V5YytcIiZVc2VyTmFtZT1cIisgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5YiG5Lqr5oiQ5YqfXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZmLnlhb3FpbmcuYWN0aXZlPWZhbHNlICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgdGl0bGU6IHNlbGYuUm9vbUlELnN0cmluZyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IGRhdGEudXJsLFxyXG4gICAgICAgICAgICAvL3F1ZXJ5OiBcIlJvb21pZD1cIiArIHNlbGYucm9vbUtleWMgKyBcIiZVc2VyTmFtZT1cIiArIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLC8vIOWIq+S6uueCueWHu+mTvuaOpeaXtuS8muW+l+WIsOeahOaVsOaNrlxyXG4gICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgIHF1ZXJ5OlwiUm9vbWlkPVwiKyBzZWxmLnJvb21LZXljK1wiJlVzZXJOYW1lPVwiKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWIhuS6q+aIkOWKn1wiICsgcmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2UgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMueWFvcWluZy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICovXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlUGxheWVyOiBmdW5jdGlvbihhdmF0YXIpIHtcclxuICAgICAgIC8vIFNDQUxFPTE7XHJcbiAgICAgICAgY2MubG9nKFwibmV3IGNyZWF0ZVBsYXllciB0aGlzLnBsYXllcj3vvIxhdmF0YXIubW9kZWxJRD1cIix0aGlzLnBsYXllcixhdmF0YXIubW9kZWxJRCApXHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllcikge1xyXG4gICAgICAgICAgICBpZihhdmF0YXIuaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1hdmF0YXIuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9YXZhdGFyLmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gIHRoaXMuc2VhdDE7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXT10aGlzLnBsYXllciBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWF2YXRhci5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1hdmF0YXIuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSAgdGhpcy5zZWF0MjtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1thdmF0YXIuaWRdPXRoaXMucGxheWVyIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIGN0cmw9IHRoaXMucGxheWVyLmFkZENvbXBvbmVudChcIkF2YXRhckNvbnRyb2xcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbj0gdGhpcy5wbGF5ZXIuYWRkQ29tcG9uZW50KFwiQXZhdGFyQWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRQb3NpdGlvbihhdmF0YXIucG9zaXRpb24ueCpTQ0FMRSwgYXZhdGFyLnBvc2l0aW9uLnoqU0NBTEUpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXSA9IHRoaXMucGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2coXCJhZnRlciBjcmVhdGVQbGF5ZXIgdGhpcy5wbGF5ZXI977yMYXZhdGFyLm1vZGVsSUQ9XCIsdGhpcy5wbGF5ZXIsYXZhdGFyLm1vZGVsSUQgKVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkF2YXRhckNvbnRpbnVlR2FtZTogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICB0aGlzLmNyZWF0ZVBsYXllcihhdmF0YXIpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==