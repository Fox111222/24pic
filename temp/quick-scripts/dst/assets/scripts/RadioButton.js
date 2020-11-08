
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/RadioButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b2b6Z2HphE2pSYy/hZDq4x', 'RadioButton');
// scripts/RadioButton.js

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
    target: cc.Node,
    sprite: cc.SpriteFrame,
    checkedSprite: cc.SpriteFrame,
    checked: false,
    groupId: -1
  },
  // use this for initialization
  onLoad: function onLoad() {
    if (window.radiogroupmgr == null) {
      var RadioGroupMgr = require("RadioGroupMgr");

      window.radiogroupmgr = new RadioGroupMgr();
      window.radiogroupmgr.init();
    } // console.log(typeof(cc.vv.radiogroupmgr.add));


    window.radiogroupmgr.add(this);
    this.refresh();
  },
  refresh: function refresh() {
    var targetSprite = this.target.getComponent(cc.Sprite);

    if (this.checked) {
      targetSprite.spriteFrame = this.checkedSprite;
    } else {
      targetSprite.spriteFrame = this.sprite;
    }
  },
  check: function check(value) {
    this.checked = value;
    this.refresh();
  },
  onClicked: function onClicked() {
    window.radiogroupmgr.check(this);
  },
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },
  onDestroy: function onDestroy() {
    if (window.radiogroupmgr) {
      window.radiogroupmgr.del(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUmFkaW9CdXR0b24uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0YXJnZXQiLCJOb2RlIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJjaGVja2VkU3ByaXRlIiwiY2hlY2tlZCIsImdyb3VwSWQiLCJvbkxvYWQiLCJ3aW5kb3ciLCJyYWRpb2dyb3VwbWdyIiwiUmFkaW9Hcm91cE1nciIsInJlcXVpcmUiLCJpbml0IiwiYWRkIiwicmVmcmVzaCIsInRhcmdldFNwcml0ZSIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiY2hlY2siLCJ2YWx1ZSIsIm9uQ2xpY2tlZCIsIm9uRGVzdHJveSIsImRlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLE1BQU0sRUFBQ0osRUFBRSxDQUFDSyxJQVZGO0FBV1JDLElBQUFBLE1BQU0sRUFBQ04sRUFBRSxDQUFDTyxXQVhGO0FBWVJDLElBQUFBLGFBQWEsRUFBQ1IsRUFBRSxDQUFDTyxXQVpUO0FBYVJFLElBQUFBLE9BQU8sRUFBQyxLQWJBO0FBY1JDLElBQUFBLE9BQU8sRUFBQyxDQUFDO0FBZEQsR0FIUDtBQW9CTDtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsUUFBR0MsTUFBTSxDQUFDQyxhQUFQLElBQXdCLElBQTNCLEVBQWdDO0FBQzVCLFVBQUlDLGFBQWEsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBQ0FILE1BQUFBLE1BQU0sQ0FBQ0MsYUFBUCxHQUF1QixJQUFJQyxhQUFKLEVBQXZCO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkcsSUFBckI7QUFDSCxLQUxlLENBTWpCOzs7QUFDQ0osSUFBQUEsTUFBTSxDQUFDQyxhQUFQLENBQXFCSSxHQUFyQixDQUF5QixJQUF6QjtBQUVBLFNBQUtDLE9BQUw7QUFDSCxHQS9CSTtBQWlDTEEsRUFBQUEsT0FBTyxFQUFDLG1CQUFVO0FBQ2QsUUFBSUMsWUFBWSxHQUFHLEtBQUtmLE1BQUwsQ0FBWWdCLFlBQVosQ0FBeUJwQixFQUFFLENBQUNxQixNQUE1QixDQUFuQjs7QUFDQSxRQUFHLEtBQUtaLE9BQVIsRUFBZ0I7QUFDWlUsTUFBQUEsWUFBWSxDQUFDRyxXQUFiLEdBQTJCLEtBQUtkLGFBQWhDO0FBQ0gsS0FGRCxNQUdJO0FBQ0FXLE1BQUFBLFlBQVksQ0FBQ0csV0FBYixHQUEyQixLQUFLaEIsTUFBaEM7QUFDSDtBQUNKLEdBekNJO0FBMkNMaUIsRUFBQUEsS0FBSyxFQUFDLGVBQVNDLEtBQVQsRUFBZTtBQUNqQixTQUFLZixPQUFMLEdBQWVlLEtBQWY7QUFDQSxTQUFLTixPQUFMO0FBQ0gsR0E5Q0k7QUFnRExPLEVBQUFBLFNBQVMsRUFBQyxxQkFBVTtBQUNoQmIsSUFBQUEsTUFBTSxDQUFDQyxhQUFQLENBQXFCVSxLQUFyQixDQUEyQixJQUEzQjtBQUNILEdBbERJO0FBb0RMO0FBQ0E7QUFFQTtBQUVBRyxFQUFBQSxTQUFTLEVBQUMscUJBQVU7QUFDaEIsUUFBR2QsTUFBTSxDQUFDQyxhQUFWLEVBQXdCO0FBQ3BCRCxNQUFBQSxNQUFNLENBQUNDLGFBQVAsQ0FBcUJjLEdBQXJCLENBQXlCLElBQXpCO0FBQ0g7QUFDSjtBQTdESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcclxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAuLi5cclxuICAgICAgICB0YXJnZXQ6Y2MuTm9kZSxcclxuICAgICAgICBzcHJpdGU6Y2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgY2hlY2tlZFNwcml0ZTpjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBjaGVja2VkOmZhbHNlLFxyXG4gICAgICAgIGdyb3VwSWQ6LTEsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYod2luZG93LnJhZGlvZ3JvdXBtZ3IgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBSYWRpb0dyb3VwTWdyID0gcmVxdWlyZShcIlJhZGlvR3JvdXBNZ3JcIik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yYWRpb2dyb3VwbWdyID0gbmV3IFJhZGlvR3JvdXBNZ3IoKTtcclxuICAgICAgICAgICAgd2luZG93LnJhZGlvZ3JvdXBtZ3IuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZihjYy52di5yYWRpb2dyb3VwbWdyLmFkZCkpO1xyXG4gICAgICAgIHdpbmRvdy5yYWRpb2dyb3VwbWdyLmFkZCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICByZWZyZXNoOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRhcmdldFNwcml0ZSA9IHRoaXMudGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tlZCl7XHJcbiAgICAgICAgICAgIHRhcmdldFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuY2hlY2tlZFNwcml0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGFyZ2V0U3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY2hlY2s6ZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25DbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LnJhZGlvZ3JvdXBtZ3IuY2hlY2sodGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbiAgICBcclxuICAgIG9uRGVzdHJveTpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHdpbmRvdy5yYWRpb2dyb3VwbWdyKXtcclxuICAgICAgICAgICAgd2luZG93LnJhZGlvZ3JvdXBtZ3IuZGVsKHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==