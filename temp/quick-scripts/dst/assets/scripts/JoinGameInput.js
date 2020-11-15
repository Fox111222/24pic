
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/JoinGameInput.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cbd78HQ07FEe607+cKF2L1F', 'JoinGameInput');
// scripts/JoinGameInput.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    nums: {
      "default": [],
      type: [cc.Label]
    },
    _inputIndex: 0 // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...

  },
  // use this for initialization
  onLoad: function onLoad() {},
  onEnable: function onEnable() {
    this.onResetClicked();
  },
  onInputFinished: function onInputFinished(roomId) {
    this.node.parent.parent.getComponent("StartScene").joinPrivateRoominputcallback(roomId);
    /*
    cc.vv.userMgr.enterRoom(roomId,function(ret){
        if(ret.errcode == 0){
            this.node.active = false;
        }
        else{
            var content = "房间["+ roomId +"]不存在，请重新输入!";
            if(ret.errcode == 4){
                content = "房间["+ roomId + "]已满!";
            }
            cc.vv.alert.show("提示",content);
            this.onResetClicked();
        }
    }.bind(this)); 
    */
  },
  onInput: function onInput(num) {
    window.AudioMgr.playSFX("ui_click");

    if (this._inputIndex >= this.nums.length) {
      return;
    }

    this.nums[this._inputIndex].string = num;
    this._inputIndex += 1;

    if (this._inputIndex == this.nums.length) {
      var roomId = this.parseRoomID();
      cc.log("ok:" + roomId);
      this.onInputFinished(roomId);
    }
  },
  onN0Clicked: function onN0Clicked() {
    this.onInput(0);
  },
  onN1Clicked: function onN1Clicked() {
    this.onInput(1);
  },
  onN2Clicked: function onN2Clicked() {
    this.onInput(2);
  },
  onN3Clicked: function onN3Clicked() {
    this.onInput(3);
  },
  onN4Clicked: function onN4Clicked() {
    this.onInput(4);
  },
  onN5Clicked: function onN5Clicked() {
    this.onInput(5);
  },
  onN6Clicked: function onN6Clicked() {
    this.onInput(6);
  },
  onN7Clicked: function onN7Clicked() {
    this.onInput(7);
  },
  onN8Clicked: function onN8Clicked() {
    this.onInput(8);
  },
  onN9Clicked: function onN9Clicked() {
    this.onInput(9);
  },
  onResetClicked: function onResetClicked() {
    window.AudioMgr.playSFX("ui_click");

    for (var i = 0; i < this.nums.length; ++i) {
      this.nums[i].string = "";
    }

    this._inputIndex = 0;
  },
  onDelClicked: function onDelClicked() {
    window.AudioMgr.playSFX("ui_click");

    if (this._inputIndex > 0) {
      this._inputIndex -= 1;
      this.nums[this._inputIndex].string = "";
    }
  },
  onCloseClicked: function onCloseClicked() {
    window.AudioMgr.playSFX("ui_click");
    this.node.active = false;
  },
  parseRoomID: function parseRoomID() {
    //var str = "";
    var strs = [];

    for (var i = 0; i < this.nums.length; ++i) {
      //str += this.nums[i].string;
      strs.push(this.nums[i].string);
    }

    strs.forEach(function (item, index) {
      strs[index] = parseInt(strs[index]);
    });
    return strs; //转成数字数组
  } // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcSm9pbkdhbWVJbnB1dC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm51bXMiLCJ0eXBlIiwiTGFiZWwiLCJfaW5wdXRJbmRleCIsIm9uTG9hZCIsIm9uRW5hYmxlIiwib25SZXNldENsaWNrZWQiLCJvbklucHV0RmluaXNoZWQiLCJyb29tSWQiLCJub2RlIiwicGFyZW50IiwiZ2V0Q29tcG9uZW50Iiwiam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayIsIm9uSW5wdXQiLCJudW0iLCJ3aW5kb3ciLCJBdWRpb01nciIsInBsYXlTRlgiLCJsZW5ndGgiLCJzdHJpbmciLCJwYXJzZVJvb21JRCIsImxvZyIsIm9uTjBDbGlja2VkIiwib25OMUNsaWNrZWQiLCJvbk4yQ2xpY2tlZCIsIm9uTjNDbGlja2VkIiwib25ONENsaWNrZWQiLCJvbk41Q2xpY2tlZCIsIm9uTjZDbGlja2VkIiwib25ON0NsaWNrZWQiLCJvbk44Q2xpY2tlZCIsIm9uTjlDbGlja2VkIiwiaSIsIm9uRGVsQ2xpY2tlZCIsIm9uQ2xvc2VDbGlja2VkIiwiYWN0aXZlIiwic3RycyIsInB1c2giLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUM7QUFDRCxpQkFBUSxFQURQO0FBRURDLE1BQUFBLElBQUksRUFBQyxDQUFDTCxFQUFFLENBQUNNLEtBQUo7QUFGSixLQURHO0FBS1JDLElBQUFBLFdBQVcsRUFBQyxDQUxKLENBTVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWRRLEdBSFA7QUFvQkw7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtC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Q0FBVSxLQUFLRyxXQUFmLEVBQTRCZ0IsTUFBNUIsR0FBcUMsRUFBckM7QUFDSDtBQUNKLEdBMUdJO0FBMkdMZSxFQUFBQSxjQUFjLEVBQUMsMEJBQVU7QUFDckJuQixJQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCLFVBQXhCO0FBQ0EsU0FBS1IsSUFBTCxDQUFVMEIsTUFBVixHQUFtQixLQUFuQjtBQUNILEdBOUdJO0FBZ0hMZixFQUFBQSxXQUFXLEVBQUMsdUJBQVU7QUFDbEI7QUFDQSxRQUFJZ0IsSUFBSSxHQUFFLEVBQVY7O0FBQ0EsU0FBSSxJQUFJSixDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUcsS0FBS2hDLElBQUwsQ0FBVWtCLE1BQTdCLEVBQXFDLEVBQUVjLENBQXZDLEVBQXlDO0FBQ3JDO0FBQ0FJLE1BQUFBLElBQUksQ0FBQ0MsSUFBTCxDQUFVLEtBQUtyQyxJQUFMLENBQVVnQyxDQUFWLEVBQWFiLE1BQXZCO0FBQ0g7O0FBQ0RpQixJQUFBQSxJQUFJLENBQUNFLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFBZTtBQUMzQkosTUFBQUEsSUFBSSxDQUFDSSxLQUFELENBQUosR0FBY0MsUUFBUSxDQUFDTCxJQUFJLENBQUNJLEtBQUQsQ0FBTCxDQUF0QjtBQUNBLEtBRkQ7QUFHQSxXQUFPSixJQUFQLENBVmtCLENBVUw7QUFDaEIsR0EzSEksQ0E2SEw7QUFDQTtBQUVBOztBQWhJSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG51bXM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5MYWJlbF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIF9pbnB1dEluZGV4OjAsXHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uUmVzZXRDbGlja2VkKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbklucHV0RmluaXNoZWQ6ZnVuY3Rpb24ocm9vbUlkKXtcclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJTdGFydFNjZW5lXCIpLmpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2socm9vbUlkKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY2MudnYudXNlck1nci5lbnRlclJvb20ocm9vbUlkLGZ1bmN0aW9uKHJldCl7XHJcbiAgICAgICAgICAgIGlmKHJldC5lcnJjb2RlID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IFwi5oi/6Ze0W1wiKyByb29tSWQgK1wiXeS4jeWtmOWcqO+8jOivt+mHjeaWsOi+k+WFpSFcIjtcclxuICAgICAgICAgICAgICAgIGlmKHJldC5lcnJjb2RlID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIuaIv+mXtFtcIisgcm9vbUlkICsgXCJd5bey5ruhIVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2MudnYuYWxlcnQuc2hvdyhcIuaPkOekulwiLGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2V0Q2xpY2tlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTsgXHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uSW5wdXQ6ZnVuY3Rpb24obnVtKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgaWYodGhpcy5faW5wdXRJbmRleCA+PSB0aGlzLm51bXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm51bXNbdGhpcy5faW5wdXRJbmRleF0uc3RyaW5nID0gbnVtO1xyXG4gICAgICAgIHRoaXMuX2lucHV0SW5kZXggKz0gMTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9pbnB1dEluZGV4ID09IHRoaXMubnVtcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB2YXIgcm9vbUlkID0gdGhpcy5wYXJzZVJvb21JRCgpO1xyXG4gICAgICAgICAgICBjYy5sb2coXCJvazpcIiArIHJvb21JZCk7XHJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEZpbmlzaGVkKHJvb21JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25OMENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoMCk7ICBcclxuICAgIH0sXHJcbiAgICBvbk4xQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub25JbnB1dCgxKTsgIFxyXG4gICAgfSxcclxuICAgIG9uTjJDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDIpO1xyXG4gICAgfSxcclxuICAgIG9uTjNDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDMpO1xyXG4gICAgfSxcclxuICAgIG9uTjRDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDQpO1xyXG4gICAgfSxcclxuICAgIG9uTjVDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDUpO1xyXG4gICAgfSxcclxuICAgIG9uTjZDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDYpO1xyXG4gICAgfSxcclxuICAgIG9uTjdDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDcpO1xyXG4gICAgfSxcclxuICAgIG9uTjhDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDgpO1xyXG4gICAgfSxcclxuICAgIG9uTjlDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDkpO1xyXG4gICAgfSxcclxuICAgIG9uUmVzZXRDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bXMubGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICB0aGlzLm51bXNbaV0uc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5wdXRJbmRleCA9IDA7XHJcbiAgICB9LFxyXG4gICAgb25EZWxDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuX2lucHV0SW5kZXggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5faW5wdXRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm51bXNbdGhpcy5faW5wdXRJbmRleF0uc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcGFyc2VSb29tSUQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL3ZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHZhciBzdHJzID1bXTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1zLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgLy9zdHIgKz0gdGhpcy5udW1zW2ldLnN0cmluZztcclxuICAgICAgICAgICAgc3Rycy5wdXNoKHRoaXMubnVtc1tpXS5zdHJpbmcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0cnMuZm9yRWFjaCgoaXRlbSxpbmRleCkgPT57XHJcblx0ICAgICAgICBzdHJzW2luZGV4XSA9IHBhcnNlSW50KHN0cnNbaW5kZXhdKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHN0cnM7IC8v6L2s5oiQ5pWw5a2X5pWw57uEXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiJdfQ==