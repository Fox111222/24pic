"use strict";
cc._RF.push(module, '35e49hR44JEyKXMPDq4jIGZ', 'Settings');
// scripts/Settings.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    _btnYXOpen: {
      "default": null,
      type: cc.Node
    },
    _btnYXClose: {
      type: cc.Node,
      "default": null
    },
    _btnYYOpen: {
      type: cc.Node,
      "default": null
    },
    _btnYYClose: {
      type: cc.Node,
      "default": null
    }
  },
  addClickEvent: function addClickEvent(node, target, component, handler) {
    cc.log(component + ":" + handler);
    var eventHandler = new cc.Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler;
    var clickEvents = node.getComponent(cc.Button).clickEvents;
    clickEvents.push(eventHandler);
  },
  addSlideEvent: function addSlideEvent(node, target, component, handler) {
    var eventHandler = new cc.Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler;
    var slideEvents = node.getComponent(cc.Slider).slideEvents;
    slideEvents.push(eventHandler);
  },
  // use this for initialization
  onLoad: function onLoad() {
    if (window.AudioMgr == null) {
      cc.log("window.AudioMgr== null");
      return;
    }

    this._btnYXOpen = this.node.getChildByName("yinxiao").getChildByName("btn_yx_open");
    this._btnYXClose = this.node.getChildByName("yinxiao").getChildByName("btn_yx_close");
    this._btnYYOpen = this.node.getChildByName("yinyue").getChildByName("btn_yy_open");
    this._btnYYClose = this.node.getChildByName("yinyue").getChildByName("btn_yy_close");
    this.refreshVolume();
  },
  onSlided: function onSlided(slider) {
    if (slider.node.parent.name == "yinxiao") {
      window.AudioMgr.setSFXVolume(slider.progress);
    } else if (slider.node.parent.name == "yinyue") {
      window.AudioMgr.setBGMVolume(slider.progress);
    }

    this.refreshVolume();
  },
  initButtonHandler: function initButtonHandler(btn) {
    this.addClickEvent(btn, this.node, "Settings", "onBtnClicked");
  },
  refreshVolume: function refreshVolume() {
    this._btnYXClose.active = window.AudioMgr.sfxVolume > 0;
    this._btnYXOpen.active = !this._btnYXClose.active;
    var yx = this.node.getChildByName("yinxiao");
    var width = 430 * window.AudioMgr.sfxVolume;
    var progress = yx.getChildByName("progress");
    progress.getComponent(cc.Slider).progress = window.AudioMgr.sfxVolume; //progress.getChildByName("progress").width = width; 

    progress.getChildByName("progress").scaleX = window.AudioMgr.sfxVolume; //yx.getChildByName("btn_progress").x = progress.x + width;

    this._btnYYClose.active = window.AudioMgr.bgmVolume > 0;
    this._btnYYOpen.active = !this._btnYYClose.active;
    var yy = this.node.getChildByName("yinyue");
    var width = 430 * window.AudioMgr.bgmVolume;
    var progress = yy.getChildByName("progress");
    progress.getComponent(cc.Slider).progress = window.AudioMgr.bgmVolume; //progress.getChildByName("progress").width = width;

    progress.getChildByName("progress").scaleX = window.AudioMgr.bgmVolume; //yy.getChildByName("btn_progress").x = progress.x + width;
  },
  onBtnClicked: function onBtnClicked(event) {
    window.AudioMgr.playSFX("ui_click"); //cc.log("onBtnClicked",event.target.name)

    if (event.target.name == "btn_close") {
      this.node.active = false;
    } else if (event.target.name == "btn_exit") {
      cc.sys.localStorage.removeItem("wx_account");
      cc.sys.localStorage.removeItem("wx_sign");
      cc.director.loadScene("StartScene");
    } else if (event.target.name == "btn_yx_open") {
      window.AudioMgr.setSFXVolume(1.0);
      this.refreshVolume();
    } else if (event.target.name == "btn_yx_close") {
      window.AudioMgr.setSFXVolume(0);
      this.refreshVolume();
    } else if (event.target.name == "btn_yy_open") {
      window.AudioMgr.setBGMVolume(1);
      this.refreshVolume();
    } else if (event.target.name == "btn_yy_close") {
      window.AudioMgr.setBGMVolume(0);
      this.refreshVolume();
    }
  } // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },

});

cc._RF.pop();