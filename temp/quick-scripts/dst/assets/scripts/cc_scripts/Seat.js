
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
    /*
    var self=this
    var randvalue=Math.floor((Math.random()*3))  //0--3之间整数
    if(this.avatarUrl ==""){
        cc.loader.loadRes("head"+randvalue,cc.SpriteFrame,function(err,spriteFrame) {
            self.icon.spriteFrame= spriteFrame
            });
    }
    */


    this._lblScore.node.active = false;
    this.refresh(); //if(this._sprIcon && this._userId){
    //this._sprIcon.setUserID(this._userId);
    //}
  },
  onIconClicked: function onIconClicked() {
    /*
    var iconSprite = this._sprIcon.node.getComponent(cc.Sprite);
    if(this._userId != null && this._userId > 0){
       var seat = cc.vv.gameNetMgr.getSeatByID(this._userId);
        var sex = 0;
        if(cc.vv.baseInfoMap){
            var info = cc.vv.baseInfoMap[this._userId];
            if(info){
                sex = info.sex;
            }                
        }
        //cc.vv.userinfoShow.show(seat.name,seat.userid,iconSprite,sex,seat.ip);         
    }
    */
  },

  /*
  setcards:function(card01,card02){
      this.card1.active=true
      this.card2.active=true
      var self =this;
      card01=card01+1000;
      var url="Game/card/"+"card_"+card01+"@2x"
      cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
      self.card1.getComponent(cc.Sprite).spriteFrame= spriteFrame
      });
      card02=card02+1000;
      url="Game/card/"+"card_"+card02+"@2x"
      cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
      self.card2.getComponent(cc.Sprite).spriteFrame= spriteFrame
      });
    },
  */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcU2VhdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9zcHJJY29uIiwiX3JlYWR5IiwiX2xibE5hbWUiLCJfbGJsU2NvcmUiLCJfc2NvcmVCZyIsIl92b2ljZW1zZyIsIl9jaGF0QnViYmxlIiwiX2Vtb2ppIiwiX2xhc3RDaGF0VGltZSIsIl91c2VyTmFtZSIsIl9zY29yZSIsIl9pc1JlYWR5IiwiX3VzZXJJZCIsIl9ob2xkcyIsIl9jaGF0c3RyIiwib25Mb2FkIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJpY29uIiwiU3ByaXRlIiwiY2FyZCIsImFjdGl2ZSIsImF2YXRhclVybCIsIkJ1dHRvbiIsInJlZnJlc2giLCJvbkljb25DbGlja2VkIiwicmVmcmVzaGNvdW50MSIsImxlbmd0aCIsInN0cmluZyIsInJlZnJlc2hjb3VudDIiLCJsb2ciLCJzZWxmIiwibG9hZGVyIiwibG9hZCIsInVybCIsInR5cGUiLCJlcnIiLCJ0ZXgiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwic2V0SW5mbyIsIm5hbWUiLCJzY29yZSIsImRheWluZ2ppYSIsIl9kYXlpbmdqaWEiLCJzZXRSZWFkeSIsImlzUmVhZHkiLCJzZXRJRCIsImlkIiwiaWROb2RlIiwibGJsIiwic2V0VXNlcklEIiwiY2hhdCIsImNvbnRlbnQiLCJlbW9qaSIsImNvbnNvbGUiLCJBbmltYXRpb24iLCJwbGF5Iiwidm9pY2VNc2ciLCJzaG93IiwicmVmcmVzaFh1YW5QYWlTdGF0ZSIsInVwZGF0ZSIsImR0Iiwic3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBQyxJQUREO0FBRVJDLElBQUFBLE1BQU0sRUFBQyxJQUZDO0FBR1JDLElBQUFBLFFBQVEsRUFBQyxJQUhEO0FBSVJDLElBQUFBLFNBQVMsRUFBQyxJQUpGO0FBS1JDLElBQUFBLFFBQVEsRUFBQyxJQUxEO0FBTVJDLElBQUFBLFNBQVMsRUFBQyxJQU5GO0FBUVJDLElBQUFBLFdBQVcsRUFBQyxJQVJKO0FBU1I7QUFDQUMsSUFBQUEsTUFBTSxFQUFDLElBVkM7QUFXUkMsSUFBQUEsYUFBYSxFQUFDLENBQUMsQ0FYUDtBQWFSQyxJQUFBQSxTQUFTLEVBQUMsRUFiRjtBQWNSQyxJQUFBQSxNQUFNLEVBQUMsQ0FkQztBQWVSQyxJQUFBQSxRQUFRLEVBQUMsS0FmRDtBQWdCUkMsSUFBQUEsT0FBTyxFQUFDLElBaEJBO0FBaUJSQyxJQUFBQSxNQUFNLEVBQUMsRUFqQkM7QUFrQlJDLElBQUFBLFFBQVEsRUFBQyxFQWxCRCxDQW1CUjs7QUFuQlEsR0FIUDtBQXlCTDtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFFcEI7QUFDSSxTQUFLYixRQUFMLEdBQWdCLEtBQUtjLElBQUwsQ0FBVUMsY0FBVixDQUF5QixNQUF6QixFQUFpQ0MsWUFBakMsQ0FBOEN0QixFQUFFLENBQUN1QixLQUFqRCxDQUFoQjtBQUNBLFNBQUtoQixTQUFMLEdBQWlCLEtBQUthLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixFQUFrQ0MsWUFBbEMsQ0FBK0N0QixFQUFFLENBQUN1QixLQUFsRCxDQUFqQjtBQUNBLFNBQUtkLFNBQUwsR0FBaUIsS0FBS1csSUFBTCxDQUFVQyxjQUFWLENBQXlCLFVBQXpCLENBQWpCO0FBRUEsU0FBS0csSUFBTCxHQUFVLEtBQUtKLElBQUwsQ0FBVUMsY0FBVixDQUF5QixNQUF6QixFQUFpQ0MsWUFBakMsQ0FBOEN0QixFQUFFLENBQUN5QixNQUFqRCxDQUFWO0FBRUEsU0FBS0MsSUFBTCxHQUFVLEtBQUtOLElBQUwsQ0FBVUMsY0FBVixDQUF5QixNQUF6QixDQUFWO0FBQ0EsU0FBS0ssSUFBTCxDQUFVQyxNQUFWLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS0MsU0FBTCxHQUFlLEVBQWY7O0FBRUEsUUFBRyxLQUFLbkIsU0FBUixFQUFrQjtBQUNkLFdBQUtBLFNBQUwsQ0FBZWtCLE1BQWYsR0FBd0IsS0FBeEI7QUFDSDs7QUFFRCxRQUFHLEtBQUt2QixRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY2tCLFlBQWQsQ0FBMkJ0QixFQUFFLENBQUM2QixNQUE5QixDQUFwQixFQUEwRCxDQUV6RCxDQUZELENBQ0k7QUFJSjs7O0FBRUEsU0FBS3hCLE1BQUwsR0FBYyxLQUFLZSxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsT0FBekIsQ0FBZDtBQUNBLFNBQUtOLFFBQUwsR0FBYyxLQUFkLENBekJnQixDQTJCaEI7O0FBRUEsU0FBS1AsUUFBTCxHQUFnQixLQUFLWSxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsZUFBekIsQ0FBaEIsQ0E3QmdCLENBOEJoQjs7QUFFQSxTQUFLWCxXQUFMLEdBQW1CLEtBQUtVLElBQUwsQ0FBVUMsY0FBVixDQUF5QixZQUF6QixDQUFuQixDQWhDZ0IsQ0FpQ2hCO0FBQ0E7O0FBQ0EsUUFBRyxLQUFLWCxXQUFMLElBQW9CLElBQXZCLEVBQTRCO0FBQ3hCLFdBQUtBLFdBQUwsQ0FBaUJpQixNQUFqQixHQUEwQixLQUExQjtBQUNIOztBQUVELFNBQUtoQixNQUFMLEdBQWMsS0FBS1MsSUFBTCxDQUFVQyxjQUFWLENBQXlCLE9BQXpCLENBQWQ7O0FBQ0EsUUFBRyxLQUFLVixNQUFMLElBQWUsSUFBbEIsRUFBdUI7QUFDbkIsV0FBS0EsTUFBTCxDQUFZZ0IsTUFBWixHQUFxQixLQUFyQjtBQUNIO0FBQ0Q7Ozs7Ozs7Ozs7O0FBU0QsU0FBS3BCLFNBQUwsQ0FBZWEsSUFBZixDQUFvQk8sTUFBcEIsR0FBMkIsS0FBM0I7QUFDQyxTQUFLRyxPQUFMLEdBckRnQixDQXVEaEI7QUFDSTtBQUNKO0FBQ0gsR0FwRkk7QUFzRkxDLEVBQUFBLGFBQWEsRUFBQyx5QkFBVTtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7QUFjSCxHQXJHSTs7QUFzR0w7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JEQyxFQUFBQSxhQUFhLEVBQUMseUJBQVU7QUFDbkIsU0FBS2xCLE1BQUwsR0FBWSxLQUFLRyxNQUFMLENBQVlnQixNQUFaLEdBQW1CLENBQS9COztBQUNBLFFBQUcsS0FBSzFCLFNBQUwsSUFBa0IsSUFBbEIsSUFBMEIsS0FBS08sTUFBTCxHQUFZLENBQXpDLEVBQTJDO0FBQ3ZDLFdBQUtQLFNBQUwsQ0FBZWEsSUFBZixDQUFvQk8sTUFBcEIsR0FBMkIsSUFBM0I7QUFDQSxXQUFLcEIsU0FBTCxDQUFlMkIsTUFBZixHQUF3QixNQUFJLEtBQUtwQixNQUFULEdBQWdCLEdBQXhDO0FBQ0gsS0FIRCxNQUlJO0FBQ0EsV0FBS1AsU0FBTCxDQUFlYSxJQUFmLENBQW9CTyxNQUFwQixHQUEyQixLQUEzQjtBQUNIO0FBQ0wsR0FqSUs7QUFrSU5RLEVBQUFBLGFBQWEsRUFBQyx5QkFBVTtBQUN2QixTQUFLckIsTUFBTCxHQUFZLEtBQUtHLE1BQUwsQ0FBWWdCLE1BQXhCOztBQUNBLFFBQUcsS0FBSzFCLFNBQUwsSUFBa0IsSUFBbEIsSUFBMEIsS0FBS08sTUFBTCxHQUFZLENBQXpDLEVBQTJDO0FBQ3ZDLFdBQUtQLFNBQUwsQ0FBZWEsSUFBZixDQUFvQk8sTUFBcEIsR0FBMkIsSUFBM0I7QUFDQSxXQUFLcEIsU0FBTCxDQUFlMkIsTUFBZixHQUF3QixNQUFJLEtBQUtwQixNQUFULEdBQWdCLEdBQXhDO0FBQ0gsS0FIRCxNQUlJO0FBQ0EsV0FBS1AsU0FBTCxDQUFlYSxJQUFmLENBQW9CTyxNQUFwQixHQUEyQixLQUEzQjtBQUNIO0FBQ0osR0EzSVE7QUE0SUxHLEVBQUFBLE9BQU8sRUFBQyxtQkFBVTtBQUNkLFFBQUcsS0FBS3hCLFFBQUwsSUFBaUIsSUFBcEIsRUFBeUI7QUFDckIsV0FBS0EsUUFBTCxDQUFjNEIsTUFBZCxHQUF1QixLQUFLckIsU0FBNUI7QUFDSDs7QUFDRCxRQUFHLEtBQUtSLE1BQVIsRUFBZTtBQUNYLFdBQUtBLE1BQUwsQ0FBWXNCLE1BQVosR0FBcUIsS0FBS1osUUFBMUI7QUFDSDs7QUFDRGYsSUFBQUEsRUFBRSxDQUFDb0MsR0FBSCxDQUFPLGdCQUFQLEVBQXdCLEtBQUtyQixRQUE3QixFQVBjLENBUWY7O0FBQ0MsU0FBS0ssSUFBTCxDQUFVTyxNQUFWLEdBQW1CLEtBQUtkLFNBQUwsSUFBa0IsSUFBbEIsSUFBMEIsS0FBS0EsU0FBTCxJQUFrQixFQUEvRDtBQUNBYixJQUFBQSxFQUFFLENBQUNvQyxHQUFILENBQU8scUJBQVAsRUFBNkIsS0FBS25CLE1BQUwsQ0FBWWdCLE1BQXpDOztBQUNBLFFBQUcsS0FBS2hCLE1BQUwsQ0FBWWdCLE1BQVosR0FBbUIsQ0FBdEIsRUFBd0I7QUFDcEIsV0FBS1AsSUFBTCxDQUFVQyxNQUFWLEdBQWlCLElBQWpCO0FBQ0g7O0FBQ0QsUUFBSVUsSUFBSSxHQUFDLElBQVQ7O0FBQ0EsUUFBRyxLQUFLVCxTQUFMLElBQWlCLEVBQWpCLElBQXVCLEtBQUtBLFNBQUwsSUFBaUIsSUFBM0MsRUFBZ0Q7QUFDNUM1QixNQUFBQSxFQUFFLENBQUNvQyxHQUFILENBQU8saUJBQVAsRUFBeUIsS0FBS1IsU0FBOUI7QUFDQTVCLE1BQUFBLEVBQUUsQ0FBQ3NDLE1BQUgsQ0FBVUMsSUFBVixDQUFlO0FBQUNDLFFBQUFBLEdBQUcsRUFBQyxLQUFLWixTQUFWO0FBQW9CYSxRQUFBQSxJQUFJLEVBQUM7QUFBekIsT0FBZixFQUErQyxVQUFTQyxHQUFULEVBQWFDLEdBQWIsRUFBaUI7QUFDNUROLFFBQUFBLElBQUksQ0FBQ2IsSUFBTCxDQUFVb0IsV0FBVixHQUF3QixJQUFJNUMsRUFBRSxDQUFDNkMsV0FBUCxDQUFtQkYsR0FBbkIsQ0FBeEI7QUFDSCxPQUZEO0FBR0g7QUFDSixHQWpLSTtBQW1LTEcsRUFBQUEsT0FuS0ssbUJBbUtHQyxJQW5LSCxFQW1LUUMsS0FuS1IsRUFtS2NDLFNBbktkLEVBbUt3QjtBQUN6QixTQUFLcEMsU0FBTCxHQUFpQmtDLElBQWpCO0FBQ0EsU0FBS2pDLE1BQUwsR0FBY2tDLEtBQWQ7O0FBQ0EsUUFBRyxLQUFLbEMsTUFBTCxJQUFlLElBQWxCLEVBQXVCO0FBQ25CLFdBQUtBLE1BQUwsR0FBYyxDQUFkO0FBQ0g7O0FBQ0QsU0FBS29DLFVBQUwsR0FBa0JELFNBQWxCOztBQUVBLFFBQUcsS0FBS3pDLFFBQUwsSUFBaUIsSUFBcEIsRUFBeUI7QUFDckIsV0FBS0EsUUFBTCxDQUFjbUIsTUFBZCxHQUF1QixLQUFLYixNQUFMLElBQWUsSUFBdEM7QUFDSDs7QUFFRCxRQUFHLEtBQUtQLFNBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdEIsV0FBS0EsU0FBTCxDQUFlYSxJQUFmLENBQW9CTyxNQUFwQixHQUE2QixLQUFLYixNQUFMLElBQWUsSUFBNUM7QUFDSDs7QUFFRCxTQUFLZ0IsT0FBTDtBQUNILEdBcExJO0FBdUxMcUIsRUFBQUEsUUFBUSxFQUFDLGtCQUFTQyxPQUFULEVBQWlCO0FBQ3RCLFNBQUtyQyxRQUFMLEdBQWdCcUMsT0FBaEI7O0FBQ0EsUUFBRyxLQUFLL0MsTUFBUixFQUFlO0FBQ1gsV0FBS0EsTUFBTCxDQUFZc0IsTUFBWixHQUFxQixLQUFLWixRQUExQjtBQUNIO0FBQ0osR0E1TEk7QUE4TExzQyxFQUFBQSxLQUFLLEVBQUMsZUFBU0MsRUFBVCxFQUFZO0FBQ2QsUUFBSUMsTUFBTSxHQUFHLEtBQUtuQyxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsSUFBekIsQ0FBYjs7QUFDQSxRQUFHa0MsTUFBSCxFQUFVO0FBQ04sVUFBSUMsR0FBRyxHQUFHRCxNQUFNLENBQUNqQyxZQUFQLENBQW9CdEIsRUFBRSxDQUFDdUIsS0FBdkIsQ0FBVjtBQUNBaUMsTUFBQUEsR0FBRyxDQUFDdEIsTUFBSixHQUFhLFFBQVFvQixFQUFyQjtBQUNIOztBQUVELFNBQUt0QyxPQUFMLEdBQWVzQyxFQUFmOztBQUNBLFFBQUcsS0FBS2xELFFBQVIsRUFBaUI7QUFDYixXQUFLQSxRQUFMLENBQWNxRCxTQUFkLENBQXdCSCxFQUF4QjtBQUNIO0FBQ0osR0F6TUk7QUE0TUxJLEVBQUFBLElBQUksRUFBQyxjQUFTQyxPQUFULEVBQWlCO0FBQ2xCLFFBQUcsS0FBS2pELFdBQUwsSUFBb0IsSUFBcEIsSUFBNEIsS0FBS0MsTUFBTCxJQUFlLElBQTlDLEVBQW1EO0FBQy9DO0FBQ0g7O0FBQ0QsU0FBS0EsTUFBTCxDQUFZZ0IsTUFBWixHQUFxQixLQUFyQjtBQUNBLFNBQUtqQixXQUFMLENBQWlCaUIsTUFBakIsR0FBMEIsSUFBMUI7QUFDQSxTQUFLakIsV0FBTCxDQUFpQlksWUFBakIsQ0FBOEJ0QixFQUFFLENBQUN1QixLQUFqQyxFQUF3Q1csTUFBeEMsR0FBaUR5QixPQUFqRDtBQUNBLFNBQUtqRCxXQUFMLENBQWlCVyxjQUFqQixDQUFnQyxXQUFoQyxFQUE2Q0MsWUFBN0MsQ0FBMER0QixFQUFFLENBQUN1QixLQUE3RCxFQUFvRVcsTUFBcEUsR0FBNkV5QixPQUE3RTtBQUNBLFNBQUsvQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0gsR0FyTkk7QUF1TkxnRCxFQUFBQSxLQUFLLEVBQUMsZUFBU0EsTUFBVCxFQUFlO0FBQ2pCO0FBQ0EsUUFBRyxLQUFLakQsTUFBTCxJQUFlLElBQWYsSUFBdUIsS0FBS0EsTUFBTCxJQUFlLElBQXpDLEVBQThDO0FBQzFDO0FBQ0g7O0FBQ0RrRCxJQUFBQSxPQUFPLENBQUN6QixHQUFSLENBQVl3QixNQUFaO0FBQ0EsU0FBS2xELFdBQUwsQ0FBaUJpQixNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUtoQixNQUFMLENBQVlnQixNQUFaLEdBQXFCLElBQXJCOztBQUNBLFNBQUtoQixNQUFMLENBQVlXLFlBQVosQ0FBeUJ0QixFQUFFLENBQUM4RCxTQUE1QixFQUF1Q0MsSUFBdkMsQ0FBNENILE1BQTVDOztBQUNBLFNBQUtoRCxhQUFMLEdBQXFCLENBQXJCO0FBQ0gsR0FqT0k7QUFtT0xvRCxFQUFBQSxRQUFRLEVBQUMsa0JBQVNDLElBQVQsRUFBYztBQUNuQixRQUFHLEtBQUt4RCxTQUFSLEVBQWtCO0FBQ2QsV0FBS0EsU0FBTCxDQUFla0IsTUFBZixHQUF3QnNDLElBQXhCO0FBQ0g7QUFDSixHQXZPSTtBQXlPTEMsRUFBQUEsbUJBQW1CLEVBQUMsK0JBQVUsQ0FFN0IsQ0EzT0k7QUE2T0w7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFFbEIsUUFBRyxLQUFLeEQsYUFBTCxHQUFxQixDQUF4QixFQUEwQjtBQUN0QixXQUFLQSxhQUFMLElBQXNCd0QsRUFBdEI7O0FBQ0EsVUFBRyxLQUFLeEQsYUFBTCxHQUFxQixDQUF4QixFQUEwQjtBQUN0QixhQUFLRixXQUFMLENBQWlCaUIsTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxhQUFLaEIsTUFBTCxDQUFZZ0IsTUFBWixHQUFxQixLQUFyQjs7QUFDQSxhQUFLaEIsTUFBTCxDQUFZVyxZQUFaLENBQXlCdEIsRUFBRSxDQUFDOEQsU0FBNUIsRUFBdUNPLElBQXZDO0FBQ0g7QUFDSjtBQUNKO0FBeFBJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX3Nwckljb246bnVsbCxcclxuICAgICAgICBfcmVhZHk6bnVsbCxcclxuICAgICAgICBfbGJsTmFtZTpudWxsLFxyXG4gICAgICAgIF9sYmxTY29yZTpudWxsLFxyXG4gICAgICAgIF9zY29yZUJnOm51bGwsXHJcbiAgICAgICAgX3ZvaWNlbXNnOm51bGwsXHJcbiAgICAgICAgXHJcbiAgICAgICAgX2NoYXRCdWJibGU6bnVsbCxcclxuICAgICAgICAvL2NhcmQ6bnVsbCxcclxuICAgICAgICBfZW1vamk6bnVsbCxcclxuICAgICAgICBfbGFzdENoYXRUaW1lOi0xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIF91c2VyTmFtZTpcIlwiLFxyXG4gICAgICAgIF9zY29yZTowLFxyXG4gICAgICAgIF9pc1JlYWR5OmZhbHNlLFxyXG4gICAgICAgIF91c2VySWQ6bnVsbCxcclxuICAgICAgICBfaG9sZHM6W10sXHJcbiAgICAgICAgX2NoYXRzdHI6XCJcIixcclxuICAgICAgICAvL2F2YXRhclVybDpcIlwiLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgdGhpcy5fc3BySWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KFwiSW1hZ2VMb2FkZXJcIik7XHJcbiAgICAgICAgdGhpcy5fbGJsTmFtZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLl9sYmxTY29yZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjb3JlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fdm9pY2Vtc2cgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2b2ljZW1zZ1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pY29uPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FyZD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIpXHJcbiAgICAgICAgdGhpcy5jYXJkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmF2YXRhclVybD1cIlwiXHJcblxyXG4gICAgICAgIGlmKHRoaXMuX3ZvaWNlbXNnKXtcclxuICAgICAgICAgICAgdGhpcy5fdm9pY2Vtc2cuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3Nwckljb24gJiYgdGhpcy5fc3BySWNvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSl7XHJcbiAgICAgICAgICAgIC8vY2MudnYudXRpbHMuYWRkQ2xpY2tFdmVudCh0aGlzLl9zcHJJY29uLHRoaXMubm9kZSxcIlNlYXRcIixcIm9uSWNvbkNsaWNrZWRcIik7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuX29mZmxpbmUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvZmZsaW5lXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JlYWR5ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVhZHlcIik7XHJcbiAgICAgICAgdGhpcy5faXNSZWFkeT1mYWxzZVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5femh1YW5nID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiemh1YW5nXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Njb3JlQmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJaX21vbmV5X2ZyYW1lXCIpO1xyXG4gICAgICAgIC8vdGhpcy5fbmRkYXlpbmdqaWEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkYXlpbmdqaWFcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkNoYXRCdWJibGVcIik7XHJcbiAgICAgICAgLy90aGlzLl9jaGF0QnViYmxlLnNldExvY2FsWk9yZGVyKDk5OTkpXHJcbiAgICAgICAgLy90aGlzLl9jaGF0QnViYmxlLnpJbmRleD05OTk5OVxyXG4gICAgICAgIGlmKHRoaXMuX2NoYXRCdWJibGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXRCdWJibGUuYWN0aXZlID0gZmFsc2U7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2Vtb2ppID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZW1vamlcIik7XHJcbiAgICAgICAgaWYodGhpcy5fZW1vamkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vtb2ppLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBzZWxmPXRoaXNcclxuICAgICAgICB2YXIgcmFuZHZhbHVlPU1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkqMykpICAvLzAtLTPkuYvpl7TmlbTmlbBcclxuICAgICAgICBpZih0aGlzLmF2YXRhclVybCA9PVwiXCIpe1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImhlYWRcIityYW5kdmFsdWUsY2MuU3ByaXRlRnJhbWUsZnVuY3Rpb24oZXJyLHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmljb24uc3ByaXRlRnJhbWU9IHNwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgICAgIHRoaXMuX2xibFNjb3JlLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9pZih0aGlzLl9zcHJJY29uICYmIHRoaXMuX3VzZXJJZCl7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fc3BySWNvbi5zZXRVc2VySUQodGhpcy5fdXNlcklkKTtcclxuICAgICAgICAvL31cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uSWNvbkNsaWNrZWQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBpY29uU3ByaXRlID0gdGhpcy5fc3BySWNvbi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmKHRoaXMuX3VzZXJJZCAhPSBudWxsICYmIHRoaXMuX3VzZXJJZCA+IDApe1xyXG4gICAgICAgICAgIHZhciBzZWF0ID0gY2MudnYuZ2FtZU5ldE1nci5nZXRTZWF0QnlJRCh0aGlzLl91c2VySWQpO1xyXG4gICAgICAgICAgICB2YXIgc2V4ID0gMDtcclxuICAgICAgICAgICAgaWYoY2MudnYuYmFzZUluZm9NYXApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSBjYy52di5iYXNlSW5mb01hcFt0aGlzLl91c2VySWRdO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5mbyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V4ID0gaW5mby5zZXg7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY2MudnYudXNlcmluZm9TaG93LnNob3coc2VhdC5uYW1lLHNlYXQudXNlcmlkLGljb25TcHJpdGUsc2V4LHNlYXQuaXApOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICBzZXRjYXJkczpmdW5jdGlvbihjYXJkMDEsY2FyZDAyKXtcclxuICAgICAgICB0aGlzLmNhcmQxLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5jYXJkMi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHZhciBzZWxmID10aGlzO1xyXG4gICAgICAgIGNhcmQwMT1jYXJkMDErMTAwMDtcclxuICAgICAgICB2YXIgdXJsPVwiR2FtZS9jYXJkL1wiK1wiY2FyZF9cIitjYXJkMDErXCJAMnhcIlxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICBzZWxmLmNhcmQxLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPSBzcHJpdGVGcmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNhcmQwMj1jYXJkMDIrMTAwMDtcclxuICAgICAgICB1cmw9XCJHYW1lL2NhcmQvXCIrXCJjYXJkX1wiK2NhcmQwMitcIkAyeFwiXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLGNjLlNwcml0ZUZyYW1lLGZ1bmN0aW9uKGVycixzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgIHNlbGYuY2FyZDIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9IHNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuICAgICovXHJcbiAgIHJlZnJlc2hjb3VudDE6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLl9zY29yZT10aGlzLl9ob2xkcy5sZW5ndGgrMlxyXG4gICAgICAgIGlmKHRoaXMuX2xibFNjb3JlICE9IG51bGwgJiYgdGhpcy5fc2NvcmU+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xibFNjb3JlLm5vZGUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5fbGJsU2NvcmUuc3RyaW5nID0gXCLkvZlcIit0aGlzLl9zY29yZStcIuW8oFwiOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9sYmxTY29yZS5ub2RlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH0gXHJcbiAgIH0sXHJcbiAgIHJlZnJlc2hjb3VudDI6ZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuX3Njb3JlPXRoaXMuX2hvbGRzLmxlbmd0aFxyXG4gICAgaWYodGhpcy5fbGJsU2NvcmUgIT0gbnVsbCAmJiB0aGlzLl9zY29yZT4wKXtcclxuICAgICAgICB0aGlzLl9sYmxTY29yZS5ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5fbGJsU2NvcmUuc3RyaW5nID0gXCLkvZlcIit0aGlzLl9zY29yZStcIuW8oFwiOyAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICB0aGlzLl9sYmxTY29yZS5ub2RlLmFjdGl2ZT1mYWxzZVxyXG4gICAgfSBcclxufSxcclxuICAgIHJlZnJlc2g6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLl9sYmxOYW1lICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYmxOYW1lLnN0cmluZyA9IHRoaXMuX3VzZXJOYW1lOyAgICBcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3JlYWR5KXtcclxuICAgICAgICAgICAgdGhpcy5fcmVhZHkuYWN0aXZlID0gdGhpcy5faXNSZWFkeTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmxvZyhcInRoaXMuX2lzUmVhZHk9XCIsdGhpcy5faXNSZWFkeSlcclxuICAgICAgIC8vIHRoaXMuX3JlYWR5LmFjdGl2ZSA9IHRydWU7IFxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0aGlzLl91c2VyTmFtZSAhPSBudWxsICYmIHRoaXMuX3VzZXJOYW1lICE9IFwiXCI7IFxyXG4gICAgICAgIGNjLmxvZyhcInRoaXMuX2hvbGRzLmxlbmd0aD1cIix0aGlzLl9ob2xkcy5sZW5ndGgpXHJcbiAgICAgICAgaWYodGhpcy5faG9sZHMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0aGlzLmNhcmQuYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgIGlmKHRoaXMuYXZhdGFyVXJsICE9XCJcIiAmJiB0aGlzLmF2YXRhclVybCAhPW51bGwpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCJ0aGlzLmF2YXRhclVybD1cIix0aGlzLmF2YXRhclVybClcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoe3VybDp0aGlzLmF2YXRhclVybCx0eXBlOidqcGcnfSxmdW5jdGlvbihlcnIsdGV4KXtcclxuICAgICAgICAgICAgICAgIHNlbGYuaWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzZXRJbmZvKG5hbWUsc2NvcmUsZGF5aW5namlhKXtcclxuICAgICAgICB0aGlzLl91c2VyTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBzY29yZTtcclxuICAgICAgICBpZih0aGlzLl9zY29yZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kYXlpbmdqaWEgPSBkYXlpbmdqaWE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fc2NvcmVCZyAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fc2NvcmVCZy5hY3RpdmUgPSB0aGlzLl9zY29yZSAhPSBudWxsOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fbGJsU2NvcmUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xibFNjb3JlLm5vZGUuYWN0aXZlID0gdGhpcy5fc2NvcmUgIT0gbnVsbDsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpOyAgICBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIFxyXG4gICAgc2V0UmVhZHk6ZnVuY3Rpb24oaXNSZWFkeSl7XHJcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IGlzUmVhZHk7XHJcbiAgICAgICAgaWYodGhpcy5fcmVhZHkpe1xyXG4gICAgICAgICAgICB0aGlzLl9yZWFkeS5hY3RpdmUgPSB0aGlzLl9pc1JlYWR5IDsgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgc2V0SUQ6ZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIHZhciBpZE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpZFwiKTtcclxuICAgICAgICBpZihpZE5vZGUpe1xyXG4gICAgICAgICAgICB2YXIgbGJsID0gaWROb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxibC5zdHJpbmcgPSBcIklEOlwiICsgaWQ7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3VzZXJJZCA9IGlkO1xyXG4gICAgICAgIGlmKHRoaXMuX3Nwckljb24pe1xyXG4gICAgICAgICAgICB0aGlzLl9zcHJJY29uLnNldFVzZXJJRChpZCk7IFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIFxyXG4gICAgY2hhdDpmdW5jdGlvbihjb250ZW50KXtcclxuICAgICAgICBpZih0aGlzLl9jaGF0QnViYmxlID09IG51bGwgfHwgdGhpcy5fZW1vamkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW1vamkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY2hhdEJ1YmJsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXRCdWJibGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuX2NoYXRCdWJibGUuZ2V0Q2hpbGRCeU5hbWUoXCJOZXcgTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuX2xhc3RDaGF0VGltZSA9IDM7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBlbW9qaTpmdW5jdGlvbihlbW9qaSl7XHJcbiAgICAgICAgLy9lbW9qaSA9IEpTT04ucGFyc2UoZW1vamkpO1xyXG4gICAgICAgIGlmKHRoaXMuX2Vtb2ppID09IG51bGwgfHwgdGhpcy5fZW1vamkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZW1vamkpO1xyXG4gICAgICAgIHRoaXMuX2NoYXRCdWJibGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZW1vamkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9lbW9qaS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KGVtb2ppKTtcclxuICAgICAgICB0aGlzLl9sYXN0Q2hhdFRpbWUgPSAzO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdm9pY2VNc2c6ZnVuY3Rpb24oc2hvdyl7XHJcbiAgICAgICAgaWYodGhpcy5fdm9pY2Vtc2cpe1xyXG4gICAgICAgICAgICB0aGlzLl92b2ljZW1zZy5hY3RpdmUgPSBzaG93O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlZnJlc2hYdWFuUGFpU3RhdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXN0Q2hhdFRpbWUgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdENoYXRUaW1lIC09IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLl9sYXN0Q2hhdFRpbWUgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXRCdWJibGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbW9qaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vtb2ppLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxufSk7XHJcbiJdfQ==