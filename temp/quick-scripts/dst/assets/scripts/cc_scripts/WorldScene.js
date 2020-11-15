
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
    },
    cardAtlas: {
      "default": null,
      type: cc.SpriteAtlas
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
  onBgClicked: function onBgClicked(event) {
    event.stopPropagation();
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
      this.matching.active = true;
      this.matching.stopAllActions();
      var action1 = cc.fadeIn(0.5); //渐显

      var action2 = cc.fadeOut(0.5); //渐隐效果

      var repeat = cc.repeatForever(cc.sequence(action2, action1));
      this.matching.runAction(repeat);
    } else {
      this.matching = undefined;
    } //this.node.getChildByName("bg2").getChildByName("matching").active=true


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
    /*
    var sp=null
    for(var i=1061;i<1115;i++){
        sp=this.node.getChildByName("card_"+i+"@2x")
        sp.active=false;
    }
    */

    this.card1origpos = this.card1.position;
    this.card2origpos = this.card2.position;
    this.card3origpos = this.card3.position;
    this.card4origpos = this.card4.position;
    window.delta = this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").getComponent(cc.Sprite).spriteFrame.getOriginalSize().height * 0.8; //

    var out = cc.v2(0, 0); //var seat1cardpos=cc.v2(0, 0)
    //var seat1cardpos=this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").position

    var seat1cardpos = this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").getPosition();
    this.node.getChildByName("bg2").getChildByName("seat1").convertToWorldSpaceAR(seat1cardpos, out);
    this.seat1cardpos = this.node.convertToNodeSpaceAR(out); //       this.seat1cardpos.y=this.seat1cardpos.y-this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").getComponent(cc.Sprite).spriteFrame.getOriginalSize().height*0.8
    //this.node.getChildByName("bg2").getChildByName("seat1").y=this.node.getChildByName("bg2").getChildByName("seat1").y+window.delta
    //var seat2cardpos=cc.v2(0, 0)
    //cc.log("--------------------------------------------------------",this.seat1cardpos.x,this.seat1cardpos.y)

    out = cc.v2(0, 0); //var seat2cardpos=this.node.getChildByName("bg2").getChildByName("seat2").getChildByName("card").position

    var seat2cardpos = this.node.getChildByName("bg2").getChildByName("seat2").getChildByName("card").getPosition();
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

    var player = KBEngine.app.player();

    if (player) {
      player.updateStaus();
    }

    this.batteryPercent = cc.find("Canvas/bg2/batteryPercent").getComponent(cc.Label);
    this.batteryPercent.node.active = false;
    this.power = cc.find("Canvas/bg2/power");
    this.power.active = false;
    this.Z_power = cc.find("Canvas/bg2/Z_power");
    this.Z_power.active = false;
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
    //if(cc.sys.isNative){
    //var self=this;
    //if(cc.sys.os == cc.sys.OS_ANDROID){
    //    return jsb.reflection.callStaticMethod(this.ANDROID_API, "getBatteryPercent", "()F");
    //}
    //else if(cc.sys.os == cc.sys.OS_IOS){
    //    return jsb.reflection.callStaticMethod(this.IOS_API, "getBatteryPercent");
    //}
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      /*
      var batteryInfo = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getBatteryStatusInfo", "()Ljava/lang/String;")
      if (!batteryInfo) {
          cc.log("当前无返回！！！！！！！！！！！！！！！！！！！！！！！！");
          return
      }
      var info = batteryInfo.split("_");
      var level = parseInt(info[0]);
      var scale = parseInt(info[1]);
      var status = info[2];
      //this.label.string = "电量剩余：" + (level * 100) / scale + "\t" + "当前电池使用状态状态：" + status;
      self.batteryPercent.string="电量剩余：" + (level * 100) / scale + "\t" + "当前电池使用状态状态：" + status;
      cc.log("电量剩余：" + (level * 100) / scale + "\t" + "当前电池使用状态状态：" + status)
      */
      //var info=wx.getBatteryInfoSync()
      var info = wx.getBatteryInfo({
        success: function (info) {
          var level = info.level;
          var status = info.isCharging ? "充电中" : "没充电";

          if (this.batteryPercent != undefined) {
            this.batteryPercent.string = "" + level + "%" + status;
            this.batteryPercent.node.active = true;
          }

          if (this.power != undefined) {
            this.power.scaleX = level / 100;
            this.power.active = true;
            this.Z_power.active = true;
          }
        }.bind(this)
      }); //cc.log("电量剩余" +level + "%" + "电池使用状态" + status)
      //return level;
      //}           
    }
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

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.getBatteryPercent();
    }
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
    KBEngine.Event.register("onclientMSG", this, "onclientMSG");
  },
  entity_updateroomkey: function entity_updateroomkey(roomKeyc, avatar) {
    cc.log("entity[%d]updateroomkeyentity_updateroomkey=", avatar.id, roomKeyc);

    if (avatar.id == KBEngine.app.player().id) {
      this.RoomID.string = "房间号:" + roomKeyc.join("");
      this.roomKeyc = roomKeyc.join("");
    }
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
    KBEngine.Event.deregister("onclientMSG", this, "onclientMSG");
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
  onclientMSG: function onclientMSG(msg) {
    this.gameHint.node.active = true;
    this.gameHint.string = msg;
    this.gameHint.node.opacity = 255;
    var action = cc.fadeTo(13.0, 0);
    this.gameHint.node.runAction(action);
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

    if (this.gameHint.node) {
      this.gameHint.node.opacity = 255;
      this.gameHint.string = "disconnect! will try to reconnect...";
      this.gameHint.node.active = true;
    } //this.Destroyplayer()


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
        if (this.matching != undefined) {
          this.matching.active = false;
        }

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
      if (this.matching != undefined) {
        this.matching.active = false;
      }

      this.seat2.active = true; //this.seat2.getComponent("Seat")._isReady=true

      this.seat2.getComponent("Seat")._userName = entity.accountName;
      this.seat2.getComponent("Seat").avatarUrl = entity.avatarUrl;
      this.seat2.getComponent("Seat").refresh(); //this.entities[entity.id] = entity; 

      cc.log("WorldScene::onEnterWorld=", this.seat2.getComponent("Seat")._isReady);
    }
  },
  onLeaveWorld: function onLeaveWorld(entity) {
    cc.log("onLeaveWorld", entity.id, entity.className);

    if (this.matching != undefined) {
      this.matching.active = true;
      this.matching.stopAllActions();
      var action1 = cc.fadeIn(0.5); //渐显

      var action2 = cc.fadeOut(0.5); //渐隐效果

      var repeat = cc.repeatForever(cc.sequence(action1, action2));
      this.matching.runAction(repeat);
    }

    if (window.type != 1 && this.yaoqing != undefined) {
      this.yaoqing.active = true;
    }

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
      var url = "card_" + card01 + "@2x"; //target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame
      //////////////////////////////

      target.getComponent(cc.Sprite).spriteFrame = self.cardAtlas.getSpriteFrame(url); ///////////////////////////

      /*
      cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
      self.card1.getComponent(cc.Sprite).spriteFrame= spriteFrame
      }); */
    }, this.card1);
    var fun2 = cc.callFunc(function (target) {
      target.x = x1;
      target.y = y1;
      card02 = card02 + 1000;
      var url = "card_" + card02 + "@2x"; //target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame

      target.getComponent(cc.Sprite).spriteFrame = self.cardAtlas.getSpriteFrame(url);
    }, this.card2);
    var fun3 = cc.callFunc(function (target) {
      target.x = x2;
      target.y = y2;
      card03 = card03 + 1000;
      var url = "card_" + card03 + "@2x"; //target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame

      target.getComponent(cc.Sprite).spriteFrame = self.cardAtlas.getSpriteFrame(url);
    }, this.card3);
    var fun4 = cc.callFunc(function (target) {
      target.x = x2;
      target.y = y2;
      card04 = card04 + 1000;
      var url = "card_" + card04 + "@2x"; //target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame

      target.getComponent(cc.Sprite).spriteFrame = self.cardAtlas.getSpriteFrame(url);
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

    this.matching = this.node.getChildByName("bg2").getChildByName("matching2");
    this.matching.active = true;
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
        },
        fail: function fail(res) {
          cc.log("分享失败" + res); //this.yaoqing.active=true
        }
      });
      selff.yaoqing.active = false;
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
        this.player = this.seat1;
      } else {
        this.seat2.active = true; //this.seat2.getComponent("Seat")._isReady=true

        this.seat2.getComponent("Seat")._userName = avatar.accountName;
        this.seat2.getComponent("Seat").avatarUrl = avatar.avatarUrl;
        this.seat2.getComponent("Seat").refresh();
        this.player = this.seat2;
      } //this.player.setPosition(avatar.position.x*SCALE, avatar.position.z*SCALE);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcV29ybGRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJiaW5kanMiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNlYXQxIiwidHlwZSIsIk5vZGUiLCJzZWF0MiIsImNhcmRBdGxhcyIsIlNwcml0ZUF0bGFzIiwic2hvd3dhbmdmYSIsIndpbmRvdyIsIkF1ZGlvTWdyIiwicGxheVNGWCIsImludHJvZHVjZSIsImFjdGl2ZSIsImhpZGV3YW5nZmEiLCJzaG93c2V0dGluZyIsImlzc2hvd3NldHRpbmciLCJzZXR0aW5nTm9kZSIsInNob3djaGF0IiwiaXNzaG93Y2hhdCIsImNoYXROb2RlIiwibG9nIiwib25CZ0NsaWNrZWQiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIm9uTG9hZCIsInJvb21LZXljIiwiaW5zdGFsbEV2ZW50cyIsIlJvb21JRCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInlhb3FpbmciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJtYXRjaGluZyIsInN0b3BBbGxBY3Rpb25zIiwiYWN0aW9uMSIsImZhZGVJbiIsImFjdGlvbjIiLCJmYWRlT3V0IiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwidW5kZWZpbmVkIiwicGxheUJHTSIsIl90aW1lTGFiZWwiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiZW5hYmxlV3hTaGFyZSIsImNhcmQxIiwiY2FyZDIiLCJjYXJkMyIsImNhcmQ0Iiwib3B0IiwibGFiZWwiLCJhY3QiLCJjYXJkMW51bSIsImNhcmQybnVtIiwiY2FyZDNudW0iLCJjYXJkNG51bSIsImxhc3R0b3VjaGNhcmQiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIm9uVG91Y2hFbmRlZGNhcmQxIiwib25Ub3VjaEVuZGVkY2FyZDIiLCJvblRvdWNoRW5kZWRjYXJkMyIsIm9uVG91Y2hFbmRlZGNhcmQ0IiwiY2FyZDFzZWxlY3RlZCIsImNhcmQyc2VsZWN0ZWQiLCJjYXJkM3NlbGVjdGVkIiwiY2FyZDRzZWxlY3RlZCIsImdhbWVTdGF0ZSIsImNsb2NrIiwiY2FyZDFvcmlncG9zIiwicG9zaXRpb24iLCJjYXJkMm9yaWdwb3MiLCJjYXJkM29yaWdwb3MiLCJjYXJkNG9yaWdwb3MiLCJkZWx0YSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZ2V0T3JpZ2luYWxTaXplIiwiaGVpZ2h0Iiwib3V0IiwidjIiLCJzZWF0MWNhcmRwb3MiLCJnZXRQb3NpdGlvbiIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwic2VhdDJjYXJkcG9zIiwiZ2FtZUhpbnQiLCJvcGFjaXR5IiwicGxheWVyIiwiYXBwIiwidXBkYXRlU3RhdXMiLCJiYXR0ZXJ5UGVyY2VudCIsInBvd2VyIiwiWl9wb3dlciIsImxlbmd0aCIsInNldFNjYWxlIiwicHVzaCIsImdldEJhdHRlcnlQZXJjZW50IiwiaW5mbyIsInd4IiwiZ2V0QmF0dGVyeUluZm8iLCJzdWNjZXNzIiwibGV2ZWwiLCJzdGF0dXMiLCJpc0NoYXJnaW5nIiwic3RyaW5nIiwic2NhbGVYIiwiYmluZCIsInVwZGF0ZSIsImR0Iiwiam9pbiIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwibm93IiwiX2xhc3RNaW51dGUiLCJkYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJvbmFkZGFjdCIsIm9ucmVkdWNlYWN0Iiwib25tdWxhY3QiLCJvbmRpdmFjdCIsIm9ubGVmYWN0Iiwib25yaWdhY3QiLCJvbmRlbGFjdCIsIm51bSIsInBvcCIsIm9uc3VyZWFjdCIsImFjdGlvbiIsImZhZGVUbyIsInN0ciIsInJlcyIsImV2YWwyIiwicGlja1VwZWQiLCJFdmVudCIsInJlZ2lzdGVyIiwiZW50aXR5X3VwZGF0ZXJvb21rZXkiLCJhdmF0YXIiLCJpZCIsInNob3dTaGFyZU1lbnUiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwiZGF0YSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJpbWFnZVVybCIsInVybCIsImZhaWwiLCJlbmFibGVQaHlzaWNNYW5hZ2VyIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJtYW5hZ2VyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZVBoeXNpY3NEZWJ1Z0RyYXciLCJlbmFibGVkRGVidWdEcmF3IiwiZW5hYmxlZERyYXdCb3VuZGluZ0JveCIsImRlYnVnRHJhd0ZsYWdzIiwiUGh5c2ljc01hbmFnZXIiLCJEcmF3Qml0cyIsImVfY2VudGVyT2ZNYXNzQml0IiwiZV9zaGFwZUJpdCIsImVfcmF5Q2FzdCIsInVuSW5zdGFsbEV2ZW50cyIsImRlcmVnaXN0ZXIiLCJvbmpvaW5Qcml2YXRlUm9vbSIsImxvYWRTY2VuZSIsImxvZ2lucmVzIiwib25xdWlja19jaGF0IiwiZWlkIiwiaWR4Iiwic3Ryc3RyIiwiZ2V0UXVpY2tDaGF0SW5mbyIsImNoYXQiLCJvbmVtb2ppIiwibmFtZSIsImVtb2ppIiwib25pcHRDaGF0IiwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZSIsInN0YXRlIiwiX2lzUmVhZHkiLCJyZWZyZXNoIiwib251cGRhdGVHYW1lc3RhdGVzIiwiY3VySUQiLCJ0aW1lIiwibmV3VHVybiIsInVwZGF0ZWdhbWVzdHV0cyIsIm9uY2xpZW50TVNHIiwibXNnIiwib25vdGhlck5ldGN1dCIsImVudGl0aWVzIiwiYWNjb3VudE5hbWUiLCJvbnN5bmNzdXJlYWN0Iiwic3RycyIsIm9uRGlzY29ubmVjdGVkIiwiSU5GT19NU0ciLCJyZWxvZ2luQmFzZWFwcCIsIm9uUmVsb2dpbkJhc2VhcHBUaW1lciIsInNlbGYiLCJyZWxvZ2luQ291bnQiLCJvblJlbG9naW5CYXNlYXBwRmFpbGVkIiwiZmFpbGVkY29kZSIsInNlcnZlckVyciIsIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkiLCJvbkNvbm5lY3Rpb25TdGF0ZSIsIkVSUk9SX01TRyIsImlwIiwicG9ydCIsInJlcUNoYW5nZVJlYWR5U3RhdGUiLCJzZXRSZWFkeSIsImVudGl0eV91cGRhdGVob2xkcyIsImhvbGRzIiwiZW50aXR5IiwiY2xhc3NOYW1lIiwiX2hvbGRzIiwiZ2FtZV9iZWdpbl9wdXNoIiwib25FbnRlcldvcmxkIiwiaXNQbGF5ZXIiLCJhZSIsIl91c2VyTmFtZSIsImF2YXRhclVybCIsIm9uRW50ZXJXb3JsZDIiLCJlbnRpdHlJRCIsIm9uTGVhdmVXb3JsZCIsIm9uQXZhdGFyRW50ZXJXb3JsZCIsImNyZWF0ZVBsYXllciIsInVwZGF0ZVBvc2l0aW9uIiwic2V0X3Bvc2l0aW9uIiwic2V0Q2FtZXJhVGFyZ2V0IiwiY2hlY2tQbGF5ZXJIYXNJdGVtIiwibGVmdCIsInNlY29uZCIsImNhcmQwMSIsImNhcmQwMiIsImNhcmQwMyIsImNhcmQwNCIsImlzR2FtZVN0YXJ0Iiwic2V0R2FtZVN0YXJ0IiwiQV9hY3QxIiwiQV9hY3QyIiwiQV9hY3QzIiwiQV9hY3Q0IiwiQl9hY3QxIiwiQl9hY3QyIiwiQl9hY3QzIiwiQl9hY3Q0IiwieDEiLCJ4IiwieTEiLCJ5IiwieDIiLCJ5MiIsImNhcmQxb3JpZ3Bvc3giLCJjYXJkMW9yaWdwb3N5IiwiY2FyZDJvcmlncG9zeCIsImNhcmQyb3JpZ3Bvc3kiLCJjYXJkM29yaWdwb3N4IiwiY2FyZDNvcmlncG9zeSIsImNhcmQ0b3JpZ3Bvc3giLCJjYXJkNG9yaWdwb3N5IiwibW92ZVRvIiwicGFyc2VJbnQiLCJmdW5jb3VudDEiLCJjYWxsRnVuYyIsInRhcmdldCIsInJlZnJlc2hjb3VudDEiLCJmdW5jb3VudDIiLCJyZWZyZXNoY291bnQyIiwiZnVuMSIsImdldFNwcml0ZUZyYW1lIiwiZnVuMiIsImZ1bjMiLCJmdW40IiwiZnVuMTEiLCJmdW4yMiIsImZ1bjMzIiwiZnVuNDQiLCJkZWxheVRpbWUiLCJvbkdhbWVPdmVyIiwiYXZhdGFySUQiLCJpc1dpbiIsImhwIiwidG90YWxUaW1lIiwidG90YWxIYXJtIiwic2NvcmUiLCJIUCIsIlRPVEFMX1RJTUUiLCJPdGhlckhQIiwiU0NPUkUiLCJMVmxldmVsIiwicm91bmQiLCJpbnZhdGVmcmllbmQiLCJzZWxmZiIsInNoYXJlQXBwTWVzc2FnZSIsInF1ZXJ5IiwibW9kZWxJRCIsIm9uQXZhdGFyQ29udGludWVHYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEIsRUFDQTs7O0FBQ0EsSUFBSUMsTUFBTSxHQUFDRCxPQUFPLENBQUMsT0FBRCxDQUFsQjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBRTtBQUNILGlCQUFTLElBRE47QUFFSEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRk4sS0FEQztBQU1SQyxJQUFBQSxLQUFLLEVBQUU7QUFDSCxpQkFBUyxJQUROO0FBRUhGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZOLEtBTkM7QUFVUkUsSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsSUFERjtBQUVOSCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ1M7QUFGRjtBQVZGLEdBSFA7QUFrQkxDLEVBQUFBLFVBQVUsRUFBQyxzQkFBVTtBQUNqQkMsSUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxPQUFoQixDQUF3QixVQUF4QjtBQUNBLFNBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUFzQixJQUF0QjtBQUNILEdBckJJO0FBc0JMQyxFQUFBQSxVQUFVLEVBQUMsc0JBQVU7QUFDakJMLElBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsT0FBaEIsQ0FBd0IsVUFBeEI7QUFDQSxTQUFLQyxTQUFMLENBQWVDLE1BQWYsR0FBc0IsS0FB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S0FBSzlGLEtBQXBCO0FBRUgsT0FSRCxNQVFLO0FBQ0QsYUFBS0csS0FBTCxDQUFXUSxNQUFYLEdBQWtCLElBQWxCLENBREMsQ0FFRDs7QUFDQSxhQUFLUixLQUFMLENBQVd5QixZQUFYLENBQXdCLE1BQXhCLEVBQWdDME0sU0FBaEMsR0FBMENuRixNQUFNLENBQUN1RCxXQUFqRDtBQUNBLGFBQUt2TSxLQUFMLENBQVd5QixZQUFYLENBQXdCLE1BQXhCLEVBQWdDMk0sU0FBaEMsR0FBMENwRixNQUFNLENBQUNvRixTQUFqRDtBQUNBLGFBQUtwTyxLQUFMLENBQVd5QixZQUFYLENBQXdCLE1BQXhCLEVBQWdDb0ssT0FBaEM7QUFDQSxhQUFLbEcsTUFBTCxHQUFlLEtBQUszRixLQUFwQjtBQUVILE9BakJZLENBbUJiOztBQUVIOztBQUNEUCxJQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU8saURBQVAsRUFBeUQsS0FBSzJFLE1BQTlELEVBQXFFcUQsTUFBTSxDQUFDK0osT0FBNUU7QUFDSCxHQTVrQ0k7QUE4a0NMQyxFQUFBQSxvQkFBb0IsRUFBRSw4QkFBU2hLLE1BQVQsRUFBaUI7QUFDcEMsU0FBS3lGLFlBQUwsQ0FBa0J6RixNQUFsQjtBQUNGO0FBaGxDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbnZhciBLQkVuZ2luZSA9IHJlcXVpcmUoXCJrYmVuZ2luZVwiKTtcclxuLy92YXIgYmluZGpzPXJlcXVpcmUoXCJldmFsXCIpXHJcbnZhciBiaW5kanM9cmVxdWlyZShcImV2YWwyXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzZWF0MToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlYXQyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkQXRsYXM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlQXRsYXNcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNob3d3YW5nZmE6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2UuYWN0aXZlPXRydWVcclxuICAgIH0sXHJcbiAgICBoaWRld2FuZ2ZhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlLmFjdGl2ZT1mYWxzZVxyXG4gICAgfSxcclxuICAgIHNob3dzZXR0aW5nOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuaXNzaG93c2V0dGluZyA9ICF0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZTtcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZSA9IHRoaXMuaXNzaG93c2V0dGluZztcclxuXHJcbiAgICB9LFxyXG4gICAgc2hvd2NoYXQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0ID0gIXRoaXMuY2hhdE5vZGUuYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuY2hhdE5vZGUuYWN0aXZlID0gdGhpcy5pc3Nob3djaGF0O1xyXG4gICAgICAgIGNjLmxvZyhcInNob3djaGF0XCIpXHJcblxyXG4gICAgfSxcclxuICAgIG9uQmdDbGlja2VkOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5yb29tS2V5Yz1cIlwiXHJcbiAgICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5Sb29tSUQ9Y2MuZmluZChcIkNhbnZhcy9iZzIvUm9vbUlEXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuXHJcbiAgICAgICAgdGhpcy55YW9xaW5nPWNjLmZpbmQoXCJDYW52YXMvYmcyL3lhb3FpbmdcIilcclxuICAgICAgICB0aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImludHJvZHVjZVwiKVxyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHdpbmRvdy50eXBlPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaGluZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtYXRjaGluZ1wiKVxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hpbmcuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLmZhZGVJbigwLjUpOy8v5riQ5pi+XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgwLjUpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgICAgIHZhciByZXBlYXQ9Y2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShhY3Rpb24yLGFjdGlvbjEpKVxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoaW5nLnJ1bkFjdGlvbihyZXBlYXQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaGluZz11bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtYXRjaGluZ1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5QkdNKFwiYmdCZXRcIilcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZUxhYmVsID0gY2MuZmluZChcIkNhbnZhcy9iZzIvdGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuaXNzaG93c2V0dGluZz1mYWxzZVxyXG4gICAgICAgIC8vdGhpcy5zZXR0aW5nTm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnNldHRpbmcpXHJcbiAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5zZXR0aW5nTm9kZSlcclxuICAgICAgICAvL3RoaXMuc2V0dGluZ05vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2V0dGluZ3NcIilcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlPWNjLmZpbmQoXCJDYW52YXMvc2V0dGluZ3NcIilcclxuICAgICAgICB0aGlzLnNldHRpbmdOb2RlLmFjdGl2ZSA9IHRoaXMuaXNzaG93c2V0dGluZztcclxuXHJcbiAgICAgICAgdGhpcy5pc3Nob3djaGF0PWZhbHNlXHJcbiAgICAgICAgLy90aGlzLmNoYXROb2RlPWNjLmluc3RhbnRpYXRlKHRoaXMuY2hhdClcclxuICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZCh0aGlzLmNoYXROb2RlKVxyXG4gICAgICAgIHRoaXMuY2hhdE5vZGU9Y2MuZmluZChcIkNhbnZhcy9jaGF0XCIpXHJcbiAgICAgICAgdGhpcy5jaGF0Tm9kZS5hY3RpdmUgPSB0aGlzLmlzc2hvd2NoYXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVd4U2hhcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYXJkMT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkMVwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZDJcIilcclxuICAgICAgICB0aGlzLmNhcmQzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmQzXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkND10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkNFwiKVxyXG4gICAgICAgIHRoaXMuY2FyZDEuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDMuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FyZDQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcIm9wdFwiKVxyXG4gICAgICAgIHRoaXMub3B0LmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJleHBzdHJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuYWN0PVtdXHJcbiAgICAgICAgdGhpcy5jYXJkMW51bT0wO1xyXG4gICAgICAgIHRoaXMuY2FyZDJudW09MDtcclxuICAgICAgICB0aGlzLmNhcmQzbnVtPTA7XHJcbiAgICAgICAgdGhpcy5jYXJkNG51bT0wO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQ9bnVsbFxyXG5cclxuICAgICAgICB0aGlzLmNhcmQxLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkMSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYXJkMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkY2FyZDIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FyZDMub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRlZGNhcmQzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNhcmQ0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kZWRjYXJkNCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDFzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDJzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIHRoaXMuY2FyZDRzZWxlY3RlZD1mYWxzZVxyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkdhbWVTdGF0ZVwiKTtcclxuICAgICAgICB0aGlzLmNsb2NrPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcImNsb2NrXCIpXHJcbiAgICAgICAgdGhpcy5jbG9jay5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHNwPW51bGxcclxuICAgICAgICBmb3IodmFyIGk9MTA2MTtpPDExMTU7aSsrKXtcclxuICAgICAgICAgICAgc3A9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZF9cIitpK1wiQDJ4XCIpXHJcbiAgICAgICAgICAgIHNwLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNhcmQxb3JpZ3Bvcz10aGlzLmNhcmQxLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5jYXJkMm9yaWdwb3M9dGhpcy5jYXJkMi5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMuY2FyZDNvcmlncG9zPXRoaXMuY2FyZDMucG9zaXRpb25cclxuICAgICAgICB0aGlzLmNhcmQ0b3JpZ3Bvcz10aGlzLmNhcmQ0LnBvc2l0aW9uXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHdpbmRvdy5kZWx0YT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuZ2V0T3JpZ2luYWxTaXplKCkuaGVpZ2h0KjAuOFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdmFyIG91dD1jYy52MigwLCAwKVxyXG4gICAgICAgIC8vdmFyIHNlYXQxY2FyZHBvcz1jYy52MigwLCAwKVxyXG4gICAgICAgIC8vdmFyIHNlYXQxY2FyZHBvcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikucG9zaXRpb25cclxuICAgICAgICB2YXIgc2VhdDFjYXJkcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRQb3NpdGlvbigpXHJcblxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIgKHNlYXQxY2FyZHBvcywgb3V0KVxyXG4gICAgICAgIHRoaXMuc2VhdDFjYXJkcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihvdXQpXHJcbiAvLyAgICAgICB0aGlzLnNlYXQxY2FyZHBvcy55PXRoaXMuc2VhdDFjYXJkcG9zLnktdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLmdldE9yaWdpbmFsU2l6ZSgpLmhlaWdodCowLjhcclxuICAgICAgICAvL3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQxXCIpLnk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDFcIikueSt3aW5kb3cuZGVsdGFcclxuICAgICAgICAvL3ZhciBzZWF0MmNhcmRwb3M9Y2MudjIoMCwgMClcclxuICAgICAgICAvL2NjLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIsdGhpcy5zZWF0MWNhcmRwb3MueCx0aGlzLnNlYXQxY2FyZHBvcy55KVxyXG4gICAgICAgIG91dD1jYy52MigwLCAwKVxyXG4gICAgICAgIC8vdmFyIHNlYXQyY2FyZHBvcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MlwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIikucG9zaXRpb25cclxuICAgICAgICB2YXIgc2VhdDJjYXJkcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnMlwiKS5nZXRDaGlsZEJ5TmFtZShcInNlYXQyXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKS5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDJcIikuY29udmVydFRvV29ybGRTcGFjZUFSIChzZWF0MmNhcmRwb3MsIG91dClcclxuICAgICAgICB0aGlzLnNlYXQyY2FyZHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIob3V0KVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lSGludD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lSGludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXQxPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWF0MVwiKVxyXG4gICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5zZWF0Mj0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmcyXCIpLmdldENoaWxkQnlOYW1lKFwic2VhdDJcIilcclxuICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVXeFNoYXJlKCk7XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy50eXBlPT0yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy55YW9xaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgcGxheWVyLnVwZGF0ZVN0YXVzKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iYXR0ZXJ5UGVyY2VudD1jYy5maW5kKFwiQ2FudmFzL2JnMi9iYXR0ZXJ5UGVyY2VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5iYXR0ZXJ5UGVyY2VudC5ub2RlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMucG93ZXIgPSBjYy5maW5kKFwiQ2FudmFzL2JnMi9wb3dlclwiKVxyXG4gICAgICAgIHRoaXMucG93ZXIuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5aX3Bvd2VyID0gY2MuZmluZChcIkNhbnZhcy9iZzIvWl9wb3dlclwiKVxyXG4gICAgICAgIHRoaXMuWl9wb3dlci5hY3RpdmU9ZmFsc2VcclxuICAgIH0sXHJcbiAgICBvblRvdWNoRW5kZWRjYXJkMTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLmFjdC5sZW5ndGgtMT49MCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMW51bSB8fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkMm51bXx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQzbnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDRudW0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNhcmQxc2VsZWN0ZWQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDFcclxuICAgICAgICAgICAgdGhpcy5jYXJkMXNlbGVjdGVkPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgxKVxyXG4gICAgICAgICAgICB0aGlzLmFjdC5wdXNoKHRoaXMuY2FyZDFudW0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDJzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkMm51bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDJcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQzOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDNzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkM251bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDNcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hFbmRlZGNhcmQ0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuYWN0Lmxlbmd0aC0xPj0wKXtcclxuICAgICAgICAgICAgaWYodGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQxbnVtIHx8dGhpcy5hY3RbdGhpcy5hY3QubGVuZ3RoLTFdPT10aGlzLmNhcmQybnVtfHx0aGlzLmFjdFt0aGlzLmFjdC5sZW5ndGgtMV09PXRoaXMuY2FyZDNudW18fHRoaXMuYWN0W3RoaXMuYWN0Lmxlbmd0aC0xXT09dGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDRzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDEpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0LnB1c2godGhpcy5jYXJkNG51bSlcclxuICAgICAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPXRoaXMuY2FyZDRcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QmF0dGVyeVBlcmNlbnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2lmKGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIC8vdmFyIHNlbGY9dGhpcztcclxuICAgICAgICAgICAgLy9pZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpe1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCh0aGlzLkFORFJPSURfQVBJLCBcImdldEJhdHRlcnlQZXJjZW50XCIsIFwiKClGXCIpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9lbHNlIGlmKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKXtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QodGhpcy5JT1NfQVBJLCBcImdldEJhdHRlcnlQZXJjZW50XCIpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgdmFyIGJhdHRlcnlJbmZvID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0QmF0dGVyeVN0YXR1c0luZm9cIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFiYXR0ZXJ5SW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuW9k+WJjeaXoOi/lOWbnu+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8ge+8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gYmF0dGVyeUluZm8uc3BsaXQoXCJfXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsID0gcGFyc2VJbnQoaW5mb1swXSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSBwYXJzZUludChpbmZvWzFdKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBpbmZvWzJdO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmxhYmVsLnN0cmluZyA9IFwi55S16YeP5Ymp5L2Z77yaXCIgKyAobGV2ZWwgKiAxMDApIC8gc2NhbGUgKyBcIlxcdFwiICsgXCLlvZPliY3nlLXmsaDkvb/nlKjnirbmgIHnirbmgIHvvJpcIiArIHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHNlbGYuYmF0dGVyeVBlcmNlbnQuc3RyaW5nPVwi55S16YeP5Ymp5L2Z77yaXCIgKyAobGV2ZWwgKiAxMDApIC8gc2NhbGUgKyBcIlxcdFwiICsgXCLlvZPliY3nlLXmsaDkvb/nlKjnirbmgIHnirbmgIHvvJpcIiArIHN0YXR1cztcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIueUtemHj+WJqeS9me+8mlwiICsgKGxldmVsICogMTAwKSAvIHNjYWxlICsgXCJcXHRcIiArIFwi5b2T5YmN55S15rGg5L2/55So54q25oCB54q25oCB77yaXCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBpbmZvPXd4LmdldEJhdHRlcnlJbmZvU3luYygpXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbz13eC5nZXRCYXR0ZXJ5SW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihpbmZvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxldmVsID0gaW5mby5sZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGluZm8uaXNDaGFyZ2luZyA/XCLlhYXnlLXkuK1cIjpcIuayoeWFheeUtVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYmF0dGVyeVBlcmNlbnQhPXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhdHRlcnlQZXJjZW50LnN0cmluZz1cIlwiKyBsZXZlbCArIFwiJVwiKyBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhdHRlcnlQZXJjZW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnBvd2VyIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3dlci5zY2FsZVggPSBsZXZlbC8xMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG93ZXIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuWl9wb3dlci5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9jYy5sb2coXCLnlLXph4/liankvZlcIiArbGV2ZWwgKyBcIiVcIiArIFwi55S15rGg5L2/55So54q25oCBXCIgKyBzdGF0dXMpXHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBsZXZlbDtcclxuICAgICAgICAgICAgLy99ICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZz10aGlzLmFjdC5qb2luKFwiXCIpXHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKERhdGUubm93KCkvMTAwMC82MCk7XHJcbiAgICAgICAgaWYodGhpcy5fbGFzdE1pbnV0ZSAhPSBtaW51dGVzKXtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdE1pbnV0ZSA9IG1pbnV0ZXM7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGggPSBoIDwgMTA/IFwiMFwiK2g6aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIG0gPSBtIDwgMTA/IFwiMFwiK206bTtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUxhYmVsLnN0cmluZyA9IFwiXCIgKyBoICsgXCI6XCIgKyBtOyAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7ICBcclxuICAgICAgICAgICAgdGhpcy5nZXRCYXR0ZXJ5UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgb25hZGRhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIitcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25yZWR1Y2VhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIi1cIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25tdWxhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIipcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25kaXZhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIi9cIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25sZWZhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIihcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25yaWdhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5hY3QucHVzaChcIilcIilcclxuXHJcbiAgICB9LFxyXG4gICAgb25kZWxhY3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdmFyIG51bT10aGlzLmFjdC5wb3AoKVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3R0b3VjaGNhcmQuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkMSkgdGhpcy5jYXJkMXNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgaWYodGhpcy5sYXN0dG91Y2hjYXJkPT10aGlzLmNhcmQyKSB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICBpZih0aGlzLmxhc3R0b3VjaGNhcmQ9PXRoaXMuY2FyZDMpIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgIGlmKHRoaXMubGFzdHRvdWNoY2FyZD09dGhpcy5jYXJkNCkgdGhpcy5jYXJkNHNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgdGhpcy5sYXN0dG91Y2hjYXJkPW51bGxcclxuXHJcbiAgICB9LFxyXG4gICAgb25zdXJlYWN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuY2FyZDFzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDJzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDNzZWxlY3RlZD09ZmFsc2V8fHRoaXMuY2FyZDRzZWxlY3RlZD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIuWbm+W8oOeJjOmDveW/hemhu+S9v+eUqOS4gOasoe+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkMnNlbGVjdGVkPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDNzZWxlY3RlZD1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyZDMuc2V0U2NhbGUoMC44KVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnNldFNjYWxlKDAuOClcclxuICAgICAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcblxyXG4gICAgICAgIHZhciBzdHI9dGhpcy5hY3Quam9pbihcIlwiKVxyXG4gICAgICAgIHZhciByZXM9MDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vdmFyIHJlcz1ldmFsKHN0cik7XHJcbiAgICAgICAgICAgIC8vdmFyIHJlcz0gd2luZG93LmJpbmRpbmcuZXZhbChzdHIpXHJcbiAgICAgICAgICAgIHJlcz13aW5kb3cuZXZhbDIoc3RyKVxyXG4gICAgICAgICAgICAvL2NjLmxvZyhcInR0dHR0dHR0dHR0dHR0dFwiLHJlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2h7XHJcbiAgICAgICAgICAgIC8vcmVzPVwic3ludGF4IGVycm9yXCJcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gXCLovpPlhaXml6DmlYjvvIzor7fph43mlrDorqHnrpdcIjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdD1bXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FsZXJ0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Q9W11cclxuICAgICAgICAvL3RoaXMuYWN0LnB1c2gocmVzKVxyXG4gICAgICAgIGlmKHJlcz09MjQpe1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm9uc3VyZWFjdChzdHIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi6K6h566X57uT5p6c5Li6XCIgKyByZXMgKyBcIuS4jeato+ehru+8jOivt+mHjeaWsOiuoeeul1wiO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbyg4LjAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwic3VibWl0PVwiLHJlcylcclxuXHJcbiAgICB9LFxyXG4gICAgcGlja1VwZWQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIC8vY2MubG9nKFwid29ybGRzZW5jZS5waWNrdXBlZFwiKVxyXG5cclxuICAgIH0sXHJcbiAgICBpbnN0YWxsRXZlbnRzIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkF2YXRhckVudGVyV29ybGRcIiwgdGhpcywgXCJvbkF2YXRhckVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkVudGVyV29ybGRcIiwgdGhpcywgXCJvbkVudGVyV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJnYW1lX2JlZ2luX3B1c2hcIiwgdGhpcywgXCJnYW1lX2JlZ2luX3B1c2hcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlaG9sZHNcIiwgdGhpcywgXCJlbnRpdHlfdXBkYXRlaG9sZHNcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIiwgdGhpcywgXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25vdGhlck5ldGN1dFwiLCB0aGlzLCBcIm9ub3RoZXJOZXRjdXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkdhbWVPdmVyXCIsIHRoaXMsIFwib25HYW1lT3ZlclwiKTtcclxuXHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkRpc2Nvbm5lY3RlZFwiLCB0aGlzLCBcIm9uRGlzY29ubmVjdGVkXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZVwiLCB0aGlzLCBcIm9uQ29ubmVjdGlvblN0YXRlXCIpO1xyXG5cdFx0S0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25xdWlja19jaGF0XCIsIHRoaXMsIFwib25xdWlja19jaGF0XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25lbW9qaVwiLCB0aGlzLCBcIm9uZW1vamlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25FbnRlcldvcmxkMlwiLCB0aGlzLCBcIm9uRW50ZXJXb3JsZDJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJ1cGRhdGVnYW1lc3R1dHNcIiwgdGhpcywgXCJ1cGRhdGVnYW1lc3R1dHNcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbmpvaW5Qcml2YXRlUm9vbVwiLCB0aGlzLCBcIm9uam9pblByaXZhdGVSb29tXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25jbGllbnRNU0dcIiwgdGhpcywgXCJvbmNsaWVudE1TR1wiKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBlbnRpdHlfdXBkYXRlcm9vbWtleTpmdW5jdGlvbihyb29tS2V5YyxhdmF0YXIpe1xyXG4gICAgICAgIGNjLmxvZyhcImVudGl0eVslZF11cGRhdGVyb29ta2V5ZW50aXR5X3VwZGF0ZXJvb21rZXk9XCIsIGF2YXRhci5pZCwgcm9vbUtleWMpXHJcbiAgICAgICAgaWYoYXZhdGFyLmlkPT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLlJvb21JRC5zdHJpbmc9XCLmiL/pl7Tlj7c6XCIrcm9vbUtleWMuam9pbihcIlwiKVxyXG4gICAgICAgICAgICB0aGlzLnJvb21LZXljPXJvb21LZXljLmpvaW4oXCJcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVXeFNoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSgpO1xyXG5cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNvdW5kL3NoYXJlXCIsZnVuY3Rpb24oZXJyLGRhdGEpe1xyXG4gICAgICAgICAgIC8vIHd4LnNoYXJlQXBwTWVzc2FnZSh7ICAgLy/miZPlvIDlsI/muLjmiI/oh6rliqjliIbkuqtcclxuICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCIyNOeCuSDmmbrlipvlsI9QS1wiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGRhdGEudXJsLFxyXG4gICAgICAgICAgICAgICAgLy9xdWVyeTogXCJSb29taWQ9XCIgKyBzZWxmLnJvb21LZXljICsgXCImVXNlck5hbWU9XCIgKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSwvLyDliKvkurrngrnlh7vpk77mjqXml7bkvJrlvpfliLDnmoTmlbDmja5cclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwibmljaz1cIiArIG5pY2sgKyBcIiZnZW5kZXI9XCIgKyBnZW5kZXIgKyBcIiZjaXR5PVwiICsgY2l0eSxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6XCJSb29taWQ9XCIrIHNlbGYucm9vbUtleWMrXCImVXNlck5hbWU9XCIrIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWIhuS6q+aIkOWKn1wiICsgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMueWFvcWluZy5hY3RpdmU9ZmFsc2UgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcblxyXG4gICAgZW5hYmxlUGh5c2ljTWFuYWdlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY2MubG9nKFwidGVzdDFcIilcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAvL2NjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9dHJ1ZTtcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVQaHlzaWNzRGVidWdEcmF3OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJ0ZXN0MlwiKVxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XHJcbiAgICAgICAgICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfcGFpckJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfY2VudGVyT2ZNYXNzQml0IHxcclxuICAgICAgICAgICAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfc2hhcGVCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3JheUNhc3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG5cclxuICAgIHVuSW5zdGFsbEV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyRW50ZXJXb3JsZFwiLCB0aGlzLCBcIm9uQXZhdGFyRW50ZXJXb3JsZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25FbnRlcldvcmxkXCIsIHRoaXMsIFwib25FbnRlcldvcmxkXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxlYXZlV29ybGRcIiwgdGhpcywgXCJvbkxlYXZlV29ybGRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcImdhbWVfYmVnaW5fcHVzaFwiLCB0aGlzLCBcImdhbWVfYmVnaW5fcHVzaFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsIHRoaXMsIFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJuZXdUdXJuXCIsIHRoaXMsIFwibmV3VHVyblwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwicGxheWVyUmVhZHlTdGF0ZUNoYW5nZVwiLCB0aGlzLCBcInBsYXllclJlYWR5U3RhdGVDaGFuZ2VcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9ub3RoZXJOZXRjdXRcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uR2FtZU92ZXJcIiwgdGhpcyk7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uRGlzY29ubmVjdGVkXCIsIHRoaXMsIFwib25EaXNjb25uZWN0ZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uQXZhdGFyQ29udGludWVHYW1lXCIsIHRoaXMsIFwib25BdmF0YXJDb250aW51ZUdhbWVcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbnF1aWNrX2NoYXRcIiwgdGhpcywgXCJvbnF1aWNrX2NoYXRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uZW1vamlcIiwgdGhpcywgXCJvbmVtb2ppXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbmlwdENoYXRcIiwgdGhpcywgXCJvbmlwdENoYXRcIik7XHJcblxyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkVudGVyV29ybGQyXCIsIHRoaXMsIFwib25FbnRlcldvcmxkMlwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwidXBkYXRlZ2FtZXN0dXRzXCIsIHRoaXMsIFwidXBkYXRlZ2FtZXN0dXRzXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRpdHlfdXBkYXRlcm9vbWtleVwiLCB0aGlzLCBcImVudGl0eV91cGRhdGVyb29ta2V5XCIpO1xyXG5cclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25zeW5jc3VyZWFjdFwiLCB0aGlzLCBcIm9uc3luY3N1cmVhY3RcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uam9pblByaXZhdGVSb29tXCIsIHRoaXMsIFwib25qb2luUHJpdmF0ZVJvb21cIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uY2xpZW50TVNHXCIsIHRoaXMsIFwib25jbGllbnRNU0dcIik7XHJcbiAgICB9LFxyXG4gICAgb25qb2luUHJpdmF0ZVJvb206ZnVuY3Rpb24obnVtKXtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3RhcnRTY2VuZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2dpbnJlcz1udW1cclxuICAgICAgICAgICAgY2MubG9nKFwic3RhcnRzY2VuZT09PT53b3Jkc2NlbmVcIilcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIG9ucXVpY2tfY2hhdDpmdW5jdGlvbihlaWQsaWR4KXtcclxuICAgICAgICAvL2NjLmxvZyhcIjc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzdxdWlja19jaGF0PVwiLGVpZCxpZHgpXHJcbiAgICAgICAgdmFyIHN0cnN0cj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiQ2hhdFwiKS5nZXRRdWlja0NoYXRJbmZvKGlkeClbXCJjb250ZW50XCJdXHJcbiAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhxdWlja19jaGF0PVwiLHN0cnN0cilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbmVtb2ppOmZ1bmN0aW9uKGVpZCxuYW1lKXtcclxuICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OGVtb2ppPVwiLG5hbWUpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmVtb2ppKG5hbWUpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuZW1vamkobmFtZSlcclxuICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uaXB0Q2hhdDpmdW5jdGlvbihlaWQsc3Ryc3RyKXtcclxuICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OGVpcHRDaGF0PVwiLHN0cnN0cilcclxuICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgLy8gdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuY2hhdChzdHJzdHIpXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlOmZ1bmN0aW9uKGVpZCxzdGF0ZSl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJwbGF5ZXJSZWFkeVN0YXRlQ2hhbmdlXCIpXHJcbiAgICAgICAgaWYoS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkPT1laWQpIHsgICBcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5hY3RpdmU9dHJ1ZSBcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlIFxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgIFxyXG4gICAgICAgIH0gICAgXHJcblxyXG4gICAgfSxcclxuICAgIG9udXBkYXRlR2FtZXN0YXRlczpmdW5jdGlvbihjdXJJRCx0aW1lKXtcclxuICAgICAgICAvL2NjLmxvZyhcIm9udXBkYXRlR2FtZXN0YXRlc1wiKVxyXG4gICAgICAgIHRoaXMubmV3VHVybihjdXJJRCx0aW1lKVxyXG5cclxuICAgIH0sXHJcbiAgICB1cGRhdGVnYW1lc3R1dHM6ZnVuY3Rpb24obnVtKXtcclxuICAgICAgICBpZihudW09PTEpey8v5pyN5Yqh5Zmo5q2j5ZyocGxheWluZ+S4rVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsvL+S4gOWxgOW3sue7k+adn1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbmNsaWVudE1TRzpmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQuc3RyaW5nID0gbXNnXHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxMy4wLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9LFxyXG4gICAgb25vdGhlck5ldGN1dDpmdW5jdGlvbihjdXJJRCl7XHJcbiAgICAgICAgY2MubG9nKFwib25vdGhlck5ldGN1dOOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAguOAglwiKVxyXG4gICAgICAgIGlmKGN1cklEPT0wKXtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcIuWFtuS7lueOqemAg+WRve+8jOa4uOaIj+mprOS4iue7k+adny4uLi4uLi5cIjtcclxuICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwi546p5a62XCIrS0JFbmdpbmUuYXBwLmVudGl0aWVzW2N1cklEXS5hY2NvdW50TmFtZSArXCLmjonnur/vvIzor7fnrYnlvoUuLi4uLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgIHZhciBhY3Rpb24gPSBjYy5mYWRlVG8oMTMuMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lU3RhdGUubmV3VHVybigxNSk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgb25zeW5jc3VyZWFjdDpmdW5jdGlvbihzdHJzKXtcclxuICAgICAgICBjYy5sb2coXCJ3b3JsZDo6b25zeW5jc3VyZWFjdFwiLCBzdHJzKVxyXG4gICAgICAgIC8vdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgLy90aGlzLmdhbWVIaW50LnN0cmluZyA9IHN0cnNcclxuICAgICAgICAvL3ZhciBhY3Rpb24gPSBjYy5mYWRlVG8oOC4wLCAwKTtcclxuICAgICAgICAvL3RoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2Nvbm5lY3RlZCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZGlzY29ubmVjdCEgd2lsbCB0cnkgdG8gcmVjb25uZWN0Li4uXCIpO1xyXG4gICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxLjAsIDApO1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZUhpbnQubm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVIaW50LnN0cmluZyA9IFwiZGlzY29ubmVjdCEgd2lsbCB0cnkgdG8gcmVjb25uZWN0Li4uXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuRGVzdHJveXBsYXllcigpXHJcbiAgICAgICAgS0JFbmdpbmUuYXBwLnJlbG9naW5CYXNlYXBwKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblJlbG9naW5CYXNlYXBwVGltZXIgOiBmdW5jdGlvbihzZWxmKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJ3aWxsIHRyeSB0byByZWNvbm5lY3QoXCIgKyB0aGlzLnJlbG9naW5Db3VudCArIFwiKS4uLlwiKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgZmFpbGVkKOaWree6v+mHjei/nuWksei0pSksIGVycj1cIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSkpOyAgIFxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIG9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHkgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwicmVvZ2luIGlzIHN1Y2Nlc3NmdWxseSEo5pat57q/6YeN6L+e5oiQ5YqfISlcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5ub2RlLm9wYWNpdHk9MjU1XHRcclxuICAgICAgICB0aGlzLmdhbWVIaW50Lm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDguMCwgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lSGludC5zdHJpbmcgPSBcInJlb2dpbiBpcyBzdWNjZXNzZnVsbHkhKOaWree6v+mHjei/nuaIkOWKnyEpXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUhpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBvbkNvbm5lY3Rpb25TdGF0ZSA6IGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcclxuICAgICAgICBpZighc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBLQkVuZ2luZS5FUlJPUl9NU0coXCJDb25uZWN0KFwiICsgS0JFbmdpbmUuYXBwLmlwICsgXCI6XCIgKyBLQkVuZ2luZS5hcHAucG9ydCArIFwiKSBpcyBlcnJvciEgKOi/nuaOpemUmeivrylcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJDb25uZWN0IHN1Y2Nlc3NmdWxseSwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5oiQ5Yqf77yM6K+3562J5YCZLi4uKVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVxQ2hhbmdlUmVhZHlTdGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgIHBsYXllci5yZXFDaGFuZ2VSZWFkeVN0YXRlKClcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnNldFJlYWR5KHRydWUpXHJcbiAgICAgICAgdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICAgXHJcbiAgICB9LFxyXG4gICAgZW50aXR5X3VwZGF0ZWhvbGRzOmZ1bmN0aW9uKGhvbGRzLGVudGl0eSl7XHJcbiAgICAgICAgY2MubG9nKFwiZW50aXR5X3VwZGF0ZWhvbGRzXCIsZW50aXR5LmlkLGhvbGRzKVxyXG4gICAgICAgIGlmKGVudGl0eS5jbGFzc05hbWUgPT0gXCJBdmF0YXJcIikge1xyXG4gICAgICAgICAgICBpZihlbnRpdHkuaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCkgeyAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2hvbGRzPWhvbGRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgICBcclxuICAgICAgICAgICAgfWVsc2V7ICAvL3NjYWxleD09LTEsXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VhdDIuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faG9sZHM9aG9sZHNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgXHJcbiAgICB9LFxyXG4gICAgZ2FtZV9iZWdpbl9wdXNoOmZ1bmN0aW9uKGVudGl0eSl7XHJcbiAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6Z2FtZV9iZWdpbl9wdXNoXCIpXHJcbiAgICAgICAgLy90aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy90aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2hvbGRzPWVudGl0eS5ob2xkc1xyXG4gICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7IFxyXG5cclxuICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaCgpOyAgXHJcbiAgICB9LFxyXG4gICAgb25FbnRlcldvcmxkOiBmdW5jdGlvbiAoZW50aXR5KSB7XHJcbiAgICAgICAgLy9TQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm9uRW50ZXJXb3JsZCBlbnRpdHkuaWQ9XCIsZW50aXR5LmlkKVxyXG4gICAgICAgIGlmKCFlbnRpdHkuaXNQbGF5ZXIoKSkge1xyXG4gICAgICAgICAgICB2YXIgYWUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVudGl0eS5pZCkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgIH1lbHNleyAgLy9zY2FsZXg9PS0xLFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYXRjaGluZyE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT1mYWxzZTsgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHk7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkVudGVyV29ybGQyOiBmdW5jdGlvbiAoZW50aXR5SUQpIHtcclxuICAgICAgICBjYy5sb2coXCJvbkVudGVyV29ybGQyXCIpXHJcbiAgICAgICAgdmFyIGVudGl0eT1LQkVuZ2luZS5hcHAuZW50aXRpZXNbZW50aXR5SURdXHJcbiAgICAgICAgLy9TQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm9uRW50ZXJXb3JsZCBlbnRpdHkuaWQ9XCIsZW50aXR5LmlkKVxyXG4gICAgICAgICAgICBpZihLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQ9PWVudGl0eS5pZCkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX3VzZXJOYW1lPWVudGl0eS5hY2NvdW50TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9ZW50aXR5LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIldvcmxkU2NlbmU6Om9uRW50ZXJXb3JsZD1cIix0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHkpXHJcbiAgICAgICAgICAgIH1lbHNleyAgLy9zY2FsZXg9PS0xLFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYXRjaGluZyE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9ZW50aXR5LmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLmF2YXRhclVybD1lbnRpdHkuYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTsgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZW50aXRpZXNbZW50aXR5LmlkXSA9IGVudGl0eTsgXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiV29ybGRTY2VuZTo6b25FbnRlcldvcmxkPVwiLHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5faXNSZWFkeSlcclxuICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICB9LFxyXG4gICAgb25MZWF2ZVdvcmxkOiBmdW5jdGlvbiAoZW50aXR5KSB7XHJcbiAgICAgICAgY2MubG9nKFwib25MZWF2ZVdvcmxkXCIsZW50aXR5LmlkLGVudGl0eS5jbGFzc05hbWUpXHJcbiAgICAgICAgaWYodGhpcy5tYXRjaGluZyE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaGluZy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24xID0gY2MuZmFkZUluKDAuNSk7Ly/muJDmmL5cclxuICAgICAgICAgICAgdmFyIGFjdGlvbjIgPSBjYy5mYWRlT3V0KDAuNSk7Ly/muJDpmpDmlYjmnpxcclxuICAgICAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjEsYWN0aW9uMikpXHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hpbmcucnVuQWN0aW9uKHJlcGVhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHdpbmRvdy50eXBlIT0xICYmIHRoaXMueWFvcWluZyE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy55YW9xaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlYXQyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY2MubG9nKFwib25MZWF2ZVdvcmxkXCIsZW50aXR5LmlkLGVudGl0eS5jbGFzc05hbWUpXHJcbiAgICAgICAgaWYodGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdICYmIGVudGl0eS5jbGFzc05hbWUgPT0gXCJBdmF0YXJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5LmlkXS5yZW1vdmVGcm9tUGFyZW50KClcclxuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHkuaWRdPW51bGxcclxuICAgICAgICB9ICBcclxuICAgICAgICAqLyAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25BdmF0YXJFbnRlcldvcmxkIDogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICAgY2MubG9nKFwib25BdmF0YXJFbnRlcldvcmxkXCIpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoYXZhdGFyKTtcclxuICAgIH0sXHJcblxyXG4gICBcclxuICAgIHVwZGF0ZVBvc2l0aW9uIDogZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICAgICBcclxuICAgIH0sXHQgIFxyXG4gICAgXHJcbiAgICBzZXRfcG9zaXRpb246IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRDYW1lcmFUYXJnZXQ6IGZ1bmN0aW9uKGVudGl0eUlEKXtcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1BsYXllckhhc0l0ZW06IGZ1bmN0aW9uKGxlZnQpIHtcclxuICAgICAgICAvL2NjLmxvZyhcInRlc3QxNFwiKVxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgbmV3VHVybjogZnVuY3Rpb24oYXZhdGFyLGVpZCwgc2Vjb25kLGNhcmQwMSxjYXJkMDIsY2FyZDAzLGNhcmQwNCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3Iuc3RvcEJHTSgpXHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInR1cm5cIilcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUubmV3VHVybihzZWNvbmQpO1xyXG4gICAgICAgIHRoaXMuY2xvY2suYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICBpZighdGhpcy5nYW1lU3RhdGUuaXNHYW1lU3RhcnQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZS5zZXRHYW1lU3RhcnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxLjAsIDApO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWwuc3RyaW5nID0gXCLmuLjmiI/lvIDlp4sgISEhXCI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sYWJlbC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhcmQxc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQyc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQzc2VsZWN0ZWQ9ZmFsc2VcclxuICAgICAgICB0aGlzLmNhcmQ0c2VsZWN0ZWQ9ZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zZXRTY2FsZSgwLjgpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zZXRTY2FsZSgwLjgpXHJcblxyXG4gICAgICAgIHRoaXMuY2FyZDEuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLmNhcmQyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5jYXJkMy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuY2FyZDQuYWN0aXZlPXRydWVcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhcmQwMT1jYXJkMDE7XHJcbiAgICAgICAgdGhpcy5jYXJkMDI9Y2FyZDAyO1xyXG4gICAgICAgIHRoaXMuY2FyZDAzPWNhcmQwMztcclxuICAgICAgICB0aGlzLmNhcmQwND1jYXJkMDQ7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIHZhciBBX2FjdDE9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDI9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDM9bnVsbFxyXG4gICAgICAgIHZhciBBX2FjdDQ9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDE9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDI9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDM9bnVsbFxyXG4gICAgICAgIHZhciBCX2FjdDQ9bnVsbFxyXG5cclxuICAgICAgICB2YXIgeDE9dGhpcy5zZWF0MWNhcmRwb3MueDtcclxuICAgICAgICB2YXIgeTE9dGhpcy5zZWF0MWNhcmRwb3MueVxyXG5cclxuICAgICAgICB2YXIgeDI9dGhpcy5zZWF0MmNhcmRwb3MueDtcclxuICAgICAgICB2YXIgeTI9dGhpcy5zZWF0MmNhcmRwb3MueVxyXG4gICAgICAgIHZhciBjYXJkMW9yaWdwb3N4PXRoaXMuY2FyZDFvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDFvcmlncG9zeT10aGlzLmNhcmQxb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkMm9yaWdwb3N4PXRoaXMuY2FyZDJvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDJvcmlncG9zeT10aGlzLmNhcmQyb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkM29yaWdwb3N4PXRoaXMuY2FyZDNvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDNvcmlncG9zeT10aGlzLmNhcmQzb3JpZ3Bvcy55XHJcblxyXG4gICAgICAgIHZhciBjYXJkNG9yaWdwb3N4PXRoaXMuY2FyZDRvcmlncG9zLnhcclxuICAgICAgICB2YXIgY2FyZDRvcmlncG9zeT10aGlzLmNhcmQ0b3JpZ3Bvcy55XHJcbiAgICAgICAgY2MubG9nKFwidGhpcy5jdXJpZD1cIixlaWQpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLnNlYXQyY2FyZHBvcz1cIix4MSx5MSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuc2VhdDFjYXJkcG9zPVwiLHgyLHkyKVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDFvcmlncG9zPVwiLGNhcmQxb3JpZ3Bvc3gsY2FyZDFvcmlncG9zeSlcclxuICAgICAgICBjYy5sb2coXCJkZGRkZGRkZGRkZGRkZGRkZGRkZHRoaXMuLmNhcmQyb3JpZ3Bvcz1cIixjYXJkMm9yaWdwb3N4LGNhcmQyb3JpZ3Bvc3kpXHJcbiAgICAgICAgY2MubG9nKFwiZGRkZGRkZGRkZGRkZGRkZGRkZGR0aGlzLi5jYXJkMm9yaWdwb3M9XCIsY2FyZDNvcmlncG9zeCxjYXJkM29yaWdwb3N5KVxyXG4gICAgICAgIGNjLmxvZyhcImRkZGRkZGRkZGRkZGRkZGRkZGRkdGhpcy4uY2FyZDJvcmlncG9zPVwiLGNhcmQ0b3JpZ3Bvc3gsY2FyZDRvcmlncG9zeSlcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkMS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkMi5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkMy5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy5jYXJkNC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgaWYoZWlkPT0wKXsvL+WQhOWbnuWQhOWutlxyXG4gXHJcblxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDEseTEpKVxyXG5cclxuICAgICAgICAgICAgQV9hY3QzPWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICAgICAgQV9hY3Q0PWNjLm1vdmVUbygxLGNjLnYyKHgyLHkyKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihlaWQ9PUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVpZD09S0JFbmdpbmUuYXBwLnBsYXllcigpLmlkLG1vdmV0byBzZWF0MVwiLGVpZCxLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpXHJcbiAgICAgICAgICAgIEFfYWN0MT1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0Mj1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0Mz1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcbiAgICAgICAgICAgIEFfYWN0ND1jYy5tb3ZlVG8oMSxjYy52Mih4MSx5MSkpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYy5sb2coXCJlaWQhPUtCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZCxtb3ZldG8gc2VhdDJcIixlaWQsS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkKVxyXG4gICAgICAgICAgICBBX2FjdDE9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDI9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDM9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgICAgICBBX2FjdDQ9Y2MubW92ZVRvKDEsY2MudjIoeDIseTIpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmNhcmQxbnVtPTIrcGFyc2VJbnQoKGNhcmQwMSsxMDAwLTEwNjEpLzQpICAvLzEsMiwzLDRcclxuICAgICAgICB0aGlzLmNhcmQybnVtPTIrcGFyc2VJbnQoKGNhcmQwMisxMDAwLTEwNjEpLzQpXHJcbiAgICAgICAgdGhpcy5jYXJkM251bT0yK3BhcnNlSW50KChjYXJkMDMrMTAwMC0xMDYxKS80KVxyXG4gICAgICAgIHRoaXMuY2FyZDRudW09MitwYXJzZUludCgoY2FyZDA0KzEwMDAtMTA2MSkvNClcclxuICAgICAgICBpZiAodGhpcy5jYXJkMW51bT4xMCkge3RoaXMuY2FyZDFudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkMm51bT4xMCkge3RoaXMuY2FyZDJudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkM251bT4xMCkge3RoaXMuY2FyZDNudW09MX1cclxuICAgICAgICBpZiAodGhpcy5jYXJkNG51bT4xMCkge3RoaXMuY2FyZDRudW09MX1cclxuXHJcbiAgICAgICAgdmFyIGZ1bmNvdW50MT1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MSgpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoY291bnQxKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bmNvdW50Mj1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikucmVmcmVzaGNvdW50MigpXHJcbiAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoY291bnQyKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgIHZhciBmdW4xPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgxLFxyXG4gICAgICAgICAgICB0YXJnZXQueT15MTtcclxuICAgICAgICAgICAgY2FyZDAxPWNhcmQwMSsxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDErXCJAMnhcIlxyXG4gICAgICAgICAgICAvL3RhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodXJsKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYuY2FyZEF0bGFzLmdldFNwcml0ZUZyYW1lKHVybClcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsY2MuU3ByaXRlRnJhbWUsZnVuY3Rpb24oZXJyLHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2FyZDEuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9IHNwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgIH0pOyAqL1xyXG4gICAgICAgIH0sIHRoaXMuY2FyZDEpO1xyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGZ1bjI9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9eDFcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9eTFcclxuICAgICAgICAgICAgY2FyZDAyPWNhcmQwMisxMDAwO1xyXG4gICAgICAgICAgICB2YXIgdXJsPVwiY2FyZF9cIitjYXJkMDIrXCJAMnhcIlxyXG4gICAgICAgICAgICAvL3RhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodXJsKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZVxyXG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5jYXJkQXRsYXMuZ2V0U3ByaXRlRnJhbWUodXJsKVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDIpO1xyXG4gICAgICAgIHZhciBmdW4zPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PXgyXHJcbiAgICAgICAgICAgIHRhcmdldC55PXkyXHJcbiAgICAgICAgICAgIGNhcmQwMz1jYXJkMDMrMTAwMDtcclxuICAgICAgICAgICAgdmFyIHVybD1cImNhcmRfXCIrY2FyZDAzK1wiQDJ4XCJcclxuICAgICAgICAgICAgLy90YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKHVybCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYuY2FyZEF0bGFzLmdldFNwcml0ZUZyYW1lKHVybClcclxuICAgICAgICB9LCB0aGlzLmNhcmQzKTtcclxuICAgICAgICB2YXIgZnVuND1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD14MlxyXG4gICAgICAgICAgICB0YXJnZXQueT15MlxyXG4gICAgICAgICAgICBjYXJkMDQ9Y2FyZDA0KzEwMDA7XHJcbiAgICAgICAgICAgIHZhciB1cmw9XCJjYXJkX1wiK2NhcmQwNCtcIkAyeFwiXHJcbiAgICAgICAgICAgIC8vdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZSh1cmwpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zZWxmLmNhcmRBdGxhcy5nZXRTcHJpdGVGcmFtZSh1cmwpXHJcbiAgICAgICAgfSwgdGhpcy5jYXJkNCk7XHJcblxyXG4gICAgICAgIHZhciBmdW4xMT1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD1jYXJkMW9yaWdwb3N4XHJcbiAgICAgICAgICAgIHRhcmdldC55PWNhcmQxb3JpZ3Bvc3lcclxuICAgICAgICB9LCB0aGlzLmNhcmQxKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZnVuMjI9Y2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KXtcclxuICAgICAgICAgICAgdGFyZ2V0Lng9Y2FyZDJvcmlncG9zeFxyXG4gICAgICAgICAgICB0YXJnZXQueT1jYXJkMm9yaWdwb3N5XHJcbiAgICAgICAgfSwgdGhpcy5jYXJkMik7XHJcbiAgICAgICAgdmFyIGZ1bjMzPWNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRhcmdldC54PWNhcmQzb3JpZ3Bvc3hcclxuICAgICAgICAgICAgdGFyZ2V0Lnk9Y2FyZDNvcmlncG9zeVxyXG4gICAgICAgIH0sIHRoaXMuY2FyZDMpO1xyXG4gICAgICAgIHZhciBmdW40ND1jYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0YXJnZXQueD1jYXJkNG9yaWdwb3N4XHJcbiAgICAgICAgICAgIHRhcmdldC55PWNhcmQ0b3JpZ3Bvc3lcclxuICAgICAgICB9LCB0aGlzLmNhcmQ0KTtcclxuXHJcbiAgICAgICAgQl9hY3QxPWNjLm1vdmVUbygxLGNjLnYyKGNhcmQxb3JpZ3Bvc3gsY2FyZDFvcmlncG9zeSkpXHJcbiAgICAgICAgQl9hY3QyPWNjLm1vdmVUbygxLGNjLnYyKGNhcmQyb3JpZ3Bvc3gsY2FyZDJvcmlncG9zeSkpXHJcbiAgICAgICAgQl9hY3QzPWNjLm1vdmVUbygxLGNjLnYyKGNhcmQzb3JpZ3Bvc3gsY2FyZDNvcmlncG9zeSkpXHJcbiAgICAgICAgQl9hY3Q0PWNjLm1vdmVUbygxLGNjLnYyKGNhcmQ0b3JpZ3Bvc3gsY2FyZDRvcmlncG9zeSkpXHJcblxyXG4gICAgICAgIGlmKGVpZD09MTIzNDUpey8v5ZCE5Zue5ZCE5a62MuW8oFxyXG4gICAgICAgICAgICB0aGlzLmNhcmQxLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmdW4xLEJfYWN0MSxmdW4xMSxmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmdW4yLEJfYWN0MixmdW4yMixmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQzLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmdW4zLEJfYWN0MyxmdW4zMyxmdW5jb3VudDIpKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmQ0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmdW40LEJfYWN0NCxmdW40NCxmdW5jb3VudDIpKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgLy/kuIDlrrblm5vlvKBcclxuICAgICAgICAgICAgdGhpcy5jYXJkMS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoQV9hY3QxLGZ1bjEsZnVuY291bnQxLGNjLmRlbGF5VGltZSgxKSxCX2FjdDEsZnVuMTEsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkMi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoQV9hY3QyLGZ1bjIsZnVuY291bnQxLGNjLmRlbGF5VGltZSgxKSxCX2FjdDIsZnVuMjIsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkMy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoQV9hY3QzLGZ1bjMsZnVuY291bnQxLGNjLmRlbGF5VGltZSgxKSxCX2FjdDMsZnVuMzMsZnVuY291bnQyKSlcclxuICAgICAgICAgICAgdGhpcy5jYXJkNC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoQV9hY3Q0LGZ1bjQsZnVuY291bnQxLGNjLmRlbGF5VGltZSgxKSxCX2FjdDQsZnVuNDQsZnVuY291bnQyKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIGNjLmxvZyhcInd3d3d3d25ld1R1cm5cIixhdmF0YXIuaWQsIHNlY29uZCxjYXJkMDEsY2FyZDAyLGNhcmQwMyxjYXJkMDQpXHJcblxyXG4gICAgICAgIHRoaXMub3B0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5hY3Q9W11cclxuICBcclxuICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkdhbWVPdmVyOiBmdW5jdGlvbihhdmF0YXJJRCwgaXNXaW4sIGhwLCB0b3RhbFRpbWUsIHRvdGFsSGFybSwgc2NvcmUpIHtcclxuICAgICAgICBpZihhdmF0YXJJRCA9PSBLQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpIHtcclxuICAgICAgICAgICAgSFAgPSBocDtcclxuICAgICAgICAgICAgVE9UQUxfVElNRSA9IHRvdGFsVGltZTtcclxuICAgICAgICAgICAgT3RoZXJIUCA9IHRvdGFsSGFybTtcclxuICAgICAgICAgICAgU0NPUkUgPSBzY29yZTtcclxuICAgICAgICAgICAgTFZsZXZlbD1NYXRoLnJvdW5kKDEwMCpTQ09SRSlcclxuICAgICAgICAgICAgdGhpcy51bkluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICAgICAgaWYoaXNXaW4pIHtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIldpblNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9zZVNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwiODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OFwiKVxyXG4gICAgICAgIC8vdGhpcy5kaXNFbmFibGVDb250cm9sUGxheWVyKCk7XHJcbiAgICAgICAgLy90aGlzLnVuSW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBpbnZhdGVmcmllbmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5tYXRjaGluZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZzJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtYXRjaGluZzJcIilcclxuICAgICAgICB0aGlzLm1hdGNoaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInNvdW5kL3NoYXJlXCIsZnVuY3Rpb24oZXJyLGRhdGEpe1xyXG4gICAgICAgICAgICB2YXIgc2VsZmY9c2VsZjtcclxuICAgICAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBzZWxmLlJvb21JRC5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogZGF0YS51cmwsXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OiBcIlJvb21pZD1cIiArIHNlbGYucm9vbUtleWMgKyBcIiZVc2VyTmFtZT1cIiArIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLC8vIOWIq+S6uueCueWHu+mTvuaOpeaXtuS8muW+l+WIsOeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgLy9xdWVyeTogXCJuaWNrPVwiICsgbmljayArIFwiJmdlbmRlcj1cIiArIGdlbmRlciArIFwiJmNpdHk9XCIgKyBjaXR5LFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6XCJSb29taWQ9XCIrIHNlbGYucm9vbUtleWMrXCImVXNlck5hbWU9XCIrIEtCRW5naW5lLmFwcC5lbnRpdGllc1tLQkVuZ2luZS5hcHAucGxheWVyKCkuaWRdLmFjY291bnROYW1lLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvmiJDlip9cIiArIHJlcyk7ICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvlpLHotKVcIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGZmLnlhb3FpbmcuYWN0aXZlPWZhbHNlIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuICAgIGNyZWF0ZVBsYXllcjogZnVuY3Rpb24oYXZhdGFyKSB7XHJcbiAgICAgICAvLyBTQ0FMRT0xO1xyXG4gICAgICAgIGNjLmxvZyhcIm5ldyBjcmVhdGVQbGF5ZXIgdGhpcy5wbGF5ZXI977yMYXZhdGFyLm1vZGVsSUQ9XCIsdGhpcy5wbGF5ZXIsYXZhdGFyLm1vZGVsSUQgKVxyXG5cclxuICAgICAgICBpZighdGhpcy5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgaWYoYXZhdGFyLmlkPT1LQkVuZ2luZS5hcHAucGxheWVyKCkuaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5fdXNlck5hbWU9YXZhdGFyLmFjY291bnROYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXQxLmdldENvbXBvbmVudChcIlNlYXRcIikuYXZhdGFyVXJsPWF2YXRhci5hdmF0YXJVcmxcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zZWF0MS5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl9pc1JlYWR5PXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDEuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9ICB0aGlzLnNlYXQxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNlYXQyLmdldENvbXBvbmVudChcIlNlYXRcIikuX2lzUmVhZHk9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLl91c2VyTmFtZT1hdmF0YXIuYWNjb3VudE5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhdDIuZ2V0Q29tcG9uZW50KFwiU2VhdFwiKS5hdmF0YXJVcmw9YXZhdGFyLmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWF0Mi5nZXRDb21wb25lbnQoXCJTZWF0XCIpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gIHRoaXMuc2VhdDI7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICBcclxuICAgICAgICAgICAgLy90aGlzLnBsYXllci5zZXRQb3NpdGlvbihhdmF0YXIucG9zaXRpb24ueCpTQ0FMRSwgYXZhdGFyLnBvc2l0aW9uLnoqU0NBTEUpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmxvZyhcImFmdGVyIGNyZWF0ZVBsYXllciB0aGlzLnBsYXllcj3vvIxhdmF0YXIubW9kZWxJRD1cIix0aGlzLnBsYXllcixhdmF0YXIubW9kZWxJRCApXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQXZhdGFyQ29udGludWVHYW1lOiBmdW5jdGlvbihhdmF0YXIpIHtcclxuICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKGF2YXRhcik7XHJcbiAgICB9LFxyXG59KTtcclxuIl19