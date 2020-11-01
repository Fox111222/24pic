
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scripts/AudioMgr');
require('./assets/scripts/Chat');
require('./assets/scripts/JoinGameInput');
require('./assets/scripts/RadioButton');
require('./assets/scripts/RadioGroupMgr');
require('./assets/scripts/Settings');
require('./assets/scripts/cc_scripts/GameOver');
require('./assets/scripts/cc_scripts/GameState');
require('./assets/scripts/cc_scripts/Seat');
require('./assets/scripts/cc_scripts/StartScene');
require('./assets/scripts/cc_scripts/WorldScene');
require('./assets/scripts/cc_scripts/WxBizDataCrypt');
require('./assets/scripts/cc_scripts/eval');
require('./assets/scripts/cc_scripts/eval2');
require('./assets/scripts/kbe_scripts/Avatar');
require('./assets/scripts/kbengine');

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