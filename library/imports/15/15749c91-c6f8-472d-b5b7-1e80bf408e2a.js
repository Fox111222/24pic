"use strict";
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