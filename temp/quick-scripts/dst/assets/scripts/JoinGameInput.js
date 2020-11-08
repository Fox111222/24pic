
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
    for (var i = 0; i < this.nums.length; ++i) {
      this.nums[i].string = "";
    }

    this._inputIndex = 0;
  },
  onDelClicked: function onDelClicked() {
    if (this._inputIndex > 0) {
      this._inputIndex -= 1;
      this.nums[this._inputIndex].string = "";
    }
  },
  onCloseClicked: function onCloseClicked() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcSm9pbkdhbWVJbnB1dC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm51bXMiLCJ0eXBlIiwiTGFiZWwiLCJfaW5wdXRJbmRleCIsIm9uTG9hZCIsIm9uRW5hYmxlIiwib25SZXNldENsaWNrZWQiLCJvbklucHV0RmluaXNoZWQiLCJyb29tSWQiLCJub2RlIiwicGFyZW50IiwiZ2V0Q29tcG9uZW50Iiwiam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayIsIm9uSW5wdXQiLCJudW0iLCJ3aW5kb3ciLCJBdWRpb01nciIsInBsYXlTRlgiLCJsZW5ndGgiLCJzdHJpbmciLCJwYXJzZVJvb21JRCIsImxvZyIsIm9uTjBDbGlja2VkIiwib25OMUNsaWNrZWQiLCJvbk4yQ2xpY2tlZCIsIm9uTjNDbGlja2VkIiwib25ONENsaWNrZWQiLCJvbk41Q2xpY2tlZCIsIm9uTjZDbGlja2VkIiwib25ON0NsaWNrZWQiLCJvbk44Q2xpY2tlZCIsIm9uTjlDbGlja2VkIiwiaSIsIm9uRGVsQ2xpY2tlZCIsIm9uQ2xvc2VDbGlja2VkIiwiYWN0aXZlIiwic3RycyIsInB1c2giLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUM7QUFDRCxpQkFBUSxFQURQO0FBRURDLE1BQUFBLElBQUksRUFBQyxDQUFDTCxFQUFFLENBQUNNLEtBQUo7QUFGSixLQURHO0FBS1JDLElBQUFBLFdBQVcsRUFBQyxDQUxKLENBTVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWRRLEdBSFA7QUFvQkw7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtC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QVUwQixNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsR0EzR0k7QUE2R0xmLEVBQUFBLFdBQVcsRUFBQyx1QkFBVTtBQUNsQjtBQUNBLFFBQUlnQixJQUFJLEdBQUUsRUFBVjs7QUFDQSxTQUFJLElBQUlKLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBRyxLQUFLaEMsSUFBTCxDQUFVa0IsTUFBN0IsRUFBcUMsRUFBRWMsQ0FBdkMsRUFBeUM7QUFDckM7QUFDQUksTUFBQUEsSUFBSSxDQUFDQyxJQUFMLENBQVUsS0FBS3JDLElBQUwsQ0FBVWdDLENBQVYsRUFBYWIsTUFBdkI7QUFDSDs7QUFDRGlCLElBQUFBLElBQUksQ0FBQ0UsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFlO0FBQzNCSixNQUFBQSxJQUFJLENBQUNJLEtBQUQsQ0FBSixHQUFjQyxRQUFRLENBQUNMLElBQUksQ0FBQ0ksS0FBRCxDQUFMLENBQXRCO0FBQ0EsS0FGRDtBQUdBLFdBQU9KLElBQVAsQ0FWa0IsQ0FVTDtBQUNoQixHQXhISSxDQTBITDtBQUNBO0FBRUE7O0FBN0hLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbnVtczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXHJcbiAgICAgICAgICAgIHR5cGU6W2NjLkxhYmVsXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2lucHV0SW5kZXg6MCxcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub25SZXNldENsaWNrZWQoKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uSW5wdXRGaW5pc2hlZDpmdW5jdGlvbihyb29tSWQpe1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChcIlN0YXJ0U2NlbmVcIikuam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayhyb29tSWQpXHJcbiAgICAgICAgLypcclxuICAgICAgICBjYy52di51c2VyTWdyLmVudGVyUm9vbShyb29tSWQsZnVuY3Rpb24ocmV0KXtcclxuICAgICAgICAgICAgaWYocmV0LmVycmNvZGUgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gXCLmiL/pl7RbXCIrIHJvb21JZCArXCJd5LiN5a2Y5Zyo77yM6K+36YeN5paw6L6T5YWlIVwiO1xyXG4gICAgICAgICAgICAgICAgaWYocmV0LmVycmNvZGUgPT0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IFwi5oi/6Ze0W1wiKyByb29tSWQgKyBcIl3lt7Lmu6EhXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy52di5hbGVydC5zaG93KFwi5o+Q56S6XCIsY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVzZXRDbGlja2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpOyBcclxuICAgICAgICAqL1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25JbnB1dDpmdW5jdGlvbihudW0pe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZih0aGlzLl9pbnB1dEluZGV4ID49IHRoaXMubnVtcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubnVtc1t0aGlzLl9pbnB1dEluZGV4XS5zdHJpbmcgPSBudW07XHJcbiAgICAgICAgdGhpcy5faW5wdXRJbmRleCArPSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2lucHV0SW5kZXggPT0gdGhpcy5udW1zLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHZhciByb29tSWQgPSB0aGlzLnBhcnNlUm9vbUlEKCk7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIm9rOlwiICsgcm9vbUlkKTtcclxuICAgICAgICAgICAgdGhpcy5vbklucHV0RmluaXNoZWQocm9vbUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbk4wQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub25JbnB1dCgwKTsgIFxyXG4gICAgfSxcclxuICAgIG9uTjFDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDEpOyAgXHJcbiAgICB9LFxyXG4gICAgb25OMkNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoMik7XHJcbiAgICB9LFxyXG4gICAgb25OM0NsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoMyk7XHJcbiAgICB9LFxyXG4gICAgb25ONENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNCk7XHJcbiAgICB9LFxyXG4gICAgb25ONUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNSk7XHJcbiAgICB9LFxyXG4gICAgb25ONkNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNik7XHJcbiAgICB9LFxyXG4gICAgb25ON0NsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNyk7XHJcbiAgICB9LFxyXG4gICAgb25OOENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoOCk7XHJcbiAgICB9LFxyXG4gICAgb25OOUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoOSk7XHJcbiAgICB9LFxyXG4gICAgb25SZXNldENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1zLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgdGhpcy5udW1zW2ldLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lucHV0SW5kZXggPSAwO1xyXG4gICAgfSxcclxuICAgIG9uRGVsQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuX2lucHV0SW5kZXggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5faW5wdXRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm51bXNbdGhpcy5faW5wdXRJbmRleF0uc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBwYXJzZVJvb21JRDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHN0cnMgPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bXMubGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICAvL3N0ciArPSB0aGlzLm51bXNbaV0uc3RyaW5nO1xyXG4gICAgICAgICAgICBzdHJzLnB1c2godGhpcy5udW1zW2ldLnN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgc3Rycy5mb3JFYWNoKChpdGVtLGluZGV4KSA9PntcclxuXHQgICAgICAgIHN0cnNbaW5kZXhdID0gcGFyc2VJbnQoc3Ryc1tpbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gc3RyczsgLy/ovazmiJDmlbDlrZfmlbDnu4RcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIl19