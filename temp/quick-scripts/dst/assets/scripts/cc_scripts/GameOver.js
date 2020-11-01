
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cc_scripts/GameOver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcR2FtZU92ZXIuanMiXSwibmFtZXMiOlsiS0JFbmdpbmUiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYWJlbEhpdFJhdGUiLCJ0eXBlIiwiTGFiZWwiLCJsYWJlbFRvdGFsVGltZSIsImxhYmVsVG90YWxIYXJtIiwibGFiZWxTY29yZSIsImJ1dHRvblJhbmtpbmciLCJCdXR0b24iLCJyYW5raW5nVmlldyIsIk5vZGUiLCJyYW5raW5nU2Nyb2xsVmlldyIsIlNwcml0ZSIsIm9uTG9hZCIsImlzU2hvd1JhbmtpbmdWaWV3Iiwibm9kZSIsImFjdGl2ZSIsInJlc3VsdCIsIklORk9fTVNHIiwiSFAiLCJPdGhlckhQIiwiVE9UQUxfVElNRSIsIlNDT1JFIiwic3RyaW5nIiwiTWF0aCIsInJvdW5kIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJzdGFydCIsIndpbmRvdyIsInd4IiwidW5kZWZpbmVkIiwiX2lzU2hvdyIsInRleCIsIlRleHR1cmUyRCIsIm9wZW5EYXRhQ29udGV4dCIsImdldE9wZW5EYXRhQ29udGV4dCIsInNoYXJlZENhbnZhcyIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0VXNlckNsb3VkU3RvcmFnZSIsIktWRGF0YUxpc3QiLCJrZXkiLCJ2YWx1ZSIsIkxWbGV2ZWwiLCJzdWNjZXNzIiwicmVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImZhaWwiLCJjb21wbGV0ZSIsImNvbnRpbnVlR2FtZSIsInBsYXllciIsImFwcCIsImluV29ybGQiLCJsb2FkU2NlbmUiLCJvbkRpc3BsYXlSYW5raW5nVmlldyIsInRvU3RyaW5nIiwibG9nIiwicG9zdE1lc3NhZ2UiLCJtZXNzYWdlIiwib25DbG9zZVJhbmtpbmdWaWV3IiwiX3VwZGF0ZVN1YkRvbWFpbkNhbnZhcyIsImluaXRXaXRoRWxlbWVudCIsImhhbmRsZUxvYWRlZFRleHR1cmUiLCJzcHJp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QUNIO0FBbklJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgS0JFbmdpbmUgPSByZXF1aXJlKFwia2JlbmdpbmVcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGFiZWxIaXRSYXRlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxhYmVsVG90YWxUaW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxhYmVsVG90YWxIYXJtOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxhYmVsU2NvcmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnV0dG9uUmFua2luZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b24sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmFua2luZ1ZpZXc6IGNjLk5vZGUsXHJcbiAgICAgICAgcmFua2luZ1Njcm9sbFZpZXc6IGNjLlNwcml0ZSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwid2luXCIpXHJcblxyXG4gICAgICAgIHRoaXMuaXNTaG93UmFua2luZ1ZpZXcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1dHRvblJhbmtpbmcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJhbmtpbmdWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgXHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJnYW1lIGlzIG92ZXIsIHJlc3VsdDogcmF0ZT0lZiBoYXJtPSVmIHRpbWU9JWYgc2NvcmU9JWZcIiwgSFAsIE90aGVySFAsIFRPVEFMX1RJTUUsIFNDT1JFKTtcclxuICAgICAgICAvL3ZhciByYXRlID0gSElUX1JBVEUgKiAxMDA7XHJcbiAgICAgICAgdGhpcy5sYWJlbEhpdFJhdGUuc3RyaW5nID0gSFA7Ly/miqLnrZTmrKHmlbBcclxuICAgICAgICB0aGlzLmxhYmVsVG90YWxIYXJtLnN0cmluZyA9IE90aGVySFA7IC8v5a+55pa55oqi562U5qyh5pWwXHJcbiAgICAgICAgdGhpcy5sYWJlbFRvdGFsVGltZS5zdHJpbmcgPSBUT1RBTF9USU1FICsgJ1MnO1xyXG4gICAgICAgIHRoaXMubGFiZWxTY29yZS5zdHJpbmcgPSBNYXRoLnJvdW5kKDEwMCpTQ09SRSkrXCIlXCI7IC8v6IOc5Yip5q+U546HXHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcIldvcmxkU2NlbmVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh3aW5kb3cud3ggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uUmFua2luZy5ub2RlLmFjdGl2ZSA9IHRydWU7ICAvL+aOkuihjOamnGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLl9pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50ZXggPSBuZXcgY2MuVGV4dHVyZTJEKCk7XHJcblxyXG4gICAgICAgICAgICAvL3NoYXJlZENhbnZhcy53aWR0aCA9IHRoaXMucmFua2luZ1Njcm9sbFZpZXcubm9kZS53aWR0aDsvL2NjLndpblNpemUud2lkdGgvMjtcclxuICAgICAgICAgICAgLy9zaGFyZWRDYW52YXMuaGVpZ2h0ID0gdGhpcy5yYW5raW5nU2Nyb2xsVmlldy5ub2RlLmhlaWdodDsvL2NjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgb3BlbkRhdGFDb250ZXh0ID0gd3guZ2V0T3BlbkRhdGFDb250ZXh0KClcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkQ2FudmFzID0gb3BlbkRhdGFDb250ZXh0LmNhbnZhc1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkQ2FudmFzLndpZHRoID0gNzIwO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkQ2FudmFzLmhlaWdodCA9IDcyMDtcclxuXHJcbiAgICAgICAgICAgIHd4LnNldFVzZXJDbG91ZFN0b3JhZ2UoeyAgLy/lrZjlgqjmlbDmja5cclxuICAgICAgICAgICAgICAgIEtWRGF0YUxpc3Q6IFt7IGtleTogJ3Njb3JlJywgdmFsdWU6IFwiXCIrIExWbGV2ZWwgfV0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coJ3NldFVzZXJDbG91ZFN0b3JhZ2UgIHN1Y2Nlc3MnICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIEtCRW5naW5lLklORk9fTVNHKCdzZXRVc2VyQ2xvdWRTdG9yYWdlICBmYWlsJyArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coJ3NldFVzZXJDbG91ZFN0b3JhZ2UgIGNvbXBsZXRlJyArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRpbnVlR2FtZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdmFyIHBsYXllciA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuICAgICAgICBpZihwbGF5ZXIgPT0gdW5kZWZpbmVkIHx8ICFwbGF5ZXIuaW5Xb3JsZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJXb3JsZFNjZW5lXCIsICgpID0+IHtcclxuICAgICAgICAgICAgcGxheWVyLmNvbnRpbnVlR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc3BsYXlSYW5raW5nVmlldygpIHtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICBpZiAod2luZG93Lnd4ID09IHVuZGVmaW5lZCkgIHJldHVybjtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNTaG93UmFua2luZ1ZpZXcgPSAhdGhpcy5pc1Nob3dSYW5raW5nVmlldztcclxuICAgICAgICB0aGlzLnJhbmtpbmdWaWV3LmFjdGl2ZSA9IHRoaXMuaXNTaG93UmFua2luZ1ZpZXc7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJzaG93IHJhbmtpbmcgdmlldzogXCIgKyB0aGlzLmlzU2hvd1JhbmtpbmdWaWV3LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGNjLmxvZyhcInNob3cgcmFua2luZyB2aWV3OiB0aGlzLnJhbmtpbmdWaWV3LmFjdGl2ZT1cIix0aGlzLmlzU2hvd1JhbmtpbmdWaWV3KTtcclxuICAgICAgICAvLyDlj5Hmtojmga/nu5nlrZDln59cclxuICAgICAgICBsZXQgb3BlbkRhdGFDb250ZXh0ID0gd3guZ2V0T3BlbkRhdGFDb250ZXh0KCk7Ly/ojrflvpflvIDmlL7mlbDmja7ln5/nmoTlrp7kvovvvIzojrflvpfnmoTlrp7kvovosIPnlKhwb3N0TWVzc2FnZe+8jOWQkeWtkOWfn+WPkemAgeaVsOaNru+8jOWtkOWfn+mAmui/h+W8gOWQr3d4Lm9uTWVzc2FnZSgp5o6l5Y+X5Li75Z+f5Lyg6L6+55qE5raI5oGvXHJcbiAgICAgICAgb3BlbkRhdGFDb250ZXh0LnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5pc1Nob3dSYW5raW5nVmlldyA/ICdTaG93JyA6ICdIaWRlJyxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DbG9zZVJhbmtpbmdWaWV3KCl7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5yYW5raW5nVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImNsb3NlIHJhbmtpbmcgdmlldzogXCIpO1xyXG4gICAgICAgIC8vIOWPkea2iOaBr+e7meWtkOWfn1xyXG4gICAgICAgIGxldCBvcGVuRGF0YUNvbnRleHQgPSB3eC5nZXRPcGVuRGF0YUNvbnRleHQoKTtcclxuICAgICAgICBvcGVuRGF0YUNvbnRleHQucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnSGlkZScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVTdWJEb21haW5DYW52YXMoKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy53eCA9PSB1bmRlZmluZWQpICByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLnRleCkgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRleC5pbml0V2l0aEVsZW1lbnQodGhpcy5zaGFyZWRDYW52YXMpO1xyXG4gICAgICAgIHRoaXMudGV4LmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcclxuICAgICAgICB0aGlzLnJhbmtpbmdTY3JvbGxWaWV3LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMudGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN1YkRvbWFpbkNhbnZhcygpO1xyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=