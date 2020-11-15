
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cc_scripts/StartScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '62733rhfrVBL4PocUv7yODO', 'StartScene');
// scripts/cc_scripts/StartScene.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var KBEngine = require("kbengine");

var WxBizDataCrypt = require("WxBizDataCrypt");

cc.Class({
  "extends": cc.Component,
  properties: {
    textinput_name: {
      "default": null,
      type: cc.EditBox
    },
    label_hint: {
      "default": null,
      type: cc.Label
    }
  },
  start: function start() {
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.getQuery();
    }
  },
  parseRoomID: function parseRoomID(nums) {
    //var str = "";
    nums.forEach(function (item, index) {
      nums[index] = parseInt(nums[index]);
    });
    return nums; //转成数字数组
  },
  getQuery: function getQuery() {
    var qData = {};
    var obj = wx.getLaunchOptionsSync();

    for (var s in obj.query) //obj.query={}
    {
      if (s == "Roomid") {
        qData.Roomid = obj.query[s];
        var string2Result = qData.Roomid.split(''); //字符串变成字符串数组

        window.roomIID = this.parseRoomID(string2Result);
      }

      if (s == "UserName") {
        qData.UserName = obj.query[s];
        window.invateAcountname = obj.query[s];
      }
    }

    return qData;
  },
  // LIFE-CYCLE CALLBACKS:
  EditBoxclick: function EditBoxclick() {
    cc.log("EditBoxclick");
    window.AudioMgr.playSFX("ui_click");
    this.userName = this.textinput_name.string;
  },
  update: function update(dt) {
    //this.sum=this.sum+dt;
    if (window.loginres == 0) {
      this.label_hint.string = "输入房间ID无效,请重新输入房号";
      this.label_hint.node.opacity = 255;
    } else if (window.loginres == 1) {
      this.label_hint.string = "房间已满！请重新输入房号";
      this.label_hint.node.opacity = 255;
    } //cc.log("roomid=", window.roomID)


    if (window.roomIID.length > 0) {
      this.btn_accept.active = true;
      this.btn_accept.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "确认接受" + window.invateAcountname + "的邀请！";

      if (this.flag == 0) {
        this.flag = 1;
        this.btn_accept.stopAllActions();
        var action1 = cc.scaleTo(0.5, 1.2); //渐显

        var action2 = cc.scaleTo(0.5, 1); //渐隐效果

        var repeat = cc.repeatForever(cc.sequence(action1, action2));
        this.btn_accept.runAction(repeat);
      } //this.btn_start.active=false;

      /*
      this.btn_accept.stopAllActions()
      var action1 = cc.scaleTo(0.5,1.2);//渐显
      var action2 = cc.scaleTo(0.5,1);//渐隐效果
      var repeat=cc.repeatForever(cc.sequence(action1,action2))
      this.btn_accept.runAction(repeat);
      */

    }
  },
  accept_wx: function accept_wx() {
    window.AudioMgr.playSFX("ui_click");
    this.btn_accept.active = false;
    this.btn_accept.stopAllActions();
    this.userName = cc.sys.localStorage.getItem("userName");
    this.joinPrivateRoominputcallback(window.roomIID);
  },
  onLoad: function onLoad() {
    this.flag = 0;
    this.initKbengine();
    this.installEvents();
    cc.loader.loadRes("prefab/JoinGame", cc.Prefab, function (err, prefab) {
      if (err) {
        cc.log("cc.loader.loadRes fail");
        return;
      } //cc.log("cc.loader.loadRes success")


      this.JoinGame = cc.instantiate(prefab);
      this.JoinGame.active = false;
      this.node.getChildByName("start_bg").addChild(this.JoinGame); //                this.FlyPoolDict[this.FlyPoolid]=newNode
      //                this.FlyPoolid++;
    }.bind(this));
    this.btn_start = this.node.getChildByName("start_bg").getChildByName("btn_start");
    this.btn_accept = this.node.getChildByName("start_bg").getChildByName("accept");
    this.btn_accept.active = false;
    this.btn_accept.stopAllActions(); //this.loadItemPrefab();
    //window.AudioMgr=this.node.addComponent("AudioMgr")

    if (window.AudioMgr == undefined) {
      var AudioMgr = require("AudioMgr");

      window.AudioMgr = new AudioMgr();
      window.AudioMgr.init();
      window.AudioMgr.bgmVolume = 0.5;
      window.AudioMgr.sfxVolume = 0.5;
    }

    window.AudioMgr.stopBGM();
    this.userName = cc.sys.platform != cc.sys.WECHAT_GAME ? this.randomstring(4) : ''; //this.btn_start.node.on('click', this.startGame, this);

    this.code = "";
    cc.director.preloadScene("WorldScene");

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.btn_start.active = false;
      this.textinput_name.node.active = false;
      this.enableWxShare();
      this.wxLoginNative(); //window.wc=true;
    } else {
      this.textinput_name.placeholder = "请输入你的昵称...";
      this.userName = this.textinput_name.string;
    } //window.AudioMgr.playBGM("bgm")


    cc.log("window.loginres=", window.loginres);
  },
  hello: function hello() {
    cc.log("hello world");
  },
  enableWxShare: function enableWxShare() {
    wx.showShareMenu();
    cc.loader.loadRes("sound/share", function (err, data) {
      // wx.shareAppMessage({   //打开小游戏自动分享
      wx.onShareAppMessage(function (res) {
        return {
          title: "24点 智力小PK",
          imageUrl: data.url,
          //query: "Roomid=" + self.roomKeyc + "&UserName=" + KBEngine.app.entities[KBEngine.app.player().id].accountName,// 别人点击链接时会得到的数据
          //query: "nick=" + nick + "&gender=" + gender + "&city=" + city,
          //query:"Roomid="+ self.roomKeyc+"&UserName="+ KBEngine.app.entities[KBEngine.app.player().id].accountName,
          success: function success(res) {
            cc.log("分享成功" + res); //this.yaoqing.active=false                      
          },
          fail: function fail(res) {
            cc.log("分享失败" + res); //this.yaoqing.active=true
          }
        };
      });
    });
  },
  wxLoginNative: function wxLoginNative() {
    this.btn_start.active = true;
    var self = this;
    wx.login({
      success: function success(res) {
        if (res.code) {
          //sself.code = res.code;
          cc.sys.localStorage.setItem("userName", res.code);
          cc.log("wxLoginNative success");
          var sself = self; //在用户未授权过的情况下调用此接口，将不再出现授权弹窗，会直接进入 fail 回调

          wx.getUserInfo({
            withCredentials: 1,
            success: function success(res) {
              sself.btn_start.active = true; //sself.userName = this.code;                            

              cc.sys.localStorage.setItem("encryptedData", res.encryptedData);
              cc.sys.localStorage.setItem("iv", res.iv);
              cc.log("wxLoginNative() encryptedData && iv", res.encryptedData, res.iv);
            },
            fail: function fail(res) {
              cc.log("wx.getuserinfo fail"); //获取视图窗口可见区域尺寸

              var visibleSize = cc.view.getVisibleSize(); //获取系统信息

              var wx_size = wx.getSystemInfoSync(); //计算实际大小和可见区域尺寸的比例（这里以宽度为准）

              var size_scale_width = wx_size.screenHeight / visibleSize.height;
              var x = visibleSize.width / 2 * size_scale_width - 125 * size_scale_width;
              var y = visibleSize.height / 2 * size_scale_width;
              var width = 250 * size_scale_width;
              var height = 60 * size_scale_width;
              sself.btnAuthorize = wx.createUserInfoButton({
                type: 'text',
                text: '点击微信登陆授权',
                style: {
                  left: x,
                  top: y,
                  width: width,
                  height: height,
                  lineHeight: height,
                  backgroundColor: "#ffffff",
                  color: "#3296fa",
                  textAlign: "center",
                  fontSize: 16,
                  borderRadius: 0
                }
              });
              sself.btnAuthorize.onTap(function (uinfo) {
                var sf = sself;
                console.log("onTap uinfo: ", uinfo);

                if (uinfo.errMsg == "getUserInfo:ok") {
                  console.log("wxLogin auth success");
                  wx.showToast({
                    title: "授权成功"
                  });
                  cc.sys.localStorage.setItem("encryptedData", uinfo.encryptedData);
                  cc.sys.localStorage.setItem("iv", uinfo.iv); //sf.label_hint.string = "uinfo.encryptedData="+uinfo.encryptedData+"/"+uinfo.iv;

                  sf.label_hint.string = uinfo.encryptedData;
                  sf.btn_start.active = true;
                } else {
                  console.log("wxLogin auth fail");
                  wx.showToast({
                    title: "授权失败"
                  });
                }

                sf.btnAuthorize.hide(); //获取用户信息成功后隐藏按钮
              });
            }
          });
        }
      }
    });
  },
  randomstring: function randomstring(L) {
    var s = '';

    var randomchar = function randomchar() {
      var n = Math.floor(Math.random() * 62);
      if (n < 10) return n; //0-9

      if (n < 36) return String.fromCharCode(n + 55); //A-Z

      return String.fromCharCode(n + 61); //a-z
    };

    while (s.length < L) {
      s += randomchar();
    }

    return s;
  },
  initKbengine: function initKbengine() {
    var args = new KBEngine.KBEngineArgs();
    args.ip = SERVER_IP;
    args.port = SERVER_PORT;
    args.isWss = IS_USE_WSS; //是否用wss协议， true:wss  false:ws

    args.isByIP = LOGIN_BY_IP; //用ip还是用域名登录服务器   有修改官方的kbengine.js

    args.serverURL = SERVER_URL;
    KBEngine.create(args);
  },
  installEvents: function installEvents() {
    KBEngine.Event.register("onConnectionState", this, "onConnectionState");
    KBEngine.Event.register("onConnectionState2", this, "onConnectionState2");
    KBEngine.Event.register("onLoginFailed", this, "onLoginFailed");
    KBEngine.Event.register("onLoginBaseappFailed", this, "onLoginBaseappFailed");
    KBEngine.Event.register("enterScene", this, "enterScene");
    KBEngine.Event.register("onReloginBaseappFailed", this, "onReloginBaseappFailed");
    KBEngine.Event.register("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
    KBEngine.Event.register("onLoginBaseapp", this, "onLoginBaseapp");
    KBEngine.Event.register("onSetSpaceData", this, "onSetSpaceData");
  },
  unInstallEvents: function unInstallEvents() {
    KBEngine.Event.deregister("onConnectionState", this, "onConnectionState");
    KBEngine.Event.deregister("onConnectionState2", this, "onConnectionState2");
    KBEngine.Event.deregister("onLoginFailed", this, "onLoginFailed");
    KBEngine.Event.deregister("onLoginBaseappFailed", this, "onLoginBaseappFailed");
    KBEngine.Event.deregister("enterScene", this, "enterScene");
    KBEngine.Event.deregister("onReloginBaseappFailed", this, "onReloginBaseappFailed");
    KBEngine.Event.deregister("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
    KBEngine.Event.deregister("onLoginBaseapp", this, "onLoginBaseapp");
    KBEngine.Event.deregister("onSetSpaceData", this, "onSetSpaceData");
  },
  onConnectionState: function onConnectionState(success) {
    var logStr = "";

    if (!success) {
      logStr = " Connect(" + KBEngine.app.ip + ":" + KBEngine.app.port + ") is error! (连接错误)";
      this.btn_start.active = true;
      this.label_hint.string = "连接错误onerror_before_onopen";
    } else {
      logStr = "Connect successfully, please wait...(连接成功，请等候...)";
    }

    KBEngine.INFO_MSG(logStr);
  },
  onConnectionState2: function onConnectionState2(success) {
    var logStr = "";

    if (!success) {
      logStr = " Connect(" + KBEngine.app.ip + ":" + KBEngine.app.port + ") is error! (连接错误)";
      this.btn_start.active = true;
      this.label_hint.string = "连接错误socket not is null";
    } else {
      logStr = "Connect successfully, please wait...(连接成功，请等候...)";
    }

    KBEngine.INFO_MSG(logStr);
  },
  onLoginFailed: function onLoginFailed(failedcode) {
    var logStr = '';

    if (failedcode == 20) {
      logStr = "Login is failed(登陆失败), err=" + KBEngine.app.serverErr(failedcode) + ", " + KBEngine.app.serverdatas;
    } else {
      logStr = "Login is failed(登陆失败), err=" + KBEngine.app.serverErr(failedcode);
    }

    this.label_hint.string = "登陆失败," + KBEngine.app.serverErr(failedcode);
    this.btn_start.active = true;
    KBEngine.INFO_MSG(logStr);
  },
  onReloginBaseappFailed: function onReloginBaseappFailed(failedcode) {
    this.btn_start.active = true;
    KBEngine.INFO_MSG("reogin is failed(断线重连失败), err=" + KBEngine.app.serverErr(failedcode));
  },
  onReloginBaseappSuccessfully: function onReloginBaseappSuccessfully() {
    KBEngine.INFO_MSG("reogin is successfully!(断线重连成功!)");
  },
  onLoginBaseappFailed: function onLoginBaseappFailed(failedcode) {
    this.btn_start.active = true;
    KBEngine.INFO_MSG("LoginBaseapp is failed(登陆网关失败), err=" + KBEngine.app.serverErr(failedcode));
  },
  decodeEncryptedData: function decodeEncryptedData() {
    var encryptedData = cc.sys.localStorage.getItem("encryptedData");
    var sessionKey = cc.sys.localStorage.getItem("sessionKey");
    var iv = cc.sys.localStorage.getItem("iv");
    KBEngine.INFO_MSG("decodeEncryptedData: encryptedData=" + encryptedData + " ,iv=" + iv + " ,sessionKey=" + sessionKey);

    if (sessionKey && encryptedData && iv) {
      //var pc = new WxBizDataCrypt(APPID, sessionKey);
      var pc = new WxBizDataCrypt("wxbe1644556ed8afa6", "96c0e22af25571db5f175ebbb550e672");
      var data = pc.descrytData(encryptedData, iv);
      console.log('解密后 data: ', data);
    }
  },
  onSetSpaceData: function onSetSpaceData() {
    cc.log("startscene.onSetSpaceData");
  },
  enterScene: function enterScene() {
    var _this = this;

    KBEngine.INFO_MSG("Login is successfully!(登陆成功!)");
    this.label_hint.string = "登陆成功 !!!";

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      var player = KBEngine.app.player();
      var encryptedData = cc.sys.localStorage.getItem("encryptedData");
      var iv = cc.sys.localStorage.getItem("iv");
      cc.log("encryptedData && iv", encryptedData, iv);
      this.label_hint.string = "base.decodeEncryptedData()=" + encryptedData + "/" + iv;
      player.decodeEncryptedData();
    } //var player = KBEngine.app.player();//KBEngine.app.entities[KBEngine.app.entity_id];    
    //player.joinRoom()


    cc.director.loadScene("WorldScene", function () {
      KBEngine.INFO_MSG("load world scene finished");
      var player = KBEngine.app.player(); //KBEngine.app.entities[KBEngine.app.entity_id];
      //window.type=1

      if (player) {
        if (window.type == 1) {
          player.joinRoom();
        }

        if (window.type == 2) {
          player.createPrivateRoom();
        }

        if (window.type == 3 && window.roomIID.length > 0) {
          player.joinPrivateRoom(window.roomIID);
        }
      }

      window.roomIID = [];

      _this.unInstallEvents();
    });
  },
  onLoginBaseapp: function onLoginBaseapp() {
    cc.log("Connect to loginBaseapp, please wait...(连接到网关， 请稍后...)");
  },
  Loginapp_importClientMessages: function Loginapp_importClientMessages() {
    this.label_hint.string = "登陆中 ... ...";
    cc.log("Loginapp_importClientMessages ...");
  },
  Baseapp_importClientMessages: function Baseapp_importClientMessages() {
    cc.log("Baseapp_importClientMessages ..");
  },
  Baseapp_importClientEntityDef: function Baseapp_importClientEntityDef() {
    cc.log("Baseapp_importClientEntityDef ..");
  },
  createDictString: function createDictString(dic) {
    var dictString = "";
    var len = 0;

    for (var pro in dic) {
      len++;
    }

    if (len > 0) {
      var index = 0;
      var dictString = "{";

      for (var prop in dic) {
        dictString += "'" + prop + "'";
        dictString += ":";
        dictString += "'" + dic[prop] + "'";

        if (index == len - 1) {
          dictString += "}";
        } else {
          dictString += ",";
        }

        index++;
      }
    }

    return dictString;
  },
  startGame: function startGame(event) {
    window.loginres = 100;
    window.AudioMgr.playSFX("ui_click"); //cc.log("cc.sys.platform",cc.sys.platform,cc.sys.WECHAT_GAME)

    window.type = 1;

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.userName = cc.sys.localStorage.getItem("userName");
    }

    if (this.userName.length == 0) {
      this.label_hint.string = "用户名不能为空";
      return;
    }

    cc.log("this.userName=", this.userName);
    var datas = {};
    datas["platform"] = cc.sys.platform;
    datas = this.createDictString(datas);
    KBEngine.INFO_MSG("login name=" + this.userName);
    KBEngine.Event.fire("login", this.userName, "123456", datas);
    this.label_hint.string = "登陆中 ... ...";
    this.btn_start.active = false;
  },
  createPrivateRoom: function createPrivateRoom(event) {
    window.loginres = 100;
    window.type = 2;
    window.AudioMgr.playSFX("ui_click"); //cc.log("cc.sys.platform",cc.sys.platform,cc.sys.WECHAT_GAME)

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.userName = cc.sys.localStorage.getItem("userName");
    }

    if (this.userName.length == 0) {
      this.label_hint.string = "用户名不能为空";
      return;
    }

    cc.log("this.userName=", this.userName);
    var datas = {};
    datas["platform"] = cc.sys.platform;
    datas = this.createDictString(datas);
    KBEngine.INFO_MSG("login name=" + this.userName); //var temp1=UnicodeToUtf8(this.userName)
    //this.userName =java.net.URLDecoder.decode(temp,"UTF-8"); 
    //this.userName =Utf8ToUnicode(temp1)
    //cc.log("this.userName=",this.userName)  

    KBEngine.Event.fire("login", this.userName, "123456", datas);
    this.label_hint.string = "登陆中 ... ...";
    this.btn_start.active = false;
  },
  joinPrivateRoominputcallback: function joinPrivateRoominputcallback(roomId) {
    //参数是数组
    window.type = 3;
    window.loginres = 100;
    window.roomIID = roomId;
    if (this.JoinGame) this.JoinGame.active = false; //////////////////////////////////////////////////

    cc.log("this.userName=", this.userName, roomId);
    var datas = {};
    datas["platform"] = cc.sys.platform;
    datas = this.createDictString(datas);
    KBEngine.INFO_MSG("login name=" + this.userName);
    KBEngine.Event.fire("login", this.userName, "123456", datas);
    this.label_hint.string = "登陆中 ... ...";
    this.btn_start.active = false;
  },
  joinPrivateRoom: function joinPrivateRoom(event) {
    window.AudioMgr.playSFX("ui_click"); //cc.log("cc.sys.platform",cc.sys.platform,cc.sys.WECHAT_GAME)

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.userName = cc.sys.localStorage.getItem("userName");
    }

    if (this.userName.length == 0) {
      this.label_hint.string = "用户名不能为空";
      return;
    }

    this.JoinGame.active = true; ///////////////////////////////////////////////////
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcU3RhcnRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJXeEJpekRhdGFDcnlwdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGV4dGlucHV0X25hbWUiLCJ0eXBlIiwiRWRpdEJveCIsImxhYmVsX2hpbnQiLCJMYWJlbCIsInN0YXJ0Iiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRSIsImdldFF1ZXJ5IiwicGFyc2VSb29tSUQiLCJudW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInBhcnNlSW50IiwicURhdGEiLCJvYmoiLCJ3eCIsImdldExhdW5jaE9wdGlvbnNTeW5jIiwicyIsInF1ZXJ5IiwiUm9vbWlkIiwic3RyaW5nMlJlc3VsdCIsInNwbGl0Iiwid2luZG93Iiwicm9vbUlJRCIsIlVzZXJOYW1lIiwiaW52YXRlQWNvdW50bmFtZSIsIkVkaXRCb3hjbGljayIsImxvZyIsIkF1ZGlvTWdyIiwicGxheVNGWCIsInVzZXJOYW1lIiwic3RyaW5nIiwidXBkYXRlIiwiZHQiLCJsb2dpbnJlcyIsIm5vZGUiLCJvcGFjaXR5IiwibGVuZ3RoIiwiYnRuX2FjY2VwdCIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiZmxhZyIsInN0b3BBbGxBY3Rpb25zIiwiYWN0aW9uMSIsInNjYWxlVG8iLCJhY3Rpb24yIiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwiYWNjZXB0X3d4IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2siLCJvbkxvYWQiLCJpbml0S2JlbmdpbmUiLCJpbnN0YWxsRXZlbnRzIiwibG9hZGVyIiwibG9hZFJlcyIsIlByZWZhYiIsImVyciIsInByZWZhYiIsIkpvaW5HYW1lIiwiaW5zdGFudGlhdGUiLCJhZGRDaGlsZCIsImJpbmQiLCJidG5fc3RhcnQiLCJ1bmRlZmluZWQiLCJpbml0IiwiYmdtVm9sdW1lIiwic2Z4Vm9sdW1lIiwic3RvcEJHTSIsInJhbmRvbXN0cmluZyIsImNvZGUiLCJkaXJlY3RvciIsInByZWxvYWRTY2VuZSIsImVuYWJsZVd4U2hhcmUiLCJ3eExvZ2luTmF0aXZlIiwicGxhY2Vob2xkZXIiLCJoZWxsbyIsInNob3dTaGFyZU1lbnUiLCJkYXRhIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJyZXMiLCJ0aXRsZSIsImltYWdlVXJsIiwidXJsIiwic3VjY2VzcyIsImZhaWwiLCJzZWxmIiwibG9naW4iLCJzZXRJdGVtIiwic3NlbGYiLCJnZXRVc2VySW5mbyIsIndpdGhDcmVkZW50aWFscyIsImVuY3J5cHRlZERhdGEiLCJpdiIsInZpc2libGVTaXplIiwidmlldyIsImdldFZpc2libGVTaXplIiwid3hfc2l6ZSIsImdldFN5c3RlbUluZm9TeW5jIiwic2l6ZV9zY2FsZV93aWR0aCIsInNjcmVlbkhlaWdodCIsImhlaWdodCIsIngiLCJ3aWR0aCIsInkiLCJidG5BdXRob3JpemUiLCJjcmVhdGVVc2VySW5mb0J1dHRvbiIsInRleHQiLCJzdHlsZSIsImxlZnQiLCJ0b3AiLCJsaW5lSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImJvcmRlclJhZGl1cyIsIm9uVGFwIiwidWluZm8iLCJzZiIsImNvbnNvbGUiLCJlcnJNc2ciLCJzaG93VG9hc3QiLCJoaWRlIiwiTCIsInJhbmRvbWNoYXIiLCJuIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXJncyIsIktCRW5naW5lQXJncyIsImlwIiwiU0VSVkVSX0lQIiwicG9ydCIsIlNFUlZFUl9QT1JUIiwiaXNXc3MiLCJJU19VU0VfV1NTIiwiaXNCeUlQIiwiTE9HSU5fQllfSVAiLCJzZXJ2ZXJVUkwiLCJTRVJWRVJfVVJMIiwiY3JlYXRlIiwiRXZlbnQiLCJyZWdpc3RlciIsInVuSW5zdGFsbEV2ZW50cyIsImRlcmVnaXN0ZXIiLCJvbkNvbm5lY3Rpb25TdGF0ZSIsImxvZ1N0ciIsImFwcCIsIklORk9fTVNHIiwib25Db25uZWN0aW9uU3RhdGUyIiwib25Mb2dpbkZhaWxlZCIsImZhaWxlZGNvZGUiLCJzZXJ2ZXJFcnIiLCJzZXJ2ZXJkYXRhcyIsIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWQiLCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5Iiwib25Mb2dpbkJhc2VhcHBGYWlsZWQiLCJkZWNvZGVFbmNyeXB0ZWREYXRhIiwic2Vzc2lvbktleSIsInBjIiwiZGVzY3J5dERhdGEiLCJvblNldFNwYWNlRGF0YSIsImVudGVyU2NlbmUiLCJwbGF5ZXIiLCJsb2FkU2NlbmUiLCJqb2luUm9vbSIsImNyZWF0ZVByaXZhdGVSb29tIiwiam9pblByaXZhdGVSb29tIiwib25Mb2dpbkJhc2VhcHAiLCJMb2dpbmFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyIsIkJhc2VhcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMiLCJCYXNlYXBwX2ltcG9ydENsaWVudEVudGl0eURlZiIsImNyZWF0ZURpY3RTdHJpbmciLCJkaWMiLCJkaWN0U3RyaW5nIiwibGVuIiwicHJvIiwicHJvcCIsInN0YXJ0R2FtZSIsImV2ZW50IiwiZGF0YXMiLCJmaXJlIiwicm9vbUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsY0FBYyxHQUFHRCxPQUFPLENBQUMsZ0JBQUQsQ0FBNUI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxjQUFjLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhDLE1B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QUEzQjtBQUNBd0wsSUFBQUEsS0FBSyxHQUFHLEtBQUtSLGdCQUFMLENBQXNCUSxLQUF0QixDQUFSO0FBQ0F0TSxJQUFBQSxRQUFRLENBQUNzSyxRQUFULENBQWtCLGdCQUFnQixLQUFLOUgsUUFBdkM7QUFFQXhDLElBQUFBLFFBQVEsQ0FBQytKLEtBQVQsQ0FBZXdDLElBQWYsQ0FBb0IsT0FBcEIsRUFBNkIsS0FBSy9KLFFBQWxDLEVBQTRDLFFBQTVDLEVBQXNEOEosS0FBdEQ7QUFDQSxTQUFLNUwsVUFBTCxDQUFnQitCLE1BQWhCLEdBQXlCLGFBQXpCO0FBQ0EsU0FBS29DLFNBQUwsQ0FBZTVCLE1BQWYsR0FBd0IsS0FBeEI7QUFFRixHQTlnQkM7QUErZ0JGd0ksRUFBQUEsZUFBZSxFQUFFLHlCQUFVWSxLQUFWLEVBQWlCO0FBRWhDckssSUFBQUEsTUFBTSxDQUFDTSxRQUFQLENBQWdCQyxPQUFoQixDQUF3QixVQUF4QixFQUZnQyxDQUcvQjs7QUFHQSxRQUFHcEMsRUFBRSxDQUFDVSxHQUFILENBQU9DLFFBQVAsSUFBbUJYLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPRSxXQUE3QixFQUF5QztBQUNyQyxXQUFLeUIsUUFBTCxHQUFjckMsRUFBRSxDQUFDVSxHQUFILENBQU9pRCxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFkO0FBQ0g7O0FBQ0QsUUFBRyxLQUFLdkIsUUFBTCxDQUFjTyxNQUFkLElBQXdCLENBQTNCLEVBQ0E7QUFDSSxXQUFLckMsVUFBTCxDQUFnQitCLE1BQWhCLEdBQXlCLFNBQXpCO0FBQ0E7QUFDSDs7QUFDRCxTQUFLZ0MsUUFBTCxDQUFjeEIsTUFBZCxHQUFxQixJQUFyQixDQWQrQixDQWUvQjtBQUlGO0FBbGlCQyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbnZhciBLQkVuZ2luZSA9IHJlcXVpcmUoXCJrYmVuZ2luZVwiKTtcclxudmFyIFd4Qml6RGF0YUNyeXB0ID0gcmVxdWlyZShcIld4Qml6RGF0YUNyeXB0XCIpO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB0ZXh0aW5wdXRfbmFtZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGFiZWxfaGludDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UXVlcnkoKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJzZVJvb21JRDpmdW5jdGlvbihudW1zKXtcclxuICAgICAgICAvL3ZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIG51bXMuZm9yRWFjaCgoaXRlbSxpbmRleCkgPT57XHJcblx0ICAgICAgICBudW1zW2luZGV4XSA9IHBhcnNlSW50KG51bXNbaW5kZXhdKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG51bXM7IC8v6L2s5oiQ5pWw5a2X5pWw57uEXHJcbiAgICB9LFxyXG4gICAgZ2V0UXVlcnk6ZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHFEYXRhID0ge307XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB3eC5nZXRMYXVuY2hPcHRpb25zU3luYygpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzIGluIG9iai5xdWVyeSkgLy9vYmoucXVlcnk9e31cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYocyA9PSBcIlJvb21pZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBxRGF0YS5Sb29taWQgPSBvYmoucXVlcnlbc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMlJlc3VsdCA9IHFEYXRhLlJvb21pZC5zcGxpdCgnJykgLy/lrZfnrKbkuLLlj5jmiJDlrZfnrKbkuLLmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucm9vbUlJRD10aGlzLnBhcnNlUm9vbUlEKHN0cmluZzJSZXN1bHQpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocyA9PSBcIlVzZXJOYW1lXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHFEYXRhLlVzZXJOYW1lID0gb2JqLnF1ZXJ5W3NdO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5pbnZhdGVBY291bnRuYW1lPW9iai5xdWVyeVtzXVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBxRGF0YTtcclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIEVkaXRCb3hjbGljazpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLmxvZyhcIkVkaXRCb3hjbGlja1wiKVxyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLnVzZXJOYW1lPXRoaXMudGV4dGlucHV0X25hbWUuc3RyaW5nXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uKGR0KXtcclxuICAgICAgICAvL3RoaXMuc3VtPXRoaXMuc3VtK2R0O1xyXG4gICAgICAgIGlmKHdpbmRvdy5sb2dpbnJlcz09MCl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui+k+WFpeaIv+mXtElE5peg5pWILOivt+mHjeaWsOi+k+WFpeaIv+WPt1wiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHdpbmRvdy5sb2dpbnJlcz09MSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIuaIv+mXtOW3sua7oe+8geivt+mHjeaWsOi+k+WFpeaIv+WPt1wiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhcInJvb21pZD1cIiwgd2luZG93LnJvb21JRClcclxuICAgICAgICBpZih3aW5kb3cucm9vbUlJRC5sZW5ndGggPjApeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgIHRoaXMuYnRuX2FjY2VwdC5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIuehruiupOaOpeWPl1wiKyB3aW5kb3cuaW52YXRlQWNvdW50bmFtZSArXCLnmoTpgoDor7fvvIFcIlxyXG4gICAgICAgICAgIGlmKHRoaXMuZmxhZz09MCl7XHJcbiAgICAgICAgICAgIHRoaXMuZmxhZz0xXHJcbiAgICAgICAgICAgIHRoaXMuYnRuX2FjY2VwdC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24xID0gY2Muc2NhbGVUbygwLjUsMS4yKTsvL+a4kOaYvlxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLnNjYWxlVG8oMC41LDEpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgICAgIHZhciByZXBlYXQ9Y2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShhY3Rpb24xLGFjdGlvbjIpKVxyXG4gICAgICAgICAgICB0aGlzLmJ0bl9hY2NlcHQucnVuQWN0aW9uKHJlcGVhdCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIC8vdGhpcy5idG5fc3RhcnQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLnNjYWxlVG8oMC41LDEuMik7Ly/muJDmmL5cclxuICAgICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLnNjYWxlVG8oMC41LDEpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjEsYWN0aW9uMikpXHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LnJ1bkFjdGlvbihyZXBlYXQpO1xyXG4gICAgICAgICAgICovICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWNjZXB0X3d4KCl7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMuYnRuX2FjY2VwdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5idG5fYWNjZXB0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICB0aGlzLnVzZXJOYW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayh3aW5kb3cucm9vbUlJRClcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZsYWc9MDsgICAgICBcclxuICAgICAgICB0aGlzLmluaXRLYmVuZ2luZSgpO1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFiL0pvaW5HYW1lXCIsIGNjLlByZWZhYiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcImNjLmxvYWRlci5sb2FkUmVzIGZhaWxcIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NjLmxvZyhcImNjLmxvYWRlci5sb2FkUmVzIHN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgdGhpcy5Kb2luR2FtZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMuSm9pbkdhbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0X2JnXCIpLmFkZENoaWxkKHRoaXMuSm9pbkdhbWUpXHJcbi8vICAgICAgICAgICAgICAgIHRoaXMuRmx5UG9vbERpY3RbdGhpcy5GbHlQb29saWRdPW5ld05vZGVcclxuLy8gICAgICAgICAgICAgICAgdGhpcy5GbHlQb29saWQrKztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0X2JnXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX3N0YXJ0XCIpXHJcblxyXG4gICAgICAgIHRoaXMuYnRuX2FjY2VwdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydF9iZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImFjY2VwdFwiKVxyXG4gICAgICAgIHRoaXMuYnRuX2FjY2VwdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5idG5fYWNjZXB0LnN0b3BBbGxBY3Rpb25zKClcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLmxvYWRJdGVtUHJlZmFiKCk7XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3I9dGhpcy5ub2RlLmFkZENvbXBvbmVudChcIkF1ZGlvTWdyXCIpXHJcbiAgICAgICAgaWYod2luZG93LkF1ZGlvTWdyPT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB2YXIgQXVkaW9NZ3IgPSByZXF1aXJlKFwiQXVkaW9NZ3JcIik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5BdWRpb01nciA9IG5ldyBBdWRpb01ncigpO1xyXG4gICAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3IuaW5pdCgpO1xyXG4gICAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3IuYmdtVm9sdW1lPTAuNVxyXG4gICAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3Iuc2Z4Vm9sdW1lPTAuNVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnN0b3BCR00oKVxyXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBjYy5zeXMucGxhdGZvcm0gIT0gY2Muc3lzLldFQ0hBVF9HQU1FID8gdGhpcy5yYW5kb21zdHJpbmcoNCk6ICcnO1xyXG4gICAgICAgIC8vdGhpcy5idG5fc3RhcnQubm9kZS5vbignY2xpY2snLCB0aGlzLnN0YXJ0R2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gXCJcIjtcclxuICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJXb3JsZFNjZW5lXCIpO1xyXG5cclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHRpbnB1dF9uYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlV3hTaGFyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnd4TG9naW5OYXRpdmUoKTtcclxuICAgICAgICAgICAgLy93aW5kb3cud2M9dHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRleHRpbnB1dF9uYW1lLnBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5L2g55qE5pi156ewLi4uXCJcclxuICAgICAgICAgICAgdGhpcy51c2VyTmFtZT10aGlzLnRleHRpbnB1dF9uYW1lLnN0cmluZyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5QkdNKFwiYmdtXCIpXHJcbiAgICAgICAgY2MubG9nKFwid2luZG93LmxvZ2lucmVzPVwiLHdpbmRvdy5sb2dpbnJlcylcclxuXHJcblxyXG4gICAgIH0sXHJcblxyXG4gICAgIGhlbGxvICgpIHtcclxuICAgICAgICBjYy5sb2coXCJoZWxsbyB3b3JsZFwiKTtcclxuICAgICB9LFxyXG5cclxuXHJcbiAgICAgZW5hYmxlV3hTaGFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoKTtcclxuXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJzb3VuZC9zaGFyZVwiLGZ1bmN0aW9uKGVycixkYXRhKXtcclxuICAgICAgICAgICAvLyB3eC5zaGFyZUFwcE1lc3NhZ2UoeyAgIC8v5omT5byA5bCP5ri45oiP6Ieq5Yqo5YiG5LqrXHJcbiAgICAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiMjTngrkg5pm65Yqb5bCPUEtcIixcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBkYXRhLnVybCxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwiUm9vbWlkPVwiICsgc2VsZi5yb29tS2V5YyArIFwiJlVzZXJOYW1lPVwiICsgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsLy8g5Yir5Lq654K55Ye76ZO+5o6l5pe25Lya5b6X5Yiw55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OlwiUm9vbWlkPVwiKyBzZWxmLnJvb21LZXljK1wiJlVzZXJOYW1lPVwiKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvmiJDlip9cIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5YiG5Lqr5aSx6LSlXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy55YW9xaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICB9LFxyXG5cclxuICAgIHd4TG9naW5OYXRpdmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc3NlbGYuY29kZSA9IHJlcy5jb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJOYW1lXCIsIHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ3eExvZ2luTmF0aXZlIHN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3NlbGY9c2VsZjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+WcqOeUqOaIt+acquaOiOadg+i/h+eahOaDheWGteS4i+iwg+eUqOatpOaOpeWPo++8jOWwhuS4jeWGjeWHuueOsOaOiOadg+W8ueeql++8jOS8muebtOaOpei/m+WFpSBmYWlsIOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNzZWxmLmJ0bl9zdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zc2VsZi51c2VyTmFtZSA9IHRoaXMuY29kZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlbmNyeXB0ZWREYXRhXCIsIHJlcy5lbmNyeXB0ZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIml2XCIsIHJlcy5pdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ3eExvZ2luTmF0aXZlKCkgZW5jcnlwdGVkRGF0YSAmJiBpdlwiLHJlcy5lbmNyeXB0ZWREYXRhICwgcmVzLml2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOihyZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ3eC5nZXR1c2VyaW5mbyBmYWlsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ojrflj5bop4blm77nqpflj6Plj6/op4HljLrln5/lsLrlr7hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aXNpYmxlU2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluezu+e7n+S/oeaBr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHd4X3NpemUgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/orqHnrpflrp7pmYXlpKflsI/lkozlj6/op4HljLrln5/lsLrlr7jnmoTmr5TkvovvvIjov5nph4zku6Xlrr3luqbkuLrlh4bvvIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaXplX3NjYWxlX3dpZHRoID0gd3hfc2l6ZS5zY3JlZW5IZWlnaHQgLyB2aXNpYmxlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeCA9ICh2aXNpYmxlU2l6ZS53aWR0aCAvIDIpICogc2l6ZV9zY2FsZV93aWR0aC0oMTI1ICogc2l6ZV9zY2FsZV93aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeSA9ICggdmlzaWJsZVNpemUuaGVpZ2h0IC8gMiApICogc2l6ZV9zY2FsZV93aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IDI1MCAqIHNpemVfc2NhbGVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gNjAgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3NlbGYuYnRuQXV0aG9yaXplID0gd3guY3JlYXRlVXNlckluZm9CdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn54K55Ye75b6u5L+h55m76ZmG5o6I5p2DJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzMyOTZmYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzc2VsZi5idG5BdXRob3JpemUub25UYXAoKHVpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNmPXNzZWxmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvblRhcCB1aW5mbzogXCIsdWluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1aW5mby5lcnJNc2cgPT0gXCJnZXRVc2VySW5mbzpva1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3hMb2dpbiBhdXRoIHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6XCLmjojmnYPmiJDlip9cIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlbmNyeXB0ZWREYXRhXCIsIHVpbmZvLmVuY3J5cHRlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpdlwiLCB1aW5mby5pdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2YubGFiZWxfaGludC5zdHJpbmcgPSBcInVpbmZvLmVuY3J5cHRlZERhdGE9XCIrdWluZm8uZW5jcnlwdGVkRGF0YStcIi9cIit1aW5mby5pdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YubGFiZWxfaGludC5zdHJpbmcgPSB1aW5mby5lbmNyeXB0ZWREYXRhIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInd4TG9naW4gYXV0aCBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOlwi5o6I5p2D5aSx6LSlXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YuYnRuQXV0aG9yaXplLmhpZGUoKTsgLy/ojrflj5bnlKjmiLfkv6Hmga/miJDlip/lkI7pmpDol4/mjInpkq5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTsgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgICByYW5kb21zdHJpbmc6IGZ1bmN0aW9uKEwpe1xyXG4gICAgICAgIHZhciBzPSAnJztcclxuICAgICAgICB2YXIgcmFuZG9tY2hhcj1mdW5jdGlvbigpe1xyXG4gICAgICAgICB2YXIgbj0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYyKTtcclxuICAgICAgICAgaWYobjwxMCkgcmV0dXJuIG47IC8vMC05XHJcbiAgICAgICAgIGlmKG48MzYpIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKG4rNTUpOyAvL0EtWlxyXG4gICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShuKzYxKTsgLy9hLXpcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUocy5sZW5ndGg8IEwpIHMrPSByYW5kb21jaGFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAgaW5pdEtiZW5naW5lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IG5ldyBLQkVuZ2luZS5LQkVuZ2luZUFyZ3MoKTtcdFxyXG5cdCAgICBhcmdzLmlwID0gU0VSVkVSX0lQO1xyXG4gICAgICAgIGFyZ3MucG9ydCA9IFNFUlZFUl9QT1JUO1xyXG4gICAgICAgIGFyZ3MuaXNXc3MgPSBJU19VU0VfV1NTOyAgICAgICAgICAgICAgLy/mmK/lkKbnlKh3c3PljY/orq7vvIwgdHJ1ZTp3c3MgIGZhbHNlOndzXHJcbiAgICAgICAgYXJncy5pc0J5SVAgPSBMT0dJTl9CWV9JUDsgICAgICAgICAgICAgLy/nlKhpcOi/mOaYr+eUqOWfn+WQjeeZu+W9leacjeWKoeWZqCAgIOacieS/ruaUueWumOaWueeahGtiZW5naW5lLmpzXHJcbiAgICAgICAgYXJncy5zZXJ2ZXJVUkwgPSBTRVJWRVJfVVJMO1xyXG5cdCAgICBLQkVuZ2luZS5jcmVhdGUoYXJncyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgaW5zdGFsbEV2ZW50czpmdW5jdGlvbigpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQ29ubmVjdGlvblN0YXRlXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGVcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImVudGVyU2NlbmVcIiwgdGhpcywgXCJlbnRlclNjZW5lXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIHVuSW5zdGFsbEV2ZW50cygpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGUyXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGUyXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIiwgdGhpcywgXCJvbkxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRlclNjZW5lXCIsIHRoaXMsIFwiZW50ZXJTY2VuZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luQmFzZWFwcFwiLCB0aGlzLCBcIm9uTG9naW5CYXNlYXBwXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIG9uQ29ubmVjdGlvblN0YXRlIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr29uZXJyb3JfYmVmb3JlX29ub3BlblwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0aW9uU3RhdGUyIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr3NvY2tldCBub3QgaXMgbnVsbFwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcblx0fSxcclxuXHJcbiAgICAgb25Mb2dpbkZhaWxlZCA6IGZ1bmN0aW9uKGZhaWxlZGNvZGUpIHtcclxuICAgICAgICB2YXIgbG9nU3RyID0gJyc7XHJcbiAgICAgICAgaWYoZmFpbGVkY29kZSA9PSAyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgbG9nU3RyID0gXCJMb2dpbiBpcyBmYWlsZWQo55m76ZmG5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSArIFwiLCBcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBsb2dTdHIgPSBcIkxvZ2luIGlzIGZhaWxlZCjnmbvpmYblpLHotKUpLCBlcnI9XCIgKyBLQkVuZ2luZS5hcHAuc2VydmVyRXJyKGZhaWxlZGNvZGUpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5aSx6LSlLFwiICsgIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSk7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhsb2dTdHIpO1x0XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25SZWxvZ2luQmFzZWFwcEZhaWxlZDogZnVuY3Rpb24oZmFpbGVkY29kZSl7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcInJlb2dpbiBpcyBmYWlsZWQo5pat57q/6YeN6L+e5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSlcclxuICAgICB9LFxyXG5cclxuICAgICBvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjmlq3nur/ph43ov57miJDlip8hKVwiKVxyXG4gICAgfSxcclxuXHJcbiAgICAgb25Mb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcIkxvZ2luQmFzZWFwcCBpcyBmYWlsZWQo55m76ZmG572R5YWz5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgZGVjb2RlRW5jcnlwdGVkRGF0YTpmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZW5jcnlwdGVkRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVuY3J5cHRlZERhdGFcIik7XHJcbiAgICAgICAgdmFyIHNlc3Npb25LZXkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZXNzaW9uS2V5XCIpO1xyXG4gICAgICAgIHZhciBpdiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIml2XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZGVjb2RlRW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YT1cIiArIGVuY3J5cHRlZERhdGEgKyBcIiAsaXY9XCIgKyBpdiArIFwiICxzZXNzaW9uS2V5PVwiICsgc2Vzc2lvbktleSk7XHJcbiAgICAgICAgaWYoc2Vzc2lvbktleSAmJiBlbmNyeXB0ZWREYXRhICYmIGl2KSB7XHJcbiAgICAgICAgICAgIC8vdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KEFQUElELCBzZXNzaW9uS2V5KTtcclxuICAgICAgICAgICAgdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KFwid3hiZTE2NDQ1NTZlZDhhZmE2XCIsIFwiOTZjMGUyMmFmMjU1NzFkYjVmMTc1ZWJiYjU1MGU2NzJcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcGMuZGVzY3J5dERhdGEoZW5jcnlwdGVkRGF0YSAsIGl2KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ino+WvhuWQjiBkYXRhOiAnLCBkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICB9LFxyXG4gICAgIG9uU2V0U3BhY2VEYXRhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGNjLmxvZyhcInN0YXJ0c2NlbmUub25TZXRTcGFjZURhdGFcIilcclxuICAgICB9LCAgXHJcbiAgICAgZW50ZXJTY2VuZSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiTG9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjnmbvpmYbmiJDlip8hKVwiKTtcclxuICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbmiJDlip8gISEhXCI7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZW5jcnlwdGVkRGF0YVwiKTtcclxuICAgICAgICAgICAgdmFyIGl2ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXZcIik7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVuY3J5cHRlZERhdGEgJiYgaXZcIixlbmNyeXB0ZWREYXRhICwgaXYpXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcImJhc2UuZGVjb2RlRW5jcnlwdGVkRGF0YSgpPVwiICsgZW5jcnlwdGVkRGF0YSArIFwiL1wiICsgaXY7XHJcbiAgICAgICAgICAgIHBsYXllci5kZWNvZGVFbmNyeXB0ZWREYXRhKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL3ZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7Ly9LQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLmVudGl0eV9pZF07ICAgIFxyXG4gICAgICAgIC8vcGxheWVyLmpvaW5Sb29tKClcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV29ybGRTY2VuZVwiLCAoKT0+IHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2FkIHdvcmxkIHNjZW5lIGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpOy8vS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5lbnRpdHlfaWRdO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy50eXBlPTFcclxuICAgICAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmpvaW5Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jcmVhdGVQcml2YXRlUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50eXBlPT0zICYmIHdpbmRvdy5yb29tSUlELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuam9pblByaXZhdGVSb29tKHdpbmRvdy5yb29tSUlEKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LnJvb21JSUQ9W11cclxuICAgICAgICAgICAgdGhpcy51bkluc3RhbGxFdmVudHMoKTsgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcbiBcclxuICAgICBvbkxvZ2luQmFzZWFwcCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNjLmxvZyhcIkNvbm5lY3QgdG8gbG9naW5CYXNlYXBwLCBwbGVhc2Ugd2FpdC4uLijov57mjqXliLDnvZHlhbPvvIwg6K+356iN5ZCOLi4uKVwiKTtcclxuICAgICB9LFxyXG4gXHJcbiAgICAgTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgIGNjLmxvZyhcIkxvZ2luYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIC4uLlwiKTtcclxuICAgICB9LFxyXG4gXHJcbiAgICAgQmFzZWFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICBjYy5sb2coXCJCYXNlYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIC4uXCIpO1xyXG4gICAgIH0sXHJcbiAgICAgICAgIFxyXG4gICAgIEJhc2VhcHBfaW1wb3J0Q2xpZW50RW50aXR5RGVmOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgY2MubG9nKFwiQmFzZWFwcF9pbXBvcnRDbGllbnRFbnRpdHlEZWYgLi5cIilcclxuICAgICB9LFxyXG5cclxuICAgICBjcmVhdGVEaWN0U3RyaW5nOiBmdW5jdGlvbihkaWMpIHtcclxuICAgICAgICB2YXIgZGljdFN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGxlbiA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBwcm8gaW4gZGljKSBsZW4rKztcclxuXHJcbiAgICAgICAgaWYobGVuID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB2YXIgZGljdFN0cmluZyA9IFwie1wiXHJcbiAgICAgICAgICAgIGZvcih2YXIgcHJvcCBpbiBkaWMpIHtcclxuICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCInXCIgKyBwcm9wICsgXCInXCIgO1xyXG4gICAgICAgICAgICAgICAgZGljdFN0cmluZyArPSBcIjpcIjtcclxuICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCInXCIgKyBkaWNbcHJvcF0gKyBcIidcIjtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IGxlbi0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljdFN0cmluZyArPSBcIn1cIjtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWN0U3RyaW5nICs9IFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRpY3RTdHJpbmc7XHJcbiAgICAgfSxcclxuIFxyXG4gICAgIHN0YXJ0R2FtZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgd2luZG93LmxvZ2lucmVzPTEwMDtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgIC8vY2MubG9nKFwiY2Muc3lzLnBsYXRmb3JtXCIsY2Muc3lzLnBsYXRmb3JtLGNjLnN5cy5XRUNIQVRfR0FNRSlcclxuICAgICAgICAgd2luZG93LnR5cGU9MVxyXG4gICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcclxuICAgICAgICAgICAgIHRoaXMudXNlck5hbWU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlck5hbWVcIik7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYodGhpcy51c2VyTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55So5oi35ZCN5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIiwgdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICB2YXIgZGF0YXMgPSB7fTtcclxuICAgICAgICAgZGF0YXNbXCJwbGF0Zm9ybVwiXSA9IGNjLnN5cy5wbGF0Zm9ybTtcclxuICAgICAgICAgZGF0YXMgPSB0aGlzLmNyZWF0ZURpY3RTdHJpbmcoZGF0YXMpO1xyXG4gICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImxvZ2luIG5hbWU9XCIgKyB0aGlzLnVzZXJOYW1lKTtcclxuICAgICAgICAgS0JFbmdpbmUuRXZlbnQuZmlyZShcImxvZ2luXCIsIHRoaXMudXNlck5hbWUsIFwiMTIzNDU2XCIsIGRhdGFzKTsgIFxyXG4gICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuIFxyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGVQcml2YXRlUm9vbTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9naW5yZXM9MTAwOyBcclxuICAgICAgICAgIHdpbmRvdy50eXBlPTJcclxuICAgICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICAgIC8vY2MubG9nKFwiY2Muc3lzLnBsYXRmb3JtXCIsY2Muc3lzLnBsYXRmb3JtLGNjLnN5cy5XRUNIQVRfR0FNRSlcclxuICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlck5hbWU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlck5hbWVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0aGlzLnVzZXJOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICAgdmFyIGRhdGFzID0ge307XHJcbiAgICAgICAgICBkYXRhc1tcInBsYXRmb3JtXCJdID0gY2Muc3lzLnBsYXRmb3JtO1xyXG4gICAgICAgICAgZGF0YXMgPSB0aGlzLmNyZWF0ZURpY3RTdHJpbmcoZGF0YXMpO1xyXG4gICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2dpbiBuYW1lPVwiICsgdGhpcy51c2VyTmFtZSk7XHJcbiAgICAgICAgICAvL3ZhciB0ZW1wMT1Vbmljb2RlVG9VdGY4KHRoaXMudXNlck5hbWUpXHJcbiAgICAgICAgICAvL3RoaXMudXNlck5hbWUgPWphdmEubmV0LlVSTERlY29kZXIuZGVjb2RlKHRlbXAsXCJVVEYtOFwiKTsgXHJcbiAgICAgICAgICAvL3RoaXMudXNlck5hbWUgPVV0ZjhUb1VuaWNvZGUodGVtcDEpXHJcbiAgICAgICAgICAvL2NjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICAgS0JFbmdpbmUuRXZlbnQuZmlyZShcImxvZ2luXCIsIHRoaXMudXNlck5hbWUsIFwiMTIzNDU2XCIsIGRhdGFzKTsgIFxyXG4gICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5LitIC4uLiAuLi5cIjtcclxuICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgfSxcclxuICAgICAgIGpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2s6ZnVuY3Rpb24ocm9vbUlkKXsgLy/lj4LmlbDmmK/mlbDnu4RcclxuICAgICAgICAgd2luZG93LnR5cGU9M1xyXG4gICAgICAgICB3aW5kb3cubG9naW5yZXM9MTAwO1xyXG4gICAgICAgICB3aW5kb3cucm9vbUlJRD1yb29tSWRcclxuICAgICAgICAgaWYodGhpcy5Kb2luR2FtZSlcclxuICAgICAgICAgICAgdGhpcy5Kb2luR2FtZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIix0aGlzLnVzZXJOYW1lLHJvb21JZCkgIFxyXG4gICAgICAgICAgdmFyIGRhdGFzID0ge307XHJcbiAgICAgICAgICBkYXRhc1tcInBsYXRmb3JtXCJdID0gY2Muc3lzLnBsYXRmb3JtO1xyXG4gICAgICAgICAgZGF0YXMgPSB0aGlzLmNyZWF0ZURpY3RTdHJpbmcoZGF0YXMpO1xyXG4gICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2dpbiBuYW1lPVwiICsgdGhpcy51c2VyTmFtZSk7XHJcbiBcclxuICAgICAgICAgIEtCRW5naW5lLkV2ZW50LmZpcmUoXCJsb2dpblwiLCB0aGlzLnVzZXJOYW1lLCBcIjEyMzQ1NlwiLCBkYXRhcyk7ICBcclxuICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueZu+mZhuS4rSAuLi4gLi4uXCI7XHJcbiAgICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuIFxyXG4gICAgICAgfSxcclxuICAgICAgIGpvaW5Qcml2YXRlUm9vbTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgICAvL2NjLmxvZyhcImNjLnN5cy5wbGF0Zm9ybVwiLGNjLnN5cy5wbGF0Zm9ybSxjYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyTmFtZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKHRoaXMudXNlck5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55So5oi35ZCN5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5Kb2luR2FtZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgXHJcbiAgXHJcbiAgICAgICAgICBcclxuICAgICAgIH0sXHJcblxyXG5cclxuXHJcbn0pO1xyXG4iXX0=