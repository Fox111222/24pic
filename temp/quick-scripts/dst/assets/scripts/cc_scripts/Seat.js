
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cc_scripts/Seat.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15749yRxvhHLbW3HoC/QI4q', 'Seat');
// scripts/cc_scripts/Seat.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    _sprIcon: null,
    _ready: null,
    _lblName: null,
    _lblScore: null,
    _scoreBg: null,
    _voicemsg: null,
    _chatBubble: null,
    //card:null,
    _emoji: null,
    _lastChatTime: -1,
    _userName: "",
    _score: 0,
    _isReady: false,
    _userId: null,
    _holds: [],
    _chatstr: "" //avatarUrl:"",

  },
  // use this for initialization
  onLoad: function onLoad() {
    //    this._sprIcon = this.node.getChildByName("icon").getComponent("ImageLoader");
    this._lblName = this.node.getChildByName("name").getComponent(cc.Label);
    this._lblScore = this.node.getChildByName("score").getComponent(cc.Label);
    this._voicemsg = this.node.getChildByName("voicemsg");
    this.icon = this.node.getChildByName("icon").getComponent(cc.Sprite);
    this.card = this.node.getChildByName("card");
    this.card.active = false;
    this.avatarUrl = "";

    if (this._voicemsg) {
      this._voicemsg.active = false;
    }

    if (this._sprIcon && this._sprIcon.getComponent(cc.Button)) {} //cc.vv.utils.addClickEvent(this._sprIcon,this.node,"Seat","onIconClicked");    
    //this._offline = this.node.getChildByName("offline");


    this._ready = this.node.getChildByName("ready");
    this._isReady = false; //this._zhuang = this.node.getChildByName("zhuang");

    this._scoreBg = this.node.getChildByName("Z_money_frame"); //this._nddayingjia = this.node.getChildByName("dayingjia");

    this._chatBubble = this.node.getChildByName("ChatBubble"); //this._chatBubble.setLocalZOrder(9999)
    //this._chatBubble.zIndex=99999

    if (this._chatBubble != null) {
      this._chatBubble.active = false;
    }

    this._emoji = this.node.getChildByName("emoji");

    if (this._emoji != null) {
      this._emoji.active = false;
    }

    this._lblScore.node.active = false;
    this.refresh();
  },
  onIconClicked: function onIconClicked() {},
  refreshcount1: function refreshcount1() {
    this._score = this._holds.length + 2;

    if (this._lblScore != null && this._score > 0) {
      this._lblScore.node.active = true;
      this._lblScore.string = "余" + this._score + "张";
    } else {
      this._lblScore.node.active = false;
    }
  },
  refreshcount2: function refreshcount2() {
    this._score = this._holds.length;

    if (this._lblScore != null && this._score > 0) {
      this._lblScore.node.active = true;
      this._lblScore.string = "余" + this._score + "张";
    } else {
      this._lblScore.node.active = false;
    }
  },
  refresh: function refresh() {
    if (this._lblName != null) {
      this._lblName.string = this._userName;
    }

    if (this._ready) {
      this._ready.active = this._isReady;
    }

    cc.log("this._isReady=", this._isReady); // this._ready.active = true; 

    this.node.active = this._userName != null && this._userName != "";
    cc.log("this._holds.length=", this._holds.length);

    if (this._holds.length > 0) {
      this.card.active = true;
    }

    var self = this;

    if (this.avatarUrl != "" && this.avatarUrl != null) {
      cc.log("this.avatarUrl=", this.avatarUrl);
      cc.loader.load({
        url: this.avatarUrl,
        type: 'jpg'
      }, function (err, tex) {
        self.icon.spriteFrame = new cc.SpriteFrame(tex);
      });
    }
  },
  setInfo: function setInfo(name, score, dayingjia) {
    this._userName = name;
    this._score = score;

    if (this._score == null) {
      this._score = 0;
    }

    this._dayingjia = dayingjia;

    if (this._scoreBg != null) {
      this._scoreBg.active = this._score != null;
    }

    if (this._lblScore != null) {
      this._lblScore.node.active = this._score != null;
    }

    this.refresh();
  },
  setReady: function setReady(isReady) {
    this._isReady = isReady;

    if (this._ready) {
      this._ready.active = this._isReady;
    }
  },
  setID: function setID(id) {
    var idNode = this.node.getChildByName("id");

    if (idNode) {
      var lbl = idNode.getComponent(cc.Label);
      lbl.string = "ID:" + id;
    }

    this._userId = id;

    if (this._sprIcon) {
      this._sprIcon.setUserID(id);
    }
  },
  chat: function chat(content) {
    if (this._chatBubble == null || this._emoji == null) {
      return;
    }

    this._emoji.active = false;
    this._chatBubble.active = true;
    this._chatBubble.getComponent(cc.Label).string = content;
    this._chatBubble.getChildByName("New Label").getComponent(cc.Label).string = content;
    this._lastChatTime = 3;
  },
  emoji: function emoji(_emoji) {
    //emoji = JSON.parse(emoji);
    if (this._emoji == null || this._emoji == null) {
      return;
    }

    console.log(_emoji);
    this._chatBubble.active = false;
    this._emoji.active = true;

    this._emoji.getComponent(cc.Animation).play(_emoji);

    this._lastChatTime = 3;
  },
  voiceMsg: function voiceMsg(show) {
    if (this._voicemsg) {
      this._voicemsg.active = show;
    }
  },
  refreshXuanPaiState: function refreshXuanPaiState() {},
  // called every frame, uncomment this function to activate update callback
  update: function update(dt) {
    if (this._lastChatTime > 0) {
      this._lastChatTime -= dt;

      if (this._lastChatTime < 0) {
        this._chatBubble.active = false;
        this._emoji.active = false;

        this._emoji.getComponent(cc.Animation).stop();
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcU2VhdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9zcHJJY29uIiwiX3JlYWR5IiwiX2xibE5hbWUiLCJfbGJsU2NvcmUiLCJfc2NvcmVCZyIsIl92b2ljZW1zZyIsIl9jaGF0QnViYmxlIiwiX2Vtb2ppIiwiX2xhc3RDaGF0VGltZSIsIl91c2VyTmFtZSIsIl9zY29yZSIsIl9pc1JlYWR5IiwiX3VzZXJJZCIsIl9ob2xkcyIsIl9jaGF0c3RyIiwib25Mb2FkIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJpY29uIiwiU3ByaXRlIiwiY2FyZCIsImFjdGl2ZSIsImF2YXRhclVybCIsIkJ1dHRvbiIsInJlZnJlc2giLCJvbkljb25DbGlja2VkIiwicmVmcmVzaGNvdW50MSIsImxlbmd0aCIsInN0cmluZyIsInJlZnJlc2hjb3VudDIiLCJsb2ciLCJzZWxmIiwibG9hZGVyIiwibG9hZCIsInVybCIsInR5cGUiLCJlcnIiLCJ0ZXgiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwic2V0SW5mbyIsIm5hbWUiLCJzY29yZSIsImRheWluZ2ppYSIsIl9kYXlpbmdqaWEiLCJzZXRSZWFkeSIsImlzUmVhZHkiLCJzZXRJRCIsImlkIiwiaWROb2RlIiwibGJsIiwic2V0VXNlcklEIiwiY2hhdCIsImNvbnRlbnQiLCJlbW9qaSIsImNvbnNvbGUiLCJBbmltYXRpb24iLCJwbGF5Iiwidm9pY2VNc2ciLCJzaG93IiwicmVmcmVzaFh1YW5QYWlTdGF0ZSIsInVwZGF0ZSIsImR0Iiwic3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBQyxJ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QUUsZ0JBQVVDLEVBQVYsRUFBYztBQUVsQixRQUFHLEtBQUt4RCxhQUFMLEdBQXFCLENBQXhCLEVBQTBCO0FBQ3RCLFdBQUtBLGFBQUwsSUFBc0J3RCxFQUF0Qjs7QUFDQSxVQUFHLEtBQUt4RCxhQUFMLEdBQXFCLENBQXhCLEVBQTBCO0FBQ3RCLGFBQUtGLFdBQUwsQ0FBaUJpQixNQUFqQixHQUEwQixLQUExQjtBQUNBLGFBQUtoQixNQUFMLENBQVlnQixNQUFaLEdBQXFCLEtBQXJCOztBQUNBLGFBQUtoQixNQUFMLENBQVlXLFlBQVosQ0FBeUJ0QixFQUFFLENBQUM4RCxTQUE1QixFQUF1Q08sSUFBdkM7QUFDSDtBQUNKO0FBQ0o7QUE3TUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfc3BySWNvbjpudWxsLFxyXG4gICAgICAgIF9yZWFkeTpudWxsLFxyXG4gICAgICAgIF9sYmxOYW1lOm51bGwsXHJcbiAgICAgICAgX2xibFNjb3JlOm51bGwsXHJcbiAgICAgICAgX3Njb3JlQmc6bnVsbCxcclxuICAgICAgICBfdm9pY2Vtc2c6bnVsbCxcclxuICAgICAgICBcclxuICAgICAgICBfY2hhdEJ1YmJsZTpudWxsLFxyXG4gICAgICAgIC8vY2FyZDpudWxsLFxyXG4gICAgICAgIF9lbW9qaTpudWxsLFxyXG4gICAgICAgIF9sYXN0Q2hhdFRpbWU6LTEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgX3VzZXJOYW1lOlwiXCIsXHJcbiAgICAgICAgX3Njb3JlOjAsXHJcbiAgICAgICAgX2lzUmVhZHk6ZmFsc2UsXHJcbiAgICAgICAgX3VzZXJJZDpudWxsLFxyXG4gICAgICAgIF9ob2xkczpbXSxcclxuICAgICAgICBfY2hhdHN0cjpcIlwiLFxyXG4gICAgICAgIC8vYXZhdGFyVXJsOlwiXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICB0aGlzLl9zcHJJY29uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoXCJJbWFnZUxvYWRlclwiKTtcclxuICAgICAgICB0aGlzLl9sYmxOYW1lID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX2xibFNjb3JlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2NvcmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl92b2ljZW1zZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZvaWNlbXNnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmljb249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXJkPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNhcmRcIilcclxuICAgICAgICB0aGlzLmNhcmQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXZhdGFyVXJsPVwiXCJcclxuXHJcbiAgICAgICAgaWYodGhpcy5fdm9pY2Vtc2cpe1xyXG4gICAgICAgICAgICB0aGlzLl92b2ljZW1zZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fc3BySWNvbiAmJiB0aGlzLl9zcHJJY29uLmdldENvbXBvbmVudChjYy5CdXR0b24pKXtcclxuICAgICAgICAgICAgLy9jYy52di51dGlscy5hZGRDbGlja0V2ZW50KHRoaXMuX3Nwckljb24sdGhpcy5ub2RlLFwiU2VhdFwiLFwib25JY29uQ2xpY2tlZFwiKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5fb2ZmbGluZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9mZmxpbmVcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmVhZHkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWFkeVwiKTtcclxuICAgICAgICB0aGlzLl9pc1JlYWR5PWZhbHNlXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLl96aHVhbmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHVhbmdcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NvcmVCZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlpfbW9uZXlfZnJhbWVcIik7XHJcbiAgICAgICAgLy90aGlzLl9uZGRheWluZ2ppYSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRheWluZ2ppYVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jaGF0QnViYmxlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ2hhdEJ1YmJsZVwiKTtcclxuICAgICAgICAvL3RoaXMuX2NoYXRCdWJibGUuc2V0TG9jYWxaT3JkZXIoOTk5OSlcclxuICAgICAgICAvL3RoaXMuX2NoYXRCdWJibGUuekluZGV4PTk5OTk5XHJcbiAgICAgICAgaWYodGhpcy5fY2hhdEJ1YmJsZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZS5hY3RpdmUgPSBmYWxzZTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZW1vamkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJlbW9qaVwiKTtcclxuICAgICAgICBpZih0aGlzLl9lbW9qaSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fZW1vamkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICB0aGlzLl9sYmxTY29yZS5ub2RlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25JY29uQ2xpY2tlZDpmdW5jdGlvbigpe1xyXG4gICAgfSxcclxuICAgcmVmcmVzaGNvdW50MTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX3Njb3JlPXRoaXMuX2hvbGRzLmxlbmd0aCsyXHJcbiAgICAgICAgaWYodGhpcy5fbGJsU2NvcmUgIT0gbnVsbCAmJiB0aGlzLl9zY29yZT4wKXtcclxuICAgICAgICAgICAgdGhpcy5fbGJsU2NvcmUubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLl9sYmxTY29yZS5zdHJpbmcgPSBcIuS9mVwiK3RoaXMuX3Njb3JlK1wi5bygXCI7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2xibFNjb3JlLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfSBcclxuICAgfSxcclxuICAgcmVmcmVzaGNvdW50MjpmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5fc2NvcmU9dGhpcy5faG9sZHMubGVuZ3RoXHJcbiAgICBpZih0aGlzLl9sYmxTY29yZSAhPSBudWxsICYmIHRoaXMuX3Njb3JlPjApe1xyXG4gICAgICAgIHRoaXMuX2xibFNjb3JlLm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLl9sYmxTY29yZS5zdHJpbmcgPSBcIuS9mVwiK3RoaXMuX3Njb3JlK1wi5bygXCI7ICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHRoaXMuX2xibFNjb3JlLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICB9IFxyXG59LFxyXG4gICAgcmVmcmVzaDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuX2xibE5hbWUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xibE5hbWUuc3RyaW5nID0gdGhpcy5fdXNlck5hbWU7ICAgIFxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fcmVhZHkpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZWFkeS5hY3RpdmUgPSB0aGlzLl9pc1JlYWR5OyBcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9nKFwidGhpcy5faXNSZWFkeT1cIix0aGlzLl9pc1JlYWR5KVxyXG4gICAgICAgLy8gdGhpcy5fcmVhZHkuYWN0aXZlID0gdHJ1ZTsgXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRoaXMuX3VzZXJOYW1lICE9IG51bGwgJiYgdGhpcy5fdXNlck5hbWUgIT0gXCJcIjsgXHJcbiAgICAgICAgY2MubG9nKFwidGhpcy5faG9sZHMubGVuZ3RoPVwiLHRoaXMuX2hvbGRzLmxlbmd0aClcclxuICAgICAgICBpZih0aGlzLl9ob2xkcy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZj10aGlzXHJcbiAgICAgICAgaWYodGhpcy5hdmF0YXJVcmwgIT1cIlwiICYmIHRoaXMuYXZhdGFyVXJsICE9bnVsbCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcInRoaXMuYXZhdGFyVXJsPVwiLHRoaXMuYXZhdGFyVXJsKVxyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7dXJsOnRoaXMuYXZhdGFyVXJsLHR5cGU6J2pwZyd9LGZ1bmN0aW9uKGVycix0ZXgpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pY29uLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHNldEluZm8obmFtZSxzY29yZSxkYXlpbmdqaWEpe1xyXG4gICAgICAgIHRoaXMuX3VzZXJOYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIGlmKHRoaXMuX3Njb3JlID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9zY29yZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2RheWluZ2ppYSA9IGRheWluZ2ppYTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9zY29yZUJnICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9zY29yZUJnLmFjdGl2ZSA9IHRoaXMuX3Njb3JlICE9IG51bGw7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLl9sYmxTY29yZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fbGJsU2NvcmUubm9kZS5hY3RpdmUgPSB0aGlzLl9zY29yZSAhPSBudWxsOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7ICAgIFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgXHJcbiAgICBzZXRSZWFkeTpmdW5jdGlvbihpc1JlYWR5KXtcclxuICAgICAgICB0aGlzLl9pc1JlYWR5ID0gaXNSZWFkeTtcclxuICAgICAgICBpZih0aGlzLl9yZWFkeSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWR5LmFjdGl2ZSA9IHRoaXMuX2lzUmVhZHkgOyBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzZXRJRDpmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgdmFyIGlkTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImlkXCIpO1xyXG4gICAgICAgIGlmKGlkTm9kZSl7XHJcbiAgICAgICAgICAgIHZhciBsYmwgPSBpZE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGJsLnN0cmluZyA9IFwiSUQ6XCIgKyBpZDsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdXNlcklkID0gaWQ7XHJcbiAgICAgICAgaWYodGhpcy5fc3BySWNvbil7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwckljb24uc2V0VXNlcklEKGlkKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgXHJcbiAgICBjaGF0OmZ1bmN0aW9uKGNvbnRlbnQpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NoYXRCdWJibGUgPT0gbnVsbCB8fCB0aGlzLl9lbW9qaSA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbW9qaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jaGF0QnViYmxlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZS5nZXRDaGlsZEJ5TmFtZShcIk5ldyBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5fbGFzdENoYXRUaW1lID0gMztcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGVtb2ppOmZ1bmN0aW9uKGVtb2ppKXtcclxuICAgICAgICAvL2Vtb2ppID0gSlNPTi5wYXJzZShlbW9qaSk7XHJcbiAgICAgICAgaWYodGhpcy5fZW1vamkgPT0gbnVsbCB8fCB0aGlzLl9lbW9qaSA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhlbW9qaSk7XHJcbiAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbW9qaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2Vtb2ppLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoZW1vamkpO1xyXG4gICAgICAgIHRoaXMuX2xhc3RDaGF0VGltZSA9IDM7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB2b2ljZU1zZzpmdW5jdGlvbihzaG93KXtcclxuICAgICAgICBpZih0aGlzLl92b2ljZW1zZyl7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZvaWNlbXNnLmFjdGl2ZSA9IHNob3c7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmVmcmVzaFh1YW5QYWlTdGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgXHJcbiAgICB9LFxyXG4gICBcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xhc3RDaGF0VGltZSA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2hhdFRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2xhc3RDaGF0VGltZSA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vtb2ppLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW1vamkuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikuc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG59KTtcclxuIl19