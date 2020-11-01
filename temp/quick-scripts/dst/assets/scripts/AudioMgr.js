
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/AudioMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6014MXhVRLIZlHDuERx+yd', 'AudioMgr');
// scripts/AudioMgr.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //    default: null,      // The default value will be used only when the component attaching
    //                           to a node for the first time
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    bgmVolume: 1.0,
    sfxVolume: 1.0,
    bgmAudioID: -1
  },
  // use this for initialization
  init: function init() {
    var t = cc.sys.localStorage.getItem("bgmVolume");

    if (t != null) {
      this.bgmVolume = parseFloat(t);
    }

    var t = cc.sys.localStorage.getItem("sfxVolume");

    if (t != null) {
      this.sfxVolume = parseFloat(t);
    }

    cc.game.on(cc.game.EVENT_HIDE, function () {
      console.log("cc.audioEngine.pauseAll");
      cc.audioEngine.pauseAll();
    });
    cc.game.on(cc.game.EVENT_SHOW, function () {
      console.log("cc.audioEngine.resumeAll");
      cc.audioEngine.resumeAll();
    });
  },
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },
  getUrl: function getUrl(url) {
    //return cc.url.raw("sound/" + url);
    return "sound/" + url;
  },
  stopBGM: function stopBGM() {
    cc.log("stopBGMstopBGMstopBGMstopBGM");

    if (this.bgmAudioID >= 0) {
      cc.audioEngine.stop(this.bgmAudioID);
      this.bgmAudioID = -1;
    }
  },
  playBGM: function playBGM(url) {
    var audioUrl = this.getUrl(url);
    cc.log(audioUrl);

    if (this.bgmAudioID >= 0) {
      cc.audioEngine.stop(this.bgmAudioID);
    } //this.bgmAudioID = cc.audioEngine.play(audioUrl,true,this.bgmVolume);


    var self = this;
    cc.loader.loadRes(audioUrl, cc.AudioClip, function (err, clip) {
      self.bgmAudioID = cc.audioEngine.play(clip, true, self.bgmVolume); //cc.log("888888888888888888888888888self.bgmAudioID=",self.bgmAudioID)
    });
  },
  playSFX: function playSFX(url) {
    var audioUrl = this.getUrl(url);

    if (this.sfxVolume > 0) {
      //var audioId = cc.audioEngine.play(audioUrl,false,this.sfxVolume);
      var self = this;
      cc.loader.loadRes(audioUrl, cc.AudioClip, function (err, clip) {
        var audioId = cc.audioEngine.play(clip, false, self.sfxVolume); //cc.log("888888888888888888888888888self.bgmAudioID=",self.bgmAudioID)
      });
    }
  },
  setSFXVolume: function setSFXVolume(v) {
    if (this.sfxVolume != v) {
      cc.sys.localStorage.setItem("sfxVolume", v);
      this.sfxVolume = v;
    }
  },
  setBGMVolume: function setBGMVolume(v, force) {
    if (this.bgmAudioID >= 0) {
      if (v > 0) {
        cc.audioEngine.resume(this.bgmAudioID);
      } else {
        cc.audioEngine.pause(this.bgmAudioID);
      } //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);

    }

    if (this.bgmVolume != v || force) {
      cc.sys.localStorage.setItem("bgmVolume", v);
      this.bgmVolume = v;
      cc.audioEngine.setVolume(this.bgmAudioID, v);
    }
  },
  pauseAll: function pauseAll() {
    cc.audioEngine.pauseAll();
  },
  resumeAll: function resumeAll() {
    cc.audioEngine.resumeAll();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQXVkaW9NZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiZ21Wb2x1bWUiLCJzZnhWb2x1bWUiLCJiZ21BdWRpb0lEIiwiaW5pdCIsInQiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGFyc2VGbG9hdCIsImdhbWUiLCJvbiIsIkVWRU5UX0hJREUiLCJjb25zb2xlIiwibG9nIiwiYXVkaW9FbmdpbmUiLCJwYXVzZUFsbCIsIkVWRU5UX1NIT1ciLCJyZXN1bWVBbGwiLCJnZXRVcmwiLCJ1cmwiLCJzdG9wQkdNIiwic3RvcCIsInBsYXlCR00iLCJhdWRpb1VybCIsInNlbGYiLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsInBsYXkiLCJwbGF5U0ZYIiwiYXVkaW9JZCIsInNldFNGWFZvbHVtZSIsInYiLCJzZXRJdGVtIiwic2V0QkdNVm9sdW1lIiwiZm9yY2UiLCJyZXN1bWUiLCJwYXVzZSIsInNldFZvbHVtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsU0FBUyxFQUFDLEdBWEY7QUFZUkMsSUFBQUEsU0FBUyxFQUFDLEdBWkY7QUFjUkMsSUFBQUEsVUFBVSxFQUFDLENBQUM7QUFkSixHQUhQO0FBb0JMO0FBQ0FDLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFFBQUlDLENBQUMsR0FBR1IsRUFBRSxDQUFDUyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFdBQTVCLENBQVI7O0FBQ0EsUUFBR0gsQ0FBQyxJQUFJLElBQVIsRUFBYTtBQUNULFdBQUtKLFNBQUwsR0FBaUJRLFVBQVUsQ0FBQ0osQ0FBRCxDQUEzQjtBQUNIOztBQUVELFFBQUlBLENBQUMsR0FBR1IsRUFBRSxDQUFDUyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFdBQTVCLENBQVI7O0FBQ0EsUUFBR0gsQ0FBQyxJQUFJLElBQVIsRUFBYTtBQUNULFdBQUtILFNBQUwsR0FBaUJPLFVBQVUsQ0FBQ0osQ0FBRCxDQUEzQjtBQUNIOztBQUVEUixJQUFBQSxFQUFFLENBQUNhLElBQUgsQ0FBUUMsRUFBUixDQUFXZCxFQUFFLENBQUNhLElBQUgsQ0FBUUUsVUFBbkIsRUFBK0IsWUFBWTtBQUN2Q0MsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkseUJBQVo7QUFDQWpCLE1BQUFBLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUMsUUFBZjtBQUNILEtBSEQ7QUFJQW5CLElBQUFBLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRQyxFQUFSLENBQVdkLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRTyxVQUFuQixFQUErQixZQUFZO0FBQ3ZDSixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWjtBQUNBakIsTUFBQUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFlRyxTQUFmO0FBQ0gsS0FIRDtBQUlILEdBeENJO0FBMENMO0FBQ0E7QUFFQTtBQUVBQyxFQUFBQSxNQUFNLEVBQUMsZ0JBQVNDLEdBQVQsRUFBYTtBQUNoQjtBQUNBLFdBQU8sV0FBV0EsR0FBbEI7QUFDSCxHQWxESTtBQW1ETEMsRUFBQUEsT0FuREsscUJBbURJO0FBQ0x4QixJQUFBQSxFQUFFLENBQUNpQixHQUFILENBQU8sOEJBQVA7O0FBQ0EsUUFBRyxLQUFLWCxVQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3BCTixNQUFBQSxFQUFFLENBQUNrQixXQUFILENBQWVPLElBQWYsQ0FBb0IsS0FBS25CLFVBQXpCO0FBQ0EsV0FBS0EsVUFBTCxHQUFnQixDQUFDLENBQWpCO0FBQ0g7QUFFSixHQTFESTtBQTJETG9CLEVBQUFBLE9BM0RLLG1CQTJER0gsR0EzREgsRUEyRE87QUFDUixRQUFJSSxRQUFRLEdBQUcsS0FBS0wsTUFBTCxDQUFZQyxHQUFaLENBQWY7QUFDQXZCLElBQUFBLEVBQUUsQ0FBQ2lCLEdBQUgsQ0FBT1UsUUFBUDs7QUFDQSxRQUFHLEtBQUtyQixVQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3BCTixNQUFBQSxFQUFFLENBQUNrQixXQUFILENBQWVPLElBQWYsQ0FBb0IsS0FBS25CLFVBQXpCO0FBQ0gsS0FMTyxDQU1SOzs7QUFFQSxRQUFJc0IsSUFBSSxHQUFDLElBQVQ7QUFDQTVCLElBQUFBLEVBQUUsQ0FBQzZCLE1BQUgsQ0FBVUMsT0FBVixDQUFrQkgsUUFBbEIsRUFBMkIzQixFQUFFLENBQUMrQixTQUE5QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLElBQWYsRUFBcUI7QUFDMURMLE1BQUFBLElBQUksQ0FBQ3RCLFVBQUwsR0FBZ0JOLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZWdCLElBQWYsQ0FBb0JELElBQXBCLEVBQXlCLElBQXpCLEVBQThCTCxJQUFJLENBQUN4QixTQUFuQyxDQUFoQixDQUQwRCxDQUUxRDtBQUNILEtBSEQ7QUFLSCxHQXpFSTtBQTJFTCtCLEVBQUFBLE9BM0VLLG1CQTJFR1osR0EzRUgsRUEyRU87QUFDUixRQUFJSSxRQUFRLEdBQUcsS0FBS0wsTUFBTCxDQUFZQyxHQUFaLENBQWY7O0FBQ0EsUUFBRyxLQUFLbEIsU0FBTCxHQUFpQixDQUFwQixFQUFzQjtBQUNsQjtBQUNBLFVBQUl1QixJQUFJLEdBQUMsSUFBVDtBQUNBNUIsTUFBQUEsRUFBRSxDQUFDNkIsTUFBSCxDQUFVQyxPQUFWLENBQWtCSCxRQUFsQixFQUEyQjNCLEVBQUUsQ0FBQytCLFNBQTlCLEVBQXlDLFVBQVVDLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUMxRCxZQUFJRyxPQUFPLEdBQUNwQyxFQUFFLENBQUNrQixXQUFILENBQWVnQixJQUFmLENBQW9CRCxJQUFwQixFQUF5QixLQUF6QixFQUErQkwsSUFBSSxDQUFDdkIsU0FBcEMsQ0FBWixDQUQwRCxDQUUxRDtBQUNILE9BSEQ7QUFJSDtBQUNKLEdBckZJO0FBdUZMZ0MsRUFBQUEsWUFBWSxFQUFDLHNCQUFTQyxDQUFULEVBQVc7QUFDcEIsUUFBRyxLQUFLakMsU0FBTCxJQUFrQmlDLENBQXJCLEVBQXVCO0FBQ25CdEMsTUFBQUEsRUFBRSxDQUFDUyxHQUFILENBQU9DLFlBQVAsQ0FBb0I2QixPQUFwQixDQUE0QixXQUE1QixFQUF3Q0QsQ0FBeEM7QUFDQSxXQUFLakMsU0FBTCxHQUFpQmlDLENBQWpCO0FBQ0g7QUFDSixHQTVGSTtBQThGTEUsRUFBQUEsWUFBWSxFQUFDLHNCQUFTRixDQUFULEVBQVdHLEtBQVgsRUFBaUI7QUFDMUIsUUFBRyxLQUFLbkMsVUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUNwQixVQUFHZ0MsQ0FBQyxHQUFHLENBQVAsRUFBUztBQUNMdEMsUUFBQUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFld0IsTUFBZixDQUFzQixLQUFLcEMsVUFBM0I7QUFDSCxPQUZELE1BR0k7QUFDQU4sUUFBQUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFleUIsS0FBZixDQUFxQixLQUFLckMsVUFBMUI7QUFDSCxPQU5tQixDQU9wQjs7QUFDSDs7QUFDRCxRQUFHLEtBQUtGLFNBQUwsSUFBa0JrQyxDQUFsQixJQUF1QkcsS0FBMUIsRUFBZ0M7QUFDNUJ6QyxNQUFBQSxFQUFFLENBQUNTLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQjZCLE9BQXBCLENBQTRCLFdBQTVCLEVBQXdDRCxDQUF4QztBQUNBLFdBQUtsQyxTQUFMLEdBQWlCa0MsQ0FBakI7QUFDQXRDLE1BQUFBLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZTBCLFNBQWYsQ0FBeUIsS0FBS3RDLFVBQTlCLEVBQXlDZ0MsQ0FBekM7QUFDSDtBQUNKLEdBN0dJO0FBK0dMbkIsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ2ZuQixJQUFBQSxFQUFFLENBQUNrQixXQUFILENBQWVDLFFBQWY7QUFDSCxHQWpISTtBQW1ITEUsRUFBQUEsU0FBUyxFQUFDLHFCQUFVO0FBQ2hCckIsSUFBQUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFlRyxTQUFmO0FBQ0g7QUFySEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIGJnbVZvbHVtZToxLjAsXHJcbiAgICAgICAgc2Z4Vm9sdW1lOjEuMCxcclxuICAgICAgICBcclxuICAgICAgICBiZ21BdWRpb0lEOi0xLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImJnbVZvbHVtZVwiKTtcclxuICAgICAgICBpZih0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmJnbVZvbHVtZSA9IHBhcnNlRmxvYXQodCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgdCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNmeFZvbHVtZVwiKTtcclxuICAgICAgICBpZih0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IHBhcnNlRmxvYXQodCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsXCIpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsXCIpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxuICAgIFxyXG4gICAgZ2V0VXJsOmZ1bmN0aW9uKHVybCl7XHJcbiAgICAgICAgLy9yZXR1cm4gY2MudXJsLnJhdyhcInNvdW5kL1wiICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gXCJzb3VuZC9cIiArIHVybFxyXG4gICAgfSxcclxuICAgIHN0b3BCR00oKXtcclxuICAgICAgICBjYy5sb2coXCJzdG9wQkdNc3RvcEJHTXN0b3BCR01zdG9wQkdNXCIpXHJcbiAgICAgICAgaWYodGhpcy5iZ21BdWRpb0lEID49IDApe1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKHRoaXMuYmdtQXVkaW9JRCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdtQXVkaW9JRD0tMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHBsYXlCR00odXJsKXtcclxuICAgICAgICB2YXIgYXVkaW9VcmwgPSB0aGlzLmdldFVybCh1cmwpO1xyXG4gICAgICAgIGNjLmxvZyhhdWRpb1VybCk7XHJcbiAgICAgICAgaWYodGhpcy5iZ21BdWRpb0lEID49IDApe1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKHRoaXMuYmdtQXVkaW9JRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5iZ21BdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheShhdWRpb1VybCx0cnVlLHRoaXMuYmdtVm9sdW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc2VsZj10aGlzXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoYXVkaW9VcmwsY2MuQXVkaW9DbGlwLCBmdW5jdGlvbiAoZXJyLCBjbGlwKSB7XHJcbiAgICAgICAgICAgIHNlbGYuYmdtQXVkaW9JRD1jYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsdHJ1ZSxzZWxmLmJnbVZvbHVtZSk7XHJcbiAgICAgICAgICAgIC8vY2MubG9nKFwiODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4c2VsZi5iZ21BdWRpb0lEPVwiLHNlbGYuYmdtQXVkaW9JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHBsYXlTRlgodXJsKXtcclxuICAgICAgICB2YXIgYXVkaW9VcmwgPSB0aGlzLmdldFVybCh1cmwpO1xyXG4gICAgICAgIGlmKHRoaXMuc2Z4Vm9sdW1lID4gMCl7XHJcbiAgICAgICAgICAgIC8vdmFyIGF1ZGlvSWQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGF1ZGlvVXJsLGZhbHNlLHRoaXMuc2Z4Vm9sdW1lKTtcclxuICAgICAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhhdWRpb1VybCxjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdWRpb0lkPWNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCxmYWxzZSxzZWxmLnNmeFZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OHNlbGYuYmdtQXVkaW9JRD1cIixzZWxmLmJnbUF1ZGlvSUQpXHJcbiAgICAgICAgICAgIH0pOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzZXRTRlhWb2x1bWU6ZnVuY3Rpb24odil7XHJcbiAgICAgICAgaWYodGhpcy5zZnhWb2x1bWUgIT0gdil7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNmeFZvbHVtZVwiLHYpO1xyXG4gICAgICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgc2V0QkdNVm9sdW1lOmZ1bmN0aW9uKHYsZm9yY2Upe1xyXG4gICAgICAgIGlmKHRoaXMuYmdtQXVkaW9JRCA+PSAwKXtcclxuICAgICAgICAgICAgaWYodiA+IDApe1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lKHRoaXMuYmdtQXVkaW9JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlKHRoaXMuYmdtQXVkaW9JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21BdWRpb0lELHRoaXMuYmdtVm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZ21Wb2x1bWUgIT0gdiB8fCBmb3JjZSl7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImJnbVZvbHVtZVwiLHYpO1xyXG4gICAgICAgICAgICB0aGlzLmJnbVZvbHVtZSA9IHY7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZSh0aGlzLmJnbUF1ZGlvSUQsdik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcGF1c2VBbGw6ZnVuY3Rpb24oKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmVzdW1lQWxsOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsKCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=