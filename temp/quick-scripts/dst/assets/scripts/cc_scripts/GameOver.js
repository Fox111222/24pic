
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
    window.AudioMgr.playSFX("ui_click");
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
    window.AudioMgr.playSFX("ui_click");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcR2FtZU92ZXIuanMiXSwibmFtZXMiOlsiS0JFbmdpbmUiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYWJlbEhpdFJhdGUiLCJ0eXBlIiwiTGFiZWwiLCJsYWJlbFRvdGFsVGltZSIsImxhYmVsVG90YWxIYXJtIiwibGFiZWxTY29yZSIsImJ1dHRvblJhbmtpbmciLCJCdXR0b24iLCJyYW5raW5nVmlldyIsIk5vZGUiLCJyYW5raW5nU2Nyb2xsVmlldyIsIlNwcml0ZSIsIm9uTG9hZCIsImlzU2hvd1JhbmtpbmdWaWV3Iiwibm9kZSIsImFjdGl2ZSIsInJlc3VsdCIsIklORk9fTVNHIiwiSFAiLCJPdGhlckhQIiwiVE9UQUxfVElNRSIsIlNDT1JFIiwic3RyaW5nIiwiTWF0aCIsInJvdW5kIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJzdGFydCIsIndpbmRvdyIsInd4IiwidW5kZWZpbmVkIiwiX2lzU2hvdyIsInRleCIsIlRleHR1cmUyRCIsIm9wZW5EYXRhQ29udGV4dCIsImdldE9wZW5EYXRhQ29udGV4dCIsInNoYXJlZENhbnZhcyIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0VXNlckNsb3VkU3RvcmFnZSIsIktWRGF0YUxpc3QiLCJrZXkiLCJ2YWx1ZSIsIkxWbGV2ZWwiLCJzdWNjZXNzIiwicmVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImZhaWwiLCJjb21wbGV0ZSIsImNvbnRpbnVlR2FtZSIsIkF1ZGlvTWdyIiwicGxheVNGWCIsInBsYXllciIsImFwcCIsImluV29ybGQiLCJsb2FkU2NlbmUiLCJvbkRpc3BsYXlSYW5raW5nVmlldyIsInRvU3RyaW5nIiwibG9nIiwicG9zdE1lc3NhZ2UiLCJtZXNzYWdlIiwib25DbG9zZVJhbmtpbmdWaWV3IiwiX3VwZGF0ZVN1YkRvbWFpbkNhbnZhcyIsImluaXRXaXRoRWxlbWVudCIsImhhbmRs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QnlELFdBQXZCLEdBQXFDLElBQUl2RSxFQUFFLENBQUN3RSxXQUFQLENBQW1CLEtBQUtwQyxHQUF4QixDQUFyQztBQUNILEdBL0hJO0FBaUlMcUMsRUFBQUEsTUFqSUssb0JBaUlJO0FBQ0wsU0FBS0wsc0JBQUw7QUFDSDtBQW5JSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIEtCRW5naW5lID0gcmVxdWlyZShcImtiZW5naW5lXCIpO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYmVsSGl0UmF0ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYWJlbFRvdGFsVGltZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYWJlbFRvdGFsSGFybToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYWJlbFNjb3JlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJ1dHRvblJhbmtpbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJhbmtpbmdWaWV3OiBjYy5Ob2RlLFxyXG4gICAgICAgIHJhbmtpbmdTY3JvbGxWaWV3OiBjYy5TcHJpdGUsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuXHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcIndpblwiKVxyXG5cclxuICAgICAgICB0aGlzLmlzU2hvd1JhbmtpbmdWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5idXR0b25SYW5raW5nLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yYW5raW5nVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZ2FtZSBpcyBvdmVyLCByZXN1bHQ6IHJhdGU9JWYgaGFybT0lZiB0aW1lPSVmIHNjb3JlPSVmXCIsIEhQLCBPdGhlckhQLCBUT1RBTF9USU1FLCBTQ09SRSk7XHJcbiAgICAgICAgLy92YXIgcmF0ZSA9IEhJVF9SQVRFICogMTAwO1xyXG4gICAgICAgIHRoaXMubGFiZWxIaXRSYXRlLnN0cmluZyA9IEhQOy8v5oqi562U5qyh5pWwXHJcbiAgICAgICAgdGhpcy5sYWJlbFRvdGFsSGFybS5zdHJpbmcgPSBPdGhlckhQOyAvL+WvueaWueaKouetlOasoeaVsFxyXG4gICAgICAgIHRoaXMubGFiZWxUb3RhbFRpbWUuc3RyaW5nID0gVE9UQUxfVElNRSArICdTJztcclxuICAgICAgICB0aGlzLmxhYmVsU2NvcmUuc3RyaW5nID0gTWF0aC5yb3VuZCgxMDAqU0NPUkUpK1wiJVwiOyAvL+iDnOWIqeavlOeOh1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJXb3JsZFNjZW5lXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAod2luZG93Lnd4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvblJhbmtpbmcubm9kZS5hY3RpdmUgPSB0cnVlOyAgLy/mjpLooYzmppxidXR0b25cclxuICAgICAgICAgICAgdGhpcy5faXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xyXG5cclxuICAgICAgICAgICAgLy9zaGFyZWRDYW52YXMud2lkdGggPSB0aGlzLnJhbmtpbmdTY3JvbGxWaWV3Lm5vZGUud2lkdGg7Ly9jYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgIC8vc2hhcmVkQ2FudmFzLmhlaWdodCA9IHRoaXMucmFua2luZ1Njcm9sbFZpZXcubm9kZS5oZWlnaHQ7Ly9jYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICAgICAgbGV0IG9wZW5EYXRhQ29udGV4dCA9IHd4LmdldE9wZW5EYXRhQ29udGV4dCgpXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZENhbnZhcyA9IG9wZW5EYXRhQ29udGV4dC5jYW52YXNcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZENhbnZhcy53aWR0aCA9IDcyMDtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZENhbnZhcy5oZWlnaHQgPSA3MjA7XHJcblxyXG4gICAgICAgICAgICB3eC5zZXRVc2VyQ2xvdWRTdG9yYWdlKHsgIC8v5a2Y5YKo5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBLVkRhdGFMaXN0OiBbeyBrZXk6ICdzY29yZScsIHZhbHVlOiBcIlwiKyBMVmxldmVsIH1dLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIEtCRW5naW5lLklORk9fTVNHKCdzZXRVc2VyQ2xvdWRTdG9yYWdlICBzdWNjZXNzJyArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBLQkVuZ2luZS5JTkZPX01TRygnc2V0VXNlckNsb3VkU3RvcmFnZSAgZmFpbCcgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIEtCRW5naW5lLklORk9fTVNHKCdzZXRVc2VyQ2xvdWRTdG9yYWdlICBjb21wbGV0ZScgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBjb250aW51ZUdhbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgIGlmKHBsYXllciA9PSB1bmRlZmluZWQgfHwgIXBsYXllci5pbldvcmxkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIldvcmxkU2NlbmVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIuY29udGludWVHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzcGxheVJhbmtpbmdWaWV3KCkge1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIGlmICh3aW5kb3cud3ggPT0gdW5kZWZpbmVkKSAgcmV0dXJuO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5pc1Nob3dSYW5raW5nVmlldyA9ICF0aGlzLmlzU2hvd1JhbmtpbmdWaWV3O1xyXG4gICAgICAgIHRoaXMucmFua2luZ1ZpZXcuYWN0aXZlID0gdGhpcy5pc1Nob3dSYW5raW5nVmlldztcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcInNob3cgcmFua2luZyB2aWV3OiBcIiArIHRoaXMuaXNTaG93UmFua2luZ1ZpZXcudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgY2MubG9nKFwic2hvdyByYW5raW5nIHZpZXc6IHRoaXMucmFua2luZ1ZpZXcuYWN0aXZlPVwiLHRoaXMuaXNTaG93UmFua2luZ1ZpZXcpO1xyXG4gICAgICAgIC8vIOWPkea2iOaBr+e7meWtkOWfn1xyXG4gICAgICAgIGxldCBvcGVuRGF0YUNvbnRleHQgPSB3eC5nZXRPcGVuRGF0YUNvbnRleHQoKTsvL+iOt+W+l+W8gOaUvuaVsOaNruWfn+eahOWunuS+i++8jOiOt+W+l+eahOWunuS+i+iwg+eUqHBvc3RNZXNzYWdl77yM5ZCR5a2Q5Z+f5Y+R6YCB5pWw5o2u77yM5a2Q5Z+f6YCa6L+H5byA5ZCvd3gub25NZXNzYWdlKCnmjqXlj5fkuLvln5/kvKDovr7nmoTmtojmga9cclxuICAgICAgICBvcGVuRGF0YUNvbnRleHQucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLmlzU2hvd1JhbmtpbmdWaWV3ID8gJ1Nob3cnIDogJ0hpZGUnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsb3NlUmFua2luZ1ZpZXcoKXtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy5yYW5raW5nVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImNsb3NlIHJhbmtpbmcgdmlldzogXCIpO1xyXG4gICAgICAgIC8vIOWPkea2iOaBr+e7meWtkOWfn1xyXG4gICAgICAgIGxldCBvcGVuRGF0YUNvbnRleHQgPSB3eC5nZXRPcGVuRGF0YUNvbnRleHQoKTtcclxuICAgICAgICBvcGVuRGF0YUNvbnRleHQucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnSGlkZScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVTdWJEb21haW5DYW52YXMoKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy53eCA9PSB1bmRlZmluZWQpICByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLnRleCkgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRleC5pbml0V2l0aEVsZW1lbnQodGhpcy5zaGFyZWRDYW52YXMpO1xyXG4gICAgICAgIHRoaXMudGV4LmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcclxuICAgICAgICB0aGlzLnJhbmtpbmdTY3JvbGxWaWV3LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMudGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN1YkRvbWFpbkNhbnZhcygpO1xyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=