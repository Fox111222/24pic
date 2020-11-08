
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
      //console.log("cc.audioEngine.pauseAll");
      cc.audioEngine.pauseAll();
    });
    cc.game.on(cc.game.EVENT_SHOW, function () {
      //console.log("cc.audioEngine.resumeAll");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQXVkaW9NZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiZ21Wb2x1bWUiLCJzZnhWb2x1bWUiLCJiZ21BdWRpb0lEIiwiaW5pdCIsInQiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGFyc2VGbG9hdCIsImdhbWUiLCJvbiIsIkVWRU5UX0hJREUiLCJhdWRpb0VuZ2luZSIsInBhdXNlQWxsIiwiRVZFTlRfU0hPVyIsInJlc3VtZUFsbCIsImdldFVybCIsInVybCIsInN0b3BCR00iLCJsb2ciLCJzdG9wIiwicGxheUJHTSIsImF1ZGlvVXJsIiwic2VsZiIsImxvYWRlciIsImxvYWRSZXMiLCJBdWRpb0NsaXAiLCJlcnIiLCJjbGlwIiwicGxheSIsInBsYXlTRlgiLCJhdWRpb0lkIiwic2V0U0ZYVm9sdW1lIiwidiIsInNldEl0ZW0iLCJzZXRCR01Wb2x1bWUiLCJmb3JjZSIsInJlc3VtZSIsInBhdXNlIiwic2V0Vm9sdW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxTQUFTLEVBQUMsR0FYRjtBQVlSQyxJQUFBQSxTQUFTLEVBQUMsR0FaRjtBQWNSQyxJQUFBQSxVQUFVLEVBQUMsQ0FBQztBQWRKLEdBSFA7QUFvQkw7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsUUFBSUMsQ0FBQyxHQUFHUixFQUFFLENBQUNTLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsQ0FBUjs7QUFDQSxRQUFHSCxDQUFDLElBQUksSUFBUixFQUFhO0FBQ1QsV0FBS0osU0FBTCxHQUFp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Iiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIGJnbVZvbHVtZToxLjAsXHJcbiAgICAgICAgc2Z4Vm9sdW1lOjEuMCxcclxuICAgICAgICBcclxuICAgICAgICBiZ21BdWRpb0lEOi0xLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImJnbVZvbHVtZVwiKTtcclxuICAgICAgICBpZih0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmJnbVZvbHVtZSA9IHBhcnNlRmxvYXQodCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgdCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNmeFZvbHVtZVwiKTtcclxuICAgICAgICBpZih0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IHBhcnNlRmxvYXQodCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxcIik7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbFwiKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbiAgICBcclxuICAgIGdldFVybDpmdW5jdGlvbih1cmwpe1xyXG4gICAgICAgIC8vcmV0dXJuIGNjLnVybC5yYXcoXCJzb3VuZC9cIiArIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIFwic291bmQvXCIgKyB1cmxcclxuICAgIH0sXHJcbiAgICBzdG9wQkdNKCl7XHJcbiAgICAgICAgY2MubG9nKFwic3RvcEJHTXN0b3BCR01zdG9wQkdNc3RvcEJHTVwiKVxyXG4gICAgICAgIGlmKHRoaXMuYmdtQXVkaW9JRCA+PSAwKXtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbUF1ZGlvSUQpO1xyXG4gICAgICAgICAgICB0aGlzLmJnbUF1ZGlvSUQ9LTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBwbGF5QkdNKHVybCl7XHJcbiAgICAgICAgdmFyIGF1ZGlvVXJsID0gdGhpcy5nZXRVcmwodXJsKTtcclxuICAgICAgICBjYy5sb2coYXVkaW9VcmwpO1xyXG4gICAgICAgIGlmKHRoaXMuYmdtQXVkaW9JRCA+PSAwKXtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbUF1ZGlvSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuYmdtQXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9VcmwsdHJ1ZSx0aGlzLmJnbVZvbHVtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGF1ZGlvVXJsLGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24gKGVyciwgY2xpcCkge1xyXG4gICAgICAgICAgICBzZWxmLmJnbUF1ZGlvSUQ9Y2MuYXVkaW9FbmdpbmUucGxheShjbGlwLHRydWUsc2VsZi5iZ21Wb2x1bWUpO1xyXG4gICAgICAgICAgICAvL2NjLmxvZyhcIjg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OHNlbGYuYmdtQXVkaW9JRD1cIixzZWxmLmJnbUF1ZGlvSUQpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBwbGF5U0ZYKHVybCl7XHJcbiAgICAgICAgdmFyIGF1ZGlvVXJsID0gdGhpcy5nZXRVcmwodXJsKTtcclxuICAgICAgICBpZih0aGlzLnNmeFZvbHVtZSA+IDApe1xyXG4gICAgICAgICAgICAvL3ZhciBhdWRpb0lkID0gY2MuYXVkaW9FbmdpbmUucGxheShhdWRpb1VybCxmYWxzZSx0aGlzLnNmeFZvbHVtZSk7XHJcbiAgICAgICAgICAgIHZhciBzZWxmPXRoaXNcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoYXVkaW9VcmwsY2MuQXVkaW9DbGlwLCBmdW5jdGlvbiAoZXJyLCBjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXVkaW9JZD1jYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsZmFsc2Usc2VsZi5zZnhWb2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgLy9jYy5sb2coXCI4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhzZWxmLmJnbUF1ZGlvSUQ9XCIsc2VsZi5iZ21BdWRpb0lEKVxyXG4gICAgICAgICAgICB9KTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgc2V0U0ZYVm9sdW1lOmZ1bmN0aW9uKHYpe1xyXG4gICAgICAgIGlmKHRoaXMuc2Z4Vm9sdW1lICE9IHYpe1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZnhWb2x1bWVcIix2KTtcclxuICAgICAgICAgICAgdGhpcy5zZnhWb2x1bWUgPSB2O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHNldEJHTVZvbHVtZTpmdW5jdGlvbih2LGZvcmNlKXtcclxuICAgICAgICBpZih0aGlzLmJnbUF1ZGlvSUQgPj0gMCl7XHJcbiAgICAgICAgICAgIGlmKHYgPiAwKXtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZSh0aGlzLmJnbUF1ZGlvSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZSh0aGlzLmJnbUF1ZGlvSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKHRoaXMuYmdtQXVkaW9JRCx0aGlzLmJnbVZvbHVtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmdtVm9sdW1lICE9IHYgfHwgZm9yY2Upe1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJiZ21Wb2x1bWVcIix2KTtcclxuICAgICAgICAgICAgdGhpcy5iZ21Wb2x1bWUgPSB2O1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21BdWRpb0lELHYpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHBhdXNlQWxsOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGwoKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlc3VtZUFsbDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbCgpO1xyXG4gICAgfVxyXG59KTtcclxuIl19