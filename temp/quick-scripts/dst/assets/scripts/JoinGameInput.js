
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcSm9pbkdhbWVJbnB1dC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm51bXMiLCJ0eXBlIiwiTGFiZWwiLCJfaW5wdXRJbmRleCIsIm9uTG9hZCIsIm9uRW5hYmxlIiwib25SZXNldENsaWNrZWQiLCJvbklucHV0RmluaXNoZWQiLCJyb29tSWQiLCJub2RlIiwicGFyZW50IiwiZ2V0Q29tcG9uZW50Iiwiam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayIsIm9uSW5wdXQiLCJudW0iLCJsZW5ndGgiLCJzdHJpbmciLCJwYXJzZVJvb21JRCIsImxvZyIsIm9uTjBDbGlja2VkIiwib25OMUNsaWNrZWQiLCJvbk4yQ2xpY2tlZCIsIm9uTjNDbGlja2VkIiwib25ONENsaWNrZWQiLCJvbk41Q2xpY2tlZCIsIm9uTjZDbGlja2VkIiwib25ON0NsaWNrZWQiLCJvbk44Q2xpY2tlZCIsIm9uTjlDbGlja2VkIiwiaSIsIm9uRGVsQ2xpY2tlZCIsIm9uQ2xvc2VDbGlja2VkIiwiYWN0aXZlIiwic3RycyIsInB1c2giLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUM7QUFDRCxpQkFBUSxFQURQO0FBRURDLE1BQUFBLElBQUksRUFBQyxDQUFDTCxFQUFFLENBQUNNLEtBQUo7QUFGSixLQURHO0FBS1JDLElBQUFBLFdBQVcsRUFBQyxDQUxKLENBTVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWRRLEdBSFA7QUFvQkw7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZLENBRW5CLENBdkJJO0FBeUJMQyxFQUFBQSxR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QUNBLFNBQUksSUFBSUosQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHLEtBQUs3QixJQUFMLENBQVVlLE1BQTdCLEVBQXFDLEVBQUVjLENBQXZDLEVBQXlDO0FBQ3JDO0FBQ0FJLE1BQUFBLElBQUksQ0FBQ0MsSUFBTCxDQUFVLEtBQUtsQyxJQUFMLENBQVU2QixDQUFWLEVBQWFiLE1BQXZCO0FBQ0g7O0FBQ0RpQixJQUFBQSxJQUFJLENBQUNFLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFBZTtBQUMzQkosTUFBQUEsSUFBSSxDQUFDSSxLQUFELENBQUosR0FBY0MsUUFBUSxDQUFDTCxJQUFJLENBQUNJLEtBQUQsQ0FBTCxDQUF0QjtBQUNBLEtBRkQ7QUFHQSxXQUFPSixJQUFQLENBVmtCLENBVUw7QUFDaEIsR0F2SEksQ0F5SEw7QUFDQTtBQUVBOztBQTVISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG51bXM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5MYWJlbF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIF9pbnB1dEluZGV4OjAsXHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uUmVzZXRDbGlja2VkKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbklucHV0RmluaXNoZWQ6ZnVuY3Rpb24ocm9vbUlkKXtcclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJTdGFydFNjZW5lXCIpLmpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2socm9vbUlkKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY2MudnYudXNlck1nci5lbnRlclJvb20ocm9vbUlkLGZ1bmN0aW9uKHJldCl7XHJcbiAgICAgICAgICAgIGlmKHJldC5lcnJjb2RlID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IFwi5oi/6Ze0W1wiKyByb29tSWQgK1wiXeS4jeWtmOWcqO+8jOivt+mHjeaWsOi+k+WFpSFcIjtcclxuICAgICAgICAgICAgICAgIGlmKHJldC5lcnJjb2RlID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIuaIv+mXtFtcIisgcm9vbUlkICsgXCJd5bey5ruhIVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2MudnYuYWxlcnQuc2hvdyhcIuaPkOekulwiLGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2V0Q2xpY2tlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTsgXHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uSW5wdXQ6ZnVuY3Rpb24obnVtKXtcclxuICAgICAgICBpZih0aGlzLl9pbnB1dEluZGV4ID49IHRoaXMubnVtcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubnVtc1t0aGlzLl9pbnB1dEluZGV4XS5zdHJpbmcgPSBudW07XHJcbiAgICAgICAgdGhpcy5faW5wdXRJbmRleCArPSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2lucHV0SW5kZXggPT0gdGhpcy5udW1zLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHZhciByb29tSWQgPSB0aGlzLnBhcnNlUm9vbUlEKCk7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIm9rOlwiICsgcm9vbUlkKTtcclxuICAgICAgICAgICAgdGhpcy5vbklucHV0RmluaXNoZWQocm9vbUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbk4wQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMub25JbnB1dCgwKTsgIFxyXG4gICAgfSxcclxuICAgIG9uTjFDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5vbklucHV0KDEpOyAgXHJcbiAgICB9LFxyXG4gICAgb25OMkNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoMik7XHJcbiAgICB9LFxyXG4gICAgb25OM0NsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoMyk7XHJcbiAgICB9LFxyXG4gICAgb25ONENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNCk7XHJcbiAgICB9LFxyXG4gICAgb25ONUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNSk7XHJcbiAgICB9LFxyXG4gICAgb25ONkNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNik7XHJcbiAgICB9LFxyXG4gICAgb25ON0NsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoNyk7XHJcbiAgICB9LFxyXG4gICAgb25OOENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoOCk7XHJcbiAgICB9LFxyXG4gICAgb25OOUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm9uSW5wdXQoOSk7XHJcbiAgICB9LFxyXG4gICAgb25SZXNldENsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1zLmxlbmd0aDsgKytpKXtcclxuICAgICAgICAgICAgdGhpcy5udW1zW2ldLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lucHV0SW5kZXggPSAwO1xyXG4gICAgfSxcclxuICAgIG9uRGVsQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuX2lucHV0SW5kZXggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5faW5wdXRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm51bXNbdGhpcy5faW5wdXRJbmRleF0uc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZUNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBwYXJzZVJvb21JRDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHN0cnMgPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm51bXMubGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICAvL3N0ciArPSB0aGlzLm51bXNbaV0uc3RyaW5nO1xyXG4gICAgICAgICAgICBzdHJzLnB1c2godGhpcy5udW1zW2ldLnN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgc3Rycy5mb3JFYWNoKChpdGVtLGluZGV4KSA9PntcclxuXHQgICAgICAgIHN0cnNbaW5kZXhdID0gcGFyc2VJbnQoc3Ryc1tpbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gc3RyczsgLy/ovazmiJDmlbDlrZfmlbDnu4RcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIl19