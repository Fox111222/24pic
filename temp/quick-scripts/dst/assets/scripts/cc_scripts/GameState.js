
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cc_scripts/GameState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcR2FtZVN0YXRlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGFiZWxUaW1lIiwidHlwZSIsIkxhYmVsIiwib25Mb2FkIiwic3RyaW5nIiwic2NoZWR1bGVyIiwiZGlyZWN0b3IiLCJnZXRTY2hlZHVsZXIiLCJpc0dhbWVTdGFydCIsImlzU3RhcnQiLCJzZXRHYW1lU3RhcnQiLCJzY2hlZHVsZSIsImNvdW50RG93blNlY29uZCIsIlJFUEVBVF9GT1JFVkVSIiwidW5zY2hlZHVsZUFsbEZvclRhcmdldCIsIm5ld1R1cm4iLCJzZWNvbmQiLCJzaG93Rm9yY2UiLCJmb3JjZSIsInNldFBsYXllckhQIiwiaHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVO0FBQ1BDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkY7QUFESiwrQ0FLSTtBQUNWLGVBQVMsSUFEQztBQUVWRCxJQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGQyxHQUxKLDBDQVNDLEVBVEQsMkNBVUUsS0FWRixlQUhMO0FBZ0JMQyxFQUFBQSxNQWhCSyxvQkFnQks7QUFDUCxTQUFLSCxTQUFMLENBQWVJLE1BQWYsR0FBd0IsRUFBeEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCVCxFQUFFLENBQUNVLFFBQUgsQ0FBWUMsWUFBWixFQUFqQixDQUZPLENBR1A7QUFDQTtBQUVBO0FBQ0E7QUFDRixHQXhCSTtBQTBCTEMsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFdBQU8sS0FBS0MsT0FBWjtBQUNILEdBNUJJO0FBOEJMQyxFQUFBQSxZQUFZLEVBQUUsc0JBQVNELE9BQVQsRUFBa0I7QUFDNUIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUNBLFFBQUcsS0FBS0EsT0FBUixFQUFpQjtBQUNiLFdBQUtKLFNBQUwsQ0FBZU0sUUFBZixDQUF3QixLQUFLQyxlQUE3QixFQUE4QyxJQUE5QyxFQUFvRCxDQUFwRCxFQUF1RGhCLEVBQUUsQ0FBQ2lCLGNBQTFELEVBQTBFLENBQTFFLEVBQTZFLEtBQTdFO0FBQ0gsS0FGRCxNQUVNO0FBQ0YsV0FBS2IsU0FBTCxDQUFlSSxNQUFmLEdBQXdCLEVBQXhCO0FBQ0EsV0FBS0MsU0FBTCxDQUFlUyxzQkFBZixDQUFzQyxJQUF0QztBQUNIO0FBQ0osR0F0Q0k7QUF3Q0xDLEVBQUFBLE9BQU8sRUFBRSxpQkFBU0MsTUFBVCxFQUFpQjtBQUN0QixTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLaEIsU0FBTCxDQUFlSSxNQUFmLEdBQXdCLEtBQUtZLE1BQTdCO0FBQ0gsR0EzQ0k7QUE2Q0xKLEVBQUFBLGVBQWUsRUFBRSwyQkFBVztBQUN4QixRQUFHLEtBQUtILE9BQVIsRUFBaUI7QUFDYixVQUFHLEtBQUtPLE1BQUwsR0FBYyxDQUFqQixFQUFvQjtBQUNoQixhQUFLQSxNQUFMO0FBQ0gsT0FGRCxNQUVNO0FBQ0YsYUFBS0EsTUFBTCxHQUFjLENBQWQ7QUFDSDs7QUFFRCxXQUFLaEIsU0FBTCxDQUFlSSxNQUFmLEdBQXdCLEtBQUtZLE1BQTdCLENBUGEsQ0FRYjtBQUNIO0FBQ0osR0F4REk7QUEwRExDLEVBQUFBLFNBQVMsRUFBRSxtQkFBU0MsS0FBVCxFQUFnQixDQUUxQixDQTVESTtBQThETEMsRUFBQUEsV0FBVyxFQUFFLHFCQUFTQyxFQUFULEVBQWEsQ0FDekI7QUEvREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICBsYWJlbFRpbWU6IHtcbiAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgICAgfSxcbiAgICAgICBsYWJlbFRpbWU6IHtcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICAgICBzZWNvbmQ6IDMwLFxuICAgICAgIGlzU3RhcnQ6IGZhbHNlLFxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgIHRoaXMubGFiZWxUaW1lLnN0cmluZyA9IFwiXCI7XG4gICAgICAgdGhpcy5zY2hlZHVsZXIgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKTtcbiAgICAgICAvL3RoaXMuY2FtZXJhID0gY2MuZmluZChcIkNhbWVyYVwiKS5nZXRDb21wb25lbnQoXCJDYW1lcmFDb250cm9sXCIpO1xuICAgICAgIC8vdGhpcy5jdHggPSBjYy5maW5kKFwiV29ybGQvZHJhd05vZGVcIikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcblxuICAgICAgIC8vdGhpcy5mb3JjZUxheW91dCA9ICBjYy5maW5kKFwiZm9yY2VMYXlvdXRcIik7XG4gICAgICAgLy90aGlzLmZvcmNlTGF5b3V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBpc0dhbWVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU3RhcnQ7XG4gICAgfSxcblxuICAgIHNldEdhbWVTdGFydDogZnVuY3Rpb24oaXNTdGFydCkge1xuICAgICAgICB0aGlzLmlzU3RhcnQgPSBpc1N0YXJ0O1xuICAgICAgICBpZih0aGlzLmlzU3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlKHRoaXMuY291bnREb3duU2Vjb25kLCB0aGlzLCAxLCBjYy5SRVBFQVRfRk9SRVZFUiwgMCwgZmFsc2UpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVGltZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIudW5zY2hlZHVsZUFsbEZvclRhcmdldCh0aGlzKTsgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbmV3VHVybjogZnVuY3Rpb24oc2Vjb25kKSB7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gc2Vjb25kO1xuICAgICAgICB0aGlzLmxhYmVsVGltZS5zdHJpbmcgPSB0aGlzLnNlY29uZDtcbiAgICB9LFxuICAgXG4gICAgY291bnREb3duU2Vjb25kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYodGhpcy5pc1N0YXJ0KSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlY29uZCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZC0tO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sYWJlbFRpbWUuc3RyaW5nID0gdGhpcy5zZWNvbmQ7XG4gICAgICAgICAgICAvL2NjLmxvZyhcImNvdW50IGRvd24gc2Vjb25kOiAlZCAlc1wiLCB0aGlzLnNlY29uZCwgdGhpcy5sYWJlbFRpbWUuc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93Rm9yY2U6IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgICBcbiAgICB9LFxuXG4gICAgc2V0UGxheWVySFA6IGZ1bmN0aW9uKGhwKSB7XG4gICAgfSxcblxuXG59KTtcbiJdfQ==