"use strict";

var moduleMap = {
  'src/assets/scripts/cc_scripts/Common.js': function srcAssetsScriptsCc_scriptsCommonJs() {
    require('src/assets/scripts/cc_scripts/Common.js');
  },
  'src/project.js': function srcProjectJs() {
    require('src/project.js');
  }
};

window.__cocos_require__ = function (moduleName) {
  var func = moduleMap[moduleName];
  func && func();
};