
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Settings.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35e49hR44JEyKXMPDq4jIGZ', 'Settings');
// scripts/Settings.js

"use strict";

var KBEngine = require("kbengine");

cc.Class({
  "extends": cc.Component,
  properties: {
    _btnYXOpen: {
      "default": null,
      type: cc.Node
    },
    _btnYXClose: {
      type: cc.Node,
      "default": null
    },
    _btnYYOpen: {
      type: cc.Node,
      "default": null
    },
    _btnYYClose: {
      type: cc.Node,
      "default": null
    }
  },

  /*
  addClickEvent:function(node,target,component,handler){
      cc.log(component + ":" + handler);
      var eventHandler = new cc.Component.EventHandler();
      eventHandler.target = target;
      eventHandler.component = component;
      eventHandler.handler = handler;
        var clickEvents = node.getComponent(cc.Button).clickEvents;
      clickEvents.push(eventHandler);
  },
  
  addSlideEvent:function(node,target,component,handler){
      var eventHandler = new cc.Component.EventHandler();
      eventHandler.target = target;
      eventHandler.component = component;
      eventHandler.handler = handler;
        var slideEvents = node.getComponent(cc.Slider).slideEvents;
      slideEvents.push(eventHandler);
  },
  */
  // use this for initialization
  onBgClicked: function onBgClicked(event) {
    event.stopPropagation();
  },
  onLoad: function onLoad() {
    if (window.AudioMgr == null) {
      cc.log("window.AudioMgr== null");
      return;
    }

    this._btnYXOpen = this.node.getChildByName("yinxiao").getChildByName("btn_yx_open");
    this._btnYXClose = this.node.getChildByName("yinxiao").getChildByName("btn_yx_close");
    this._btnYYOpen = this.node.getChildByName("yinyue").getChildByName("btn_yy_open");
    this._btnYYClose = this.node.getChildByName("yinyue").getChildByName("btn_yy_close");
    this.refreshVolume();
  },
  onSlided: function onSlided(slider) {
    if (slider.node.parent.name == "yinxiao") {
      window.AudioMgr.setSFXVolume(slider.progress);
    } else if (slider.node.parent.name == "yinyue") {
      window.AudioMgr.setBGMVolume(slider.progress);
    }

    this.refreshVolume();
  },
  initButtonHandler: function initButtonHandler(btn) {
    this.addClickEvent(btn, this.node, "Settings", "onBtnClicked");
  },
  refreshVolume: function refreshVolume() {
    this._btnYXClose.active = window.AudioMgr.sfxVolume > 0;
    this._btnYXOpen.active = !this._btnYXClose.active;
    var yx = this.node.getChildByName("yinxiao");
    var width = 430 * window.AudioMgr.sfxVolume;
    var progress = yx.getChildByName("progress");
    progress.getComponent(cc.Slider).progress = window.AudioMgr.sfxVolume; //progress.getChildByName("progress").width = width; 

    progress.getChildByName("progress").scaleX = window.AudioMgr.sfxVolume; //yx.getChildByName("btn_progress").x = progress.x + width;

    this._btnYYClose.active = window.AudioMgr.bgmVolume > 0;
    this._btnYYOpen.active = !this._btnYYClose.active;
    var yy = this.node.getChildByName("yinyue");
    var width = 430 * window.AudioMgr.bgmVolume;
    var progress = yy.getChildByName("progress");
    progress.getComponent(cc.Slider).progress = window.AudioMgr.bgmVolume; //progress.getChildByName("progress").width = width;

    progress.getChildByName("progress").scaleX = window.AudioMgr.bgmVolume; //yy.getChildByName("btn_progress").x = progress.x + width;
  },
  onBtnClicked: function onBtnClicked(event) {
    window.AudioMgr.playSFX("ui_click"); //cc.log("onBtnClicked",event.target.name)

    if (event.target.name == "btn_close") {
      this.node.active = false;
    } else if (event.target.name == "btn_exit") {
      cc.sys.localStorage.removeItem("wx_account");
      cc.sys.localStorage.removeItem("wx_sign"); //var player = KBEngine.app.player();
      //if(player){
      //    player.leaverequest()
      //}

      cc.director.loadScene("StartScene", function () {
        //window.loginres=num
        var player = KBEngine.app.player();

        if (player) {
          player.leaverequest();
        }

        cc.log("startscene===>wordscene");
      }); //cc.director.loadScene("StartScene");

      this.node.parent.getComponent("WorldScene").unInstallEvents();
    } else if (event.target.name == "btn_yx_open") {
      window.AudioMgr.setSFXVolume(1.0);
      this.refreshVolume();
    } else if (event.target.name == "btn_yx_close") {
      window.AudioMgr.setSFXVolume(0);
      this.refreshVolume();
    } else if (event.target.name == "btn_yy_open") {
      window.AudioMgr.setBGMVolume(1);
      this.refreshVolume();
    } else if (event.target.name == "btn_yy_close") {
      window.AudioMgr.setBGMVolume(0);
      this.refreshVolume();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU2V0dGluZ3MuanMiXSwibmFtZXMiOlsiS0JFbmdpbmUiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJfYnRuWVhPcGVuIiwidHlwZSIsIk5vZGUiLCJfYnRuWVhDbG9zZSIsIl9idG5ZWU9wZW4iLCJfYnRuWVlDbG9zZSIsIm9uQmdDbGlja2VkIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkxvYWQiLCJ3aW5kb3ciLCJBdWRpb01nciIsImxvZyIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsInJlZnJlc2hWb2x1bWUiLCJvblNsaWRlZCIsInNsaWRlciIsInBhcmVudCIsIm5hbWUiLCJzZXRTRlhWb2x1bWUiLCJwcm9ncmVzcyIsInNldEJHTVZvbHVtZSIsImluaXRCdXR0b25IYW5kbGVyIiwiYnRuIiwiYWRkQ2xpY2tFdmVudCIsImFjdGl2ZSIsInNmeFZvbHVtZSIsInl4Iiwid2lkdGgiLCJnZXRDb21wb25lbnQiLCJTbGlkZXIiLCJzY2FsZVgiLCJiZ21Wb2x1bWUiLCJ5eSIsIm9uQnRuQ2xpY2tlZCIsInBsYXlTRlgiLCJ0YXJnZXQiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJwbGF5ZXIiLCJhcHAiLCJsZWF2ZXJlcXVlc3QiLCJ1bkluc3RhbGxFdmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBQztBQUNQLGlCQUFRLElBREQ7QUFFUEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkQsS0FESDtBQUtSQyxJQUFBQSxXQUFXLEVB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QTZCLENBQTdCO0FBQ0EsV0FBS1AsYUFBTDtBQUNILEtBSEksTUFJQSxJQUFHUixLQUFLLENBQUM4QixNQUFOLENBQWFsQixJQUFiLElBQXFCLGNBQXhCLEVBQXVDO0FBQ3hDVCxNQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JXLFlBQWhCLENBQTZCLENBQTdCO0FBQ0EsV0FBS1AsYUFBTDtBQUNIO0FBQ0osR0FsSkksQ0FvSkw7QUFDQTtBQUVBOztBQXZKSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgS0JFbmdpbmUgPSByZXF1aXJlKFwia2JlbmdpbmVcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9idG5ZWE9wZW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9idG5ZWENsb3NlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfYnRuWVlPcGVuOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfYnRuWVlDbG9zZTp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgIGFkZENsaWNrRXZlbnQ6ZnVuY3Rpb24obm9kZSx0YXJnZXQsY29tcG9uZW50LGhhbmRsZXIpe1xyXG4gICAgICAgIGNjLmxvZyhjb21wb25lbnQgKyBcIjpcIiArIGhhbmRsZXIpO1xyXG4gICAgICAgIHZhciBldmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGV2ZW50SGFuZGxlci50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgZXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9IGhhbmRsZXI7XHJcblxyXG4gICAgICAgIHZhciBjbGlja0V2ZW50cyA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHM7XHJcbiAgICAgICAgY2xpY2tFdmVudHMucHVzaChldmVudEhhbmRsZXIpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgYWRkU2xpZGVFdmVudDpmdW5jdGlvbihub2RlLHRhcmdldCxjb21wb25lbnQsaGFuZGxlcil7XHJcbiAgICAgICAgdmFyIGV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZXZlbnRIYW5kbGVyLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICBldmVudEhhbmRsZXIuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgICAgIGV2ZW50SGFuZGxlci5oYW5kbGVyID0gaGFuZGxlcjtcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlRXZlbnRzID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5zbGlkZUV2ZW50cztcclxuICAgICAgICBzbGlkZUV2ZW50cy5wdXNoKGV2ZW50SGFuZGxlcik7XHJcbiAgICB9LFxyXG4gICAgKi9cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25CZ0NsaWNrZWQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYod2luZG93LkF1ZGlvTWdyPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIndpbmRvdy5BdWRpb01ncj09IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICBcclxuICBcclxuICAgICAgICB0aGlzLl9idG5ZWE9wZW4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ5aW54aWFvXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX3l4X29wZW5cIik7XHJcbiAgICAgICAgdGhpcy5fYnRuWVhDbG9zZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInlpbnhpYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5feXhfY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5fYnRuWVlPcGVuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwieWlueXVlXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX3l5X29wZW5cIik7XHJcbiAgICAgICAgdGhpcy5fYnRuWVlDbG9zZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInlpbnl1ZVwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl95eV9jbG9zZVwiKTtcclxuICAgICAgXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVm9sdW1lKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBvblNsaWRlZDpmdW5jdGlvbihzbGlkZXIpe1xyXG4gICAgICAgIGlmKHNsaWRlci5ub2RlLnBhcmVudC5uYW1lID09IFwieWlueGlhb1wiKXtcclxuICAgICAgICAgICAgd2luZG93LkF1ZGlvTWdyLnNldFNGWFZvbHVtZShzbGlkZXIucHJvZ3Jlc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHNsaWRlci5ub2RlLnBhcmVudC5uYW1lID09IFwieWlueXVlXCIpe1xyXG4gICAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3Iuc2V0QkdNVm9sdW1lKHNsaWRlci5wcm9ncmVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFZvbHVtZSgpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgaW5pdEJ1dHRvbkhhbmRsZXI6ZnVuY3Rpb24oYnRuKXtcclxuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnQoYnRuLHRoaXMubm9kZSxcIlNldHRpbmdzXCIsXCJvbkJ0bkNsaWNrZWRcIik7ICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICByZWZyZXNoVm9sdW1lOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYnRuWVhDbG9zZS5hY3RpdmUgPSB3aW5kb3cuQXVkaW9NZ3Iuc2Z4Vm9sdW1lID4gMDtcclxuICAgICAgICB0aGlzLl9idG5ZWE9wZW4uYWN0aXZlID0gIXRoaXMuX2J0bllYQ2xvc2UuYWN0aXZlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB5eCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInlpbnhpYW9cIik7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gNDMwICogd2luZG93LkF1ZGlvTWdyLnNmeFZvbHVtZTtcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSB5eC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzXCIpXHJcbiAgICAgICAgcHJvZ3Jlc3MuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSB3aW5kb3cuQXVkaW9NZ3Iuc2Z4Vm9sdW1lO1xyXG4gICAgICAgIC8vcHJvZ3Jlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzc1wiKS53aWR0aCA9IHdpZHRoOyBcclxuICAgICAgICBwcm9ncmVzcy5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzXCIpLnNjYWxlWCA9d2luZG93LkF1ZGlvTWdyLnNmeFZvbHVtZTsgXHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8veXguZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcHJvZ3Jlc3NcIikueCA9IHByb2dyZXNzLnggKyB3aWR0aDtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9idG5ZWUNsb3NlLmFjdGl2ZSA9IHdpbmRvdy5BdWRpb01nci5iZ21Wb2x1bWUgPiAwO1xyXG4gICAgICAgIHRoaXMuX2J0bllZT3Blbi5hY3RpdmUgPSAhdGhpcy5fYnRuWVlDbG9zZS5hY3RpdmU7XHJcbiAgICAgICAgdmFyIHl5ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwieWlueXVlXCIpO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IDQzMCAqIHdpbmRvdy5BdWRpb01nci5iZ21Wb2x1bWU7XHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0geXkuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzc1wiKTtcclxuICAgICAgICBwcm9ncmVzcy5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyA9d2luZG93LkF1ZGlvTWdyLmJnbVZvbHVtZTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9wcm9ncmVzcy5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzXCIpLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgcHJvZ3Jlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzc1wiKS5zY2FsZVggPSB3aW5kb3cuQXVkaW9NZ3IuYmdtVm9sdW1lO1xyXG4gICAgICAgIC8veXkuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcHJvZ3Jlc3NcIikueCA9IHByb2dyZXNzLnggKyB3aWR0aDtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uQnRuQ2xpY2tlZDpmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIC8vY2MubG9nKFwib25CdG5DbGlja2VkXCIsZXZlbnQudGFyZ2V0Lm5hbWUpXHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0Lm5hbWUgPT0gXCJidG5fY2xvc2VcIil7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZXZlbnQudGFyZ2V0Lm5hbWUgPT0gXCJidG5fZXhpdFwiKXtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid3hfYWNjb3VudFwiKTtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid3hfc2lnblwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBsYXllciA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuICAgICAgICAgICAgLy9pZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICAvLyAgICBwbGF5ZXIubGVhdmVyZXF1ZXN0KClcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTdGFydFNjZW5lXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvZ2lucmVzPW51bVxyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmxlYXZlcmVxdWVzdCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJzdGFydHNjZW5lPT09PndvcmRzY2VuZVwiKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTdGFydFNjZW5lXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIldvcmxkU2NlbmVcIikudW5JbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGV2ZW50LnRhcmdldC5uYW1lID09IFwiYnRuX3l4X29wZW5cIil7XHJcbiAgICAgICAgICAgIHdpbmRvdy5BdWRpb01nci5zZXRTRlhWb2x1bWUoMS4wKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVm9sdW1lKCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGV2ZW50LnRhcmdldC5uYW1lID09IFwiYnRuX3l4X2Nsb3NlXCIpe1xyXG4gICAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3Iuc2V0U0ZYVm9sdW1lKDApO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWb2x1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihldmVudC50YXJnZXQubmFtZSA9PSBcImJ0bl95eV9vcGVuXCIpe1xyXG4gICAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3Iuc2V0QkdNVm9sdW1lKDEpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWb2x1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihldmVudC50YXJnZXQubmFtZSA9PSBcImJ0bl95eV9jbG9zZVwiKXtcclxuICAgICAgICAgICAgd2luZG93LkF1ZGlvTWdyLnNldEJHTVZvbHVtZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVm9sdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iXX0=