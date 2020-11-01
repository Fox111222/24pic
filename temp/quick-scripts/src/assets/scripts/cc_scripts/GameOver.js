"use strict";
cc._RF.push(module, 'c48efyihTZETIsXQsDfrIx0', 'GameOver');
// scripts/cc_scripts/GameOver.js

"use strict";

var KBEngine = require("kbengine");

cc.Class({
  "extends": cc.Component,
  properties: {
    labelHitRate: {
      "default": null,
      type: cc.Label
    },
    labelTotalTime: {
      "default": null,
      type: cc.Label
    },
    labelTotalHarm: {
      "default": null,
      type: cc.Label
    },
    labelScore: {
      "default": null,
      type: cc.Label
    },
    buttonRanking: {
      "default": null,
      type: cc.Button
    },
    rankingView: cc.Node,
    rankingScrollView: cc.Sprite
  },
  onLoad: function onLoad() {
    //window.AudioMgr.playSFX("win")
    this.isShowRankingView = false;
    this.buttonRanking.node.active = false;
    this.rankingView.active = false;
    var result = null;
    KBEngine.INFO_MSG("game is over, result: rate=%f harm=%f time=%f score=%f", HP, OtherHP, TOTAL_TIME, SCORE); //var rate = HIT_RATE * 100;

    this.labelHitRate.string = HP; //抢答次数

    this.labelTotalHarm.string = OtherHP; //对方抢答次数

    this.labelTotalTime.string = TOTAL_TIME + 'S';
    this.labelScore.string = Math.round(100 * SCORE) + "%"; //胜利比率

    cc.director.preloadScene("WorldScene");
  },
  start: function start() {
    if (window.wx != undefined) {
      this.buttonRanking.node.active = true; //排行榜button

      this._isShow = false;
      this.tex = new cc.Texture2D(); //sharedCanvas.width = this.rankingScrollView.node.width;//cc.winSize.width/2;
      //sharedCanvas.height = this.rankingScrollView.node.height;//cc.winSize.height;

      var openDataContext = wx.getOpenDataContext();
      this.sharedCanvas = openDataContext.canvas;
      this.sharedCanvas.width = 720;
      this.sharedCanvas.height = 720;
      wx.setUserCloudStorage({
        //存储数据
        KVDataList: [{
          key: 'score',
          value: "" + LVlevel
        }],
        success: function success(res) {
          KBEngine.INFO_MSG('setUserCloudStorage  success' + JSON.stringify(res));
        },
        fail: function fail(res) {
          KBEngine.INFO_MSG('setUserCloudStorage  fail' + JSON.stringify(res));
        },
        complete: function complete(res) {
          KBEngine.INFO_MSG('setUserCloudStorage  complete' + JSON.stringify(res));
        }
      });
    }
  },
  continueGame: function continueGame() {
    //window.AudioMgr.playSFX("ui_click")
    var player = KBEngine.app.player();
    if (player == undefined || !player.inWorld) return;
    cc.director.loadScene("WorldScene", function () {
      player.continueGame();
    });
  },
  onDisplayRankingView: function onDisplayRankingView() {
    //window.AudioMgr.playSFX("ui_click")
    if (window.wx == undefined) return;
    this.isShowRankingView = !this.isShowRankingView;
    this.rankingView.active = this.isShowRankingView;
    KBEngine.INFO_MSG("show ranking view: " + this.isShowRankingView.toString());
    cc.log("show ranking view: this.rankingView.active=", this.isShowRankingView); // 发消息给子域

    var openDataContext = wx.getOpenDataContext(); //获得开放数据域的实例，获得的实例调用postMessage，向子域发送数据，子域通过开启wx.onMessage()接受主域传达的消息

    openDataContext.postMessage({
      message: this.isShowRankingView ? 'Show' : 'Hide'
    });
  },
  onCloseRankingView: function onCloseRankingView() {
    //window.AudioMgr.playSFX("ui_click")
    this.rankingView.active = false;
    KBEngine.INFO_MSG("close ranking view: "); // 发消息给子域

    var openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({
      message: 'Hide'
    });
  },
  _updateSubDomainCanvas: function _updateSubDomainCanvas() {
    if (window.wx == undefined) return;
    if (!this.tex) return;
    this.tex.initWithElement(this.sharedCanvas);
    this.tex.handleLoadedTexture();
    this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
  },
  update: function update() {
    this._updateSubDomainCanvas();
  }
});

cc._RF.pop();