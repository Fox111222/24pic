
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cc_scripts/WxBizDataCrypt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (Buffer){
"use strict";
cc._RF.push(module, '15870HT6MVABZBLo6y+58gV', 'WxBizDataCrypt');
// scripts/cc_scripts/WxBizDataCrypt.js

"use strict";

var crypto = require('crypto');

function WxBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WxBizDataCrypt.prototype.descrytData = function (encrypteData, iv) {
  var sessionKey = new Buffer(this.sessionKey, 'base64');
  encrypteData = new Buffer(encrypteData, 'base64');
  iv = new Buffer(iv, 'base64');

  try {
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    decipher.setAutoPadding(true);
    var decoded = decipher.update(encrypteData, 'binary', 'utf8');
    decoded += decipher["final"]('utf8');
    decoded = JSON.parse(decoded);
  } catch (err) {
    throw new Error(err.toString());
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('appid not equal');
  }

  return decoded;
};

module.exports = WxBizDataCrypt;

cc._RF.pop();

}).call(this,require("buffer").Buffer)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXHNjcmlwdHNcXGNjX3NjcmlwdHNcXFd4Qml6RGF0YUNyeXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBLFNBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQixVQUEvQixFQUEyQztBQUN2QyxPQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsT0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0g7O0FBRUQsY0FBYyxDQUFDLFNBQWYsQ0FBeUIsV0FBekIsR0FBdUMsVUFBUyxZQUFULEVBQXVCLEVBQXZCLEVBQTJCO0FBQzlELE1BQUksVUFBVSxHQUFHLElBQUksTUFBSixDQUFXLEtBQUssVUFBaEIsRUFBNEIsUUFBNUIsQ0FBakI7QUFDQSxFQUFBLFlBQVksR0FBRyxJQUFJLE1BQUosQ0FBVyxZQUFYLEVBQXlCLFFBQXpCLENBQWY7QUFDQSxFQUFBLEVBQUUsR0FBRyxJQUFJLE1BQUosQ0FBVyxFQUFYLEVBQWUsUUFBZixDQUFMOztBQUVBLE1BQUk7QUFDQSxRQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsYUFBeEIsRUFBdUMsVUFBdkMsRUFBbUQsRUFBbkQsQ0FBZjtBQUNBLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsSUFBeEI7QUFDQSxRQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBVCxDQUFnQixZQUFoQixFQUE4QixRQUE5QixFQUF3QyxNQUF4QyxDQUFkO0FBQ0EsSUFBQSxPQUFPLElBQUksUUFBUSxTQUFSLENBQWUsTUFBZixDQUFYO0FBQ0EsSUFBQSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxPQUFYLENBQVY7QUFDSCxHQU5ELENBTUUsT0FBTyxHQUFQLEVBQVk7QUFDVixVQUFNLElBQUksS0FBSixDQUFVLEdBQUcsQ0FBQyxRQUFKLEVBQVYsQ0FBTjtBQUNIOztBQUNELE1BQUcsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsS0FBbEIsS0FBNEIsS0FBSyxLQUFwQyxFQUEyQztBQUN2QyxVQUFNLElBQUksS0FBSixDQUFVLGlCQUFWLENBQU47QUFDSDs7QUFFRCxTQUFPLE9BQVA7QUFDSCxDQW5CRDs7QUFzQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbbnVsbF19