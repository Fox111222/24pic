
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcV29ybGRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJiaW5kanMiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNlYXQxIiwidHlwZSIsIk5vZGUiLCJzZWF0MiIsInNob3d3YW5nZmEiLCJ3aW5kb3ciLCJBdWRpb01nciIsInBsYXlTRlgiLCJpbnRyb2R1Y2UiLCJhY3RpdmUiLCJoaWRld2FuZ2ZhIiwic2hvd3NldHRpbmciLCJpc3Nob3dzZXR0aW5nIiwic2V0dGluZ05vZGUiLCJzaG93Y2hhdCIsImlzc2hvd2NoYXQiLCJjaGF0Tm9kZSIsImxvZyIsIm9uTG9hZCIsInJvb21LZXljIiwiaW5zdGFsbEV2ZW50cyIsIlJvb21JRCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInlhb3FpbmciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJtYXRjaGluZyIsInN0b3BBbGxBY3Rpb25zIiwiYWN0aW9uMSIsImZhZGVJbiIsImFjdGlvbjIiLCJmYWRlT3V0IiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwicGxheUJHTSIsIl90aW1lTGFiZWwiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiZW5hYmxlV3hTaGFyZSIsImNhcmQxIiwiY2FyZDIiLCJjYXJkMyIsImNhcmQ0Iiwib3B0IiwibGFiZWwiLCJhY3QiLCJjYXJkMW51bSIsImNhcmQybnVtIiwiY2FyZDNudW0iLCJjYXJkNG51bSIsImxhc3R0b3VjaGNhcmQiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIm9uVG91Y2hFbmRlZGNhcmQxIiwib25Ub3VjaEVuZGVkY2FyZDIiLCJvblRvdWNoRW5kZWRjYXJkMyIsIm9uVG91Y2hFbmRlZGNhcmQ0IiwiY2FyZDFzZWxlY3RlZCIsImNhcmQyc2VsZWN0ZWQiLCJjYXJkM3NlbGVjdGVkIiwiY2FyZDRzZWxlY3RlZCIsImdhbWVTdGF0ZSIsImNsb2NrIiwic3AiLCJpIiwiY2FyZDFvcmlncG9zIiwicG9zaXRpb24iLCJjYXJkMm9yaWdwb3MiLCJjYXJkM29yaWdwb3MiLCJjYXJkNG9yaWdwb3MiLCJkZWx0YSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZ2V0T3JpZ2luYWxTaXplIiwiaGVpZ2h0Iiwib3V0IiwidjIiLCJzZWF0MWNhcmRwb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInkiLCJzZWF0MmNhcmRwb3MiLCJnYW1lSGludCIsIm9wYWNpdHkiLCJsZW5ndGgiLCJzZXRTY2FsZSIsInB1c2giLCJnZXRCYXR0ZXJ5UGVyY2VudCIsImlzTmF0aXZlIiwib3MiLCJPU19BTkRST0lEIiwianNiIiwicmVmbGVjdGlvbiIsImNhbGxTdGF0aWNNZXRob2QiLCJBTkRST0lEX0FQSSIsIk9TX0lPUyIsIklPU19BUEkiLCJ1cGRhdGUiLCJkdCIsInN0cmluZyIsImpvaW4iLCJtaW51dGVzIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsIm5vdyIsIl9sYXN0TWludXRlIiwiZGF0ZSIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicG93ZXIiLCJzY2FsZVgiLCJvbmFkZGFjdCIsIm9ucmVkdWNlYWN0Iiwib25tdWxhY3QiLCJvbmRpdmFjdCIsIm9ubGVmYWN0Iiwib25yaWdhY3QiLCJvbmRlbGFjdCIsIm51bSIsInBvcCIsIm9uc3VyZWFjdCIsImFjdGlvbiIsImZhZGVUbyIsInN0ciIsInJlcyIsImV2YWwyIiwicGxheWVyIiwiYXBwIiwicGlja1VwZWQiLCJldmVudCIsIkV2ZW50IiwicmVnaXN0ZXIiLCJlbnRpdHlfdXBkYXRlcm9vbWtleSIsImF2YXRhciIsInd4Iiwic2hvd1NoYXJlTWVudSIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJkYXRhIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidXJsIiwic3VjY2VzcyIsImZhaWwiLCJlbmFibGVQaHlzaWNNYW5hZ2VyIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJtYW5hZ2VyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZVBoeXNpY3NEZWJ1Z0RyYXciLCJlbmFibGVkRGVidWdEcmF3IiwiZW5hYmxlZERyYXdCb3VuZGluZ0JveCIsImRlYnVnRHJhd0ZsYWdzIiwiUGh5c2ljc01hbmFnZXIiLCJEcmF3Qml0cyIsImVfY2VudGVyT2ZNYXNzQml0IiwiZV9zaGFwZUJpdCIsImVfcmF5Q2FzdCIsInVuSW5zdGFsbEV2ZW50cyIsImRlcmVnaXN0ZXIiLCJvbmpvaW5Qcml2YXRlUm9vbSIsImxvYWRTY2VuZSIsImxvZ2lucmVzIiwib25xdWlja19jaGF0IiwiZWlkIiwiaWR4Iiwic3Ryc3RyIiwiZ2V0UXVpY2tDaGF0SW5mbyIsImlkIiwiY2hhdCIsIm9uZW1vamkiLCJuYW1lIiwiZW1vamkiLCJvbmlwdENoYXQiLCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlIiwic3RhdGUiLCJfaXNSZWFkeSIsInJlZnJlc2giLCJvbnVwZGF0ZUdhbWVzdGF0ZXMiLCJjdXJJRCIsInRpbWUiLCJuZXdUdXJuIiwidXBkYXRlZ2FtZXN0dXRzIiwib25vdGhlck5ldGN1dCIsImVudGl0aWVzIiwiYWNjb3VudE5hbWUiLCJvbnN5bmNzdXJlYWN0Iiwic3RycyIsIm9uRGlzY29ubmVjdGVkIiwiSU5GT19NU0ciLCJEZXN0cm95cGxheWVyIiwicmVsb2dpbkJhc2VhcHAiLCJvblJlbG9naW5CYXNlYXBwVGltZXIiLCJzZWxmIiwicmVsb2dpbkNvdW50Iiwib25SZWxvZ2luQmFzZWFwcEZhaWxlZCIsImZhaWxlZGNvZGUiLCJzZXJ2ZXJFcnIiLCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5Iiwib25Db25uZWN0aW9uU3RhdGUiLCJFUlJPUl9NU0ciLCJpcCIsInBvcnQiLCJyZXFDaGFuZ2VSZWFkeVN0YXRlIiwic2V0UmVhZHkiLCJlbnRpdHlfdXBkYXRlaG9sZHMiLCJob2xkcyIsImVudGl0eSIsImNsYXNzTmFtZSIsIl9ob2xkcyIsImdhbWVfYmVnaW5fcHVzaCIsIm9uRW50ZXJXb3JsZCIsImlzUGxheWVyIiwiYWUiLCJfdXNlck5hbWUiLCJhdmF0YXJVcmwiLCJvbkVudGVyV29ybGQyIiwiZW50aXR5SUQiLCJvbkxlYXZlV29ybGQiLCJvbkF2YXRhckVudGVyV29ybGQiLCJjcmVhdGVQbGF5ZXIiLCJ1cGRhdGVQb3NpdGlvbiIsInNldF9wb3NpdGlvbiIsInNldENhbWVyYVRhcmdldCIsImNoZWNrUGxheWVySGFzSXRlbSIsImxlZnQiLCJzZWNvbmQiLCJjYXJkMDEiLCJjYXJkMDIiLCJjYXJkMDMiLCJjYXJkMDQiLCJpc0dhbWVTdGFydCIsInNldEdhbWVTdGFydCIsIkFfYWN0MSIsIkFfYWN0MiIsIkFfYWN0MyIsIkFfYWN0NCIsIkJfYWN0MSIsIkJfYWN0MiIsIkJfYWN0MyIsIkJfYWN0NCIsIngxIiwieCIsInkxIiwieDIiLCJ5MiIsImNhcmQxb3JpZ3Bvc3giLCJjYXJkMW9yaWdwb3N5IiwiY2FyZDJvcmlncG9zeCIsImNhcmQyb3JpZ3Bvc3kiLCJjYXJkM29yaWdwb3N4IiwiY2FyZDNvcmlncG9zeSIsImNhcmQ0b3JpZ3Bvc3giLCJjYXJkNG9yaWdwb3N5IiwibW92ZVRvIiwicGFyc2VJbnQiLCJmdW5jb3VudDEiLCJjYWxsRnVuYyIsInRhcmdldCIsInJlZnJlc2hjb3VudDEiLCJmdW5jb3VudDIiLCJyZWZyZXNoY291bnQyIiwiZnVuMSIsImZ1bjIiLCJmdW4zIiwiZnVuNCIsImZ1bjExIiwiZnVuMjIiLCJmdW4zMyIsImZ1bjQ0IiwiZGVsYXlUaW1lIiwib25HYW1lT3ZlciIsImF2YXRhcklEIiwiaXNXaW4iLCJocCIsInRvdGFsVGltZSIsInRvdGFsSGFybSIsInNjb3JlIiwiSFAiLCJUT1RBTF9USU1FIiwiT3RoZXJIUCIsIlNDT1JFIiwiTFZsZXZlbCIsInJvdW5kIiwiaW52YXRlZnJpZW5kIiwic2VsZmYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJxdWVyeSIsIm1vZGVsSUQiLCJzZXRQb3NpdGlvbiIsIlNDQUxFIiwieiIsIm9uQXZhdGFyQ29udGludWVHYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEIsRUFDQTs7O0FBQ0EsSUFBSUMsTUFBTSxHQUFDRCxPQUFPLENBQUMsT0FBRCxDQUFsQjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBRTtBQUNILGlCQUFTLElBRE47QUFFSEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRk4sS0FEQztBQU1SQyxJQUFBQSxLQUFLLEVBQUU7QUFDSCxpQkFBUyxJQUROO0FBRUhGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZOO0FBTkMsR0FIUDtBQWNMRSxFQUFBQSxVQUFVLEVBQUMsc0JBQVU7QUFDakJDLElBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsT0FBaEIsQ0FBd0IsVUFBeEI7QUFDQSxTQUFLQyxTQUFMLENBQWVDLE1BQWYsR0FBc0IsSUFBdEI7QUFDSCxHQWpCSTtBQWtCTEMsRUFBQUEsVUFBVSxFQUFDLHNCQUFVO0FBQ2pCTCxJQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCLFVBQXhCO0FBQ0EsU0FBS0MsU0FBTCxDQUFlQyxNQUFmLEdBQXNCLEtBQXRCO0FBQ0gsR0FyQkk7QUFzQkxFLEVBQUFBLFdBQVcsRUFBQyx1QkFBVTtBQUNsQk4sSUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxPQUFoQixDQUF3QixVQUF4QjtBQUNBLFNBQUtLLGFBQUwsR0FBcUIsQ0FBQyxLQUFLQyxXQUFMLENBQWlCSixNQUF2QztBQUNBLFNB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QUswRixZQUFMLENBQWtCMUYsTUFBbEI7QUFDRjtBQTVnQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG52YXIgS0JFbmdpbmUgPSByZXF1aXJlKFwia2JlbmdpbmVcIik7XHJcbi8vdmFyIGJpbmRqcz1yZXF1aXJlKFwiZXZhbFwiKVxyXG52YXIgYmluZGpzPXJlcXVpcmUoXCJldmFsMlwiKVxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc2VhdDE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZWF0Mjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2hvd3dhbmdmYTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmludHJvZHVjZS5hY3RpdmU9dHJ1ZVxyXG4gICAgfSxcclxuICAgIGhpZGV3YW5nZmE6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPWZhbHNlXHJcbiAgICB9LFxyXG4gICAgc2hvd3NldHRpbmc6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pc3Nob3dzZXR0aW5nID0gIXRoaXMuc2V0dGluZ05vZGUuYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ05vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3dzZXR0aW5nO1xyXG5cclxuICAgIH0sXHJcbiAgICBzaG93Y2hhdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmlzc2hvd2NoYXQgPSAhdGhpcy5jaGF0Tm9kZS5hY3RpdmU7XHJcbiAgICAgICAgdGhpcy5jaGF0Tm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd2NoYXQ7XHJcbiAgICAgICAgY2MubG9nKFwic2hvd2NoYXRcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLnJvb21LZXljPVwiXCJcclxuICAgICAgICB0aGlzLmluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICB0aGlzLlJvb21JRD1jYy5maW5kKFwiQ2FudmFzL2JnMi9Sb29tSURcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG5cclxuICAgICAgICB0aGlzLnlhb3Fpbmc9Y2MuZmluZChcIkNhbnZhcy9iZzIveWFvcWluZ1wiKVxyXG4gICAgICAgIHRoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2U9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW50cm9kdWNlXCIpXHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPWZhbHNlXHJcblxyXG4gICAgICAgIGlmKHdpbmRvdy50eXBlPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaGluZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtYXRjaGluZ1wiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaGluZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtYXRjaGluZzJcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtYXRjaGluZ1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMubWF0Y2hpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLmZhZGVJbigwLjUpOy8v5riQ5pi+XHJcbiAgICAgICAgdmFyIGFjdGlvbjIgPSBjYy5mYWRlT3V0KDAuNSk7Ly/muJDpmpDmlYjmnpxcclxuICAgICAgICB2YXIgcmVwZWF0PWNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYWN0aW9uMixhY3Rpb24xKSlcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLnJ1bkFjdGlvbihyZXBlYXQpO1xyXG4gICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlCR00oXCJiZ0JldFwiKVxyXG5cclxuICAgICAgICB0aGlzLl90aW1lTGFiZWwgPSBjYy5maW5kKFwiQ2FudmFzL2JnMi90aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pc3Nob3dzZXR0aW5nPWZhbHNlXHJcbiAgICAgICAgLy90aGlzLnNldHRpbmdOb2RlPWNjLmluc3RhbnRpYXRlKHRoaXMuc2V0dGluZylcclxuICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZCh0aGlzLnNldHRpbmdOb2RlKVxyXG4gICAgICAgIC8vdGhpcy5zZXR0aW5nTm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZXR0aW5nc1wiKVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ05vZGU9Y2MuZmluZChcIkNhbnZhcy9zZXR0aW5nc1wiKVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ05vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3dzZXR0aW5nO1xyXG5cclxuICAgICAgICB0aGlzLmlzc2hvd2NoYXQ9ZmFsc2VcclxuICAgICAgICAvL3RoaXMuY2hhdE5vZGU9Y2MuaW5zdGFudGlhdGUodGhpcy5jaGF0KVxyXG4gICAgICAgIC8vdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuY2hhdE5vZGUpXHJcbiAgICAgICAgdGhpcy5jaGF0Tm9kZT1jYy5maW5kKFwiQ2FudmFzL2NoYXRcIilcclxuICAgICAgICB0aGlzLmNoYXROb2RlLmFjdGl2ZSA9IHRoaXMuaXNzaG93Y2hhdDtcclxuICAgICAgICBcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlV3hTaGFyZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhcmQxPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmQxXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkMj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkMlwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDM9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZDNcIilcclxuICAgICAgICB0aGlzLmNhcmQ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmQ0XCIpXHJcbiAgICAgICAgdGhpcy5jYXJkMS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXJkMi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXJkMy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXJkNC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcHQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwib3B0XCIpXHJcbiAgICAgICAgdGhpcy5vcHQuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcImV4cHN0clwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICB0aGlzLmNhcmQxbnVtPTA7XHJcbiAgICAgICAgdGhpcy5jYXJkMm51bT0wO1xyXG4gICAgICAgIHRoaXMuY2FyZDNudW09MDtcclxuICAgICAgICB0aGlzLmNhcmQ0bnVtPTA7XHJcblxyXG4gICAgICAgIHRoaXMubGFzdHRvdWNoY2FyZD1udWxsXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRlZGNhcmQxLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNhcmQyLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkMiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYXJkMy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkY2FyZDMsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FyZDQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRlZGNhcmQ0LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkM3NlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiR2FtZVN0YXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2xvY2s9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwiY2xvY2tcIilcclxuICAgICAgICB0aGlzLmNsb2NrLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIHNwPW51bGxcclxuICAgICAgICBmb3IodmFyIGk9MTA2MTtpPDExMTU7aSsrKXtcclxuICAgICAgICAgICAgc3A9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZF9cIitpK1wiQDJ4XCIpXHJcbiAgICAgICAgICAgIHNwLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYXJkMW9yaWdwb3M9dGhpcy5jYXJkMS5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMuY2FyZDJvcmlncG9zPXRoaXMuY2FyZDIucG9zaXRpb25cclxuICAgICAgICB0aGlzLmNhcmQzb3JpZ3Bvcz10aGlzLmNhcmQzLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5jYXJkNG9yaWdwb3M9dGhpcy5jYXJkNC5wb3NpdGlvblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB3aW5kb3cuZGVsdGE9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLmdldE9yaWdpbmFsU2l6ZSgpLmhlaWdodCowLjhcclxuICAgICAgICAvL1xyXG4gICAgICAgIHZhciBvdXQ9Y2MudjIoMCwgMClcclxuICAgICAgICAvL3ZhciBzZWF0MWNhcmRwb3M9Y2MudjIoMCwgMClcclxuICAgICAgICB2YXIgc2VhdDFjYXJkcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUiAoc2VhdDFjYXJkcG9zLCBvdXQpXHJcbiAgICAgICAgdGhpcy5zZWF0MWNhcmRwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKG91dClcclxuICAgICAgICB0aGlzLnNlYXQxY2FyZHBvcy55PXRoaXMuc2VhdDFjYXJkcG9zLnktdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLmdldE9yaWdpbmFsU2l6ZSgpLmhlaWdodCowLjhcclxuICAgICAgICAvL3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLnk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikueSt3aW5kb3cuZGVsdGFcclxuICAgICAgICAvL3ZhciBzZWF0MmNhcmRwb3M9Y2MudjIoMCwgMClcclxuICAgICAgICBvdXQ9Y2MudjIoMCwgMClcclxuICAgICAgICB2YXIgc2VhdDJjYXJkcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQyXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQyXCIpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUiAoc2VhdDJjYXJkcG9zLCBvdXQpXHJcbiAgICAgICAgdGhpcy5zZWF0MmNhcmRwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKG91dClcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ2FtZUhpbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWF0MT0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIilcclxuICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuc2VhdDI9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQyXCIpXHJcbiAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlV3hTaGFyZSgpO1xyXG4gICAgICAgICAgICBpZih3aW5kb3cudHlwZT09MilcclxuICAgICAgICAgICAgICAgIHRoaXMueWFvcWluZy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkMTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQxc2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDFcclxuICAgICAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDFudW0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDJzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkMm51bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDJcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQzOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDNzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkM251bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDNcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQ0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDRzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDRcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QmF0dGVyeVBlcmNlbnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICBpZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5BTkRST0lEX0FQSSwgXCJnZXRCYXR0ZXJ5UGVyY2VudFwiLCBcIigpRlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKHRoaXMuSU9TX0FQSSwgXCJnZXRCYXR0ZXJ5UGVyY2VudFwiKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMC45O1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmc9dGhpcy5hY3Quam9pbihcIlwiKVxyXG4gICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcihEYXRlLm5vdygpLzEwMDAvNjApO1xyXG4gICAgICAgIGlmKHRoaXMuX2xhc3RNaW51dGUgIT0gbWludXRlcyl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RNaW51dGUgPSBtaW51dGVzO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBoID0gaCA8IDEwPyBcIjBcIitoOmg7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICBtID0gbSA8IDEwPyBcIjBcIittOm07XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVMYWJlbC5zdHJpbmcgPSBcIlwiICsgaCArIFwiOlwiICsgbTsgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcG93ZXIgPSBjYy5maW5kKFwiQ2FudmFzL2JnMi9wb3dlclwiKVxyXG4gICAgICAgIHBvd2VyLnNjYWxlWCA9IHRoaXMuZ2V0QmF0dGVyeVBlcmNlbnQoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgb25hZGRhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIitcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25yZWR1Y2VhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIi1cIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25tdWxhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIipcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25kaXZhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIi9cIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25sZWZhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIihcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25yaWdhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIilcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25kZWxhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdmFyIG51bT10aGlzLmFjdC5wb3AoKVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkMSkgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgaWYodGhpcy5sYXN0dG91Y2hjYXJkPT10aGlzLmNhcmQyKSB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDMpIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkNCkgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPW51bGxcclxuXHJcbiAgICB9LFxyXG4gICAgb25zdXJlYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDFzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDJzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDNzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDRzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIuWbm+W8oOeJjOmDveW/hemhu+S9v+eUqOS4gOasoe+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcblxyXG4gICAgICAgIHZhciBzdHI9dGhpcy5hY3Quam9pbihcIlwiKVxyXG4gICAgICAgIHZhciByZXM9MDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vdmFyIHJlcz1ldmFsKHN0cik7XHJcbiAgICAgICAgICAgIC8vdmFyIHJlcz0gd2luZG93LmJpbmRpbmcuZXZhbChzdHIpXHJcbiAgICAgICAgICAgIHJlcz13aW5kb3cuZXZhbDIoc3RyKVxyXG4gICAgICAgICAgICAvL2NjLmxvZyhcInR0dHR0dHR0dHR0dHR0dFwiLHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2h7XHJcbiAgICAgICAgICAgIC8vcmVzPVwic3ludGF4IGVycm9yXCJcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLovpPlhaXml6DmlYjvvIzor7fph43mlrDorqHnrpdcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdD1bXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FsZXJ0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICAvL3RoaXMuYWN0LnB1c2gocmVzKVxyXG4gICAgICAgIGlmKHJlcz09MjQpe1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm9uc3VyZWFjdChzdHIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi6K6h566X57uT5p6c5Li6XCIgKyByZXMgKyBcIuS4jeato+ehru+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwic3VibWl0PVwiLHJlcylcclxuXHJcbiAgICB9LFxyXG4gICAgcGlja1VwZWQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIC8vY2MubG9nKFwid29ybGRzZW5jZS5waWNrdXBlZFwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBpbnN0YWxsRXZlbnRzIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkF2YXRhckVudGVyV29ybGRcIiwgdGhpcywgXCJvbkF2YXRhckVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkVudGVyV29ybGRcIiwgdGhpcywgXCJvbkVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJnYW1lX2JlZ2luX3B1c2hcIiwgdGhpcywgXCJnYW1lX2JlZ2luX3B1c2hcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlaG9sZHNcIiwgdGhpcywgXCJlbnRpdHlfdXBkYXRlaG9sZHNcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIiwgdGhpcywgXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25vdGhlck5ldGN1dFwiLCB0aGlzLCBcIm9ub3RoZXJOZXRjdXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkdhbWVPdmVyXCIsIHRoaXMsIFwib25HYW1lT3ZlclwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkRpc2Nvbm5lY3RlZFwiLCB0aGlzLCBcIm9uRGlzY29ubmVjdGVkXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZVwiLCB0aGlzLCBcIm9uQ29ubmVjdGlvblN0YXRlXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25xdWlja19jaGF0XCIsIHRoaXMsIFwib25xdWlja19jaGF0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25lbW9qaVwiLCB0aGlzLCBcIm9uZW1vamlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25FbnRlcldvcmxkMlwiLCB0aGlzLCBcIm9uRW50ZXJXb3JsZDJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJ1cGRhdGVnYW1lc3R1dHNcIiwgdGhpcywgXCJ1cGRhdGVnYW1lc3R1dHNcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmpvaW5Qcml2YXRlUm9vbVwiLCB0aGlzLCBcIm9uam9pblByaXZhdGVSb29tXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGVudGl0eV91cGRhdGVyb29ta2V5OmZ1bmN0aW9uKHJvb21LZXljLGF2YXRhcil7XHJcbiAgICAgICAgY2MubG9nKFwiZW50aXR5X3VwZGF0ZXJvb21rZXllbnRpdHlfdXBkYXRlcm9vbWtleT1cIixyb29tS2V5YylcclxuICAgICAgICB0aGlzLlJvb21JRC5zdHJpbmc9XCLmiL/pl7Tlj7c6XCIrcm9vbUtleWMuam9pbihcIlwiKVxyXG4gICAgICAgIHRoaXMucm9vbUtleWM9cm9vbUtleWMuam9pbihcIlwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBlbmFibGVXeFNoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSgpO1xyXG5cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNvdW5kL3NoYXJlXCIsZnVuY3Rpb24oZXJyLGRhdGEpe1xyXG4gICAgICAgICAgIC8vIHd4LnNoYXJlQXBwTWVzc2FnZSh7ICAgLy/miZPlvIDlsI/muLjmiI/oh6rliqjliIbkuqtcclxuICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCIyNOeCuSDmmbrlipvlsI9QS1wiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGRhdGEudXJsLFxyXG4gICAgICAgICAgICAgICAgLy9xdWVyeTogXCJSb29taWQ9XCIgKyBzZWxmLnJvb21LZXljICsgXCImVXNlck5hbWU9XCIgKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSwvLyDliKvkurrngrnlh7vpk77mjqXml7bkvJrlvpfliLDnmoTmlbDmja5cclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwibmljaz1cIiArIG5pY2sgKyBcIiZnZW5kZXI9XCIgKyBnZW5kZXIgKyBcIiZjaXR5PVwiICsgY2l0eSxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6XCJSb29taWQ9XCIrIHNlbGYucm9vbUtleWMrXCImVXNlck5hbWU9XCIrIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWIhuS6q+aIkOWKn1wiICsgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2UgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcblxyXG4gICAgZW5hYmxlUGh5c2ljTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwidGVzdDFcIilcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9dHJ1ZTtcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVQaHlzaWNzRGVidWdEcmF3OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJ0ZXN0MlwiKVxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfcGFpckJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfY2VudGVyT2ZNYXNzQml0IHxcclxuICAgICAgICAgICAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfc2hhcGVCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3JheUNhc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG5cclxuICAgIHVuSW5zdGFsbEV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25FbnRlcldvcmxkXCIsIHRoaXMsIFwib25FbnRlcldvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcImdhbWVfYmVnaW5fcHVzaFwiLCB0aGlzLCBcImdhbWVfYmVnaW5fcHVzaFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsIHRoaXMsIFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiLCB0aGlzLCBcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9ub3RoZXJOZXRjdXRcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uR2FtZU92ZXJcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uRGlzY29ubmVjdGVkXCIsIHRoaXMsIFwib25EaXNjb25uZWN0ZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbnF1aWNrX2NoYXRcIiwgdGhpcywgXCJvbnF1aWNrX2NoYXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uZW1vamlcIiwgdGhpcywgXCJvbmVtb2ppXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkVudGVyV29ybGQyXCIsIHRoaXMsIFwib25FbnRlcldvcmxkMlwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwidXBkYXRlZ2FtZXN0dXRzXCIsIHRoaXMsIFwidXBkYXRlZ2FtZXN0dXRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uam9pblByaXZhdGVSb29tXCIsIHRoaXMsIFwib25qb2luUHJpdmF0ZVJvb21cIik7XHJcbiAgICB9LFxyXG4gICAgb25qb2luUHJpdmF0ZVJvb206ZnVuY3Rpb24obnVtKXtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3RhcnRTY2VuZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2dpbnJlcz1udW1cclxuICAgICAgICAgICAgY2MubG9nKFwic3RhcnRzY2VuZT09PT53b3Jkc2NlbmVcIilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9ucXVpY2tfY2hhdDpmdW5jdGlvbihlaWQsaWR4KXtcclxuICAgICAgICAvL2NjLmxvZyhcIjc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzdxdWlja19jaGF0PVwiLGVpZCxpZHgpXHJcbiAgICAgICAgdmFyIHN0cnN0cj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiQ2hhdFwiKS5nZXRRdWlja0NoYXRJbmZvKGlkeClbXCJjb250ZW50XCJdXHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhxdWlja19jaGF0PVwiLHN0cnN0cilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbmVtb2ppOmZ1bmN0aW9uKGVpZCxuYW1lKXtcclxuICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OGVtb2ppPVwiLG5hbWUpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmVtb2ppKG5hbWUpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuZW1vamkobmFtZSlcclxuICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uaXB0Q2hhdDpmdW5jdGlvbihlaWQsc3Ryc3RyKXtcclxuICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OGVpcHRDaGF0PVwiLHN0cnN0cilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgLy8gdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlOmZ1bmN0aW9uKGVpZCxzdGF0ZSl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHsgICBcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZSBcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlIFxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgIFxyXG4gICAgICAgIH0gICAgXHJcblxyXG4gICAgfSxcclxuICAgIG9udXBkYXRlR2FtZXN0YXRlczpmdW5jdGlvbihjdXJJRCx0aW1lKXtcclxuICAgICAgICAvL2NjLmxvZyhcIm9udXBkYXRlR2FtZXN0YXRlc1wiKVxyXG4gICAgICAgIHRoaXMubmV3VHVybihjdXJJRCx0aW1lKVxyXG5cclxuICAgIH0sXHJcbiAgICB1cGRhdGVnYW1lc3R1dHM6ZnVuY3Rpb24obnVtKXtcclxuICAgICAgICBpZihudW09PTEpey8v5pyN5Yqh5Zmo5q2j5ZyocGxheWluZ+S4rVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsvL+S4gOWxgOW3sue7k+adn1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbm90aGVyTmV0Y3V0OmZ1bmN0aW9uKGN1cklEKXtcclxuICAgICAgICBjYy5sb2coXCJvbm90aGVyTmV0Y3V044CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CC44CCXCIpXHJcbiAgICAgICAgaWYoY3VySUQ9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi5YW25LuW546p6YCD5ZG977yM5ri45oiP6ams5LiK57uT5p2fLi4uLi4uLlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLnjqnlrrZcIitLQkVuZ2luZS5hcHAuZW50aXRpZXNbY3VySURdLmFjY291bnROYW1lICtcIuaOiee6v++8jOivt+etieW+hS4uLi4uLi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxMy4wLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgLy90aGlzLmdhbWVTdGF0ZS5uZXdUdXJuKDE1KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbnN5bmNzdXJlYWN0OmZ1bmN0aW9uKHN0cnMpe1xyXG4gICAgICAgIGNjLmxvZyhcIndvcmxkOjpvbnN5bmNzdXJlYWN0XCIsIHN0cnMpXHJcbiAgICAgICAgLy90aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAvL3RoaXMuZ2FtZUhpbnQuc3RyaW5nID0gc3Ryc1xyXG4gICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfSxcclxuICAgIG9uRGlzY29ubmVjdGVkIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJkaXNjb25uZWN0ISB3aWxsIHRyeSB0byByZWNvbm5lY3QuLi5cIik7XHJcbiAgICAgICAgLy92YXIgYWN0aW9uID0gY2MuZmFkZVRvKDEuMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcImRpc2Nvbm5lY3QhIHdpbGwgdHJ5IHRvIHJlY29ubmVjdC4uLlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGVzdHJveXBsYXllcigpXHJcbiAgICAgICAgS0JFbmdpbmUuYXBwLnJlbG9naW5CYXNlYXBwKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblJlbG9naW5CYXNlYXBwVGltZXIgOiBmdW5jdGlvbihzZWxmKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJ3aWxsIHRyeSB0byByZWNvbm5lY3QoXCIgKyB0aGlzLnJlbG9naW5Db3VudCArIFwiKS4uLlwiKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgZmFpbGVkKOaWree6v+mHjei/nuWksei0pSksIGVycj1cIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSkpOyAgIFxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwicmVvZ2luIGlzIHN1Y2Nlc3NmdWxseSEo5pat57q/6YeN6L+e5oiQ5YqfISlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHRcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcInJlb2dpbiBpcyBzdWNjZXNzZnVsbHkhKOaWree6v+mHjei/nuaIkOWKnyEpXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBvbkNvbm5lY3Rpb25TdGF0ZSA6IGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcclxuICAgICAgICBpZighc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBLQkVuZ2luZS5FUlJPUl9NU0coXCJDb25uZWN0KFwiICsgS0JFbmdpbmUuYXBwLmlwICsgXCI6XCIgKyBLQkVuZ2luZS5hcHAucG9ydCArIFwiKSBpcyBlcnJvciEgKOi/nuaOpemUmeivrylcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJDb25uZWN0IHN1Y2Nlc3NmdWxseSwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5oiQ5Yqf77yM6K+3562J5YCZLi4uKVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVxQ2hhbmdlUmVhZHlTdGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgIHBsYXllci5yZXFDaGFuZ2VSZWFkeVN0YXRlKClcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnNldFJlYWR5KHRydWUpXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgXHJcbiAgICB9LFxyXG4gICAgZW50aXR5X3VwZGF0ZWhvbGRzOmZ1bmN0aW9uKGhvbGRzLGVudGl0eSl7XHJcbiAgICAgICAgY2MubG9nKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsZW50aXR5LmlkLGhvbGRzKVxyXG4gICAgICAgIGlmKGVudGl0eS5jbGFzc05hbWUgPT0gXCJBdmF0YXJcIikge1xyXG4gICAgICAgICAgICBpZihlbnRpdHkuaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkgeyAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2hvbGRzPWhvbGRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgICBcclxuICAgICAgICAgICAgfWVsc2V7ICAvL3NjYWxleD09LTEsXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9aG9sZHNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgXHJcbiAgICB9LFxyXG4gICAgZ2FtZV9iZWdpbl9wdXNoOmZ1bmN0aW9uKGVudGl0eSl7XHJcbiAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6Z2FtZV9iZWdpbl9wdXNoXCIpXHJcbiAgICAgICAgLy90aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy90aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2hvbGRzPWVudGl0eS5ob2xkc1xyXG4gICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7IFxyXG5cclxuICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICB9LFxyXG4gICAgb25FbnRlcldvcmxkOiBmdW5jdGlvbiAoZW50aXR5KSB7XHJcbiAgICAgICAgLy9TQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm9uRW50ZXJXb3JsZCBlbnRpdHkuaWQ9XCIsZW50aXR5LmlkKVxyXG4gICAgICAgIGlmKCFlbnRpdHkuaXNQbGF5ZXIoKSkge1xyXG4gICAgICAgICAgICB2YXIgYWUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVudGl0eS5pZCkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgIH1lbHNleyAgLy9zY2FsZXg9PS0xLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hpbmcuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1lbnRpdHkuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWVudGl0eS5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5OyBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpvbkVudGVyV29ybGQ9XCIsdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5KVxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25FbnRlcldvcmxkMjogZnVuY3Rpb24gKGVudGl0eUlEKSB7XHJcbiAgICAgICAgY2MubG9nKFwib25FbnRlcldvcmxkMlwiKVxyXG4gICAgICAgIHZhciBlbnRpdHk9S0JFbmdpbmUuYXBwLmVudGl0aWVzW2VudGl0eUlEXVxyXG4gICAgICAgIC8vU0NBTEU9MTtcclxuICAgICAgICBjYy5sb2coXCJvbkVudGVyV29ybGQgZW50aXR5LmlkPVwiLGVudGl0eS5pZClcclxuICAgICAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1lbnRpdHkuaWQpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1lbnRpdHkuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWVudGl0eS5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHk7ICBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJXb3JsZFNjZW5lOjpvbkVudGVyV29ybGQ9XCIsdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5KVxyXG4gICAgICAgICAgICB9ZWxzZXsgIC8vc2NhbGV4PT0tMSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9ZW50aXR5LmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1lbnRpdHkuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6b25FbnRlcldvcmxkPVwiLHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeSlcclxuICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICB9LFxyXG4gICAgb25MZWF2ZVdvcmxkOiBmdW5jdGlvbiAoZW50aXR5KSB7XHJcbiAgICAgICAgY2MubG9nKFwib25MZWF2ZVdvcmxkXCIsZW50aXR5LmlkLGVudGl0eS5jbGFzc05hbWUpXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5mYWRlSW4oMC41KTsvL+a4kOaYvlxyXG4gICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgwLjUpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjEsYWN0aW9uMikpXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZy5ydW5BY3Rpb24ocmVwZWF0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNjLmxvZyhcIm9uTGVhdmVXb3JsZFwiLGVudGl0eS5pZCxlbnRpdHkuY2xhc3NOYW1lKVxyXG4gICAgICAgIGlmKHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXSAmJiBlbnRpdHkuY2xhc3NOYW1lID09IFwiQXZhdGFyXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eS5pZF0ucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXT1udWxsXHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgKi8gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQXZhdGFyRW50ZXJXb3JsZCA6IGZ1bmN0aW9uKGF2YXRhcikge1xyXG4gICAgICAgIGNjLmxvZyhcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKGF2YXRhcik7XHJcbiAgICB9LFxyXG5cclxuICAgXHJcbiAgICB1cGRhdGVQb3NpdGlvbiA6IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgICAgXHJcbiAgICB9LFx0ICBcclxuICAgIFxyXG4gICAgc2V0X3Bvc2l0aW9uOiBmdW5jdGlvbihlbnRpdHkpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0Q2FtZXJhVGFyZ2V0OiBmdW5jdGlvbihlbnRpdHlJRCl7XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tQbGF5ZXJIYXNJdGVtOiBmdW5jdGlvbihsZWZ0KSB7XHJcbiAgICAgICAgLy9jYy5sb2coXCJ0ZXN0MTRcIilcclxuICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG5ld1R1cm46IGZ1bmN0aW9uKGF2YXRhcixlaWQsIHNlY29uZCxjYXJkMDEsY2FyZDAyLGNhcmQwMyxjYXJkMDQpe1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnN0b3BCR00oKVxyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ0dXJuXCIpXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlLm5ld1R1cm4oc2Vjb25kKTtcclxuICAgICAgICB0aGlzLmNsb2NrLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZVN0YXRlLmlzR2FtZVN0YXJ0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUuc2V0R2FtZVN0YXJ0KHRydWUpO1xyXG4gICAgICAgICAgICAvL3ZhciBhY3Rpb24gPSBjYy5mYWRlVG8oMS4wLCAwKTtcclxuICAgICAgICAgICAgLy90aGlzLmxhYmVsLnN0cmluZyA9IFwi5ri45oiP5byA5aeLICEhIVwiO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWwubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkM3NlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDIuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIHRoaXMuY2FyZDQuc2V0U2NhbGUoMC44KVxyXG5cclxuICAgICAgICB0aGlzLmNhcmQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5jYXJkMi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuY2FyZDMuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmNhcmQ0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYXJkMDE9Y2FyZDAxO1xyXG4gICAgICAgIHRoaXMuY2FyZDAyPWNhcmQwMjtcclxuICAgICAgICB0aGlzLmNhcmQwMz1jYXJkMDM7XHJcbiAgICAgICAgdGhpcy5jYXJkMDQ9Y2FyZDA0O1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICB2YXIgQV9hY3QxPW51bGxcclxuICAgICAgICB2YXIgQV9hY3QyPW51bGxcclxuICAgICAgICB2YXIgQV9hY3QzPW51bGxcclxuICAgICAgICB2YXIgQV9hY3Q0PW51bGxcclxuICAgICAgICB2YXIgQl9hY3QxPW51bGxcclxuICAgICAgICB2YXIgQl9hY3QyPW51bGxcclxuICAgICAgICB2YXIgQl9hY3QzPW51bGxcclxuICAgICAgICB2YXIgQl9hY3Q0PW51bGxcclxuXHJcbiAgICAgICAgdmFyIHgxPXRoaXMuc2VhdDFjYXJkcG9zLng7XHJcbiAgICAgICAgdmFyIHkxPXRoaXMuc2VhdDFjYXJkcG9zLnlcclxuXHJcbiAgICAgICAgdmFyIHgyPXRoaXMuc2VhdDJjYXJkcG9zLng7XHJcbiAgICAgICAgdmFyIHkyPXRoaXMuc2VhdDJjYXJkcG9zLnlcclxuICAgICAgICB2YXIgY2FyZDFvcmlncG9zeD10aGlzLmNhcmQxb3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQxb3JpZ3Bvc3k9dGhpcy5jYXJkMW9yaWdwb3MueVxyXG5cclxuICAgICAgICB2YXIgY2FyZDJvcmlncG9zeD10aGlzLmNhcmQyb3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQyb3JpZ3Bvc3k9dGhpcy5jYXJkMm9yaWdwb3MueVxyXG5cclxuICAgICAgICB2YXIgY2FyZDNvcmlncG9zeD10aGlzLmNhcmQzb3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQzb3JpZ3Bvc3k9dGhpcy5jYXJkM29yaWdwb3MueVxyXG5cclxuICAgICAgICB2YXIgY2FyZDRvcmlncG9zeD10aGlzLmNhcmQ0b3JpZ3Bvcy54XHJcbiAgICAgICAgdmFyIGNhcmQ0b3JpZ3Bvc3k9dGhpcy5jYXJkNG9yaWdwb3MueVxyXG4gICAgICAgIGNjLmxvZyhcInRoaXMuY3VyaWQ9XCIsZWlkKVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy5zZWF0MmNhcmRwb3M9XCIseDEseTEpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLnNlYXQxY2FyZHBvcz1cIix4Mix5MilcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQxb3JpZ3Bvcz1cIixjYXJkMW9yaWdwb3N4LGNhcmQxb3JpZ3Bvc3kpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsY2FyZDJvcmlncG9zeCxjYXJkMm9yaWdwb3N5KVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDJvcmlncG9zPVwiLGNhcmQzb3JpZ3Bvc3gsY2FyZDNvcmlncG9zeSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIixjYXJkNG9yaWdwb3N4LGNhcmQ0b3JpZ3Bvc3kpXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuY2FyZDIuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuY2FyZDMuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIHRoaXMuY2FyZDQuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIGlmKGVpZD09MCl7Ly/lkITlm57lkITlrrZcclxuIFxyXG5cclxuICAgICAgICAgICAgQV9hY3QxPWNjLm1vdmVUbygxLGNjLnYyKHgxLHkxKSlcclxuICAgICAgICAgICAgQV9hY3QyPWNjLm1vdmVUbygxLGNjLnYyKHgxLHkxKSlcclxuXHJcbiAgICAgICAgICAgIEFfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52Mih4Mix5MikpXHJcbiAgICAgICAgICAgIEFfYWN0ND1jYy5tb3ZlVG8oMSxjYy52Mih4Mix5MikpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZWlkPT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCJlaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCxtb3ZldG8gc2VhdDFcIixlaWQsS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKVxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2MubG9nKFwiZWlkIT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQsbW92ZXRvIHNlYXQyXCIsZWlkLEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZClcclxuICAgICAgICAgICAgQV9hY3QxPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3QyPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3QzPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3Q0PWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMW51bT0yK3BhcnNlSW50KChjYXJkMDErMTAwMC0xMDYxKS80KSAgLy8xLDIsMyw0XHJcbiAgICAgICAgdGhpcy5jYXJkMm51bT0yK3BhcnNlSW50KChjYXJkMDIrMTAwMC0xMDYxKS80KVxyXG4gICAgICAgIHRoaXMuY2FyZDNudW09MitwYXJzZUludCgoY2FyZDAzKzEwMDAtMTA2MSkvNClcclxuICAgICAgICB0aGlzLmNhcmQ0bnVtPTIrcGFyc2VJbnQoKGNhcmQwNCsxMDAwLTEwNjEpLzQpXHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDFudW0+MTApIHt0aGlzLmNhcmQxbnVtPTF9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDJudW0+MTApIHt0aGlzLmNhcmQybnVtPTF9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDNudW0+MTApIHt0aGlzLmNhcmQzbnVtPTF9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FyZDRudW0+MTApIHt0aGlzLmNhcmQ0bnVtPTF9XHJcblxyXG4gICAgICAgIHZhciBmdW5jb3VudDE9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2hjb3VudDEoKVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MSgpXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBmdW5jb3VudDI9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2hjb3VudDIoKVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MigpXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBzZWxmPXRoaXNcclxuICAgICAgICB2YXIgZnVuMT1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MSxcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTE7XHJcbiAgICAgICAgICAgIGNhcmQwMT1jYXJkMDErMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAxK1wiQDJ4XCJcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgc2VsZi5jYXJkMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT0gc3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMSk7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZnVuMj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MVxyXG4gICAgICAgICAgICB0YXJnZXQueT15MVxyXG4gICAgICAgICAgICBjYXJkMDI9Y2FyZDAyKzEwMDA7XHJcbiAgICAgICAgICAgIHZhciB1cmw9XCJjYXJkX1wiK2NhcmQwMitcIkAyeFwiXHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodXJsKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDIpO1xyXG4gICAgICAgIHZhciBmdW4zPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgyXHJcbiAgICAgICAgICAgIHRhcmdldC55PXkyXHJcbiAgICAgICAgICAgIGNhcmQwMz1jYXJkMDMrMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAzK1wiQDJ4XCJcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMyk7XHJcbiAgICAgICAgdmFyIGZ1bjQ9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9eDJcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTJcclxuICAgICAgICAgICAgY2FyZDA0PWNhcmQwNCsxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDQrXCJAMnhcIlxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICB9LCB0aGlzLmNhcmQ0KTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bjExPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQxb3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDFvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBmdW4yMj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD1jYXJkMm9yaWdwb3N4XHJcbiAgICAgICAgICAgIHRhcmdldC55PWNhcmQyb3JpZ3Bvc3lcclxuICAgICAgICB9LCB0aGlzLmNhcmQyKTtcclxuICAgICAgICB2YXIgZnVuMzM9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDNvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkM29yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMyk7XHJcbiAgICAgICAgdmFyIGZ1bjQ0PWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQ0b3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDRvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDQpO1xyXG5cclxuICAgICAgICBCX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDFvcmlncG9zeCxjYXJkMW9yaWdwb3N5KSlcclxuICAgICAgICBCX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDJvcmlncG9zeCxjYXJkMm9yaWdwb3N5KSlcclxuICAgICAgICBCX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDNvcmlncG9zeCxjYXJkM29yaWdwb3N5KSlcclxuICAgICAgICBCX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoY2FyZDRvcmlncG9zeCxjYXJkNG9yaWdwb3N5KSlcclxuXHJcbiAgICAgICAgaWYoZWlkPT0xMjM0NSl7Ly/lkITlm57lkITlrrYy5bygXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDEucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjEsQl9hY3QxLGZ1bjExLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjIsQl9hY3QyLGZ1bjIyLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjMsQl9hY3QzLGZ1bjMzLGZ1bmNvdW50MikpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGZ1bjQsQl9hY3Q0LGZ1bjQ0LGZ1bmNvdW50MikpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAvL+S4gOWutuWbm+W8oFxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDEsZnVuMSxmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0MSxmdW4xMSxmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDIsZnVuMixmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0MixmdW4yMixmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDMsZnVuMyxmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0MyxmdW4zMyxmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBX2FjdDQsZnVuNCxmdW5jb3VudDEsY2MuZGVsYXlUaW1lKDEpLEJfYWN0NCxmdW40NCxmdW5jb3VudDIpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgY2MubG9nKFwid3d3d3d3bmV3VHVyblwiLGF2YXRhci5pZCwgc2Vjb25kLGNhcmQwMSxjYXJkMDIsY2FyZDAzLGNhcmQwNClcclxuXHJcbiAgICAgICAgdGhpcy5vcHQuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmFjdD1bXVxyXG4gIFxyXG4gICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uR2FtZU92ZXI6IGZ1bmN0aW9uKGF2YXRhcklELCBpc1dpbiwgaHAsIHRvdGFsVGltZSwgdG90YWxIYXJtLCBzY29yZSkge1xyXG4gICAgICAgIGlmKGF2YXRhcklEID09IEtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkge1xyXG4gICAgICAgICAgICBIUCA9IGhwO1xyXG4gICAgICAgICAgICBUT1RBTF9USU1FID0gdG90YWxUaW1lO1xyXG4gICAgICAgICAgICBPdGhlckhQID0gdG90YWxIYXJtO1xyXG4gICAgICAgICAgICBTQ09SRSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBMVmxldmVsPU1hdGgucm91bmQoMTAwKlNDT1JFKVxyXG4gICAgICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgICAgICBpZihpc1dpbikge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV2luU2NlbmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb3NlU2NlbmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4XCIpXHJcbiAgICAgICAgLy90aGlzLmRpc0VuYWJsZUNvbnRyb2xQbGF5ZXIoKTtcclxuICAgICAgICAvL3RoaXMudW5JbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIGludmF0ZWZyaWVuZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICAvL3RoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwic291bmQvc2hhcmVcIixmdW5jdGlvbihlcnIsZGF0YSl7XHJcbiAgICAgICAgICAgIHZhciBzZWxmZj1zZWxmO1xyXG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHNlbGYuUm9vbUlELnN0cmluZyxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBkYXRhLnVybCxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwiUm9vbWlkPVwiICsgc2VsZi5yb29tS2V5YyArIFwiJlVzZXJOYW1lPVwiICsgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsLy8g5Yir5Lq654K55Ye76ZO+5o6l5pe25Lya5b6X5Yiw55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgICAgICBxdWVyeTpcIlJvb21pZD1cIisgc2VsZi5yb29tS2V5YytcIiZVc2VyTmFtZT1cIisgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5YiG5Lqr5oiQ5YqfXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZmLnlhb3FpbmcuYWN0aXZlPWZhbHNlICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgdGl0bGU6IHNlbGYuUm9vbUlELnN0cmluZyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IGRhdGEudXJsLFxyXG4gICAgICAgICAgICAvL3F1ZXJ5OiBcIlJvb21pZD1cIiArIHNlbGYucm9vbUtleWMgKyBcIiZVc2VyTmFtZT1cIiArIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLC8vIOWIq+S6uueCueWHu+mTvuaOpeaXtuS8muW+l+WIsOeahOaVsOaNrlxyXG4gICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgIHF1ZXJ5OlwiUm9vbWlkPVwiKyBzZWxmLnJvb21LZXljK1wiJlVzZXJOYW1lPVwiKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWIhuS6q+aIkOWKn1wiICsgcmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2UgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMueWFvcWluZy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICovXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlUGxheWVyOiBmdW5jdGlvbihhdmF0YXIpIHtcclxuICAgICAgIC8vIFNDQUxFPTE7XHJcbiAgICAgICAgY2MubG9nKFwibmV3IGNyZWF0ZVBsYXllciB0aGlzLnBsYXllcj3vvIxhdmF0YXIubW9kZWxJRD1cIix0aGlzLnBsYXllcixhdmF0YXIubW9kZWxJRCApXHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnBsYXllcikge1xyXG4gICAgICAgICAgICBpZihhdmF0YXIuaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1hdmF0YXIuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9YXZhdGFyLmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gIHRoaXMuc2VhdDE7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXT10aGlzLnBsYXllciBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWF2YXRhci5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1hdmF0YXIuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSAgdGhpcy5zZWF0MjtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5lbnRpdGllc1thdmF0YXIuaWRdPXRoaXMucGxheWVyIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIGN0cmw9IHRoaXMucGxheWVyLmFkZENvbXBvbmVudChcIkF2YXRhckNvbnRyb2xcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbj0gdGhpcy5wbGF5ZXIuYWRkQ29tcG9uZW50KFwiQXZhdGFyQWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRQb3NpdGlvbihhdmF0YXIucG9zaXRpb24ueCpTQ0FMRSwgYXZhdGFyLnBvc2l0aW9uLnoqU0NBTEUpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbYXZhdGFyLmlkXSA9IHRoaXMucGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2coXCJhZnRlciBjcmVhdGVQbGF5ZXIgdGhpcy5wbGF5ZXI977yMYXZhdGFyLm1vZGVsSUQ9XCIsdGhpcy5wbGF5ZXIsYXZhdGFyLm1vZGVsSUQgKVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkF2YXRhckNvbnRpbnVlR2FtZTogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICB0aGlzLmNyZWF0ZVBsYXllcihhdmF0YXIpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==