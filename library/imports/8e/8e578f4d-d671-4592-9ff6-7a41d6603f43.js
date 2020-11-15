"use strict";
cc._RF.push(module, '8e5789N1nFFkp/2ekHWYD9D', 'Avatar');
// scripts/kbe_scripts/Avatar.js

"use strict";

/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/
var KBEngine = require("kbengine");

KBEngine.Avatar = KBEngine.Entity.extend({
  __init__: function __init__() {
    this._super();

    if (this.isPlayer()) {
      cc.log("window.wx != undefined || window.wc=", window.wx != undefined);

      if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        this.decodeEncryptedData();
      }

      cc.log("KBEngine.Avatar._init_");
      KBEngine.Event.fire("enterScene");
    }
  },
  onSetSpaceData: function onSetSpaceData() {
    cc.log("initSpaceDatainitSpaceDatainitSpaceDatainitSpaceData");
    KBEngine.Event.fire("onSetSpaceData");
  },
  decodeEncryptedData: function decodeEncryptedData() {
    var encryptedData = cc.sys.localStorage.getItem("encryptedData");
    var iv = cc.sys.localStorage.getItem("iv");
    cc.log("encryptedData && iv", encryptedData, iv);

    if (encryptedData && iv) {
      cc.log("decodeEncryptedData");
      this.baseCall("decodeEncryptedData", encryptedData, iv);
    }
  },
  reqChangeReadyState: function reqChangeReadyState() {
    this.cellCall("reqChangeReadyState", 1);
  },
  updateStaus: function updateStaus() {
    this.baseCall("updateStaus");
  },
  playerReadyStateChange: function playerReadyStateChange(eid, state) {
    if (this.isPlayer()) {
      KBEngine.Event.fire("playerReadyStateChange", eid, state);
    }
  },
  quick_chat: function quick_chat(idx) {
    cc.log("quick_chat:cellCall", idx);
    this.cellCall("quick_chat", idx);
  },
  emoji: function emoji(name) {
    cc.log("emoji:cellCall", name);
    this.cellCall("emoji", name);
  },
  iptChat: function iptChat(strstr) {
    cc.log("iptChat:cellCall", strstr);
    this.cellCall("iptChat", strstr);
  },
  onquick_chat: function onquick_chat(eid, idx) {
    cc.log("quick_chat:receive", eid, idx);

    if (this.isPlayer()) {
      KBEngine.Event.fire("onquick_chat", eid, idx);
    }
  },
  onjoinPrivateRoom: function onjoinPrivateRoom(num) {
    cc.log("onjoinPrivateRoom", num);

    if (this.isPlayer()) {
      KBEngine.Event.fire("onjoinPrivateRoom", num);
    }
  },
  onemoji: function onemoji(eid, name) {
    cc.log("emoji:receive", eid, name);

    if (this.isPlayer()) {
      KBEngine.Event.fire("onemoji", eid, name);
    }
  },
  oniptChat: function oniptChat(eid, strstr) {
    cc.log("iptChat:receive", eid, strstr);

    if (this.isPlayer()) {
      KBEngine.Event.fire("oniptChat", eid, strstr);
    }
  },
  onclientMSG: function onclientMSG(msg) {
    if (this.isPlayer()) {
      KBEngine.Event.fire("onclientMSG", msg);
    }
  },
  joinRoom: function joinRoom() {
    KBEngine.INFO_MSG("avatar " + this.id + " join room");
    this.baseCall("joinRoom");
  },
  createPrivateRoom: function createPrivateRoom() {
    KBEngine.INFO_MSG("avatar " + this.id + " createPrivateRoom");
    this.baseCall("createPrivateRoom");
  },
  joinPrivateRoom: function joinPrivateRoom(roomkey) {
    KBEngine.INFO_MSG("avatar " + this.id + " joinPrivateRoom" + roomkey);
    this.baseCall("joinPrivateRoom", roomkey);
  },
  game_begin_push: function game_begin_push(holds) {
    cc.log("Avatar::game_begin_push");

    if (this.isPlayer()) {
      KBEngine.Event.fire("game_begin_push", this);
    }
  },
  onEnterWorld: function onEnterWorld() {
    cc.log("avatar.onEnterWorld.......");

    this._super();

    if (this.isPlayer()) {
      KBEngine.Event.fire("onAvatarEnterWorld", this);
    }
  },
  onEnterWorld2: function onEnterWorld2(eid) {
    cc.log("avatar.onEnterWorld2.......", this.id, KBEngine.app.entity_id); //this._super();

    if (this.isPlayer()) {
      KBEngine.Event.fire("onEnterWorld2", eid);
    }
  },
  onNewTurn: function onNewTurn(eid, second, card1, card2, card3, card4) {
    KBEngine.INFO_MSG("avatar " + eid + " on new turn");
    KBEngine.Event.fire("newTurn", this, eid, second, card1, card2, card3, card4);
  },
  onsureact: function onsureact(strr) {
    this.cellCall("onsureact", strr);
  },
  leaverequest: function leaverequest() {
    KBEngine.INFO_MSG("avatar " + this.id + " leaverequest");
    this.cellCall("leaverequest");
  },
  onsyncsureact: function onsyncsureact(eid, strr) {
    cc.log("avatar::onsyncsureact== ", strr); //KBEngine.Event.fire("onsyncsureact", strr);

    if (this.isPlayer()) {
      KBEngine.Event.fire("oniptChat", eid, strr);
    }
  },
  newTurn: function newTurn() {
    this.cellCall("newTurn");
  },
  onupdateGamestates: function onupdateGamestates(curID, time) {
    KBEngine.INFO_MSG("onupdateGamestates " + curID + "/" + time);
    KBEngine.Event.fire("onupdateGamestates", curID, time);
  },
  onotherNetcut: function onotherNetcut(avatarID) {
    KBEngine.INFO_MSG("avatar " + avatarID + " Netcut");
    KBEngine.Event.fire("onotherNetcut", avatarID);
  },
  onDie: function onDie(avatarID) {
    KBEngine.INFO_MSG("avatar " + avatarID + " die");
    KBEngine.Event.fire("onAvatarDie", avatarID);
  },
  onGameOver: function onGameOver(isWin, hitRate, totalTime, totalHarm, score) {
    KBEngine.INFO_MSG("Game is over: avatar " + this.id + "win= " + isWin.toString());
    KBEngine.Event.fire("onGameOver", this.id, isWin, hitRate, totalTime, totalHarm, score);
  },
  updategamestuts: function updategamestuts(num) {
    KBEngine.Event.fire("updategamestuts", num);
  },
  continueGame: function continueGame() {
    this.cellCall("continueGame");
    KBEngine.INFO_MSG("avatar " + this.id + " continue game");
  },
  onContinueGame: function onContinueGame(avatarID) {
    KBEngine.INFO_MSG("avatar " + avatarID + "on continue game, local avatarID=" + this.id); //KBEngine.Event.fire("onAvatarEnterWorld", KBEngine.app.entity_uuid, this.id, this);

    KBEngine.Event.fire("onAvatarEnterWorld", this);
  }
});

cc._RF.pop();