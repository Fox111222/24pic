
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Chat.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cb67dBvtjlDUJKZmD7IrfY8', 'Chat');
// scripts/Chat.js

"use strict";

var KBEngine = require("kbengine");

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    _chatRoot: null,
    _tabQuick: null,
    _tabEmoji: null,
    _iptChat: null,
    _quickChatInfo: null,
    _btnChat: null
  },
  // use this for initialization
  onLoad: function onLoad() {
    if (window.AudioMgr == null) {
      return;
    } //cc.vv.chat = this;
    //this._btnChat = this.node.getChildByName("btn_chat");
    //this._btnChat.active = cc.vv.replayMgr.isReplay() == false;


    this._chatRoot = this.node.getChildByName("chat");
    this._chatRoot.active = false;
    this._tabQuick = this._chatRoot.getChildByName("quickchatlist");
    this._tabEmoji = this._chatRoot.getChildByName("emojis");
    this._iptChat = this._chatRoot.getChildByName("iptChat").getComponent(cc.EditBox);
    this._quickChatInfo = {};
    this._quickChatInfo["item0"] = {
      index: 0,
      content: "快点啊，都等到我花儿都谢谢了！",
      sound: "fix_msg_1.mp3"
    };
    this._quickChatInfo["item1"] = {
      index: 1,
      content: "怎么又断线了，网络怎么这么差啊！",
      sound: "fix_msg_2.mp3"
    };
    this._quickChatInfo["item2"] = {
      index: 2,
      content: "不要走，决战到天亮！",
      sound: "fix_msg_3.mp3"
    };
    this._quickChatInfo["item3"] = {
      index: 3,
      content: "你的牌打得也太好了！",
      sound: "fix_msg_4.mp3"
    };
    this._quickChatInfo["item4"] = {
      index: 4,
      content: "你是妹妹还是哥哥啊？",
      sound: "fix_msg_5.mp3"
    };
    this._quickChatInfo["item5"] = {
      index: 5,
      content: "和你合作真是太愉快了！",
      sound: "fix_msg_6.mp3"
    };
    this._quickChatInfo["item6"] = {
      index: 6,
      content: "大家好，很高兴见到各位！",
      sound: "fix_msg_7.mp3"
    };
    this._quickChatInfo["item7"] = {
      index: 7,
      content: "各位，真是不好意思，我得离开一会儿。",
      sound: "fix_msg_8.mp3"
    };
    this._quickChatInfo["item8"] = {
      index: 8,
      content: "不要吵了，专心玩游戏吧！",
      sound: "fix_msg_9.mp3"
    };
  },
  getQuickChatInfo: function getQuickChatInfo(index) {
    var key = "item" + index;
    return this._quickChatInfo[key];
  },
  onBtnChatClicked: function onBtnChatClicked() {
    window.AudioMgr.playSFX("ui_click");
    this._chatRoot.active = true;
  },
  onBgClicked: function onBgClicked() {
    this._chatRoot.active = false;
  },
  onTabClicked: function onTabClicked(event) {
    window.AudioMgr.playSFX("ui_click");

    if (event.target.name == "tabQuick") {
      this._tabQuick.active = true;
      this._tabEmoji.active = false;
    } else if (event.target.name == "tabEmoji") {
      this._tabQuick.active = false;
      this._tabEmoji.active = true;
    }
  },
  onQuickChatItemClicked: function onQuickChatItemClicked(event) {
    window.AudioMgr.playSFX("ui_click");
    this._chatRoot.active = false;
    var info = this._quickChatInfo[event.target.name]; //cc.vv.net.send("quick_chat",info.index); 

    var player = KBEngine.app.player();

    if (player) {
      player.quick_chat(info.index);
    }
  },
  onEmojiItemClicked: function onEmojiItemClicked(event) {
    window.AudioMgr.playSFX("ui_click");
    cc.log(event.target.name);
    this._chatRoot.active = false; //cc.vv.net.send("emoji",event.target.name);

    var player = KBEngine.app.player();

    if (player) {
      player.emoji(event.target.name);
    }
  },
  onBtnSendChatClicked: function onBtnSendChatClicked() {
    window.AudioMgr.playSFX("ui_click");
    this._chatRoot.active = false;

    if (this._iptChat.string == "") {
      return;
    } //cc.vv.net.send("chat",this._iptChat.string);


    var player = KBEngine.app.player();

    if (player) {
      player.iptChat(this._iptChat.string);
    }

    this._iptChat.string = "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2hhdC5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9jaGF0Um9vdCIsIl90YWJRdWljayIsIl90YWJFbW9qaSIsIl9pcHRDaGF0IiwiX3F1aWNrQ2hhdEluZm8iLCJfYnRuQ2hhdCIsIm9uTG9hZCIsIndpbmRvdyIsIkF1ZGlvTWdyIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50IiwiRWRpdEJveCIsImluZGV4IiwiY29udGVudCIsInNvdW5kIiwiZ2V0UXVpY2tDaGF0SW5mbyIsImtleSIsIm9uQnRuQ2hhdENsaWNrZWQiLCJwbGF5U0ZYIiwib25CZ0NsaWNrZWQiLCJvblRhYkNsaWNrZWQiLCJldmVudCIsInRhcmdldCIsIm5hbWUiLCJvblF1aWNrQ2hhdEl0ZW1DbGlja2VkIiwiaW5mbyIsInBsYXllciIsImFwcCIsInF1aWNrX2NoYXQiLCJvbkVtb2ppSXRlbUNsaWNrZWQiLCJsb2ciLCJlbW9qaSIsIm9uQnRuU2VuZENoYXRDbGlja2VkIiwic3RyaW5nIiwiaXB0Q2hhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsU0FBUyxFQUFDLElBVkY7QUFXUkMsSUFBQUEsU0FBUyxFQUFDLElBWEY7QUFZUkMsSUFBQUEsU0FBUyxFQUFDLElBWkY7QUFhUkMsSUFBQUEsUUFBUSxFQUFDLElBYkQ7QUFlUkMsSUFBQUEsY0FBYyxFQUFDLElBZlA7QUFnQlJDLElBQUFBLFFBQVEs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S0FBdkI7QUFDSDtBQUNKLEdBekZJO0FBMkZMaUIsRUFBQUEsa0JBQWtCLEVBQUMsNEJBQVNSLEtBQVQsRUFBZTtBQUM5QmhCLElBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQlksT0FBaEIsQ0FBd0IsVUFBeEI7QUFDQXhCLElBQUFBLEVBQUUsQ0FBQ29DLEdBQUgsQ0FBT1QsS0FBSyxDQUFDQyxNQUFOLENBQWFDLElBQXBCO0FBQ0EsU0FBS3pCLFNBQUwsQ0FBZVcsTUFBZixHQUF3QixLQUF4QixDQUg4QixDQUk5Qjs7QUFDQSxRQUFJaUIsTUFBTSxHQUFHbEMsUUFBUSxDQUFDbUMsR0FBVCxDQUFhRCxNQUFiLEVBQWI7O0FBQ0EsUUFBR0EsTUFBSCxFQUFVO0FBQ05BLE1BQUFBLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhVixLQUFLLENBQUNDLE1BQU4sQ0FBYUMsSUFBMUI7QUFDSDtBQUNKLEdBcEdJO0FBc0dMUyxFQUFBQSxvQkFBb0IsRUFBQyxnQ0FBVTtBQUMzQjNCLElBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQlksT0FBaEIsQ0FBd0IsVUFBeEI7QUFDQSxTQUFLcEIsU0FBTCxDQUFlVyxNQUFmLEdBQXdCLEtBQXhCOztBQUNBLFFBQUcsS0FBS1IsUUFBTCxDQUFjZ0MsTUFBZCxJQUF3QixFQUEzQixFQUE4QjtBQUMxQjtBQUNILEtBTDBCLENBTTNCOzs7QUFDQSxRQUFJUCxNQUFNLEdBQUdsQyxRQUFRLENBQUNtQyxHQUFULENBQWFELE1BQWIsRUFBYjs7QUFDQSxRQUFHQSxNQUFILEVBQVU7QUFDTkEsTUFBQUEsTUFBTSxDQUFDUSxPQUFQLENBQWUsS0FBS2pDLFFBQUwsQ0FBY2dDLE1BQTdCO0FBQ0g7O0FBQ0QsU0FBS2hDLFFBQUwsQ0FBY2dDLE1BQWQsR0FBdUIsRUFBdkI7QUFDSCxHQWxISSxDQW9ITDtBQUNBO0FBRUE7O0FBdkhLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBLQkVuZ2luZSA9IHJlcXVpcmUoXCJrYmVuZ2luZVwiKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIF9jaGF0Um9vdDpudWxsLFxyXG4gICAgICAgIF90YWJRdWljazpudWxsLFxyXG4gICAgICAgIF90YWJFbW9qaTpudWxsLFxyXG4gICAgICAgIF9pcHRDaGF0Om51bGwsXHJcbiAgICAgICAgXHJcbiAgICAgICAgX3F1aWNrQ2hhdEluZm86bnVsbCxcclxuICAgICAgICBfYnRuQ2hhdDpudWxsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKHdpbmRvdy5BdWRpb01ncj09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2MudnYuY2hhdCA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLl9idG5DaGF0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2NoYXRcIik7XHJcbiAgICAgICAgLy90aGlzLl9idG5DaGF0LmFjdGl2ZSA9IGNjLnZ2LnJlcGxheU1nci5pc1JlcGxheSgpID09IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NoYXRSb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2hhdFwiKTtcclxuICAgICAgICB0aGlzLl9jaGF0Um9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90YWJRdWljayA9IHRoaXMuX2NoYXRSb290LmdldENoaWxkQnlOYW1lKFwicXVpY2tjaGF0bGlzdFwiKTtcclxuICAgICAgICB0aGlzLl90YWJFbW9qaSA9IHRoaXMuX2NoYXRSb290LmdldENoaWxkQnlOYW1lKFwiZW1vamlzXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2lwdENoYXQgPSB0aGlzLl9jaGF0Um9vdC5nZXRDaGlsZEJ5TmFtZShcImlwdENoYXRcIikuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3F1aWNrQ2hhdEluZm8gPSB7fTtcclxuICAgICAgICB0aGlzLl9xdWlja0NoYXRJbmZvW1wiaXRlbTBcIl0gPSB7aW5kZXg6MCxjb250ZW50Olwi5b+r54K55ZWK77yM6YO9562J5Yiw5oiR6Iqx5YS/6YO96LCi6LCi5LqG77yBXCIsc291bmQ6XCJmaXhfbXNnXzEubXAzXCJ9O1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ2hhdEluZm9bXCJpdGVtMVwiXSA9IHtpbmRleDoxLGNvbnRlbnQ6XCLmgI7kuYjlj4jmlq3nur/kuobvvIznvZHnu5zmgI7kuYjov5nkuYjlt67llYrvvIFcIixzb3VuZDpcImZpeF9tc2dfMi5tcDNcIn07XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDaGF0SW5mb1tcIml0ZW0yXCJdID0ge2luZGV4OjIsY29udGVudDpcIuS4jeimgei1sO+8jOWGs+aImOWIsOWkqeS6ru+8gVwiLHNvdW5kOlwiZml4X21zZ18zLm1wM1wifTtcclxuICAgICAgICB0aGlzLl9xdWlja0NoYXRJbmZvW1wiaXRlbTNcIl0gPSB7aW5kZXg6Myxjb250ZW50Olwi5L2g55qE54mM5omT5b6X5Lmf5aSq5aW95LqG77yBXCIsc291bmQ6XCJmaXhfbXNnXzQubXAzXCJ9O1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ2hhdEluZm9bXCJpdGVtNFwiXSA9IHtpbmRleDo0LGNvbnRlbnQ6XCLkvaDmmK/lprnlprnov5jmmK/lk6Xlk6XllYrvvJ9cIixzb3VuZDpcImZpeF9tc2dfNS5tcDNcIn07XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDaGF0SW5mb1tcIml0ZW01XCJdID0ge2luZGV4OjUsY29udGVudDpcIuWSjOS9oOWQiOS9nOecn+aYr+WkquaEieW/q+S6hu+8gVwiLHNvdW5kOlwiZml4X21zZ182Lm1wM1wifTtcclxuICAgICAgICB0aGlzLl9xdWlja0NoYXRJbmZvW1wiaXRlbTZcIl0gPSB7aW5kZXg6Nixjb250ZW50Olwi5aSn5a625aW977yM5b6I6auY5YW06KeB5Yiw5ZCE5L2N77yBXCIsc291bmQ6XCJmaXhfbXNnXzcubXAzXCJ9O1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ2hhdEluZm9bXCJpdGVtN1wiXSA9IHtpbmRleDo3LGNvbnRlbnQ6XCLlkITkvY3vvIznnJ/mmK/kuI3lpb3mhI/mgJ3vvIzmiJHlvpfnprvlvIDkuIDkvJrlhL/jgIJcIixzb3VuZDpcImZpeF9tc2dfOC5tcDNcIn07XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDaGF0SW5mb1tcIml0ZW04XCJdID0ge2luZGV4OjgsY29udGVudDpcIuS4jeimgeWQteS6hu+8jOS4k+W/g+eOqea4uOaIj+WQp++8gVwiLHNvdW5kOlwiZml4X21zZ185Lm1wM1wifTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGdldFF1aWNrQ2hhdEluZm86ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIHZhciBrZXkgPSBcIml0ZW1cIiArIGluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWlja0NoYXRJbmZvW2tleV07ICAgXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkJ0bkNoYXRDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuX2NoYXRSb290LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvbkJnQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX2NoYXRSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25UYWJDbGlja2VkOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0Lm5hbWUgPT0gXCJ0YWJRdWlja1wiKXtcclxuICAgICAgICAgICAgdGhpcy5fdGFiUXVpY2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdGFiRW1vamkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZXZlbnQudGFyZ2V0Lm5hbWUgPT0gXCJ0YWJFbW9qaVwiKXtcclxuICAgICAgICAgICAgdGhpcy5fdGFiUXVpY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhYkVtb2ppLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25RdWlja0NoYXRJdGVtQ2xpY2tlZDpmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuX2NoYXRSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpbmZvID0gdGhpcy5fcXVpY2tDaGF0SW5mb1tldmVudC50YXJnZXQubmFtZV07XHJcbiAgICAgICAgLy9jYy52di5uZXQuc2VuZChcInF1aWNrX2NoYXRcIixpbmZvLmluZGV4KTsgXHJcbiAgICAgICAgdmFyIHBsYXllciA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICBwbGF5ZXIucXVpY2tfY2hhdChpbmZvLmluZGV4KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uRW1vamlJdGVtQ2xpY2tlZDpmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGNjLmxvZyhldmVudC50YXJnZXQubmFtZSk7XHJcbiAgICAgICAgdGhpcy5fY2hhdFJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy9jYy52di5uZXQuc2VuZChcImVtb2ppXCIsZXZlbnQudGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgcGxheWVyLmVtb2ppKGV2ZW50LnRhcmdldC5uYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uQnRuU2VuZENoYXRDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuX2NoYXRSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuX2lwdENoYXQuc3RyaW5nID09IFwiXCIpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MudnYubmV0LnNlbmQoXCJjaGF0XCIsdGhpcy5faXB0Q2hhdC5zdHJpbmcpO1xyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgcGxheWVyLmlwdENoYXQodGhpcy5faXB0Q2hhdC5zdHJpbmcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lwdENoYXQuc3RyaW5nID0gXCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiJdfQ==