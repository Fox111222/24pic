
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
      this.btn_accept.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "确认接受" + window.invateAcountname + "的邀请！"; //this.btn_start.active=false;

      this.btn_accept.stopAllActions();
      var action1 = cc.scaleTo(0.5, 1.2); //渐显

      var action2 = cc.scaleTo(0.5, 1); //渐隐效果

      var repeat = cc.repeatForever(cc.sequence(action1, action2));
      this.btn_accept.runAction(repeat);
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
    this.sum = 0;
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

    var AudioMgr = require("AudioMgr");

    window.AudioMgr = new AudioMgr();
    window.AudioMgr.init();
    window.AudioMgr.bgmVolume = 0.5;
    window.AudioMgr.sfxVolume = 0.5;
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
          window.roomIID = [];
        }
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcU3RhcnRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJXeEJpekRhdGFDcnlwdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGV4dGlucHV0X25hbWUiLCJ0eXBlIiwiRWRpdEJveCIsImxhYmVsX2hpbnQiLCJMYWJlbCIsInN0YXJ0Iiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRSIsImdldFF1ZXJ5IiwicGFyc2VSb29tSUQiLCJudW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInBhcnNlSW50IiwicURhdGEiLCJvYmoiLCJ3eCIsImdldExhdW5jaE9wdGlvbnNTeW5jIiwicyIsInF1ZXJ5IiwiUm9vbWlkIiwic3RyaW5nMlJlc3VsdCIsInNwbGl0Iiwid2luZG93Iiwicm9vbUlJRCIsIlVzZXJOYW1lIiwiaW52YXRlQWNvdW50bmFtZSIsIkVkaXRCb3hjbGljayIsImxvZyIsIkF1ZGlvTWdyIiwicGxheVNGWCIsInVzZXJOYW1lIiwic3RyaW5nIiwidXBkYXRlIiwiZHQiLCJsb2dpbnJlcyIsIm5vZGUiLCJvcGFjaXR5IiwibGVuZ3RoIiwiYnRuX2FjY2VwdCIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50Iiwic3RvcEFsbEFjdGlvbnMiLCJhY3Rpb24xIiwic2NhbGVUbyIsImFjdGlvbjIiLCJyZXBlYXQiLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJydW5BY3Rpb24iLCJhY2NlcHRfd3giLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayIsIm9uTG9hZCIsInN1bSIsImluaXRLYmVuZ2luZSIsImluc3RhbGxFdmVudHMiLCJsb2FkZXIiLCJsb2FkUmVzIiwiUHJlZmFiIiwiZXJyIiwicHJlZmFiIiwiSm9pbkdhbWUiLCJpbnN0YW50aWF0ZSIsImFkZENoaWxkIiwiYmluZCIsImJ0bl9zdGFydCIsImluaXQiLCJiZ21Wb2x1bWUiLCJzZnhWb2x1bWUiLCJyYW5kb21zdHJpbmciLCJjb2RlIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJlbmFibGVXeFNoYXJlIiwid3hMb2dpbk5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiaGVsbG8iLCJzaG93U2hhcmVNZW51IiwiZGF0YSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwicmVzIiwidGl0bGUiLCJpbWFnZVVybCIsInVybCIsInN1Y2Nlc3MiLCJmYWlsIiwic2VsZiIsImxvZ2luIiwic2V0SXRlbSIsInNzZWxmIiwiZ2V0VXNlckluZm8iLCJ3aXRoQ3JlZGVudGlhbHMiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ2aXNpYmxlU2l6ZSIsInZpZXciLCJnZXRWaXNpYmxlU2l6ZSIsInd4X3NpemUiLCJnZXRTeXN0ZW1JbmZvU3luYyIsInNpemVfc2NhbGVfd2lkdGgiLCJzY3JlZW5IZWlnaHQiLCJoZWlnaHQiLCJ4Iiwid2lkdGgiLCJ5IiwiYnRuQXV0aG9yaXplIiwiY3JlYXRlVXNlckluZm9CdXR0b24iLCJ0ZXh0Iiwic3R5bGUiLCJsZWZ0IiwidG9wIiwibGluZUhlaWdodCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJib3JkZXJSYWRpdXMiLCJvblRhcCIsInVpbmZvIiwic2YiLCJjb25zb2xlIiwiZXJyTXNnIiwic2hvd1RvYXN0IiwiaGlkZSIsIkwiLCJyYW5kb21jaGFyIiwibiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImFyZ3MiLCJLQkVuZ2luZUFyZ3MiLCJpcCIsIlNFUlZFUl9JUCIsInBvcnQiLCJTRVJWRVJfUE9SVCIsImlzV3NzIiwiSVNfVVNFX1dTUyIsImlzQnlJUCIsIkxPR0lOX0JZX0lQIiwic2VydmVyVVJMIiwiU0VSVkVSX1VSTCIsImNyZWF0ZSIsIkV2ZW50IiwicmVnaXN0ZXIiLCJ1bkluc3RhbGxFdmVudHMiLCJkZXJlZ2lzdGVyIiwib25Db25uZWN0aW9uU3RhdGUiLCJsb2dTdHIiLCJhcHAiLCJJTkZPX01TRyIsIm9uQ29ubmVjdGlvblN0YXRlMiIsIm9uTG9naW5GYWlsZWQiLCJmYWlsZWRjb2RlIiwic2VydmVyRXJyIiwic2VydmVyZGF0YXMiLCJvblJlbG9naW5CYXNlYXBwRmFpbGVkIiwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSIsIm9uTG9naW5CYXNlYXBwRmFpbGVkIiwiZGVjb2RlRW5jcnlwdGVkRGF0YSIsInNlc3Npb25LZXkiLCJwYyIsImRlc2NyeXREYXRhIiwib25TZXRTcGFjZURhdGEiLCJlbnRlclNjZW5lIiwicGxheWVyIiwibG9hZFNjZW5lIiwiam9pblJvb20iLCJjcmVhdGVQcml2YXRlUm9vbSIsImpvaW5Qcml2YXRlUm9vbSIsIm9uTG9naW5CYXNlYXBwIiwiTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMiLCJCYXNlYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIiwiQmFzZWFwcF9pbXBvcnRDbGllbnRFbnRpdHlEZWYiLCJjcmVhdGVEaWN0U3RyaW5nIiwiZGljIiwiZGljdFN0cmluZyIsImxlbiIsInBybyIsInByb3AiLCJzdGFydEdhbWUiLCJldmVudCIsImRhdGFzIiwiZmlyZSIsInJvb21JZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlDLGNBQWMsR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQTVCOztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsY0FBYyxFQUFDO0FBQ1gsaUJBQVMsSUFERTtBQUVYQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FB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SixLQUF0RDtBQUNBLFNBQUsxTCxVQUFMLENBQWdCK0IsTUFBaEIsR0FBeUIsYUFBekI7QUFDQSxTQUFLb0MsU0FBTCxDQUFlNUIsTUFBZixHQUF3QixLQUF4QjtBQUVGLEdBbGdCQztBQW1nQkZzSSxFQUFBQSxlQUFlLEVBQUUseUJBQVVZLEtBQVYsRUFBaUI7QUFFaENuSyxJQUFBQSxNQUFNLENBQUNNLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCLFVBQXhCLEVBRmdDLENBRy9COztBQUdBLFFBQUdwQyxFQUFFLENBQUNVLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQlgsRUFBRSxDQUFDVSxHQUFILENBQU9FLFdBQTdCLEVBQXlDO0FBQ3JDLFdBQUt5QixRQUFMLEdBQWNyQyxFQUFFLENBQUNVLEdBQUgsQ0FBT2dELFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLENBQWQ7QUFDSDs7QUFDRCxRQUFHLEtBQUt0QixRQUFMLENBQWNPLE1BQWQsSUFBd0IsQ0FBM0IsRUFDQTtBQUNJLFdBQUtyQyxVQUFMLENBQWdCK0IsTUFBaEIsR0FBeUIsU0FBekI7QUFDQTtBQUNIOztBQUNELFNBQUtnQyxRQUFMLENBQWN4QixNQUFkLEdBQXFCLElBQXJCLENBZCtCLENBZS9CO0FBSUY7QUF0aEJDLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxudmFyIEtCRW5naW5lID0gcmVxdWlyZShcImtiZW5naW5lXCIpO1xyXG52YXIgV3hCaXpEYXRhQ3J5cHQgPSByZXF1aXJlKFwiV3hCaXpEYXRhQ3J5cHRcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRleHRpbnB1dF9uYW1lOntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYWJlbF9oaW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRRdWVyeSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcnNlUm9vbUlEOmZ1bmN0aW9uKG51bXMpe1xyXG4gICAgICAgIC8vdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgbnVtcy5mb3JFYWNoKChpdGVtLGluZGV4KSA9PntcclxuXHQgICAgICAgIG51bXNbaW5kZXhdID0gcGFyc2VJbnQobnVtc1tpbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbnVtczsgLy/ovazmiJDmlbDlrZfmlbDnu4RcclxuICAgIH0sXHJcbiAgICBnZXRRdWVyeTpmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcURhdGEgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHd4LmdldExhdW5jaE9wdGlvbnNTeW5jKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMgaW4gb2JqLnF1ZXJ5KSAvL29iai5xdWVyeT17fVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihzID09IFwiUm9vbWlkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHFEYXRhLlJvb21pZCA9IG9iai5xdWVyeVtzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHJpbmcyUmVzdWx0ID0gcURhdGEuUm9vbWlkLnNwbGl0KCcnKSAvL+Wtl+espuS4suWPmOaIkOWtl+espuS4suaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yb29tSUlEPXRoaXMucGFyc2VSb29tSUQoc3RyaW5nMlJlc3VsdClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzID09IFwiVXNlck5hbWVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcURhdGEuVXNlck5hbWUgPSBvYmoucXVlcnlbc107XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmludmF0ZUFjb3VudG5hbWU9b2JqLnF1ZXJ5W3NdXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHFEYXRhO1xyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgRWRpdEJveGNsaWNrOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MubG9nKFwiRWRpdEJveGNsaWNrXCIpXHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMudXNlck5hbWU9dGhpcy50ZXh0aW5wdXRfbmFtZS5zdHJpbmdcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIC8vdGhpcy5zdW09dGhpcy5zdW0rZHQ7XHJcbiAgICAgICAgaWYod2luZG93LmxvZ2lucmVzPT0wKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi6L6T5YWl5oi/6Ze0SUTml6DmlYgs6K+36YeN5paw6L6T5YWl5oi/5Y+3XCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYod2luZG93LmxvZ2lucmVzPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi5oi/6Ze05bey5ruh77yB6K+36YeN5paw6L6T5YWl5oi/5Y+3XCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwicm9vbWlkPVwiLCB3aW5kb3cucm9vbUlEKVxyXG4gICAgICAgIGlmKHdpbmRvdy5yb29tSUlELmxlbmd0aCA+MCl7ICAgICAgICAgICBcclxuICAgICAgICAgICB0aGlzLmJ0bl9hY2NlcHQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwi56Gu6K6k5o6l5Y+XXCIrIHdpbmRvdy5pbnZhdGVBY291bnRuYW1lICtcIueahOmCgOivt++8gVwiXHJcbiAgICAgICAgICAgLy90aGlzLmJ0bl9zdGFydC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLnNjYWxlVG8oMC41LDEuMik7Ly/muJDmmL5cclxuICAgICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLnNjYWxlVG8oMC41LDEpOy8v5riQ6ZqQ5pWI5p6cXHJcbiAgICAgICAgICAgdmFyIHJlcGVhdD1jYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbjEsYWN0aW9uMikpXHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LnJ1bkFjdGlvbihyZXBlYXQpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFjY2VwdF93eCgpe1xyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICB0aGlzLmJ0bl9hY2NlcHQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuYnRuX2FjY2VwdC5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgdGhpcy51c2VyTmFtZT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyTmFtZVwiKTtcclxuICAgICAgICB0aGlzLmpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2sod2luZG93LnJvb21JSUQpXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zdW09MDsgICAgICBcclxuICAgICAgICB0aGlzLmluaXRLYmVuZ2luZSgpO1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cygpO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFiL0pvaW5HYW1lXCIsIGNjLlByZWZhYiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcImNjLmxvYWRlci5sb2FkUmVzIGZhaWxcIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2NjLmxvZyhcImNjLmxvYWRlci5sb2FkUmVzIHN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgdGhpcy5Kb2luR2FtZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMuSm9pbkdhbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0X2JnXCIpLmFkZENoaWxkKHRoaXMuSm9pbkdhbWUpXHJcbi8vICAgICAgICAgICAgICAgIHRoaXMuRmx5UG9vbERpY3RbdGhpcy5GbHlQb29saWRdPW5ld05vZGVcclxuLy8gICAgICAgICAgICAgICAgdGhpcy5GbHlQb29saWQrKztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0X2JnXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX3N0YXJ0XCIpXHJcblxyXG4gICAgICAgIHRoaXMuYnRuX2FjY2VwdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydF9iZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImFjY2VwdFwiKVxyXG4gICAgICAgIHRoaXMuYnRuX2FjY2VwdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5idG5fYWNjZXB0LnN0b3BBbGxBY3Rpb25zKClcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMubG9hZEl0ZW1QcmVmYWIoKTtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01ncj10aGlzLm5vZGUuYWRkQ29tcG9uZW50KFwiQXVkaW9NZ3JcIikgICAgICBcclxuICAgICAgICB2YXIgQXVkaW9NZ3IgPSByZXF1aXJlKFwiQXVkaW9NZ3JcIik7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyID0gbmV3IEF1ZGlvTWdyKCk7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLmluaXQoKTtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IuYmdtVm9sdW1lPTAuNVxyXG4gICAgICAgIHdpbmRvdy5BdWRpb01nci5zZnhWb2x1bWU9MC41XHJcblxyXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBjYy5zeXMucGxhdGZvcm0gIT0gY2Muc3lzLldFQ0hBVF9HQU1FID8gdGhpcy5yYW5kb21zdHJpbmcoNCk6ICcnO1xyXG4gICAgICAgIC8vdGhpcy5idG5fc3RhcnQubm9kZS5vbignY2xpY2snLCB0aGlzLnN0YXJ0R2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gXCJcIjtcclxuICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJXb3JsZFNjZW5lXCIpO1xyXG5cclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHRpbnB1dF9uYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlV3hTaGFyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnd4TG9naW5OYXRpdmUoKTtcclxuICAgICAgICAgICAgLy93aW5kb3cud2M9dHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRleHRpbnB1dF9uYW1lLnBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5L2g55qE5pi156ewLi4uXCJcclxuICAgICAgICAgICAgdGhpcy51c2VyTmFtZT10aGlzLnRleHRpbnB1dF9uYW1lLnN0cmluZyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01nci5wbGF5QkdNKFwiYmdtXCIpXHJcbiAgICAgICAgY2MubG9nKFwid2luZG93LmxvZ2lucmVzPVwiLHdpbmRvdy5sb2dpbnJlcylcclxuXHJcblxyXG4gICAgIH0sXHJcblxyXG4gICAgIGhlbGxvICgpIHtcclxuICAgICAgICBjYy5sb2coXCJoZWxsbyB3b3JsZFwiKTtcclxuICAgICB9LFxyXG5cclxuXHJcbiAgICAgZW5hYmxlV3hTaGFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoKTtcclxuXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJzb3VuZC9zaGFyZVwiLGZ1bmN0aW9uKGVycixkYXRhKXtcclxuICAgICAgICAgICAvLyB3eC5zaGFyZUFwcE1lc3NhZ2UoeyAgIC8v5omT5byA5bCP5ri45oiP6Ieq5Yqo5YiG5LqrXHJcbiAgICAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiMjTngrkg5pm65Yqb5bCPUEtcIixcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBkYXRhLnVybCxcclxuICAgICAgICAgICAgICAgIC8vcXVlcnk6IFwiUm9vbWlkPVwiICsgc2VsZi5yb29tS2V5YyArIFwiJlVzZXJOYW1lPVwiICsgS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5wbGF5ZXIoKS5pZF0uYWNjb3VudE5hbWUsLy8g5Yir5Lq654K55Ye76ZO+5o6l5pe25Lya5b6X5Yiw55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OiBcIm5pY2s9XCIgKyBuaWNrICsgXCImZ2VuZGVyPVwiICsgZ2VuZGVyICsgXCImY2l0eT1cIiArIGNpdHksXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5OlwiUm9vbWlkPVwiKyBzZWxmLnJvb21LZXljK1wiJlVzZXJOYW1lPVwiKyBLQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLnBsYXllcigpLmlkXS5hY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLliIbkuqvmiJDlip9cIiArIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnlhb3FpbmcuYWN0aXZlPWZhbHNlICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5YiG5Lqr5aSx6LSlXCIgKyByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy55YW9xaW5nLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICB9LFxyXG5cclxuICAgIHd4TG9naW5OYXRpdmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc3NlbGYuY29kZSA9IHJlcy5jb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJOYW1lXCIsIHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ3eExvZ2luTmF0aXZlIHN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3NlbGY9c2VsZjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+WcqOeUqOaIt+acquaOiOadg+i/h+eahOaDheWGteS4i+iwg+eUqOatpOaOpeWPo++8jOWwhuS4jeWGjeWHuueOsOaOiOadg+W8ueeql++8jOS8muebtOaOpei/m+WFpSBmYWlsIOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNzZWxmLmJ0bl9zdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zc2VsZi51c2VyTmFtZSA9IHRoaXMuY29kZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlbmNyeXB0ZWREYXRhXCIsIHJlcy5lbmNyeXB0ZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIml2XCIsIHJlcy5pdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ3eExvZ2luTmF0aXZlKCkgZW5jcnlwdGVkRGF0YSAmJiBpdlwiLHJlcy5lbmNyeXB0ZWREYXRhICwgcmVzLml2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOihyZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ3eC5nZXR1c2VyaW5mbyBmYWlsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ojrflj5bop4blm77nqpflj6Plj6/op4HljLrln5/lsLrlr7hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aXNpYmxlU2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluezu+e7n+S/oeaBr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHd4X3NpemUgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/orqHnrpflrp7pmYXlpKflsI/lkozlj6/op4HljLrln5/lsLrlr7jnmoTmr5TkvovvvIjov5nph4zku6Xlrr3luqbkuLrlh4bvvIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaXplX3NjYWxlX3dpZHRoID0gd3hfc2l6ZS5zY3JlZW5IZWlnaHQgLyB2aXNpYmxlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeCA9ICh2aXNpYmxlU2l6ZS53aWR0aCAvIDIpICogc2l6ZV9zY2FsZV93aWR0aC0oMTI1ICogc2l6ZV9zY2FsZV93aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeSA9ICggdmlzaWJsZVNpemUuaGVpZ2h0IC8gMiApICogc2l6ZV9zY2FsZV93aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IDI1MCAqIHNpemVfc2NhbGVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gNjAgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3NlbGYuYnRuQXV0aG9yaXplID0gd3guY3JlYXRlVXNlckluZm9CdXR0b24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn54K55Ye75b6u5L+h55m76ZmG5o6I5p2DJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiIzMyOTZmYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzc2VsZi5idG5BdXRob3JpemUub25UYXAoKHVpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNmPXNzZWxmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvblRhcCB1aW5mbzogXCIsdWluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1aW5mby5lcnJNc2cgPT0gXCJnZXRVc2VySW5mbzpva1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3hMb2dpbiBhdXRoIHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6XCLmjojmnYPmiJDlip9cIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlbmNyeXB0ZWREYXRhXCIsIHVpbmZvLmVuY3J5cHRlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpdlwiLCB1aW5mby5pdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2YubGFiZWxfaGludC5zdHJpbmcgPSBcInVpbmZvLmVuY3J5cHRlZERhdGE9XCIrdWluZm8uZW5jcnlwdGVkRGF0YStcIi9cIit1aW5mby5pdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YubGFiZWxfaGludC5zdHJpbmcgPSB1aW5mby5lbmNyeXB0ZWREYXRhIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInd4TG9naW4gYXV0aCBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOlwi5o6I5p2D5aSx6LSlXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YuYnRuQXV0aG9yaXplLmhpZGUoKTsgLy/ojrflj5bnlKjmiLfkv6Hmga/miJDlip/lkI7pmpDol4/mjInpkq5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTsgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgICByYW5kb21zdHJpbmc6IGZ1bmN0aW9uKEwpe1xyXG4gICAgICAgIHZhciBzPSAnJztcclxuICAgICAgICB2YXIgcmFuZG9tY2hhcj1mdW5jdGlvbigpe1xyXG4gICAgICAgICB2YXIgbj0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYyKTtcclxuICAgICAgICAgaWYobjwxMCkgcmV0dXJuIG47IC8vMC05XHJcbiAgICAgICAgIGlmKG48MzYpIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKG4rNTUpOyAvL0EtWlxyXG4gICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShuKzYxKTsgLy9hLXpcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUocy5sZW5ndGg8IEwpIHMrPSByYW5kb21jaGFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAgaW5pdEtiZW5naW5lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IG5ldyBLQkVuZ2luZS5LQkVuZ2luZUFyZ3MoKTtcdFxyXG5cdCAgICBhcmdzLmlwID0gU0VSVkVSX0lQO1xyXG4gICAgICAgIGFyZ3MucG9ydCA9IFNFUlZFUl9QT1JUO1xyXG4gICAgICAgIGFyZ3MuaXNXc3MgPSBJU19VU0VfV1NTOyAgICAgICAgICAgICAgLy/mmK/lkKbnlKh3c3PljY/orq7vvIwgdHJ1ZTp3c3MgIGZhbHNlOndzXHJcbiAgICAgICAgYXJncy5pc0J5SVAgPSBMT0dJTl9CWV9JUDsgICAgICAgICAgICAgLy/nlKhpcOi/mOaYr+eUqOWfn+WQjeeZu+W9leacjeWKoeWZqCAgIOacieS/ruaUueWumOaWueeahGtiZW5naW5lLmpzXHJcbiAgICAgICAgYXJncy5zZXJ2ZXJVUkwgPSBTRVJWRVJfVVJMO1xyXG5cdCAgICBLQkVuZ2luZS5jcmVhdGUoYXJncyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgaW5zdGFsbEV2ZW50czpmdW5jdGlvbigpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQ29ubmVjdGlvblN0YXRlXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGVcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImVudGVyU2NlbmVcIiwgdGhpcywgXCJlbnRlclNjZW5lXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIHVuSW5zdGFsbEV2ZW50cygpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGUyXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGUyXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIiwgdGhpcywgXCJvbkxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRlclNjZW5lXCIsIHRoaXMsIFwiZW50ZXJTY2VuZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luQmFzZWFwcFwiLCB0aGlzLCBcIm9uTG9naW5CYXNlYXBwXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIG9uQ29ubmVjdGlvblN0YXRlIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr29uZXJyb3JfYmVmb3JlX29ub3BlblwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0aW9uU3RhdGUyIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr3NvY2tldCBub3QgaXMgbnVsbFwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcblx0fSxcclxuXHJcbiAgICAgb25Mb2dpbkZhaWxlZCA6IGZ1bmN0aW9uKGZhaWxlZGNvZGUpIHtcclxuICAgICAgICB2YXIgbG9nU3RyID0gJyc7XHJcbiAgICAgICAgaWYoZmFpbGVkY29kZSA9PSAyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgbG9nU3RyID0gXCJMb2dpbiBpcyBmYWlsZWQo55m76ZmG5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSArIFwiLCBcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBsb2dTdHIgPSBcIkxvZ2luIGlzIGZhaWxlZCjnmbvpmYblpLHotKUpLCBlcnI9XCIgKyBLQkVuZ2luZS5hcHAuc2VydmVyRXJyKGZhaWxlZGNvZGUpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5aSx6LSlLFwiICsgIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSk7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhsb2dTdHIpO1x0XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25SZWxvZ2luQmFzZWFwcEZhaWxlZDogZnVuY3Rpb24oZmFpbGVkY29kZSl7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcInJlb2dpbiBpcyBmYWlsZWQo5pat57q/6YeN6L+e5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSlcclxuICAgICB9LFxyXG5cclxuICAgICBvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjmlq3nur/ph43ov57miJDlip8hKVwiKVxyXG4gICAgfSxcclxuXHJcbiAgICAgb25Mb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcIkxvZ2luQmFzZWFwcCBpcyBmYWlsZWQo55m76ZmG572R5YWz5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgZGVjb2RlRW5jcnlwdGVkRGF0YTpmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZW5jcnlwdGVkRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVuY3J5cHRlZERhdGFcIik7XHJcbiAgICAgICAgdmFyIHNlc3Npb25LZXkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZXNzaW9uS2V5XCIpO1xyXG4gICAgICAgIHZhciBpdiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIml2XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZGVjb2RlRW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YT1cIiArIGVuY3J5cHRlZERhdGEgKyBcIiAsaXY9XCIgKyBpdiArIFwiICxzZXNzaW9uS2V5PVwiICsgc2Vzc2lvbktleSk7XHJcbiAgICAgICAgaWYoc2Vzc2lvbktleSAmJiBlbmNyeXB0ZWREYXRhICYmIGl2KSB7XHJcbiAgICAgICAgICAgIC8vdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KEFQUElELCBzZXNzaW9uS2V5KTtcclxuICAgICAgICAgICAgdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KFwid3hiZTE2NDQ1NTZlZDhhZmE2XCIsIFwiOTZjMGUyMmFmMjU1NzFkYjVmMTc1ZWJiYjU1MGU2NzJcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcGMuZGVzY3J5dERhdGEoZW5jcnlwdGVkRGF0YSAsIGl2KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ino+WvhuWQjiBkYXRhOiAnLCBkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICB9LFxyXG4gICAgIG9uU2V0U3BhY2VEYXRhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGNjLmxvZyhcInN0YXJ0c2NlbmUub25TZXRTcGFjZURhdGFcIilcclxuICAgICB9LCAgXHJcbiAgICAgZW50ZXJTY2VuZSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiTG9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjnmbvpmYbmiJDlip8hKVwiKTtcclxuICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbmiJDlip8gISEhXCI7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZW5jcnlwdGVkRGF0YVwiKTtcclxuICAgICAgICAgICAgdmFyIGl2ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXZcIik7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVuY3J5cHRlZERhdGEgJiYgaXZcIixlbmNyeXB0ZWREYXRhICwgaXYpXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcImJhc2UuZGVjb2RlRW5jcnlwdGVkRGF0YSgpPVwiICsgZW5jcnlwdGVkRGF0YSArIFwiL1wiICsgaXY7XHJcbiAgICAgICAgICAgIHBsYXllci5kZWNvZGVFbmNyeXB0ZWREYXRhKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL3ZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7Ly9LQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLmVudGl0eV9pZF07ICAgIFxyXG4gICAgICAgIC8vcGxheWVyLmpvaW5Sb29tKClcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV29ybGRTY2VuZVwiLCAoKT0+IHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2FkIHdvcmxkIHNjZW5lIGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpOy8vS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5lbnRpdHlfaWRdO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy50eXBlPTFcclxuICAgICAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmpvaW5Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jcmVhdGVQcml2YXRlUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50eXBlPT0zICYmIHdpbmRvdy5yb29tSUlELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuam9pblByaXZhdGVSb29tKHdpbmRvdy5yb29tSUlEKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucm9vbUlJRD1bXSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudW5JbnN0YWxsRXZlbnRzKCk7ICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICB9LFxyXG4gXHJcbiAgICAgb25Mb2dpbkJhc2VhcHAgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJDb25uZWN0IHRvIGxvZ2luQmFzZWFwcCwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5Yiw572R5YWz77yMIOivt+eojeWQji4uLilcIik7XHJcbiAgICAgfSxcclxuIFxyXG4gICAgIExvZ2luYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5LitIC4uLiAuLi5cIjtcclxuICAgICAgICBjYy5sb2coXCJMb2dpbmFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyAuLi5cIik7XHJcbiAgICAgfSxcclxuIFxyXG4gICAgIEJhc2VhcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgY2MubG9nKFwiQmFzZWFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyAuLlwiKTtcclxuICAgICB9LFxyXG4gICAgICAgICBcclxuICAgICBCYXNlYXBwX2ltcG9ydENsaWVudEVudGl0eURlZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIGNjLmxvZyhcIkJhc2VhcHBfaW1wb3J0Q2xpZW50RW50aXR5RGVmIC4uXCIpXHJcbiAgICAgfSxcclxuXHJcbiAgICAgY3JlYXRlRGljdFN0cmluZzogZnVuY3Rpb24oZGljKSB7XHJcbiAgICAgICAgdmFyIGRpY3RTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHZhciBsZW4gPSAwO1xyXG4gICAgICAgIGZvcih2YXIgcHJvIGluIGRpYykgbGVuKys7XHJcblxyXG4gICAgICAgIGlmKGxlbiA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGRpY3RTdHJpbmcgPSBcIntcIlxyXG4gICAgICAgICAgICBmb3IodmFyIHByb3AgaW4gZGljKSB7XHJcbiAgICAgICAgICAgICAgICBkaWN0U3RyaW5nICs9IFwiJ1wiICsgcHJvcCArIFwiJ1wiIDtcclxuICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCI6XCI7XHJcbiAgICAgICAgICAgICAgICBkaWN0U3RyaW5nICs9IFwiJ1wiICsgZGljW3Byb3BdICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSBsZW4tMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCJ9XCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljdFN0cmluZyArPSBcIixcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkaWN0U3RyaW5nO1xyXG4gICAgIH0sXHJcbiBcclxuICAgICBzdGFydEdhbWU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2dpbnJlcz0xMDA7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgICAvL2NjLmxvZyhcImNjLnN5cy5wbGF0Zm9ybVwiLGNjLnN5cy5wbGF0Zm9ybSxjYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiAgICAgICAgIHdpbmRvdy50eXBlPTFcclxuICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKHRoaXMudXNlck5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGNjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsIHRoaXMudXNlck5hbWUpICBcclxuICAgICAgICAgdmFyIGRhdGFzID0ge307XHJcbiAgICAgICAgIGRhdGFzW1wicGxhdGZvcm1cIl0gPSBjYy5zeXMucGxhdGZvcm07XHJcbiAgICAgICAgIGRhdGFzID0gdGhpcy5jcmVhdGVEaWN0U3RyaW5nKGRhdGFzKTtcclxuICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2dpbiBuYW1lPVwiICsgdGhpcy51c2VyTmFtZSk7XHJcbiAgICAgICAgIEtCRW5naW5lLkV2ZW50LmZpcmUoXCJsb2dpblwiLCB0aGlzLnVzZXJOYW1lLCBcIjEyMzQ1NlwiLCBkYXRhcyk7ICBcclxuICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5LitIC4uLiAuLi5cIjtcclxuICAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiBcclxuICAgICAgfSxcclxuICAgICAgY3JlYXRlUHJpdmF0ZVJvb206IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgd2luZG93LmxvZ2lucmVzPTEwMDsgXHJcbiAgICAgICAgICB3aW5kb3cudHlwZT0yXHJcbiAgICAgICAgICB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgICAvL2NjLmxvZyhcImNjLnN5cy5wbGF0Zm9ybVwiLGNjLnN5cy5wbGF0Zm9ybSxjYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiAgICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYodGhpcy51c2VyTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnlKjmiLflkI3kuI3og73kuLrnqbpcIjtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYy5sb2coXCJ0aGlzLnVzZXJOYW1lPVwiLHRoaXMudXNlck5hbWUpICBcclxuICAgICAgICAgIHZhciBkYXRhcyA9IHt9O1xyXG4gICAgICAgICAgZGF0YXNbXCJwbGF0Zm9ybVwiXSA9IGNjLnN5cy5wbGF0Zm9ybTtcclxuICAgICAgICAgIGRhdGFzID0gdGhpcy5jcmVhdGVEaWN0U3RyaW5nKGRhdGFzKTtcclxuICAgICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwibG9naW4gbmFtZT1cIiArIHRoaXMudXNlck5hbWUpO1xyXG4gICAgICAgICAgLy92YXIgdGVtcDE9VW5pY29kZVRvVXRmOCh0aGlzLnVzZXJOYW1lKVxyXG4gICAgICAgICAgLy90aGlzLnVzZXJOYW1lID1qYXZhLm5ldC5VUkxEZWNvZGVyLmRlY29kZSh0ZW1wLFwiVVRGLThcIik7IFxyXG4gICAgICAgICAgLy90aGlzLnVzZXJOYW1lID1VdGY4VG9Vbmljb2RlKHRlbXAxKVxyXG4gICAgICAgICAgLy9jYy5sb2coXCJ0aGlzLnVzZXJOYW1lPVwiLHRoaXMudXNlck5hbWUpICBcclxuICAgICAgICAgIEtCRW5naW5lLkV2ZW50LmZpcmUoXCJsb2dpblwiLCB0aGlzLnVzZXJOYW1lLCBcIjEyMzQ1NlwiLCBkYXRhcyk7ICBcclxuICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueZu+mZhuS4rSAuLi4gLi4uXCI7XHJcbiAgICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgIH0sXHJcbiAgICAgICBqb2luUHJpdmF0ZVJvb21pbnB1dGNhbGxiYWNrOmZ1bmN0aW9uKHJvb21JZCl7IC8v5Y+C5pWw5piv5pWw57uEXHJcbiAgICAgICAgIHdpbmRvdy50eXBlPTNcclxuICAgICAgICAgd2luZG93LmxvZ2lucmVzPTEwMDtcclxuICAgICAgICAgd2luZG93LnJvb21JSUQ9cm9vbUlkXHJcbiAgICAgICAgIGlmKHRoaXMuSm9pbkdhbWUpXHJcbiAgICAgICAgICAgIHRoaXMuSm9pbkdhbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgIGNjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSxyb29tSWQpICBcclxuICAgICAgICAgIHZhciBkYXRhcyA9IHt9O1xyXG4gICAgICAgICAgZGF0YXNbXCJwbGF0Zm9ybVwiXSA9IGNjLnN5cy5wbGF0Zm9ybTtcclxuICAgICAgICAgIGRhdGFzID0gdGhpcy5jcmVhdGVEaWN0U3RyaW5nKGRhdGFzKTtcclxuICAgICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwibG9naW4gbmFtZT1cIiArIHRoaXMudXNlck5hbWUpO1xyXG4gXHJcbiAgICAgICAgICBLQkVuZ2luZS5FdmVudC5maXJlKFwibG9naW5cIiwgdGhpcy51c2VyTmFtZSwgXCIxMjM0NTZcIiwgZGF0YXMpOyAgXHJcbiAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiBcclxuICAgICAgIH0sXHJcbiAgICAgICBqb2luUHJpdmF0ZVJvb206IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgICAgLy9jYy5sb2coXCJjYy5zeXMucGxhdGZvcm1cIixjYy5zeXMucGxhdGZvcm0sY2Muc3lzLldFQ0hBVF9HQU1FKVxyXG4gXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlck5hbWU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlck5hbWVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0aGlzLnVzZXJOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuSm9pbkdhbWUuYWN0aXZlPXRydWVcclxuICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIFxyXG4gIFxyXG4gICAgICAgICAgXHJcbiAgICAgICB9LFxyXG5cclxuXHJcblxyXG59KTtcclxuIl19