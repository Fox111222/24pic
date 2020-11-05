
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
    var obj = wx.getLaunchOptionsSync(); //this.label_hint.string = obj.query["UserName"];
    //this.label_hint.node.opacity=255

    for (var s in obj.query) //obj.query={}
    {
      //this.label_hint.string = "" + obj.query["Roomid"];
      //this.label_hint.node.opacity=255
      if (s == "Roomid") {
        qData.Roomid = obj.query[s]; //this.label_hint.string = "邀请ID" + qData.Roomid;
        //this.label_hint.node.opacity=255

        var string2Result = qData.Roomid.split(''); //字符串变成字符串数组

        window.roomIID = this.parseRoomID(string2Result); //string2Result.map(window.roomID)
        //window.roomID=qData.Roomid
      }

      if (s == "UserName") {
        qData.UserName = obj.query[s];
        window.invateAcountname = obj.query[s]; //this.label_hint.string = obj.query[s] + "邀请";
        //this.label_hint.node.opacity=255
      } //    qData.gender = obj.query[s];
      //if(s == "city")
      //     qData.city = obj.query[s];

    } //this.label_hint.string = qData.UserName + "邀请ID" + qData.Roomid;
    //this.label_hint.node.opacity=255
    //window.invateAcountname=qData.UserName


    return qData;
  },
  // LIFE-CYCLE CALLBACKS:
  EditBoxclick: function EditBoxclick() {
    cc.log("EditBoxclick"); // window.AudioMgr.playSFX("ui_click")

    this.userName = this.textinput_name.string;
  },
  update: function update(dt) {
    this.sum = this.sum + dt;

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
    } //cc.log("roomid=", window.roomID)


    if (window.roomIID.length > 0) {
      //if(cc.sys.localStorage.getItem("userName").length == 0) return

      /*
      if(cc.sys.platform == cc.sys.WECHAT_GAME){
          this.userName=cc.sys.localStorage.getItem("userName");
      }
      if(this.userName.length == 0)
      {
          this.label_hint.string = "用户名不能为空";
          return;
      }
      
      this.joinPrivateRoominputcallback(window.roomIID)
      window.roomID=undefined
      */
      this.btn_accept.active = true;
      this.btn_accept.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = "确认接受" + window.invateAcountname + "的邀请！"; //this.btn_start.active=false;
    }
  },
  accept_wx: function accept_wx() {
    this.btn_accept.active = false;
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

    this.btn_start = this.node.getChildByName("start_bg").getChildByName("btn_start");
    this.btn_accept = this.node.getChildByName("start_bg").getChildByName("accept");
    this.btn_accept.active = false; //this.loadItemPrefab();
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

        if (window.type == 3 && window.roomIID.length > 0) {
          player.joinPrivateRoom(window.roomIID);
          window.roomIID = [];
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
    window.roomIID = roomId;
    if (this.JoinGame) this.JoinGame.active = false; //////////////////////////////////////////////////

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2Nfc2NyaXB0c1xcU3RhcnRTY2VuZS5qcyJdLCJuYW1lcyI6WyJLQkVuZ2luZSIsInJlcXVpcmUiLCJXeEJpekRhdGFDcnlwdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGV4dGlucHV0X25hbWUiLCJ0eXBlIiwiRWRpdEJveCIsImxhYmVsX2hpbnQiLCJMYWJlbCIsInN0YXJ0Iiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRSIsImdldFF1ZXJ5IiwicGFyc2VSb29tSUQiLCJudW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInBhcnNlSW50IiwicURhdGEiLCJvYmoiLCJ3eCIsImdldExhdW5jaE9wdGlvbnNTeW5jIiwicyIsInF1ZXJ5IiwiUm9vbWlkIiwic3RyaW5nMlJlc3VsdCIsInNwbGl0Iiwid2luZG93Iiwicm9vbUlJRCIsIlVzZXJOYW1lIiwiaW52YXRlQWNvdW50bmFtZSIsIkVkaXRCb3hjbGljayIsImxvZyIsInVzZXJOYW1lIiwic3RyaW5nIiwidXBkYXRlIiwiZHQiLCJzdW0iLCJsb2dpbnJlcyIsIm5vZGUiLCJvcGFjaXR5IiwibGVuZ3RoIiwiYnRuX2FjY2VwdCIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiYWNjZXB0X3d4IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2siLCJvbkxvYWQiLCJpbml0S2JlbmdpbmUiLCJpbnN0YWxsRXZlbnRzIiwibG9hZGVyIiwibG9hZFJlcyIsIlByZWZhYiIsImVyciIsInByZWZhYiIsIkpvaW5HYW1lIiwiaW5zdGFudGlhdGUiLCJhZGRDaGlsZCIsImJpbmQiLCJidG5fc3RhcnQiLCJBdWRpb01nciIsImluaXQiLCJyYW5kb21zdHJpbmciLCJjb2RlIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJlbmFibGVXeFNoYXJlIiwid3hMb2dpbk5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiaGVsbG8iLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwiU0hBUkVfUElDVFVSRSIsInNlbGYiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJzZXRJdGVtIiwic3NlbGYiLCJnZXRVc2VySW5mbyIsIndpdGhDcmVkZW50aWFscyIsImVuY3J5cHRlZERhdGEiLCJpdiIsImZhaWwiLCJ2aXNpYmxlU2l6ZSIsInZpZXciLCJnZXRWaXNpYmxlU2l6ZSIsInd4X3NpemUiLCJnZXRTeXN0ZW1JbmZvU3luYyIsInNpemVfc2NhbGVfd2lkdGgiLCJzY3JlZW5IZWlnaHQiLCJoZWlnaHQiLCJ4Iiwid2lkdGgiLCJ5IiwiYnRuQXV0aG9yaXplIiwiY3JlYXRlVXNlckluZm9CdXR0b24iLCJ0ZXh0Iiwic3R5bGUiLCJsZWZ0IiwidG9wIiwibGluZUhlaWdodCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJib3JkZXJSYWRpdXMiLCJvblRhcCIsInVpbmZvIiwic2YiLCJjb25zb2xlIiwiZXJyTXNnIiwic2hvd1RvYXN0IiwiaGlkZSIsIkwiLCJyYW5kb21jaGFyIiwibiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImFyZ3MiLCJLQkVuZ2luZUFyZ3MiLCJpcCIsIlNFUlZFUl9JUCIsInBvcnQiLCJTRVJWRVJfUE9SVCIsImlzV3NzIiwiSVNfVVNFX1dTUyIsImlzQnlJUCIsIkxPR0lOX0JZX0lQIiwic2VydmVyVVJMIiwiU0VSVkVSX1VSTCIsImNyZWF0ZSIsIkV2ZW50IiwicmVnaXN0ZXIiLCJ1bkluc3RhbGxFdmVudHMiLCJkZXJlZ2lzdGVyIiwib25Db25uZWN0aW9uU3RhdGUiLCJsb2dTdHIiLCJhcHAiLCJJTkZPX01TRyIsIm9uQ29ubmVjdGlvblN0YXRlMiIsIm9uTG9naW5GYWlsZWQiLCJmYWlsZWRjb2RlIiwic2VydmVyRXJyIiwic2VydmVyZGF0YXMiLCJvblJlbG9naW5CYXNlYXBwRmFpbGVkIiwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseSIsIm9uTG9naW5CYXNlYXBwRmFpbGVkIiwiZGVjb2RlRW5jcnlwdGVkRGF0YSIsInNlc3Npb25LZXkiLCJwYyIsImRhdGEiLCJkZXNjcnl0RGF0YSIsIm9uU2V0U3BhY2VEYXRhIiwiZW50ZXJTY2VuZSIsInBsYXllciIsImxvYWRTY2VuZSIsImpvaW5Sb29tIiwiY3JlYXRlUHJpdmF0ZVJvb20iLCJqb2luUHJpdmF0ZVJvb20iLCJvbkxvZ2luQmFzZWFwcCIsIkxvZ2luYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIiwiQmFzZWFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyIsIkJhc2VhcHBfaW1wb3J0Q2xpZW50RW50aXR5RGVmIiwiY3JlYXRlRGljdFN0cmluZyIsImRpYyIsImRpY3RTdHJpbmciLCJsZW4iLCJwcm8iLCJwcm9wIiwic3RhcnRHYW1lIiwiZXZlbnQiLCJkYXRhcyIsImZpcmUiLCJyb29tSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQSxJQUFJQyxjQUFjLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUE1Qjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGNBQWMsRUFBQztBQUNYLGlCQUFTLElBREU7QUFFWEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkUsS0FEUDtBQU1SQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUTtBQUZEO0FBTkosR0FIUDtB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LEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUEzQjtBQUNBNEssSUFBQUEsS0FBSyxHQUFHLEtBQUtSLGdCQUFMLENBQXNCUSxLQUF0QixDQUFSO0FBQ0ExTCxJQUFBQSxRQUFRLENBQUN5SixRQUFULENBQWtCLGdCQUFnQixLQUFLbkgsUUFBdkMsRUFYMEMsQ0FZMUM7QUFDQTtBQUNBO0FBQ0E7O0FBQ0F0QyxJQUFBQSxRQUFRLENBQUNrSixLQUFULENBQWV5QyxJQUFmLENBQW9CLE9BQXBCLEVBQTZCLEtBQUtySixRQUFsQyxFQUE0QyxRQUE1QyxFQUFzRG9KLEtBQXREO0FBQ0EsU0FBS2hMLFVBQUwsQ0FBZ0I2QixNQUFoQixHQUF5QixhQUF6QjtBQUNBLFNBQUs0QixTQUFMLENBQWVuQixNQUFmLEdBQXdCLEtBQXhCO0FBRUYsR0F0b0JDO0FBdW9CRjZILEVBQUFBLGVBQWUsRUFBRSx5QkFBVVksS0FBVixFQUFpQjtBQUVoQztBQUNDO0FBR0EsUUFBR3RMLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFQLElBQW1CWCxFQUFFLENBQUNVLEdBQUgsQ0FBT0UsV0FBN0IsRUFBeUM7QUFDckMsV0FBS3VCLFFBQUwsR0FBY25DLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPdUMsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBZDtBQUNIOztBQUNELFFBQUcsS0FBS2YsUUFBTCxDQUFjUSxNQUFkLElBQXdCLENBQTNCLEVBQ0E7QUFDSSxXQUFLcEMsVUFBTCxDQUFnQjZCLE1BQWhCLEdBQXlCLFNBQXpCO0FBQ0E7QUFDSDs7QUFDRCxTQUFLd0IsUUFBTCxDQUFjZixNQUFkLEdBQXFCLElBQXJCLENBZCtCLENBZS9CO0FBSUY7QUExcEJDLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxudmFyIEtCRW5naW5lID0gcmVxdWlyZShcImtiZW5naW5lXCIpO1xyXG52YXIgV3hCaXpEYXRhQ3J5cHQgPSByZXF1aXJlKFwiV3hCaXpEYXRhQ3J5cHRcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRleHRpbnB1dF9uYW1lOntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsYWJlbF9oaW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRRdWVyeSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcnNlUm9vbUlEOmZ1bmN0aW9uKG51bXMpe1xyXG4gICAgICAgIC8vdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgbnVtcy5mb3JFYWNoKChpdGVtLGluZGV4KSA9PntcclxuXHQgICAgICAgIG51bXNbaW5kZXhdID0gcGFyc2VJbnQobnVtc1tpbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbnVtczsgLy/ovazmiJDmlbDlrZfmlbDnu4RcclxuICAgIH0sXHJcbiAgICBnZXRRdWVyeTpmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcURhdGEgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHd4LmdldExhdW5jaE9wdGlvbnNTeW5jKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IG9iai5xdWVyeVtcIlVzZXJOYW1lXCJdO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWxfaGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMgaW4gb2JqLnF1ZXJ5KSAvL29iai5xdWVyeT17fVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIlwiICsgb2JqLnF1ZXJ5W1wiUm9vbWlkXCJdO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmxhYmVsX2hpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG4gICAgICAgICAgICAgICAgaWYocyA9PSBcIlJvb21pZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBxRGF0YS5Sb29taWQgPSBvYmoucXVlcnlbc107XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLpgoDor7dJRFwiICsgcURhdGEuUm9vbWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sYWJlbF9oaW50Lm5vZGUub3BhY2l0eT0yNTVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0cmluZzJSZXN1bHQgPSBxRGF0YS5Sb29taWQuc3BsaXQoJycpIC8v5a2X56ym5Liy5Y+Y5oiQ5a2X56ym5Liy5pWw57uEXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJvb21JSUQ9dGhpcy5wYXJzZVJvb21JRChzdHJpbmcyUmVzdWx0KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3N0cmluZzJSZXN1bHQubWFwKHdpbmRvdy5yb29tSUQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aW5kb3cucm9vbUlEPXFEYXRhLlJvb21pZFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocyA9PSBcIlVzZXJOYW1lXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHFEYXRhLlVzZXJOYW1lID0gb2JqLnF1ZXJ5W3NdO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5pbnZhdGVBY291bnRuYW1lPW9iai5xdWVyeVtzXVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IG9iai5xdWVyeVtzXSArIFwi6YKA6K+3XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmxhYmVsX2hpbnQubm9kZS5vcGFjaXR5PTI1NVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIHFEYXRhLmdlbmRlciA9IG9iai5xdWVyeVtzXTtcclxuICAgICAgICAgICAgICAgIC8vaWYocyA9PSBcImNpdHlcIilcclxuICAgICAgICAgICAgICAgIC8vICAgICBxRGF0YS5jaXR5ID0gb2JqLnF1ZXJ5W3NdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IHFEYXRhLlVzZXJOYW1lICsgXCLpgoDor7dJRFwiICsgcURhdGEuUm9vbWlkO1xyXG4gICAgICAgICAgICAvL3RoaXMubGFiZWxfaGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIC8vd2luZG93LmludmF0ZUFjb3VudG5hbWU9cURhdGEuVXNlck5hbWVcclxuICAgICAgICAgICAgcmV0dXJuIHFEYXRhO1xyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgRWRpdEJveGNsaWNrOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MubG9nKFwiRWRpdEJveGNsaWNrXCIpXHJcbiAgICAgICAvLyB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgdGhpcy51c2VyTmFtZT10aGlzLnRleHRpbnB1dF9uYW1lLnN0cmluZ1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZTpmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgdGhpcy5zdW09dGhpcy5zdW0rZHQ7XHJcbiAgICAgICAgaWYod2luZG93LmxvZ2lucmVzPT0wKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi6L6T5YWl5oi/6Ze0SUTml6DmlYgs6K+36YeN5paw6L6T5YWl5oi/5Y+3XCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxMy4wLCAwKTtcclxuICAgICAgICAgICAgLy90aGlzLmxhYmVsX2hpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgLy93aW5kb3cubG9naW5yZXM9MTAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYod2luZG93LmxvZ2lucmVzPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi5oi/6Ze05bey5ruh77yB6K+36YeN5paw6L6T5YWl5oi/5Y+3XCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5ub2RlLm9wYWNpdHk9MjU1XHJcbiAgICAgICAgICAgIC8vdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxMy4wLCAwKTtcclxuICAgICAgICAgICAgLy90aGlzLmxhYmVsX2hpbnQubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgLy93aW5kb3cubG9naW5yZXM9MTAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwicm9vbWlkPVwiLCB3aW5kb3cucm9vbUlEKVxyXG4gICAgICAgIGlmKHdpbmRvdy5yb29tSUlELmxlbmd0aCA+MCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2lmKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpLmxlbmd0aCA9PSAwKSByZXR1cm5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMudXNlck5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueUqOaIt+WQjeS4jeiDveS4uuepulwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmpvaW5Qcml2YXRlUm9vbWlucHV0Y2FsbGJhY2sod2luZG93LnJvb21JSUQpXHJcbiAgICAgICAgICAgIHdpbmRvdy5yb29tSUQ9dW5kZWZpbmVkXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgdGhpcy5idG5fYWNjZXB0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgIHRoaXMuYnRuX2FjY2VwdC5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIuehruiupOaOpeWPl1wiKyB3aW5kb3cuaW52YXRlQWNvdW50bmFtZSArXCLnmoTpgoDor7fvvIFcIlxyXG4gICAgICAgICAgIC8vdGhpcy5idG5fc3RhcnQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWNjZXB0X3d4KCl7XHJcbiAgICAgICAgdGhpcy5idG5fYWNjZXB0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLnVzZXJOYW1lPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJOYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjayh3aW5kb3cucm9vbUlJRClcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN1bT0wOyAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdEtiZW5naW5lKCk7XHJcbiAgICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKCk7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWIvSm9pbkdhbWVcIiwgY2MuUHJlZmFiLCBmdW5jdGlvbiAoZXJyLCBwcmVmYWIpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiY2MubG9hZGVyLmxvYWRSZXMgZmFpbFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY2MubG9nKFwiY2MubG9hZGVyLmxvYWRSZXMgc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICB0aGlzLkpvaW5HYW1lID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5Kb2luR2FtZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhcnRfYmdcIikuYWRkQ2hpbGQodGhpcy5Kb2luR2FtZSlcclxuLy8gICAgICAgICAgICAgICAgdGhpcy5GbHlQb29sRGljdFt0aGlzLkZseVBvb2xpZF09bmV3Tm9kZVxyXG4vLyAgICAgICAgICAgICAgICB0aGlzLkZseVBvb2xpZCsrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAvLyBsb2FkIHRoZSBzcHJpdGUgZnJhbWUgb2YgKHByb2plY3QvYXNzZXRzL3Jlc291cmNlcy9pbWdzL2NvY29zLnBuZykgZnJvbSByZXNvdXJjZXMgZm9sZGVyXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ3ByZWZhYi9iZycsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJjYy5sb2FkZXIubG9hZFJlcyBmYWlsXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhcnRfYmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c3ByaXRlRnJhbWVcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhcnRfYmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fc3RhcnRcIilcclxuXHJcbiAgICAgICAgdGhpcy5idG5fYWNjZXB0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0X2JnXCIpLmdldENoaWxkQnlOYW1lKFwiYWNjZXB0XCIpXHJcbiAgICAgICAgdGhpcy5idG5fYWNjZXB0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAvL3RoaXMubG9hZEl0ZW1QcmVmYWIoKTtcclxuICAgICAgICAvL3dpbmRvdy5BdWRpb01ncj10aGlzLm5vZGUuYWRkQ29tcG9uZW50KFwiQXVkaW9NZ3JcIikgICAgICBcclxuICAgICAgICB2YXIgQXVkaW9NZ3IgPSByZXF1aXJlKFwiQXVkaW9NZ3JcIik7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyID0gbmV3IEF1ZGlvTWdyKCk7XHJcbiAgICAgICAgd2luZG93LkF1ZGlvTWdyLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IGNjLnN5cy5wbGF0Zm9ybSAhPSBjYy5zeXMuV0VDSEFUX0dBTUUgPyB0aGlzLnJhbmRvbXN0cmluZyg0KTogJyc7XHJcbiAgICAgICAgLy90aGlzLmJ0bl9zdGFydC5ub2RlLm9uKCdjbGljaycsIHRoaXMuc3RhcnRHYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvZGUgPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcIldvcmxkU2NlbmVcIik7XHJcblxyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dGlucHV0X25hbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVXeFNoYXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMud3hMb2dpbk5hdGl2ZSgpO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy53Yz10cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dGlucHV0X25hbWUucGxhY2Vob2xkZXI9XCLor7fovpPlhaXkvaDnmoTmmLXnp7AuLi5cIlxyXG4gICAgICAgICAgICB0aGlzLnVzZXJOYW1lPXRoaXMudGV4dGlucHV0X25hbWUuc3RyaW5nICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vd2luZG93LkF1ZGlvTWdyLnBsYXlCR00oXCJiZ21cIilcclxuICAgICAgICBjYy5sb2coXCJ3aW5kb3cubG9naW5yZXM9XCIsd2luZG93LmxvZ2lucmVzKVxyXG5cclxuXHJcbiAgICAgfSxcclxuXHJcbiAgICAgaGVsbG8gKCkge1xyXG4gICAgICAgIGNjLmxvZyhcImhlbGxvIHdvcmxkXCIpO1xyXG4gICAgIH0sXHJcblxyXG5cclxuICAgICBlbmFibGVXeFNoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDp0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaKleefs+WvueaImFwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6U0hBUkVfUElDVFVSRSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgIH0sXHJcblxyXG4gICAgd3hMb2dpbk5hdGl2ZTogZnVuY3Rpb24oKXtcclxuICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zc2VsZi5jb2RlID0gcmVzLmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlck5hbWVcIiwgcmVzLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInd4TG9naW5OYXRpdmUgc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzc2VsZj1zZWxmO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Zyo55So5oi35pyq5o6I5p2D6L+H55qE5oOF5Ya15LiL6LCD55So5q2k5o6l5Y+j77yM5bCG5LiN5YaN5Ye6546w5o6I5p2D5by556qX77yM5Lya55u05o6l6L+b5YWlIGZhaWwg5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3NlbGYuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NzZWxmLnVzZXJOYW1lID0gdGhpcy5jb2RlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVuY3J5cHRlZERhdGFcIiwgcmVzLmVuY3J5cHRlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXZcIiwgcmVzLml2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInd4TG9naW5OYXRpdmUoKSBlbmNyeXB0ZWREYXRhICYmIGl2XCIscmVzLmVuY3J5cHRlZERhdGEgLCByZXMuaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6KHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInd4LmdldHVzZXJpbmZvIGZhaWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluinhuWbvueql+WPo+WPr+ingeWMuuWfn+WwuuWvuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpc2libGVTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6I635Y+W57O757uf5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd3hfc2l6ZSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+iuoeeul+WunumZheWkp+Wwj+WSjOWPr+ingeWMuuWfn+WwuuWvuOeahOavlOS+i++8iOi/memHjOS7peWuveW6puS4uuWHhu+8iVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpemVfc2NhbGVfd2lkdGggPSB3eF9zaXplLnNjcmVlbkhlaWdodCAvIHZpc2libGVTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4ID0gKHZpc2libGVTaXplLndpZHRoIC8gMikgKiBzaXplX3NjYWxlX3dpZHRoLSgxMjUgKiBzaXplX3NjYWxlX3dpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5ID0gKCB2aXNpYmxlU2l6ZS5oZWlnaHQgLyAyICkgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gMjUwICogc2l6ZV9zY2FsZV93aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSA2MCAqIHNpemVfc2NhbGVfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzc2VsZi5idG5BdXRob3JpemUgPSB3eC5jcmVhdGVVc2VySW5mb0J1dHRvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfngrnlh7vlvq7kv6HnmbvpmYbmjojmnYMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjMzI5NmZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNzZWxmLmJ0bkF1dGhvcml6ZS5vblRhcCgodWluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Y9c3NlbGZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uVGFwIHVpbmZvOiBcIix1aW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVpbmZvLmVyck1zZyA9PSBcImdldFVzZXJJbmZvOm9rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eExvZ2luIGF1dGggc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTpcIuaOiOadg+aIkOWKn1wifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVuY3J5cHRlZERhdGFcIiwgdWluZm8uZW5jcnlwdGVkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIml2XCIsIHVpbmZvLml2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZi5sYWJlbF9oaW50LnN0cmluZyA9IFwidWluZm8uZW5jcnlwdGVkRGF0YT1cIit1aW5mby5lbmNyeXB0ZWREYXRhK1wiL1wiK3VpbmZvLml2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZi5sYWJlbF9oaW50LnN0cmluZyA9IHVpbmZvLmVuY3J5cHRlZERhdGEgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZi5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3hMb2dpbiBhdXRoIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6XCLmjojmnYPlpLHotKVcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZi5idG5BdXRob3JpemUuaGlkZSgpOyAvL+iOt+WPlueUqOaIt+S/oeaBr+aIkOWKn+WQjumakOiXj+aMiemSrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLypcclxuICAgIC8v6I635Y+W6KeG5Zu+56qX5Y+j5Y+v6KeB5Yy65Z+f5bC65a+4XHJcbiAgICBsZXQgdmlzaWJsZVNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7IFxyXG4gICAgLy/ojrflj5bns7vnu5/kv6Hmga9cclxuICAgIGxldCB3eF9zaXplID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgIC8v6K6h566X5a6e6ZmF5aSn5bCP5ZKM5Y+v6KeB5Yy65Z+f5bC65a+455qE5q+U5L6L77yI6L+Z6YeM5Lul5a695bqm5Li65YeG77yJXHJcbiAgICBsZXQgc2l6ZV9zY2FsZV93aWR0aCA9IHd4X3NpemUuc2NyZWVuV2lkdGggLyB2aXNpYmxlU2l6ZS53aWR0aDtcclxuICAgIC8v6K6h566X5Yib5bu655So5oi35L+h5oGv5oyJ6ZKu6ZyA6KaB55qE5bGe5oCn77yIaW1nX2F1dGjkuLrok53oibLlj4LogIPoioLngrnvvIlcclxuICAgIGxldCB4ID0gKHZpc2libGVTaXplLndpZHRoIC8gMikgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgbGV0IHkgPSAoIHZpc2libGVTaXplLmhlaWdodCAvIDIgKSAqIHNpemVfc2NhbGVfd2lkdGg7XHJcbiAgICBsZXQgd2lkdGggPSAzNjAgKiBzaXplX3NjYWxlX3dpZHRoO1xyXG4gICAgbGV0IGhlaWdodCA9IDM2MCAqIHNpemVfc2NhbGVfd2lkdGg7XHJcblxyXG4gICAgc3NlbGYuYXV0aG9yQnV0dG9uID0gd3guY3JlYXRlVXNlckluZm9CdXR0b24oe1xyXG4gICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgdGV4dDogXCLmjojmnYPmjInpkq5cIixcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBsZWZ0OiB4LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgbGluZUhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgY29sb3I6IFwiIzMyOTZmYVwiLFxyXG4gICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAwLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBzc2VsZi5hdXRob3JCdXR0b24ub25UYXAoKHJlcykgPT4ge1xyXG4gICAgICBpZiAocmVzLmVyck1zZyA9PSBcImdldFVzZXJJbmZvOm9rXCIpIHtcclxuICAgICAgICBjYy5sb2coXCJ3eExvZ2luTmF0aXZlKCkgZW5jcnlwdGVkRGF0YSAmJiBpdlwiLHJlcy5lbmNyeXB0ZWREYXRhICwgcmVzLml2KVxyXG4gICAgICAgIHNzZWxmLmJ0bl9zdGFydC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZW5jcnlwdGVkRGF0YVwiLCByZXMuZW5jcnlwdGVkRGF0YSk7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXZcIiwgcmVzLml2KTtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCLojrflj5bnlKjmiLfkv6Hmga/miJDlip9cIixcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNzZWxmLmF1dGhvckJ1dHRvbi5oaWRlKCk7IC8v6I635Y+W55So5oi35L+h5oGv5oiQ5Yqf5ZCO6ZqQ6JeP5oyJ6ZKuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwiZ2V0VXNlckluZm86ZmFpbCBhdXRoIGRlbnlcIikge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuiOt+WPlueUqOaIt+S/oeaBr+Wksei0pVwiLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5lcnJNc2csXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICovICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgICByYW5kb21zdHJpbmc6IGZ1bmN0aW9uKEwpe1xyXG4gICAgICAgIHZhciBzPSAnJztcclxuICAgICAgICB2YXIgcmFuZG9tY2hhcj1mdW5jdGlvbigpe1xyXG4gICAgICAgICB2YXIgbj0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYyKTtcclxuICAgICAgICAgaWYobjwxMCkgcmV0dXJuIG47IC8vMC05XHJcbiAgICAgICAgIGlmKG48MzYpIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKG4rNTUpOyAvL0EtWlxyXG4gICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShuKzYxKTsgLy9hLXpcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUocy5sZW5ndGg8IEwpIHMrPSByYW5kb21jaGFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAgaW5pdEtiZW5naW5lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IG5ldyBLQkVuZ2luZS5LQkVuZ2luZUFyZ3MoKTtcdFxyXG5cdCAgICBhcmdzLmlwID0gU0VSVkVSX0lQO1xyXG4gICAgICAgIGFyZ3MucG9ydCA9IFNFUlZFUl9QT1JUO1xyXG4gICAgICAgIGFyZ3MuaXNXc3MgPSBJU19VU0VfV1NTOyAgICAgICAgICAgICAgLy/mmK/lkKbnlKh3c3PljY/orq7vvIwgdHJ1ZTp3c3MgIGZhbHNlOndzXHJcbiAgICAgICAgYXJncy5pc0J5SVAgPSBMT0dJTl9CWV9JUDsgICAgICAgICAgICAgLy/nlKhpcOi/mOaYr+eUqOWfn+WQjeeZu+W9leacjeWKoeWZqCAgIOacieS/ruaUueWumOaWueeahGtiZW5naW5lLmpzXHJcbiAgICAgICAgYXJncy5zZXJ2ZXJVUkwgPSBTRVJWRVJfVVJMO1xyXG5cdCAgICBLQkVuZ2luZS5jcmVhdGUoYXJncyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgaW5zdGFsbEV2ZW50czpmdW5jdGlvbigpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uQ29ubmVjdGlvblN0YXRlXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGVcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZTJcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcblx0XHRLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcImVudGVyU2NlbmVcIiwgdGhpcywgXCJlbnRlclNjZW5lXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LnJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIsIHRoaXMsIFwib25SZWxvZ2luQmFzZWFwcFN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5yZWdpc3RlcihcIm9uTG9naW5CYXNlYXBwXCIsIHRoaXMsIFwib25Mb2dpbkJhc2VhcHBcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQucmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIHVuSW5zdGFsbEV2ZW50cygpIHtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGVcIiwgdGhpcywgXCJvbkNvbm5lY3Rpb25TdGF0ZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Db25uZWN0aW9uU3RhdGUyXCIsIHRoaXMsIFwib25Db25uZWN0aW9uU3RhdGUyXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luRmFpbGVkXCIsIHRoaXMsIFwib25Mb2dpbkZhaWxlZFwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25Mb2dpbkJhc2VhcHBGYWlsZWRcIiwgdGhpcywgXCJvbkxvZ2luQmFzZWFwcEZhaWxlZFwiKTtcclxuXHRcdEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJlbnRlclNjZW5lXCIsIHRoaXMsIFwiZW50ZXJTY2VuZVwiKTtcclxuICAgICAgICBLQkVuZ2luZS5FdmVudC5kZXJlZ2lzdGVyKFwib25SZWxvZ2luQmFzZWFwcEZhaWxlZFwiLCB0aGlzLCBcIm9uUmVsb2dpbkJhc2VhcHBGYWlsZWRcIik7XHJcbiAgICAgICAgS0JFbmdpbmUuRXZlbnQuZGVyZWdpc3RlcihcIm9uUmVsb2dpbkJhc2VhcHBTdWNjZXNzZnVsbHlcIiwgdGhpcywgXCJvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvbkxvZ2luQmFzZWFwcFwiLCB0aGlzLCBcIm9uTG9naW5CYXNlYXBwXCIpO1xyXG4gICAgICAgIEtCRW5naW5lLkV2ZW50LmRlcmVnaXN0ZXIoXCJvblNldFNwYWNlRGF0YVwiLCB0aGlzLCBcIm9uU2V0U3BhY2VEYXRhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgIH0sXHJcblxyXG4gICAgIG9uQ29ubmVjdGlvblN0YXRlIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr29uZXJyb3JfYmVmb3JlX29ub3BlblwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0aW9uU3RhdGUyIDogZnVuY3Rpb24oc3VjY2Vzcykge1xyXG4gICAgICAgIHZhciBsb2dTdHIgPSBcIlwiO1xyXG5cdFx0aWYoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbG9nU3RyID0gXCIgQ29ubmVjdChcIiArIEtCRW5naW5lLmFwcC5pcCArIFwiOlwiICsgS0JFbmdpbmUuYXBwLnBvcnQgKyBcIikgaXMgZXJyb3IhICjov57mjqXplJnor68pXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIui/nuaOpemUmeivr3NvY2tldCBub3QgaXMgbnVsbFwiO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dTdHIgPSBcIkNvbm5lY3Qgc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdC4uLijov57mjqXmiJDlip/vvIzor7fnrYnlgJkuLi4pXCI7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKGxvZ1N0cik7XHJcblx0fSxcclxuXHJcbiAgICAgb25Mb2dpbkZhaWxlZCA6IGZ1bmN0aW9uKGZhaWxlZGNvZGUpIHtcclxuICAgICAgICB2YXIgbG9nU3RyID0gJyc7XHJcbiAgICAgICAgaWYoZmFpbGVkY29kZSA9PSAyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgbG9nU3RyID0gXCJMb2dpbiBpcyBmYWlsZWQo55m76ZmG5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSArIFwiLCBcIiArIEtCRW5naW5lLmFwcC5zZXJ2ZXJkYXRhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBsb2dTdHIgPSBcIkxvZ2luIGlzIGZhaWxlZCjnmbvpmYblpLHotKUpLCBlcnI9XCIgKyBLQkVuZ2luZS5hcHAuc2VydmVyRXJyKGZhaWxlZGNvZGUpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5aSx6LSlLFwiICsgIEtCRW5naW5lLmFwcC5zZXJ2ZXJFcnIoZmFpbGVkY29kZSk7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhsb2dTdHIpO1x0XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25SZWxvZ2luQmFzZWFwcEZhaWxlZDogZnVuY3Rpb24oZmFpbGVkY29kZSl7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcInJlb2dpbiBpcyBmYWlsZWQo5pat57q/6YeN6L+e5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSlcclxuICAgICB9LFxyXG5cclxuICAgICBvblJlbG9naW5CYXNlYXBwU3VjY2Vzc2Z1bGx5IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJyZW9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjmlq3nur/ph43ov57miJDlip8hKVwiKVxyXG4gICAgfSxcclxuXHJcbiAgICAgb25Mb2dpbkJhc2VhcHBGYWlsZWQgOiBmdW5jdGlvbihmYWlsZWRjb2RlKSB7XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcIkxvZ2luQmFzZWFwcCBpcyBmYWlsZWQo55m76ZmG572R5YWz5aSx6LSlKSwgZXJyPVwiICsgS0JFbmdpbmUuYXBwLnNlcnZlckVycihmYWlsZWRjb2RlKSk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgZGVjb2RlRW5jcnlwdGVkRGF0YTpmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZW5jcnlwdGVkRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVuY3J5cHRlZERhdGFcIik7XHJcbiAgICAgICAgdmFyIHNlc3Npb25LZXkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZXNzaW9uS2V5XCIpO1xyXG4gICAgICAgIHZhciBpdiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIml2XCIpO1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiZGVjb2RlRW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YT1cIiArIGVuY3J5cHRlZERhdGEgKyBcIiAsaXY9XCIgKyBpdiArIFwiICxzZXNzaW9uS2V5PVwiICsgc2Vzc2lvbktleSk7XHJcbiAgICAgICAgaWYoc2Vzc2lvbktleSAmJiBlbmNyeXB0ZWREYXRhICYmIGl2KSB7XHJcbiAgICAgICAgICAgIC8vdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KEFQUElELCBzZXNzaW9uS2V5KTtcclxuICAgICAgICAgICAgdmFyIHBjID0gbmV3IFd4Qml6RGF0YUNyeXB0KFwid3hiZTE2NDQ1NTZlZDhhZmE2XCIsIFwiOTZjMGUyMmFmMjU1NzFkYjVmMTc1ZWJiYjU1MGU2NzJcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcGMuZGVzY3J5dERhdGEoZW5jcnlwdGVkRGF0YSAsIGl2KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ino+WvhuWQjiBkYXRhOiAnLCBkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICB9LFxyXG4gICAgIG9uU2V0U3BhY2VEYXRhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGNjLmxvZyhcInN0YXJ0c2NlbmUub25TZXRTcGFjZURhdGFcIilcclxuICAgICB9LCAgXHJcbiAgICAgZW50ZXJTY2VuZSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwiTG9naW4gaXMgc3VjY2Vzc2Z1bGx5ISjnmbvpmYbmiJDlip8hKVwiKTtcclxuICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbmiJDlip8gISEhXCI7XHJcbiAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZW5jcnlwdGVkRGF0YVwiKTtcclxuICAgICAgICAgICAgdmFyIGl2ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXZcIik7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImVuY3J5cHRlZERhdGEgJiYgaXZcIixlbmNyeXB0ZWREYXRhICwgaXYpXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcImJhc2UuZGVjb2RlRW5jcnlwdGVkRGF0YSgpPVwiICsgZW5jcnlwdGVkRGF0YSArIFwiL1wiICsgaXY7XHJcbiAgICAgICAgICAgIHBsYXllci5kZWNvZGVFbmNyeXB0ZWREYXRhKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL3ZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7Ly9LQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLmVudGl0eV9pZF07ICAgIFxyXG4gICAgICAgIC8vcGxheWVyLmpvaW5Sb29tKClcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiV29ybGRTY2VuZVwiLCAoKT0+IHtcclxuICAgICAgICAgICAgS0JFbmdpbmUuSU5GT19NU0coXCJsb2FkIHdvcmxkIHNjZW5lIGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpOy8vS0JFbmdpbmUuYXBwLmVudGl0aWVzW0tCRW5naW5lLmFwcC5lbnRpdHlfaWRdO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy50eXBlPTFcclxuICAgICAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cudHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmpvaW5Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jcmVhdGVQcml2YXRlUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy50eXBlPT0zICYmIHdpbmRvdy5yb29tSUlELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuam9pblByaXZhdGVSb29tKHdpbmRvdy5yb29tSUlEKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucm9vbUlJRD1bXSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudW5JbnN0YWxsRXZlbnRzKCk7ICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgLypcclxuICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcIkxvZ2luIGlzIHN1Y2Nlc3NmdWxseSEo55m76ZmG5oiQ5YqfISlcIik7XHJcbiAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55m76ZmG5oiQ5YqfICEhIVwiO1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gS0JFbmdpbmUuYXBwLnBsYXllcigpO1xyXG4gICAgICAgICAgICB2YXIgZW5jcnlwdGVkRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVuY3J5cHRlZERhdGFcIik7XHJcbiAgICAgICAgICAgIHZhciBpdiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIml2XCIpO1xyXG4gICAgICAgICAgICBjYy5sb2coXCJlbmNyeXB0ZWREYXRhICYmIGl2XCIsZW5jcnlwdGVkRGF0YSAsIGl2KVxyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCJiYXNlLmRlY29kZUVuY3J5cHRlZERhdGEoKT1cIiArIGVuY3J5cHRlZERhdGEgKyBcIi9cIiArIGl2O1xyXG4gICAgICAgICAgICAvL3BsYXllci5kZWNvZGVFbmNyeXB0ZWREYXRhKCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJXb3JsZFNjZW5lXCIsICgpPT4ge1xyXG4gICAgICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImxvYWQgd29ybGQgc2NlbmUgZmluaXNoZWRcIik7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBLQkVuZ2luZS5hcHAucGxheWVyKCk7Ly9LQkVuZ2luZS5hcHAuZW50aXRpZXNbS0JFbmdpbmUuYXBwLmVudGl0eV9pZF07XHJcbiAgICAgICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuam9pblJvb20oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51bkluc3RhbGxFdmVudHMoKTtcclxuICAgICAgICAqL1xyXG4gICAgIH0sXHJcbiBcclxuICAgICBvbkxvZ2luQmFzZWFwcCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNjLmxvZyhcIkNvbm5lY3QgdG8gbG9naW5CYXNlYXBwLCBwbGVhc2Ugd2FpdC4uLijov57mjqXliLDnvZHlhbPvvIwg6K+356iN5ZCOLi4uKVwiKTtcclxuICAgICB9LFxyXG4gXHJcbiAgICAgTG9naW5hcHBfaW1wb3J0Q2xpZW50TWVzc2FnZXMgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgIGNjLmxvZyhcIkxvZ2luYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIC4uLlwiKTtcclxuICAgICB9LFxyXG4gXHJcbiAgICAgQmFzZWFwcF9pbXBvcnRDbGllbnRNZXNzYWdlcyA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICBjYy5sb2coXCJCYXNlYXBwX2ltcG9ydENsaWVudE1lc3NhZ2VzIC4uXCIpO1xyXG4gICAgIH0sXHJcbiAgICAgICAgIFxyXG4gICAgIEJhc2VhcHBfaW1wb3J0Q2xpZW50RW50aXR5RGVmOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgY2MubG9nKFwiQmFzZWFwcF9pbXBvcnRDbGllbnRFbnRpdHlEZWYgLi5cIilcclxuICAgICB9LFxyXG5cclxuICAgICBjcmVhdGVEaWN0U3RyaW5nOiBmdW5jdGlvbihkaWMpIHtcclxuICAgICAgICB2YXIgZGljdFN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGxlbiA9IDA7XHJcbiAgICAgICAgZm9yKHZhciBwcm8gaW4gZGljKSBsZW4rKztcclxuXHJcbiAgICAgICAgaWYobGVuID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB2YXIgZGljdFN0cmluZyA9IFwie1wiXHJcbiAgICAgICAgICAgIGZvcih2YXIgcHJvcCBpbiBkaWMpIHtcclxuICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCInXCIgKyBwcm9wICsgXCInXCIgO1xyXG4gICAgICAgICAgICAgICAgZGljdFN0cmluZyArPSBcIjpcIjtcclxuICAgICAgICAgICAgICAgIGRpY3RTdHJpbmcgKz0gXCInXCIgKyBkaWNbcHJvcF0gKyBcIidcIjtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IGxlbi0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljdFN0cmluZyArPSBcIn1cIjtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWN0U3RyaW5nICs9IFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRpY3RTdHJpbmc7XHJcbiAgICAgfSxcclxuIFxyXG4gICAgIHN0YXJ0R2FtZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgd2luZG93LmxvZ2lucmVzPTEwMDtcclxuICAgICAgICAvLyB3aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgIC8vY2MubG9nKFwiY2Muc3lzLnBsYXRmb3JtXCIsY2Muc3lzLnBsYXRmb3JtLGNjLnN5cy5XRUNIQVRfR0FNRSlcclxuICAgICAgICAgd2luZG93LnR5cGU9MVxyXG4gICAgICAgICBpZihjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcclxuICAgICAgICAgICAgIHRoaXMudXNlck5hbWU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlck5hbWVcIik7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYodGhpcy51c2VyTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55So5oi35ZCN5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiBcclxuIFxyXG4gICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICBjYy5sb2coXCJ0aGlzLnVzZXJOYW1lPVwiLCB0aGlzLnVzZXJOYW1lKSAgXHJcbiAgICAgICAgIHZhciBkYXRhcyA9IHt9O1xyXG4gICAgICAgICBkYXRhc1tcInBsYXRmb3JtXCJdID0gY2Muc3lzLnBsYXRmb3JtO1xyXG4gICAgICAgICBkYXRhcyA9IHRoaXMuY3JlYXRlRGljdFN0cmluZyhkYXRhcyk7XHJcbiAgICAgICAgIEtCRW5naW5lLklORk9fTVNHKFwibG9naW4gbmFtZT1cIiArIHRoaXMudXNlck5hbWUpO1xyXG4gICAgICAgICAvL3ZhciB0ZW1wMT1Vbmljb2RlVG9VdGY4KHRoaXMudXNlck5hbWUpXHJcbiAgICAgICAgIC8vdGhpcy51c2VyTmFtZSA9amF2YS5uZXQuVVJMRGVjb2Rlci5kZWNvZGUodGVtcCxcIlVURi04XCIpOyBcclxuICAgICAgICAgLy90aGlzLnVzZXJOYW1lID1VdGY4VG9Vbmljb2RlKHRlbXAxKVxyXG4gICAgICAgICAvL2NjLmxvZyhcInRoaXMudXNlck5hbWU9XCIsdGhpcy51c2VyTmFtZSkgIFxyXG4gICAgICAgICBLQkVuZ2luZS5FdmVudC5maXJlKFwibG9naW5cIiwgdGhpcy51c2VyTmFtZSwgXCIxMjM0NTZcIiwgZGF0YXMpOyAgXHJcbiAgICAgICAgIHRoaXMubGFiZWxfaGludC5zdHJpbmcgPSBcIueZu+mZhuS4rSAuLi4gLi4uXCI7XHJcbiAgICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICBcclxuICAgICAgICAgLypcclxuXHQgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgZGF0YXMpXHJcblx0ICAgIHsgIFxyXG5cdFx0ICAgIEtCRW5naW5lLmFwcC5yZXNldCgpO1xyXG5cdFx0ICAgIEtCRW5naW5lLmFwcC51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG5cdFx0ICAgIEtCRW5naW5lLmFwcC5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG5cdFx0ICAgIEtCRW5naW5lLmFwcC5jbGllbnRkYXRhcyA9IGRhdGFzO1xyXG5cdFx0XHJcblx0XHQgICAgS0JFbmdpbmUuYXBwLmxvZ2luX2xvZ2luYXBwKHRydWUpO1xyXG5cdCAgICB9XHJcblxyXG5cclxuICAgICAgICAgKi9cclxuIFxyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGVQcml2YXRlUm9vbTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgd2luZG93LmxvZ2lucmVzPTEwMDsgXHJcbiAgICAgICAgIHdpbmRvdy50eXBlPTJcclxuICAgICAgICAgLy8gd2luZG93LkF1ZGlvTWdyLnBsYXlTRlgoXCJ1aV9jbGlja1wiKVxyXG4gICAgICAgICAgLy9jYy5sb2coXCJjYy5zeXMucGxhdGZvcm1cIixjYy5zeXMucGxhdGZvcm0sY2Muc3lzLldFQ0hBVF9HQU1FKVxyXG4gICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyTmFtZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKHRoaXMudXNlck5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55So5oi35ZCN5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIix0aGlzLnVzZXJOYW1lKSAgXHJcbiAgICAgICAgICB2YXIgZGF0YXMgPSB7fTtcclxuICAgICAgICAgIGRhdGFzW1wicGxhdGZvcm1cIl0gPSBjYy5zeXMucGxhdGZvcm07XHJcbiAgICAgICAgICBkYXRhcyA9IHRoaXMuY3JlYXRlRGljdFN0cmluZyhkYXRhcyk7XHJcbiAgICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImxvZ2luIG5hbWU9XCIgKyB0aGlzLnVzZXJOYW1lKTtcclxuICAgICAgICAgIC8vdmFyIHRlbXAxPVVuaWNvZGVUb1V0ZjgodGhpcy51c2VyTmFtZSlcclxuICAgICAgICAgIC8vdGhpcy51c2VyTmFtZSA9amF2YS5uZXQuVVJMRGVjb2Rlci5kZWNvZGUodGVtcCxcIlVURi04XCIpOyBcclxuICAgICAgICAgIC8vdGhpcy51c2VyTmFtZSA9VXRmOFRvVW5pY29kZSh0ZW1wMSlcclxuICAgICAgICAgIC8vY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIix0aGlzLnVzZXJOYW1lKSAgXHJcbiAgICAgICAgICBLQkVuZ2luZS5FdmVudC5maXJlKFwibG9naW5cIiwgdGhpcy51c2VyTmFtZSwgXCIxMjM0NTZcIiwgZGF0YXMpOyAgXHJcbiAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICB9LFxyXG4gICAgICAgam9pblByaXZhdGVSb29taW5wdXRjYWxsYmFjazpmdW5jdGlvbihyb29tSWQpeyAvL+WPguaVsOaYr+aVsOe7hFxyXG4gICAgICAgICB3aW5kb3cudHlwZT0zXHJcbiAgICAgICAgIHdpbmRvdy5sb2dpbnJlcz0xMDA7XHJcbiAgICAgICAgIHdpbmRvdy5yb29tSUlEPXJvb21JZFxyXG4gICAgICAgICBpZih0aGlzLkpvaW5HYW1lKVxyXG4gICAgICAgICAgICB0aGlzLkpvaW5HYW1lLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICBjYy5sb2coXCJ0aGlzLnVzZXJOYW1lPVwiLHRoaXMudXNlck5hbWUscm9vbUlkKSAgXHJcbiAgICAgICAgICB2YXIgZGF0YXMgPSB7fTtcclxuICAgICAgICAgIGRhdGFzW1wicGxhdGZvcm1cIl0gPSBjYy5zeXMucGxhdGZvcm07XHJcbiAgICAgICAgICBkYXRhcyA9IHRoaXMuY3JlYXRlRGljdFN0cmluZyhkYXRhcyk7XHJcbiAgICAgICAgICBLQkVuZ2luZS5JTkZPX01TRyhcImxvZ2luIG5hbWU9XCIgKyB0aGlzLnVzZXJOYW1lKTtcclxuICAgICAgICAgIC8vdmFyIHRlbXAxPVVuaWNvZGVUb1V0ZjgodGhpcy51c2VyTmFtZSlcclxuICAgICAgICAgIC8vdGhpcy51c2VyTmFtZSA9amF2YS5uZXQuVVJMRGVjb2Rlci5kZWNvZGUodGVtcCxcIlVURi04XCIpOyBcclxuICAgICAgICAgIC8vdGhpcy51c2VyTmFtZSA9VXRmOFRvVW5pY29kZSh0ZW1wMSlcclxuICAgICAgICAgIC8vY2MubG9nKFwidGhpcy51c2VyTmFtZT1cIix0aGlzLnVzZXJOYW1lKSAgXHJcbiAgICAgICAgICBLQkVuZ2luZS5FdmVudC5maXJlKFwibG9naW5cIiwgdGhpcy51c2VyTmFtZSwgXCIxMjM0NTZcIiwgZGF0YXMpOyAgXHJcbiAgICAgICAgICB0aGlzLmxhYmVsX2hpbnQuc3RyaW5nID0gXCLnmbvpmYbkuK0gLi4uIC4uLlwiO1xyXG4gICAgICAgICAgdGhpcy5idG5fc3RhcnQuYWN0aXZlID0gZmFsc2U7XHJcbiBcclxuICAgICAgIH0sXHJcbiAgICAgICBqb2luUHJpdmF0ZVJvb206IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgLy93aW5kb3cuQXVkaW9NZ3IucGxheVNGWChcInVpX2NsaWNrXCIpXHJcbiAgICAgICAgICAvL2NjLmxvZyhcImNjLnN5cy5wbGF0Zm9ybVwiLGNjLnN5cy5wbGF0Zm9ybSxjYy5zeXMuV0VDSEFUX0dBTUUpXHJcbiBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSl7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyTmFtZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKHRoaXMudXNlck5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sYWJlbF9oaW50LnN0cmluZyA9IFwi55So5oi35ZCN5LiN6IO95Li656m6XCI7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5Kb2luR2FtZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgXHJcbiAgXHJcbiAgICAgICAgICBcclxuICAgICAgIH0sXHJcblxyXG5cclxuXHJcbn0pO1xyXG4iXX0=