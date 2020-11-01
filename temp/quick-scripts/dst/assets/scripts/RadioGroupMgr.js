
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/RadioGroupMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7247+4OudImovSZdyqtrL0', 'RadioGroupMgr');
// scripts/RadioGroupMgr.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    _groups: null
  },
  // use this for initialization
  init: function init() {
    this._groups = {};
  },
  add: function add(radioButton) {
    var groupId = radioButton.groupId;
    var buttons = this._groups[groupId];

    if (buttons == null) {
      buttons = [];
      this._groups[groupId] = buttons;
    }

    buttons.push(radioButton);
  },
  del: function del(radioButton) {
    var groupId = radioButton.groupId;
    var buttons = this._groups[groupId];

    if (buttons == null) {
      return;
    }

    var idx = buttons.indexOf(radioButton);

    if (idx != -1) {
      buttons.splice(idx, 1);
    }

    if (buttons.length == 0) {
      delete this._groups[groupId];
    }
  },
  check: function check(radioButton) {
    var groupId = radioButton.groupId;
    var buttons = this._groups[groupId];

    if (buttons == null) {
      return;
    }

    for (var i = 0; i < buttons.length; ++i) {
      var btn = buttons[i];

      if (btn == radioButton) {
        btn.check(true);
      } else {
        btn.check(false);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUmFkaW9Hcm91cE1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9ncm91cHMiLCJpbml0IiwiYWRkIiwicmFkaW9CdXR0b24iLCJncm91cElkIiwiYnV0dG9ucyIsInB1c2giLCJkZWwiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwibGVuZ3RoIiwiY2hlY2siLCJpIiwiYnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsT0FBTyxFQUFDO0FBVkEsR0FIUDtBQWdCTDtBQUNBQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLRCxPQUFMLEdBQWUsRUFBZjtBQUNILEdBbkJJO0FBcUJMRSxFQUFBQSxHQUFHLEVBQUMsYUFBU0MsV0FBVCxFQUFxQjtBQUNyQixRQUFJQyxPQUFPLEdBQUdELFdBQVcsQ0FBQ0MsT0FBMUI7QUFDQSxRQUFJQyxPQUFPLEdBQUcsS0FBS0wsT0FBTCxDQUFhSSxPQUFiLENBQWQ7O0FBQ0EsUUFBR0MsT0FBTyxJQUFJLElBQWQsRUFBbUI7QUFDZkEsTUFBQUEsT0FBTyxHQUFHLEVBQVY7QUFDQSxXQUFLTCxPQUFMLENBQWFJLE9BQWIsSUFBd0JDLE9BQXhCO0FBQ0g7O0FBQ0RBLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhSCxXQUFiO0FBQ0gsR0E3Qkk7QUErQkxJLEVBQUFBLEdBQUcsRUFBQyxhQUFTSixXQUFULEVBQXFCO0FBQ3JCLFFBQUlDLE9BQU8sR0FBR0QsV0FBVyxDQUFDQyxPQUExQjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxLQUFLTCxPQUFMLENBQWFJLE9BQWIsQ0FBZDs7QUFDQSxRQUFHQyxPQUFPLElBQUksSUFBZCxFQUFtQjtBQUNmO0FBQ0g7O0FBQ0QsUUFBSUcsR0FBRyxHQUFHSCxPQUFPLENBQUNJLE9BQVIsQ0FBZ0JOLFdBQWhCLENBQVY7O0FBQ0EsUUFBR0ssR0FBRyxJQUFJLENBQUMsQ0FBWCxFQUFhO0FBQ1RILE1BQUFBLE9BQU8sQ0FBQ0ssTUFBUixDQUFlRixHQUFmLEVBQW1CLENBQW5CO0FBQ0g7O0FBQ0QsUUFBR0gsT0FBTyxDQUFDTSxNQUFSLElBQWtCLENBQXJCLEVBQXVCO0FBQ25CLGFBQU8sS0FBS1gsT0FBTCxDQUFhSSxPQUFiLENBQVA7QUFDSDtBQUNKLEdBNUNJO0FBOENMUSxFQUFBQSxLQUFLLEVBQUMsZUFBU1QsV0FBVCxFQUFxQjtBQUN2QixRQUFJQyxPQUFPLEdBQUdELFdBQVcsQ0FBQ0MsT0FBMUI7QUFDQSxRQUFJQyxPQUFPLEdBQUcsS0FBS0wsT0FBTCxDQUFhSSxPQUFiLENBQWQ7O0FBQ0EsUUFBR0MsT0FBTyxJQUFJLElBQWQsRUFBbUI7QUFDZjtBQUNIOztBQUNELFNBQUksSUFBSVEsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHUixPQUFPLENBQUNNLE1BQTNCLEVBQW1DLEVBQUVFLENBQXJDLEVBQXVDO0FBQ25DLFVBQUlDLEdBQUcsR0FBR1QsT0FBTyxDQUFDUSxDQUFELENBQWpCOztBQUNBLFVBQUdDLEdBQUcsSUFBSVgsV0FBVixFQUFzQjtBQUNsQlcsUUFBQUEsR0FBRyxDQUFDRixLQUFKLENBQVUsSUFBVjtBQUNILE9BRkQsTUFFSztBQUNERSxRQUFBQSxHQUFHLENBQUNGLEtBQUosQ0FBVSxLQUFWO0FBQ0g7QUFDSjtBQUNKLEdBNURJLENBOERMO0FBQ0E7QUFFQTs7QUFqRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgX2dyb3VwczpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2dyb3VwcyA9IHt9O1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgYWRkOmZ1bmN0aW9uKHJhZGlvQnV0dG9uKXtcclxuICAgICAgICB2YXIgZ3JvdXBJZCA9IHJhZGlvQnV0dG9uLmdyb3VwSWQ7IFxyXG4gICAgICAgIHZhciBidXR0b25zID0gdGhpcy5fZ3JvdXBzW2dyb3VwSWRdO1xyXG4gICAgICAgIGlmKGJ1dHRvbnMgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fZ3JvdXBzW2dyb3VwSWRdID0gYnV0dG9uczsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1dHRvbnMucHVzaChyYWRpb0J1dHRvbik7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBkZWw6ZnVuY3Rpb24ocmFkaW9CdXR0b24pe1xyXG4gICAgICAgIHZhciBncm91cElkID0gcmFkaW9CdXR0b24uZ3JvdXBJZDtcclxuICAgICAgICB2YXIgYnV0dG9ucyA9IHRoaXMuX2dyb3Vwc1tncm91cElkXTtcclxuICAgICAgICBpZihidXR0b25zID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaWR4ID0gYnV0dG9ucy5pbmRleE9mKHJhZGlvQnV0dG9uKTtcclxuICAgICAgICBpZihpZHggIT0gLTEpe1xyXG4gICAgICAgICAgICBidXR0b25zLnNwbGljZShpZHgsMSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGJ1dHRvbnMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JvdXBzW2dyb3VwSWRdICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY2hlY2s6ZnVuY3Rpb24ocmFkaW9CdXR0b24pe1xyXG4gICAgICAgIHZhciBncm91cElkID0gcmFkaW9CdXR0b24uZ3JvdXBJZDtcclxuICAgICAgICB2YXIgYnV0dG9ucyA9IHRoaXMuX2dyb3Vwc1tncm91cElkXTtcclxuICAgICAgICBpZihidXR0b25zID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7ICsraSl7XHJcbiAgICAgICAgICAgIHZhciBidG4gPSBidXR0b25zW2ldO1xyXG4gICAgICAgICAgICBpZihidG4gPT0gcmFkaW9CdXR0b24pe1xyXG4gICAgICAgICAgICAgICAgYnRuLmNoZWNrKHRydWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGJ0bi5jaGVjayhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIl19