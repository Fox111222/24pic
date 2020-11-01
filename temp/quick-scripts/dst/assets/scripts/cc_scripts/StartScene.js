
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
  // LIFE-CYCLE CALLBACKS:
  EditBoxclick: function EditBoxclick() {
    cc.log("EditBoxclick"); // window.AudioMgr.playSFX("ui_click")

    this.userName = this.textinput_name.string;
  },
  update: function update() {
    if (window.loginres == 0) {
      this.label_hint.string = "输入房间ID无效,请重新输入房号";
      this.label_hint.node.opacity = 255; //var action = cc.fadeTo(13.0, 0);
      //this.label_hint.node.runAction(action);
      //window.loginres=100
    } else if (window.loginres == 1) {
      this.label_hint.string = "房间已满！请重新输入房号";
      this.label_hint.node.opacity = 255; //var action = cc.fadeTo(13.0, 0);
      //this.label_hint.node.runAction(action);
      //window.loginres=100
    }
  },
  onLoad: function onLoad() {
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
    /*
    // load the sprite frame of (project/assets/resources/imgs/cocos.png) from resources folder
    cc.loader.loadRes('prefab/bg', cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
            cc.log("cc.loader.loadRes fail")
            return;
        }
        this.node.getChildByName("start_bg").getComponent(cc.Sprite).spriteFrame=spriteFrame
    }.bind(this));
    */

    this.btn_start = this.node.getChildByName("start_bg").getChildByName("btn_start"); //this.loadItemPrefab();
    //window.AudioMgr=this.node.addComponent("AudioMgr")      

    var AudioMgr = require("AudioMgr");

    window.AudioMgr = new AudioMgr();
    window.AudioMgr.init();
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
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.onShareAppMessage(function () {
      return {
        title: "投石对战",
        imageUrl: SHARE_PICTURE
      };
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
          }); /////////////////////////////
          /////////////////////////////////

          /*
              //获取视图窗口可见区域尺寸
              let visibleSize = cc.view.getVisibleSize(); 
              //获取系统信息
              let wx_size = wx.getSystemInfoSync();
              //计算实际大小和可见区域尺寸的比例（这里以宽度为准）
              let size_scale_width = wx_size.screenWidth / visibleSize.width;
              //计算创建用户信息按钮需要的属性（img_auth为蓝色参考节点）
              let x = (visibleSize.width / 2) * size_scale_width;
              let y = ( visibleSize.height / 2 ) * size_scale_width;
              let width = 360 * size_scale_width;
              let height = 360 * size_scale_width;
          
              sself.authorButton = wx.createUserInfoButton({
                type: "text",
                text: "授权按钮",
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
                  borderRadius: 0,
                },
              });
              sself.authorButton.onTap((res) => {
                if (res.errMsg == "getUserInfo:ok") {
                  cc.log("wxLoginNative() encryptedData && iv",res.encryptedData , res.iv)
                  sself.btn_start.node.active = true;
                  cc.sys.localStorage.setItem("encryptedData", res.encryptedData);
                  cc.sys.localStorage.setItem("iv", res.iv);
                  wx.showToast({
                    icon: "none",
                    title: "获取用户信息成功",
                    duration: 2000,
                  });
                  sself.authorButton.hide(); //获取用户信息成功后隐藏按钮
                } else {
                  if (res.errMsg === "getUserInfo:fail auth deny") {
                    wx.showToast({
                      icon: "none",
                      title: "获取用户信息失败",
                      duration: 2000,
                    });
                  } else {
                    wx.showToast({
                      icon: "none",
                      title: res.errMsg,
                      duration: 2000,
                    });
                  }
                }
              });
                             
               */
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

        if (window.type == 3 && window.privateRoomID.length > 0) {
          player.joinPrivateRoom(window.privateRoomID);
        }
      }

      _this.unInstallEvents();
    });
    /*
    KBEngine.INFO_MSG("Login is successfully!(登陆成功!)");
    this.label_hint.string = "登陆成功 !!!";
    if(cc.sys.platform == cc.sys.WECHAT_GAME){
       var player = KBEngine.app.player();
       var encryptedData = cc.sys.localStorage.getItem("encryptedData");
       var iv = cc.sys.localStorage.getItem("iv");
       cc.log("encryptedData && iv",encryptedData , iv)
       this.label_hint.string = "base.decodeEncryptedData()=" + encryptedData + "/" + iv;
       //player.decodeEncryptedData();
    }                
    cc.director.loadScene("WorldScene", ()=> {
       KBEngine.INFO_MSG("load world scene finished");
       var player = KBEngine.app.player();//KBEngine.app.entities[KBEngine.app.entity_id];
       if(player){
           player.joinRoom();
       }
           
    });
    this.unInstallEvents();
    */
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
    window.loginres = 100; // window.AudioMgr.playSFX("ui_click")
    //cc.log("cc.sys.platform",cc.sys.platform,cc.sys.WECHAT_GAME)

    window.type = 1;

    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.userName = cc.sys.localStorage.getItem("userName");
    }

    if (this.userName.length == 0) {
      this.label_hint.string = "用户名不能为空";
      return;
    } ///////////////////////////////////////////////////
    //////////////////////////////////////////////////


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
    /*
    this.login = function(username, password, datas)
    {  
    KBEngine.app.reset();
    KBEngine.app.username = username;
    KBEngine.app.password = password;
    KBEngine.app.clientdatas = datas;
     KBEngine.app.login_loginapp(true);
    }
        */
  },
  createPrivateRoom: function createPrivateRoom(event) {
    window.loginres = 100;
    window.type = 2; // window.AudioMgr.playSFX("ui_click")
    //cc.log("cc.sys.platform",cc.sys.platform,cc.sys.WECHAT_GAME)

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
    window.privateRoomID = roomId;
    this.JoinGame.active = false; //////////////////////////////////////////////////

    cc.log("this.userName=", this.userName, roomId);
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
  joinPrivateRoom: function joinPrivateRoom(event) {
    //window.AudioMgr.playSFX("ui_click")
    //cc.log("cc.sys.platform",cc.sys.platform,cc.sys.WECHAT_GAME)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcU3RhcnRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJXeEJpekRhdGFDcnlwdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGV4dGlucHV0X25hbWUiLCJ0eXBlIiwiRWRpdEJveCIsImxhYmVsX2hpbnQiLCJMYWJlbCIsIkVkaXRCb3hjbGljayIsImxvZyIsInVzZXJOYW1lIiwic3RyaW5nIiwidXBkYXRlIiwid2luZG93IiwibG9naW5yZXMiLCJub2RlIiwib3BhY2l0eSIsIm9uTG9hZCIsImluaXRLYmVuZ2luZSIsImluc3RhbGxFdmVudHMiLCJsb2FkZXIiLCJsb2FkUmVzIiwiUHJlZmFiIiwiZXJyIiwicHJlZmFiIiwiSm9pbkdhbWUiLCJpbnN0YW50aWF0ZSIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiYWRkQ2hpbGQiLCJiaW5kIiwiYnRuX3N0YXJ0IiwiQXVkaW9NZ3IiLCJpbml0Iiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRSIsInJhbmRvbXN0cmluZyIsImNvZGUiLCJkaXJlY3RvciIsInByZWxvYWRTY2VuZSIsImVuYWJsZVd4U2hhcmUiLCJ3eExvZ2luTmF0aXZlIiwicGxhY2Vob2xkZXIiLCJoZWxsbyIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJpbWFnZVVybCIsIlNIQVJFX1BJQ1RVUkUiLCJzZWxmIiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInNzZWxmIiwiZ2V0VXNlckluZm8iLCJ3aXRoQ3JlZGVudGlhbHMiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJmYWlsIiwidmlzaWJsZVNpemUiLCJ2aWV3IiwiZ2V0VmlzaWJsZVNpemUiLCJ3eF9zaXplIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJzaXplX3NjYWxlX3dpZHRoIiwic2NyZWVuSGVpZ2h0IiwiaGVpZ2h0IiwieCIsIndpZHRoIiwieSIsImJ0bkF1dGhvcml6ZSIsImNyZWF0ZVVzZXJJbmZvQnV0dG9uIiwidGV4dCIsInN0eWxlIiwibGVmdCIsInRvcCIsImxpbmVIZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiYm9yZGVyUmFkaXVzIiwib25UYXAiLCJ1aW5mbyIsInNmIiwiY29uc29sZSIsImVyck1zZyIsInNob3dUb2FzdCIsImhpZGUiLCJMIiwicyIsInJhbmRvbWNoYXIiLCJuIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwibGVuZ3RoIiwiYXJncyIsIktCRW5naW5lQXJncyIsImlwIiwiU0VSVkVSX0lQIiwicG9ydCIsIlNFUlZFUl9QT1JUIiwiaXNXc3MiLCJJU19VU0VfV1NTIiwiaXNCeUlQIiwiTE9HSU5fQllfSVAiLCJzZXJ2ZXJVUkwiLCJTRVJWRVJfVVJMIiwiY3JlYXRlIiwiRXZlbnQiLCJyZWdpc3RlciIsInVuSW5zdGFsbEV2ZW50cyIsImRlcmVnaXN0ZXIiLCJvbkNvbm5lY3Rpb25TdGF0ZSIsImxvZ1N0ciIsImFwcCIsIklORk9fTVNHIiwib25Db25uZWN0aW9uU3RhdGUyIiwib25Mb2dpbkZhaWxlZCIsImZhaWxlZGNvZGUiLCJzZXJ2ZXJFcnIiLCJzZXJ2ZXJkYXRhcyIsIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWQiLCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5Iiwib25Mb2dpbkJhc2VhcHBGYWlsZWQiLCJkZWNvZGVFbmNyeXB0ZWREYXRhIiwiZ2V0SXRlbSIsInNlc3Npb25LZXkiLCJwYyIsImRhdGEiLCJkZXNjcnl0RGF0YSIsIm9uU2V0U3BhY2VEYXRhIiwiZW50ZXJTY2VuZSIsInBsYXllciIsImxvYWRTY2VuZSIsImpvaW5Sb29tIiwiY3JlYXRlUHJpdmF0ZVJvb20iLCJwcml2YXRlUm9vbUlEIiwiam9pblByaXZhdGVSb29tIiwib25Mb2dpbkJhc2VhcHAiLCJMb2dpbmFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyIsIkJhc2VhcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMiLCJCYXNlYXBwX2ltcG9ydENsaWVudEVudGl0eURlZiIsImNyZWF0ZURpY3RTdHJpbmciLCJkaWMiLCJkaWN0U3RyaW5nIiwibGVuIiwicHJvIiwiaW5kZXgiLCJwcm9wIiwic3RhcnRHYW1lIiwiZXZlbnQiLCJkYXRhcyIsImZpcmUiLCJqb2luUHJpdmF0ZVJvb21pbnB1dGNhbGxiYWNrIiwicm9vbUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsY0FBYyxHQUFHRCxPQUFPLENBQUMsZ0JBQUQsQ0FBNUI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxjQUFjLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBRFA7QUFNUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1E7QUFGRDtBQU5KLEdBSFA7QUFlTDtBQUNBQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFDbkJULElBQUFBLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPLGNBQVAsRUFEbUIsQ0FFcEI7O0FBQ0MsU0FBS0MsUUFBTCxHQUFjLEtBQUtQLGNBQUwsQ0FBb0JRLE1BQWxDO0FBQ0gsR0FwQkk7QUFxQkxDLEVBQUFBLE1BQU0sRUFBQyxrQkFBVTtBQUNiLFFBQUdDLE1BQU0sQ0FBQ0MsUUFBUCxJQUFpQixDQUFwQixFQUFzQjtBQUNsQixX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LEVBQUFBLGVBQWUsRUFBRSx5QkFBVWEsS0FBVixFQUFpQjtBQUVoQztBQUNDO0FBR0EsUUFBR2hLLEVBQUUsQ0FBQ21DLEdBQUgsQ0FBT0MsUUFBUCxJQUFtQnBDLEVBQUUsQ0FBQ21DLEdBQUgsQ0FBT0UsV0FBN0IsRUFBeUM7QUFDckMsV0FBSzFCLFFBQUwsR0FBY1gsRUFBRSxDQUFDbUMsR0FBSCxDQUFPc0IsWUFBUCxDQUFvQjhFLE9BQXBCLENBQTRCLFVBQTVCLENBQWQ7QUFDSDs7QUFDRCxRQUFHLEtBQUs1SCxRQUFMLENBQWM2RixNQUFkLElBQXdCLENBQTNCLEVBQ0E7QUFDSSxXQUFLakcsVUFBTCxDQUFnQkssTUFBaEIsR0FBeUIsU0FBekI7QUFDQTtBQUNIOztBQUNELFNBQUtjLFFBQUwsQ0FBY0UsTUFBZCxHQUFxQixJQUFyQixDQWQrQixDQWUvQjtBQUlGO0FBbmtCQyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbnZhciBLQkVuZ2luZSA9IHJlcXVpcmUoXCJrYmVuZ2luZVwiKTtcclxudmFyIFd4Qml6RGF0YUNyeXB0ID0gcmVxdWlyZShcIld4Qml6RGF0YUNyeXB0XCIpO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB0ZXh0aW5wdXRfbmFtZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbGFiZWxfaGludDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIEVkaXRCb3hjbGljazpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLmxvZyhcIkVkaXRCb3hjbGlja1wiKVxyXG4gICAgICAgLy8gd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgIHRoaXMudXNlck5hbWU9dGhpcy50ZXh0aW5wdXRfbmFtZS5zdHJpbmdcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih3aW5kb3cubG9naW5yZXM9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLovpPlhaXmiL/pl7RJROaXoOaViCzor7fph43mlrDovpPlhaXmiL/lj7dcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgLy92YXIgYWN0aW9uID0gY2MuZmFkZVRvKDEzLjAsIDApO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWxfaGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy5sb2dpbnJlcz0xMDBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih3aW5kb3cubG9naW5yZXM9PTEpe1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLmiL/pl7Tlt7Lmu6HvvIHor7fph43mlrDovpPlhaXmiL/lj7dcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuICAgICAgICAgICAgLy92YXIgYWN0aW9uID0gY2MuZmFkZVRvKDEzLjAsIDApO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWxfaGludC5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy5sb2dpbnJlcz0xMDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0S2JlbmdpbmUoKTtcclxuICAgICAgICB0aGlzLmluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYi9Kb2luR2FtZVwiLCBjYy5QcmVmYWIsIGZ1bmN0aW9uIChlcnIsIHByZWZhYikge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJjYy5sb2FkZXIubG9hZFJlcyBmYWlsXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYy5sb2coXCJjYy5sb2FkZXIubG9hZFJlcyBzdWNjZXNzXCIpXHJcbiAgICAgICAgICAgIHRoaXMuSm9pbkdhbWUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLkpvaW5HYW1lLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydF9iZ1wiKS5hZGRDaGlsZCh0aGlzLkpvaW5HYW1lKVxyXG4vLyAgICAgICAgICAgICAgICB0aGlzLkZseVBvb2xEaWN0W3RoaXMuRmx5UG9vbGlkXT1uZXdOb2RlXHJcbi8vICAgICAgICAgICAgICAgIHRoaXMuRmx5UG9vbGlkKys7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIC8vIGxvYWQgdGhlIHNwcml0ZSBmcmFtZSBvZiAocHJvamVjdC9hc3NldHMvcmVzb3VyY2VzL2ltZ3MvY29jb3MucG5nKSBmcm9tIHJlc291cmNlcyBmb2xkZXJcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygncHJlZmFiL2JnJywgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcImNjLmxvYWRlci5sb2FkUmVzIGZhaWxcIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydF9iZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zcHJpdGVGcmFtZVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJ0bl9zdGFydD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydF9iZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9zdGFydFwiKVxyXG4gICAgICAgIC8vdGhpcy5sb2FkSXRlbVByZWZhYigpO1xyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyPXRoaXMubm9kZS5hZGRDb21wb25lbnQoXCJBdWRpb01nclwiKSAgICAgIFxyXG4gICAgICAgIHZhciBBdWRpb01nciA9IHJlcXVpcmUoXCJBdWRpb01nclwiKTtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IgPSBuZXcgQXVkaW9NZ3IoKTtcclxuICAgICAgICB3aW5kb3cuQXVkaW9NZ3IuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLnVzZXJOYW1lID0gY2Muc3lzLnBsYXRmb3JtICE9IGNjLnN5cy5XRUNIQVRfR0FNRSA/IHRoaXMucmFuZG9tc3RyaW5nKDQpOiAnJztcclxuICAgICAgICAvL3RoaXMuYnRuX3N0YXJ0Lm5vZGUub24oJ2NsaWNrJywgdGhpcy5zdGFydEdhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29kZSA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFwiV29ybGRTY2VuZVwiKTtcclxuXHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0aW5wdXRfbmFtZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVd4U2hhcmUoKTtcclxuICAgICAgICAgICAgdGhpcy53eExvZ2luTmF0aXZlKCk7XHJcbiAgICAgICAgICAgIC8vd2luZG93LndjPXRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0aW5wdXRfbmFtZS5wbGFjZWhvbGRlcj1cIuivt+i+k+WFpeS9oOeahOaYteensC4uLlwiXHJcbiAgICAgICAgICAgIHRoaXMudXNlck5hbWU9dGhpcy50ZXh0aW5wdXRfbmFtZS5zdHJpbmcgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheUJHTShcImJnbVwiKVxyXG4gICAgICAgIGNjLmxvZyhcIndpbmRvdy5sb2dpbnJlcz1cIix3aW5kb3cubG9naW5yZXMpXHJcbiAgICAgfSxcclxuXHJcbiAgICAgaGVsbG8gKCkge1xyXG4gICAgICAgIGNjLmxvZyhcImhlbGxvIHdvcmxkXCIpO1xyXG4gICAgIH0sXHJcblxyXG5cclxuICAgICBlbmFibGVXeFNoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDp0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaKleefs+WvueaImFwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6U0hBUkVfUElDVFVSRSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcblxyXG4gICAgd3hMb2dpbk5hdGl2ZTogZnVuY3Rpb24oKXtcclxuICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zc2VsZi5jb2RlID0gcmVzLmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlck5hbWVcIiwgcmVzLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInd4TG9naW5OYXRpdmUgc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzc2VsZj1zZWxmO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Zyo55So5oi35pyq5o6I5p2D6L+H55qE5oOF5Ya15LiL6LCD55So5q2k5o6l5Y+j77yM5bCG5LiN5YaN5Ye6546w5o6I5p2D5by556qX77yM5Lya55u05o6l6L+b5YWlIGZhaWwg5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3NlbGYuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NzZWxmLnVzZXJOYW1lID0gdGhpcy5jb2RlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVuY3J5cHRlZERhdGFcIiwgcmVzLmVuY3J5cHRlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXZcIiwgcmVzLml2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInd4TG9naW5OYXRpdmUoKSBlbmNyeXB0ZWREYXRhICYmIGl2XCIscmVzLmVuY3J5cHRlZERhdGEgLCByZXMuaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6KHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInd4LmdldHVzZXJpbmZvIGZhaWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluinhuWbvueql+WPo+WPr+ingeWMuuWfn+WwuuWvuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpc2libGVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6I635Y+W57O757uf5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd3hfc2l6ZSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+iuoeeul+WunumZheWkp+Wwj+WSjOWPr+ingeWMuuWfn+WwuuWvuOeahOavlOS+i++8iOi/memHjOS7peWuveW6puS4uuWHhu+8iVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpemVfc2NhbGVfd2lkdGggPSB3eF9zaXplLnNjcmVlbkhlaWdodCAvIHZpc2libGVTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKHZpc2libGVTaXplLndpZHRoIC8gMikgKiBzaXplX3NjYWxlX3dpZHRoLSgxMjUgKiBzaXplX3NjYWxlX3dpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5ID0gKCB2aXNpYmxlU2l6ZS5oZWlnaHQgLyAyICkgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gMjUwICogc2l6ZV9zY2FsZV93aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSA2MCAqIHNpemVfc2NhbGVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzc2VsZi5idG5BdXRob3JpemUgPSB3eC5jcmVhdGVVc2VySW5mb0J1dHRvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfngrnlh7vlvq7kv6HnmbvpmYbmjojmnYMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMzI5NmZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNzZWxmLmJ0bkF1dGhvcml6ZS5vblRhcCgodWluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Y9c3NlbGZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uVGFwIHVpbmZvOiBcIix1aW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVpbmZvLmVyck1zZyA9PSBcImdldFVzZXJJbmZvOm9rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eExvZ2luIGF1dGggc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTpcIuaOiOadg+aIkOWKn1wifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVuY3J5cHRlZERhdGFcIiwgdWluZm8uZW5jcnlwdGVkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIml2XCIsIHVpbmZvLml2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZi5sYWJlbF9oaW50LnN0cmluZyA9IFwidWluZm8uZW5jcnlwdGVkRGF0YT1cIit1aW5mby5lbmNyeXB0ZWREYXRhK1wiL1wiK3VpbmZvLml2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZi5sYWJlbF9oaW50LnN0cmluZyA9IHVpbmZvLmVuY3J5cHRlZERhdGEgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZi5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3hMb2dpbiBhdXRoIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6XCLmjojmnYPlpLHotKVcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZi5idG5BdXRob3JpemUuaGlkZSgpOyAvL+iOt+WPlueUqOaIt+S/oeaBr+aIkOWKn+WQjumakOiXj+aMiemSrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLypcclxuICAgIC8v6I635Y+W6KeG5Zu+56qX5Y+j5Y+v6KeB5Yy65Z+f5bC65a+4XHJcbiAgICBsZXQgdmlzaWJsZVNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7IFxyXG4gICAgLy/ojrflj5bns7vnu5/kv6Hmga9cclxuICAgIGxldCB3eF9zaXplID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgIC8v6K6h566X5a6e6ZmF5aSn5bCP5ZKM5Y+v6KeB5Yy65Z+f5bC65a+455qE5q+U5L6L77yI6L+Z6YeM5Lul5a695bqm5Li65YeG77yJXHJcbiAgICBsZXQgc2l6ZV9zY2FsZV93aWR0aCA9IHd4X3NpemUuc2NyZWVuV2lkdGggLyB2aXNpYmxlU2l6ZS53aWR0aDtcclxuICAgIC8v6K6h566X5Yib5bu655So5oi35L+h5oGv5oyJ6ZKu6ZyA6KaB55qE5bGe5oCn77yIaW1nX2F1dGjkuLrok53oibLlj4LogIPoioLngrnvvIlcclxuICAgIGxldCB4ID0gKHZpc2libGVTaXplLndpZHRoIC8gMikgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgbGV0IHkgPSAoIHZpc2libGVTaXplLmhlaWdodCAvIDIgKSAqIHNpemVfc2NhbGVfd2lkdGg7XHJcbiAgICBsZXQgd2lkdGggPSAzNjAgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgbGV0IGhlaWdodCA9IDM2MCAqIHNpemVfc2NhbGVfd2lkdGg7XHJcblxyXG4gICAgc3NlbGYuYXV0aG9yQnV0dG9uID0gd3guY3JlYXRlVXNlckluZm9CdXR0b24oe1xyXG4gICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgdGV4dDogXCLmjojmnYPmjInpkq5cIixcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBsZWZ0OiB4LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgbGluZUhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgY29sb3I6IFwiIzMyOTZmYVwiLFxyXG4gICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAwLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBzc2VsZi5hdXRob3JCdXR0b24ub25UYXAoKHJlcykgPT4ge1xyXG4gICAgICBpZiAocmVzLmVyck1zZyA9PSBcImdldFVzZXJJbmZvOm9rXCIpIHtcclxuICAgICAgICBjYy5sb2coXCJ3eExvZ2luTmF0aXZlKCkgZW5jcnlwdGVkRGF0YSAmJiBpdlwiLHJlcy5lbmNyeXB0ZWREYXRhICwgcmVzLml2KVxyXG4gICAgICAgIHNzZWxmLmJ0bl9zdGFydC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZW5jcnlwdGVkRGF0YVwiLCByZXMuZW5jcnlwdGVkRGF0YSk7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXZcIiwgcmVzLml2KTtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCLojrflj5bnlKjmiLfkv6Hmga/miJDlip9cIixcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNzZWxmLmF1dGhvckJ1dHRvbi5oaWRlKCk7IC8v6I635Y+W55So5oi35L+h5oGv5oiQ5Yqf5ZCO6ZqQ6JeP5oyJ6ZKuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwiZ2V0VXNlckluZm86ZmFpbCBhdXRoIGRlbnlcIikge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuiOt+WPlueUqOaIt+S/oeaBr+Wksei0pVwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5lcnJNc2csXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICovICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgICByYW5kb21zdHJpbmc6IGZ1bmN0aW9uKEwpe1xyXG4gICAgICAgIHZhciBzPSAnJztcclxuICAgICAgICB2YXIgcmFuZG9tY2hhcj1mdW5jdGlvbigpe1xyXG4gICAgICAgICB2YXIgbj0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYyKTtcclxuICAgICAgICAgaWYobjwxMCkgcmV0dXJuIG47IC8vMC05XHJcbiAgICAgICAgIGlmKG48MzYpIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKG4rNTUpOyAvL0EtWlxyXG4gICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShuKzYxKTsgLy9hLXpcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUocy5sZW5ndGg8IEwpIHMrPSByYW5kb21jaGFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAgaW5pdEtiZW5naW5lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IG5ldyBLQkVuZ2luZS5LQkVuZ2luZUFyZ3MoKTtcdFxyXG5cdCAgICBhcmdzLmlwID0gU0VSVkVSX0lQO1xyXG4gICAgICAgIGFyZ3MucG9ydCA9IFNFUlZFUl9QT1JUO1xyXG4gICAgICAgIGFyZ3MuaXNXc3MgPSBJU19VU0VfV1NTOyAgICAgICAgICAgICAgLy/mmK/lkKbnlKh3c3PljY/orq7vvIwgdHJ1ZTp3c3MgIGZhbHNlOndzXHJcbiAgICAgICAgYXJncy5pc0J5SVAgPSBMT0dJTl9CWV9JUDsgICAgICAgICAgICAgLy/nlKhpcOi/mOaYr+eUqOWfn+WQjeeZu+W9leacjeWKoeWZqCAgIOacieS/ruaUueWumOaWueeahGtiZW5naW5lLmpzXHJcbiAgICAgICAgYXJncy5zZXJ2ZXJVUkwgPSBTRVJWRVJfVVJMO1xyXG5cdCAgICBLQkVuZ2luZS5jcmVhdGUoYXJncyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgaW5zdGFsbEV2ZW50czpmdW5jdGlvbigpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQ29ubmVjdGlvblN0YXRlXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGVcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImVudGVyU2NlbmVcIiwgdGhpcywgXCJlbnRlclNjZW5lXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIHVuSW5zdGFsbEV2ZW50cygpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGUyXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGUyXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIiwgdGhpcywgXCJvbkxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRlclNjZW5lXCIsIHRoaXMsIFwiZW50ZXJTY2VuZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luQmFzZWFwcFwiLCB0aGlzLCBcIm9uTG9naW5CYXNlYXBwXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIG9uQ29ubmVjdGlvblN0YXRlIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr29uZXJyb3JfYmVmb3JlX29ub3BlblwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0aW9uU3RhdGUyIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr3NvY2tldCBub3QgaXMgbnVsbFwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcblx0fSxcclxuXHJcbiAgICAgb25Mb2dpbkZhaWxlZCA6IGZ1bmN0aW9uKGZhaWxlZGNvZGUpIHtcclxuICAgICAgICB2YXIgbG9nU3RyID0gJyc7XHJcbiAgICAgICAgaWYoZmFpbGVkY29kZSA9PSAyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgbG9nU3RyID0gXCJMb2dpbiBpcyBmYWlsZWQo55m76ZmG5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSArIFwiLCBcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBsb2dTdHIgPSBcIkxvZ2luIGlzIGZhaWxlZCjnmbvpmYblpLHotKUpLCBlcnI9XCIgKyBLQkVuZ2luZS5hcHAuc2VydmVyRXJyKGZhaWxlZGNvZGUpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5aSx6LSlLFwiICsgIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSk7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhsb2dTdHIpO1x0XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25SZWxvZ2luQmFzZWFwcEZhaWxlZDogZnVuY3Rpb24oZmFpbGVkY29kZSl7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcInJlb2dpbiBpcyBmYWlsZWQo5pat57q/6YeN6L+e5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSlcclxuICAgICB9LFxyXG5cclxuICAgICBvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjmlq3nur/ph43ov57miJDlip8hKVwiKVxyXG4gICAgfSxcclxuXHJcbiAgICAgb25Mb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcIkxvZ2luQmFzZWFwcCBpcyBmYWlsZWQo55m76ZmG572R5YWz5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgZGVjb2RlRW5jcnlwdGVkRGF0YTpmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZW5jcnlwdGVkRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVuY3J5cHRlZERhdGFcIik7XHJcbiAgICAgICAgdmFyIHNlc3Npb25LZXkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZXNzaW9uS2V5XCIpO1xyXG4gICAgICAgIHZhciBpdiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIml2XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZGVjb2RlRW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YT1cIiArIGVuY3J5cHRlZERhdGEgKyBcIiAsaXY9XCIgKyBpdiArIFwiICxzZXNzaW9uS2V5PVwiICsgc2Vzc2lvbktleSk7XHJcbiAgICAgICAgaWYoc2Vzc2lvbktleSAmJiBlbmNyeXB0ZWREYXRhICYmIGl2KSB7XHJcbiAgICAgICAgICAgIC8vdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KEFQUElELCBzZXNzaW9uS2V5KTtcclxuICAgICAgICAgICAgdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KFwid3hiZTE2NDQ1NTZlZDhhZmE2XCIsIFwiOTZjMGUyMmFmMjU1NzFkYjVmMTc1ZWJiYjU1MGU2NzJcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcGMuZGVzY3J5dERhdGEoZW5jcnlwdGVkRGF0YSAsIGl2KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ino+WvhuWQjiBkYXRhOiAnLCBkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICB9LFxyXG4gICAgIG9uU2V0U3BhY2VEYXRhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGNjLmxvZyhcInN0YXJ0c2NlbmUub25TZXRTcGFjZURhdGFcIilcclxuICAgICB9LCAgXHJcbiAgICAgZW50ZXJTY2VuZSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiTG9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjnmbvpmYbmiJDlip8hKVwiKTtcclxuICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbmiJDlip8gISEhXCI7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZW5jcnlwdGVkRGF0YVwiKTtcclxuICAgICAgICAgICAgdmFyIGl2ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXZcIik7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVuY3J5cHRlZERhdGEgJiYgaXZcIixlbmNyeXB0ZWREYXRhICwgaXYpXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcImJhc2UuZGVjb2RlRW5jcnlwdGVkRGF0YSgpPVwiICsgZW5jcnlwdGVkRGF0YSArIFwiL1wiICsgaXY7XHJcbiAgICAgICAgICAgIHBsYXllci5kZWNvZGVFbmNyeXB0ZWREYXRhKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL3ZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7Ly9LQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLmVudGl0eV9pZF07ICAgIFxyXG4gICAgICAgIC8vcGxheWVyLmpvaW5Sb29tKClcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV29ybGRTY2VuZVwiLCAoKT0+IHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2FkIHdvcmxkIHNjZW5lIGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpOy8vS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5lbnRpdHlfaWRdO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy50eXBlPTFcclxuICAgICAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmpvaW5Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jcmVhdGVQcml2YXRlUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50eXBlPT0zICYmIHdpbmRvdy5wcml2YXRlUm9vbUlELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuam9pblByaXZhdGVSb29tKHdpbmRvdy5wcml2YXRlUm9vbUlEKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVuSW5zdGFsbEV2ZW50cygpOyAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgIC8qXHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJMb2dpbiBpcyBzdWNjZXNzZnVsbHkhKOeZu+mZhuaIkOWKnyEpXCIpO1xyXG4gICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueZu+mZhuaIkOWKnyAhISFcIjtcclxuICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IEtCRW5naW5lLmFwcC5wbGF5ZXIoKTtcclxuICAgICAgICAgICAgdmFyIGVuY3J5cHRlZERhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlbmNyeXB0ZWREYXRhXCIpO1xyXG4gICAgICAgICAgICB2YXIgaXYgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpdlwiKTtcclxuICAgICAgICAgICAgY2MubG9nKFwiZW5jcnlwdGVkRGF0YSAmJiBpdlwiLGVuY3J5cHRlZERhdGEgLCBpdilcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwiYmFzZS5kZWNvZGVFbmNyeXB0ZWREYXRhKCk9XCIgKyBlbmNyeXB0ZWREYXRhICsgXCIvXCIgKyBpdjtcclxuICAgICAgICAgICAgLy9wbGF5ZXIuZGVjb2RlRW5jcnlwdGVkRGF0YSgpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV29ybGRTY2VuZVwiLCAoKT0+IHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2FkIHdvcmxkIHNjZW5lIGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpOy8vS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5lbnRpdHlfaWRdO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmpvaW5Sb29tKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudW5JbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgKi9cclxuICAgICB9LFxyXG4gXHJcbiAgICAgb25Mb2dpbkJhc2VhcHAgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYy5sb2coXCJDb25uZWN0IHRvIGxvZ2luQmFzZWFwcCwgcGxlYXNlIHdhaXQuLi4o6L+e5o6l5Yiw572R5YWz77yMIOivt+eojeWQji4uLilcIik7XHJcbiAgICAgfSxcclxuIFxyXG4gICAgIExvZ2luYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5LitIC4uLiAuLi5cIjtcclxuICAgICAgICBjYy5sb2coXCJMb2dpbmFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyAuLi5cIik7XHJcbiAgICAgfSxcclxuIFxyXG4gICAgIEJhc2VhcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgY2MubG9nKFwiQmFzZWFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyAuLlwiKTtcclxuICAgICB9LFxyXG4gICAgICAgICBcclxuICAgICBCYXNlYXBwX2ltcG9ydENsaWVudEVudGl0eURlZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIGNjLmxvZyhcIkJhc2VhcHBfaW1wb3J0Q2xpZW50RW50aXR5RGVmIC4uXCIpXHJcbiAgICAgfSxcclxuXHJcbiAgICAgY3JlYXRlRGljdFN0cmluZzogZnVuY3Rpb24oZGljKSB7XHJcbiAgICAgICAgdmFyIGRpY3RTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHZhciBsZW4gPSAwO1xyXG4gICAgICAgIGZvcih2YXIgcHJvIGluIGRpYykgbGVuKys7XHJcblxyXG4gICAgICAgIGlmKGxlbiA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGRpY3RTdHJpbmcgPSBcIntcIlxyXG4gICAgICAgICAgICBmb3IodmFyIHByb3AgaW4gZGljKSB7XHJcbiAgICAgICAgICAgICAgICBkaWN0U3RyaW5nICs9IFwiJ1wiICsgcHJvcCArIFwiJ1wiIDtcclxuICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCI6XCI7XHJcbiAgICAgICAgICAgICAgICBkaWN0U3RyaW5nICs9IFwiJ1wiICsgZGljW3Byb3BdICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSBsZW4tMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCJ9XCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljdFN0cmluZyArPSBcIixcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkaWN0U3RyaW5nO1xyXG4gICAgIH0sXHJcbiBcclxuICAgICBzdGFydEdhbWU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2dpbnJlcz0xMDA7XHJcbiAgICAgICAgLy8gd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgICAvL2NjLmxvZyhcImNjLnN5cy5wbGF0Zm9ybVwiLGNjLnN5cy5wbGF0Zm9ybSxjYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiAgICAgICAgIHdpbmRvdy50eXBlPTFcclxuICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKHRoaXMudXNlck5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gXHJcbiBcclxuICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIiwgdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICB2YXIgZGF0YXMgPSB7fTtcclxuICAgICAgICAgZGF0YXNbXCJwbGF0Zm9ybVwiXSA9IGNjLnN5cy5wbGF0Zm9ybTtcclxuICAgICAgICAgZGF0YXMgPSB0aGlzLmNyZWF0ZURpY3RTdHJpbmcoZGF0YXMpO1xyXG4gICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImxvZ2luIG5hbWU9XCIgKyB0aGlzLnVzZXJOYW1lKTtcclxuICAgICAgICAgLy92YXIgdGVtcDE9VW5pY29kZVRvVXRmOCh0aGlzLnVzZXJOYW1lKVxyXG4gICAgICAgICAvL3RoaXMudXNlck5hbWUgPWphdmEubmV0LlVSTERlY29kZXIuZGVjb2RlKHRlbXAsXCJVVEYtOFwiKTsgXHJcbiAgICAgICAgIC8vdGhpcy51c2VyTmFtZSA9VXRmOFRvVW5pY29kZSh0ZW1wMSlcclxuICAgICAgICAgLy9jYy5sb2coXCJ0aGlzLnVzZXJOYW1lPVwiLHRoaXMudXNlck5hbWUpICBcclxuICAgICAgICAgS0JFbmdpbmUuRXZlbnQuZmlyZShcImxvZ2luXCIsIHRoaXMudXNlck5hbWUsIFwiMTIzNDU2XCIsIGRhdGFzKTsgIFxyXG4gICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgXHJcbiAgICAgICAgIC8qXHJcblx0ICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQsIGRhdGFzKVxyXG5cdCAgICB7ICBcclxuXHRcdCAgICBLQkVuZ2luZS5hcHAucmVzZXQoKTtcclxuXHRcdCAgICBLQkVuZ2luZS5hcHAudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuXHRcdCAgICBLQkVuZ2luZS5hcHAucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuXHRcdCAgICBLQkVuZ2luZS5hcHAuY2xpZW50ZGF0YXMgPSBkYXRhcztcclxuXHRcdFxyXG5cdFx0ICAgIEtCRW5naW5lLmFwcC5sb2dpbl9sb2dpbmFwcCh0cnVlKTtcclxuXHQgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICovXHJcbiBcclxuICAgICAgfSxcclxuICAgICAgY3JlYXRlUHJpdmF0ZVJvb206IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2dpbnJlcz0xMDA7IFxyXG4gICAgICAgICB3aW5kb3cudHlwZT0yXHJcbiAgICAgICAgIC8vIHdpbmRvdy5BdWRpb01nci5wbGF5U0ZYKFwidWlfY2xpY2tcIilcclxuICAgICAgICAgIC8vY2MubG9nKFwiY2Muc3lzLnBsYXRmb3JtXCIsY2Muc3lzLnBsYXRmb3JtLGNjLnN5cy5XRUNIQVRfR0FNRSlcclxuICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlck5hbWU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlck5hbWVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0aGlzLnVzZXJOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICAgdmFyIGRhdGFzID0ge307XHJcbiAgICAgICAgICBkYXRhc1tcInBsYXRmb3JtXCJdID0gY2Muc3lzLnBsYXRmb3JtO1xyXG4gICAgICAgICAgZGF0YXMgPSB0aGlzLmNyZWF0ZURpY3RTdHJpbmcoZGF0YXMpO1xyXG4gICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2dpbiBuYW1lPVwiICsgdGhpcy51c2VyTmFtZSk7XHJcbiAgICAgICAgICAvL3ZhciB0ZW1wMT1Vbmljb2RlVG9VdGY4KHRoaXMudXNlck5hbWUpXHJcbiAgICAgICAgICAvL3RoaXMudXNlck5hbWUgPWphdmEubmV0LlVSTERlY29kZXIuZGVjb2RlKHRlbXAsXCJVVEYtOFwiKTsgXHJcbiAgICAgICAgICAvL3RoaXMudXNlck5hbWUgPVV0ZjhUb1VuaWNvZGUodGVtcDEpXHJcbiAgICAgICAgICAvL2NjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICAgS0JFbmdpbmUuRXZlbnQuZmlyZShcImxvZ2luXCIsIHRoaXMudXNlck5hbWUsIFwiMTIzNDU2XCIsIGRhdGFzKTsgIFxyXG4gICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5LitIC4uLiAuLi5cIjtcclxuICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgfSxcclxuICAgICAgIGpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2s6ZnVuY3Rpb24ocm9vbUlkKXsgLy/lj4LmlbDmmK/mlbDnu4RcclxuICAgICAgICAgd2luZG93LnR5cGU9M1xyXG4gICAgICAgICB3aW5kb3cubG9naW5yZXM9MTAwO1xyXG4gICAgICAgICB3aW5kb3cucHJpdmF0ZVJvb21JRD1yb29tSWRcclxuICAgICAgICAgdGhpcy5Kb2luR2FtZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIix0aGlzLnVzZXJOYW1lLHJvb21JZCkgIFxyXG4gICAgICAgICAgdmFyIGRhdGFzID0ge307XHJcbiAgICAgICAgICBkYXRhc1tcInBsYXRmb3JtXCJdID0gY2Muc3lzLnBsYXRmb3JtO1xyXG4gICAgICAgICAgZGF0YXMgPSB0aGlzLmNyZWF0ZURpY3RTdHJpbmcoZGF0YXMpO1xyXG4gICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2dpbiBuYW1lPVwiICsgdGhpcy51c2VyTmFtZSk7XHJcbiAgICAgICAgICAvL3ZhciB0ZW1wMT1Vbmljb2RlVG9VdGY4KHRoaXMudXNlck5hbWUpXHJcbiAgICAgICAgICAvL3RoaXMudXNlck5hbWUgPWphdmEubmV0LlVSTERlY29kZXIuZGVjb2RlKHRlbXAsXCJVVEYtOFwiKTsgXHJcbiAgICAgICAgICAvL3RoaXMudXNlck5hbWUgPVV0ZjhUb1VuaWNvZGUodGVtcDEpXHJcbiAgICAgICAgICAvL2NjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICAgS0JFbmdpbmUuRXZlbnQuZmlyZShcImxvZ2luXCIsIHRoaXMudXNlck5hbWUsIFwiMTIzNDU2XCIsIGRhdGFzKTsgIFxyXG4gICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5LitIC4uLiAuLi5cIjtcclxuICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gXHJcbiAgICAgICB9LFxyXG4gICAgICAgam9pblByaXZhdGVSb29tOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgICAgLy9jYy5sb2coXCJjYy5zeXMucGxhdGZvcm1cIixjYy5zeXMucGxhdGZvcm0sY2Muc3lzLldFQ0hBVF9HQU1FKVxyXG4gXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlck5hbWU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlck5hbWVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0aGlzLnVzZXJOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuSm9pbkdhbWUuYWN0aXZlPXRydWVcclxuICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIFxyXG4gIFxyXG4gICAgICAgICAgXHJcbiAgICAgICB9LFxyXG5cclxuXHJcblxyXG59KTtcclxuIl19