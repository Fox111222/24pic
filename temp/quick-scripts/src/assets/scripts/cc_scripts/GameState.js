"use strict";
cc._RF.push(module, '4833c5fmURGY41RwF7Vh6hl', 'GameState');
// scripts/cc_scripts/GameState.js

"use strict";

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: (_properties = {
    labelTime: {
      "default": null,
      type: cc.Label
    }
  }, _defineProperty(_properties, "labelTime", {
    "default": null,
    type: cc.Label
  }), _defineProperty(_properties, "second", 30), _defineProperty(_properties, "isStart", false), _properties),
  onLoad: function onLoad() {
    this.labelTime.string = "";
    this.scheduler = cc.director.getScheduler(); //this.camera = cc.find("Camera").getComponent("CameraControl");
    //this.ctx = cc.find("World/drawNode").getComponent(cc.Graphics);
    //this.forceLayout =  cc.find("forceLayout");
    //this.forceLayout.active = false;
  },
  isGameStart: function isGameStart() {
    return this.isStart;
  },
  setGameStart: function setGameStart(isStart) {
    this.isStart = isStart;

    if (this.isStart) {
      this.scheduler.schedule(this.countDownSecond, this, 1, cc.REPEAT_FOREVER, 0, false);
    } else {
      this.labelTime.string = "";
      this.scheduler.unscheduleAllForTarget(this);
    }
  },
  newTurn: function newTurn(second) {
    this.second = second;
    this.labelTime.string = this.second;
  },
  countDownSecond: function countDownSecond() {
    if (this.isStart) {
      if (this.second > 0) {
        this.second--;
      } else {
        this.second = 0;
      }

      this.labelTime.string = this.second; //cc.log("count down second: %d %s", this.second, this.labelTime.string);
    }
  },
  showForce: function showForce(force) {},
  setPlayerHP: function setPlayerHP(hp) {}
});

cc._RF.pop();