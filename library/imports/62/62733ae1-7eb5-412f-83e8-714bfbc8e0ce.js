"use strict";
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