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
//var bindjs=require("eval")
var bindjs=require("eval2")

cc.Class({
    extends: cc.Component,
    
    properties: {
        seat1: {
            default: null,
            type: cc.Node,
        },

        seat2: {
            default: null,
            type: cc.Node,
        },
        /*
        setting:{
            default: null,
            type: cc.Prefab,
        },
        chat:{
            default: null,
            type: cc.Prefab,
        },
        */
        /*
        player: {
            default: null,
            type: cc.Node,
        },
        
        pipiPrefab: {
            default: null,
            type: cc.Prefab,
        },

        popPrefab: {
            default: null,
            type: cc.Prefab,
        },
        archerPrefab: {
            default: null,
            type: cc.Prefab,
        },

        archerPrefab2: {
            default: null,
            type: cc.Prefab,
        },

        joyStickPrefab: {
            default: null,
            type: cc.Prefab,
        },
        touchRange: {
            default: null,
            type: cc.Prefab,
        },
        camera: {
            default: null,
            type: cc.Camera,
        },

        cameraControl: {
            default: null,
            type: cc.Node,
        },

        gameState: {
            default: null,
            type: cc.Node,
        },

        gameHint: cc.Label,
        */
    },

    showsetting:function(){
       // window.AudioMgr.playSFX("ui_click")
        this.isshowsetting = !this.settingNode.active;
        this.settingNode.active = this.isshowsetting;

    },
    showchat:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.isshowchat = !this.chatNode.active;
        this.chatNode.active = this.isshowchat;
        cc.log("showchat")

    },
    onLoad () {
        this.installEvents();
        /*
        this._MusicDict = {}
        var _this = this;
        cc.loader.loadResDir('sound/', function (count, totalCount, res) {
                            }, function (err, res) {
                                if (err == null) {
                                    _this._MusicDict = {};
                                    res.forEach(clip => {
                                    _this._MusicDict[clip.name] = clip;
                                    });
                                } else {
                                    console.error(err);
                                }
                            })
        */
        //window.AudioMgr.playBGM("bgMain")

        this._timeLabel = cc.find("Canvas/bg2/time").getComponent(cc.Label);
        this.isshowsetting=false
        //this.settingNode=cc.instantiate(this.setting)
        //this.node.addChild(this.settingNode)
        //this.settingNode=this.node.getChildByName("bg2").getChildByName("settings")
        this.settingNode=cc.find("Canvas/settings")
        this.settingNode.active = this.isshowsetting;

        this.isshowchat=false
        //this.chatNode=cc.instantiate(this.chat)
        //this.node.addChild(this.chatNode)
        this.chatNode=cc.find("Canvas/chat")
        this.chatNode.active = this.isshowchat;
        
        if(cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.enableWxShare();
        }
        this.card1=this.node.getChildByName("card1")
        this.card2=this.node.getChildByName("card2")
        this.card3=this.node.getChildByName("card3")
        this.card4=this.node.getChildByName("card4")
        this.card1.active=false;
        this.card2.active=false;
        this.card3.active=false;
        this.card4.active=false;
        this.opt=this.node.getChildByName("bg2").getChildByName("opt")
        this.opt.active=false;

        this.label=this.node.getChildByName("bg2").getChildByName("expstr").getComponent(cc.Label)
        this.act=[]
        this.card1num=0;
        this.card2num=0;
        this.card3num=0;
        this.card4num=0;

        this.lasttouchcard=null

        this.card1.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard1, this);
        this.card2.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard2, this);
        this.card3.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard3, this);
        this.card4.on(cc.Node.EventType.TOUCH_END, this.onTouchEndedcard4, this);

        this.card1selected=false
        this.card2selected=false
        this.card3selected=false
        this.card4selected=false



        this.gameState = this.node.getComponent("GameState");
        this.clock=this.node.getChildByName("bg2").getChildByName("clock")
        this.clock.active=false;

        var sp=null
        for(var i=1061;i<1115;i++){
            sp=this.node.getChildByName("card_"+i+"@2x")
            sp.active=false;
        }
        this.card1origpos=this.card1.position
        this.card2origpos=this.card2.position
        this.card3origpos=this.card3.position
        this.card4origpos=this.card4.position
        
        var out=cc.v2(0, 0)
        //var seat1cardpos=cc.v2(0, 0)
        var seat1cardpos=this.node.getChildByName("bg2").getChildByName("seat1").getChildByName("card").position
        this.node.getChildByName("bg2").getChildByName("seat1").convertToWorldSpaceAR (seat1cardpos, out)
        this.seat1cardpos=this.node.convertToNodeSpaceAR(out)

        //var seat2cardpos=cc.v2(0, 0)
        out=cc.v2(0, 0)
        var seat2cardpos=this.node.getChildByName("bg2").getChildByName("seat2").getChildByName("card").position
        this.node.getChildByName("bg2").getChildByName("seat2").convertToWorldSpaceAR (seat2cardpos, out)
        this.seat2cardpos=this.node.convertToNodeSpaceAR(out)


        //cc.log("ddddddddddddddddddddthis.seat2cardpos=",this.seat2cardpos.x,this.seat2cardpos.y)
        //cc.log("ddddddddddddddddddddthis.seat1cardpos=",this.seat1cardpos.x,this.seat1cardpos.y)
        //cc.log("ddddddddddddddddddddthis..card1origpos=",this.card1origpos.x,this.card1origpos.y)
        //cc.log("ddddddddddddddddddddthis..card2origpos=",this.card2origpos.x,this.card2origpos.y)
        //cc.log("ddddddddddddddddddddthis..card2origpos=",this.card3origpos.x,this.card3origpos.y)
        //cc.log("ddddddddddddddddddddthis..card2origpos=",this.card4origpos.x,this.card4origpos.y)


        this.gameHint=this.node.getChildByName("gameHint").getComponent(cc.Label)
        this.gameHint.node.opacity=0;
        this.gameHint.node.active=false;

        this.seat1= this.node.getChildByName("bg2").getChildByName("seat1")
        this.seat1.active=false
        this.seat2= this.node.getChildByName("bg2").getChildByName("seat2")
        this.seat2.active=false
        if(cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.enableWxShare();
        }

       // this.seat2cardpos=this.node.getChildByName("bg2").getChildByName("seat2").getChildByName("card").getPosition()
        
        /*
        this.keyBoardListener = null;
        this.mouseListener = null;
        this.entities = {};
        this.playerControl = null;
        this.curAvatarID = 0;
        this.cameraControl = this.camera.getComponent("CameraControl");

        this.enablePhysicManager();
        //this.enablePhysicsDebugDraw();
        this.installEvents();
        this.items = new Array();
        //this.node.getChildByName("sky_bg").on(cc.Node.EventType.TOUCH_START, this.pickUped, this);

        */
    },
    onTouchEndedcard1:function(){
        //window.AudioMgr.playSFX("ui_click")
        if(this.act.length-1>=0){
            if(this.act[this.act.length-1]==this.card1num ||this.act[this.act.length-1]==this.card2num||this.act[this.act.length-1]==this.card3num||this.act[this.act.length-1]==this.card4num)
            return
        }
        if(this.card1selected==false){
            this.lasttouchcard=this.card1
            this.card1selected=true
            this.card1.setScale(1)
            this.act.push(this.card1num)
        }/*
        else{
            this.card1selected=false
            this.card1.setScale(0.8)
            var index = this.act.indexOf(this.card1num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }*/
    },
    onTouchEndedcard2:function(){
        //window.AudioMgr.playSFX("ui_click")
        if(this.act.length-1>=0){
            if(this.act[this.act.length-1]==this.card1num ||this.act[this.act.length-1]==this.card2num||this.act[this.act.length-1]==this.card3num||this.act[this.act.length-1]==this.card4num)
            return
        }
        if(this.card2selected==false){
            this.card2selected=true
            this.card2.setScale(1)
            this.act.push(this.card2num)
            this.lasttouchcard=this.card2
        }
        /*else{
            this.card2selected=false
            this.card2.setScale(0.8)
            var index = this.act.indexOf(this.card2num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }*/

    },
    onTouchEndedcard3:function(){
        //window.AudioMgr.playSFX("ui_click")
        if(this.act.length-1>=0){
            if(this.act[this.act.length-1]==this.card1num ||this.act[this.act.length-1]==this.card2num||this.act[this.act.length-1]==this.card3num||this.act[this.act.length-1]==this.card4num)
            return
        }
        if(this.card3selected==false){
            this.card3selected=true
            this.card3.setScale(1)
            this.act.push(this.card3num)
            this.lasttouchcard=this.card3
        }
        /*else{
            this.card3selected=false
            this.card3.setScale(0.8)
            var index = this.act.indexOf(this.card3num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }*/

    },
    onTouchEndedcard4:function(){
        //window.AudioMgr.playSFX("ui_click")
        if(this.act.length-1>=0){
            if(this.act[this.act.length-1]==this.card1num ||this.act[this.act.length-1]==this.card2num||this.act[this.act.length-1]==this.card3num||this.act[this.act.length-1]==this.card4num)
            return
        }
        /*
        var ind = this.act.indexOf(this.card4num)
        if (ind > -1) {
            return
        }
        */
        if(this.card4selected==false){
            this.card4selected=true
            this.card4.setScale(1)
            this.act.push(this.card4num)
            this.lasttouchcard=this.card4
        }
        /*else{
            this.card4selected=false
            this.card4.setScale(0.8)
            var index = this.act.indexOf(this.card4num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }*/
    },
    getBatteryPercent:function(){
        if(cc.sys.isNative){
            if(cc.sys.os == cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod(this.ANDROID_API, "getBatteryPercent", "()F");
            }
            else if(cc.sys.os == cc.sys.OS_IOS){
                return jsb.reflection.callStaticMethod(this.IOS_API, "getBatteryPercent");
            }            
        }
        return 0.9;
    },
    update: function (dt) {
        this.label.string=this.act.join("")
        var minutes = Math.floor(Date.now()/1000/60);
        if(this._lastMinute != minutes){
            this._lastMinute = minutes;
            var date = new Date();
            var h = date.getHours();
            h = h < 10? "0"+h:h;
            
            var m = date.getMinutes();
            m = m < 10? "0"+m:m;
            this._timeLabel.string = "" + h + ":" + m;             
        }

        var power = cc.find("Canvas/bg2/power")
        power.scaleX = this.getBatteryPercent();
        
    },
    onaddact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.act.push("+")

    },
    onreduceact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.act.push("-")

    },
    onmulact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.act.push("*")

    },
    ondivact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.act.push("/")

    },
    onlefact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.act.push("(")

    },
    onrigact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.act.push(")")

    },
    ondelact:function(){
        //window.AudioMgr.playSFX("ui_click")
        var num=this.act.pop()
        if(this.lasttouchcard==null){
            return
        }
        this.lasttouchcard.setScale(0.8)
        if(this.lasttouchcard==this.card1) this.card1selected=false
        if(this.lasttouchcard==this.card2) this.card2selected=false
        if(this.lasttouchcard==this.card3) this.card3selected=false
        if(this.lasttouchcard==this.card4) this.card4selected=false
        this.lasttouchcard=null

    },
    onsureact:function(){
        //window.AudioMgr.playSFX("ui_click")
        this.card1selected=false
        this.card2selected=false
        this.card3selected=false
        this.card4selected=false

        this.card1.setScale(0.8)
        this.card2.setScale(0.8)
        this.card3.setScale(0.8)
        this.card4.setScale(0.8)

        var str=this.act.join("")
        try{
            //var res=eval(str);
            //var res= window.binding.eval(str)
            var res=window.eval2(str)
            cc.log("ttttttttttttttt",res)
        }
        catch{
            res="syntax error"
        }
        //alert();
        this.act=[]
        this.act.push(res)
        if(res==24){
            var player = KBEngine.app.player();
            if(player){
                player.onsureact()
            }

        }
        //cc.log("submit=",res)

    },
    pickUped:function(event){
        //cc.log("worldsence.pickuped")

    },
    installEvents : function() {
        KBEngine.Event.register("onAvatarEnterWorld", this, "onAvatarEnterWorld");
        KBEngine.Event.register("onEnterWorld", this, "onEnterWorld");
        KBEngine.Event.register("onLeaveWorld", this, "onLeaveWorld");
        KBEngine.Event.register("game_begin_push", this, "game_begin_push");
        KBEngine.Event.register("entity_updateholds", this, "entity_updateholds");
        KBEngine.Event.register("newTurn", this, "newTurn");
        KBEngine.Event.register("playerReadyStateChange", this, "playerReadyStateChange");
        KBEngine.Event.register("onotherNetcut", this, "onotherNetcut");
        KBEngine.Event.register("onGameOver", this, "onGameOver");

        KBEngine.Event.register("onDisconnected", this, "onDisconnected");
		KBEngine.Event.register("onConnectionState", this, "onConnectionState");
		KBEngine.Event.register("onReloginBaseappFailed", this, "onReloginBaseappFailed");
        KBEngine.Event.register("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");

        KBEngine.Event.register("onAvatarContinueGame", this, "onAvatarContinueGame");

        KBEngine.Event.register("onquick_chat", this, "onquick_chat");
        KBEngine.Event.register("onemoji", this, "onemoji");
        KBEngine.Event.register("oniptChat", this, "oniptChat");

        KBEngine.Event.register("onEnterWorld2", this, "onEnterWorld2");
        KBEngine.Event.register("updategamestuts", this, "updategamestuts");
        
        
        /*
        // common
        KBEngine.INFO_MSG("world scene installEvents ......");


        // in world
        


        KBEngine.Event.register("updatePosition", this, "updatePosition");
       
        KBEngine.Event.register("set_position", this, "set_position");
        

        KBEngine.Event.register("otherAvatarOnJump", this, "otherAvatarOnJump");
        KBEngine.Event.register("otherAvatarOnRightJump", this, "otherAvatarOnRightJump");
        KBEngine.Event.register("otherAvatarOnLeftJump", this, "otherAvatarOnLeftJump");
        KBEngine.Event.register("otherAvatarOnPickUpItem", this, "otherAvatarOnPickUpItem");
        KBEngine.Event.register("otherAvatarThrowItem", this, "otherAvatarThrowItem");
        KBEngine.Event.register("otherAvatarOnStopWalk", this, "otherAvatarOnStopWalk");
        KBEngine.Event.register("otherAvatarOnStartWalk", this, "otherAvatarOnStartWalk");
        KBEngine.Event.register("otherAvatarRecoverItem", this, "otherAvatarRecoverItem");
        KBEngine.Event.register("onRecvDamage", this, "onRecvDamage");
        KBEngine.Event.register("onAvatarDie", this, "onAvatarDie");
        KBEngine.Event.register("onResetItem", this, "onResetItem");

        */
    },

    enableWxShare: function () {
        wx.showShareMenu({
            withShareTicket:true,
        });

        wx.onShareAppMessage(function() {
            return {
                title: "投石作战",
                imageUrl:SHARE_PICTURE,
            }
        });
     },

    enablePhysicManager: function () {
        //cc.log("test1")
        //cc.director.getCollisionManager().enabled = true;
        //cc.director.getPhysicsManager().enabled = true;

        cc.director.getPhysicsManager().enabled =true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    enablePhysicsDebugDraw: function() {
        cc.log("test2")
        var manager = cc.director.getCollisionManager();
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        cc.director.getPhysicsManager().debugDrawFlags =
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            // cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit |
            cc.PhysicsManager.DrawBits.e_rayCast;
    },

    

    unInstallEvents: function() {
        KBEngine.Event.deregister("onAvatarEnterWorld", this, "onAvatarEnterWorld");
        KBEngine.Event.deregister("onEnterWorld", this, "onEnterWorld");
        KBEngine.Event.deregister("onLeaveWorld", this, "onLeaveWorld");
        KBEngine.Event.deregister("game_begin_push", this, "game_begin_push");
        KBEngine.Event.deregister("entity_updateholds", this, "entity_updateholds");
        KBEngine.Event.deregister("newTurn", this, "newTurn");
        KBEngine.Event.deregister("playerReadyStateChange", this, "playerReadyStateChange");
        KBEngine.Event.deregister("onotherNetcut", this);
        KBEngine.Event.deregister("onGameOver", this);
        KBEngine.Event.deregister("onDisconnected", this, "onDisconnected");
		KBEngine.Event.deregister("onConnectionState", this, "onConnectionState");
		KBEngine.Event.deregister("onReloginBaseappFailed", this, "onReloginBaseappFailed");
        KBEngine.Event.deregister("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
        KBEngine.Event.deregister("onAvatarContinueGame", this, "onAvatarContinueGame");

        KBEngine.Event.deregister("onquick_chat", this, "onquick_chat");
        KBEngine.Event.deregister("onemoji", this, "onemoji");
        KBEngine.Event.deregister("oniptChat", this, "oniptChat");

        KBEngine.Event.deregister("onEnterWorld2", this, "onEnterWorld2");
        KBEngine.Event.deregister("updategamestuts", this, "updategamestuts");
        /*
        cc.log("test3")
        KBEngine.INFO_MSG("world scene unInstallEvents ......");
 

        // in world       


        KBEngine.Event.deregister("updatePosition", this, "updatePosition");
       
        KBEngine.Event.deregister("set_position", this, "set_position");
        

        KBEngine.Event.deregister("otherAvatarOnJump", this);
        KBEngine.Event.deregister("otherAvatarOnRightJump", this);
        KBEngine.Event.deregister("otherAvatarOnLeftJump", this);
        KBEngine.Event.deregister("otherAvatarOnPickUpItem", this);
        KBEngine.Event.deregister("otherAvatarThrowItem", this);
        KBEngine.Event.deregister("otherAvatarOnStopWalk", this);
        KBEngine.Event.deregister("otherAvatarOnStartWalk", this);
        KBEngine.Event.deregister("otherAvatarRecoverItem", this);
        KBEngine.Event.deregister("onRecvDamage", this);
        KBEngine.Event.deregister("onAvatarDie", this);

        KBEngine.Event.deregister("onupdateGamestates", this);


        KBEngine.Event.deregister("onResetItem", this);

        */
    },

    onquick_chat:function(eid,idx){
        //cc.log("7777777777777777777777777777777777777777quick_chat=",eid,idx)
        var strstr=this.node.getComponent("Chat").getQuickChatInfo(idx)["content"]
        //cc.log("888888888888888888888888888888888888quick_chat=",strstr)
        if(KBEngine.app.player().id==eid) {
            this.seat1.getComponent("Seat").chat(strstr)
            //this.seat1.getComponent("Seat").refresh();  
        }
        else{
            this.seat2.getComponent("Seat").chat(strstr)
            //this.seat2.getComponent("Seat").refresh();  
        }
    },
    onemoji:function(eid,name){
        //cc.log("888888888888888888888888888888888888emoji=",name)
        if(KBEngine.app.player().id==eid) {
            this.seat1.getComponent("Seat").emoji(name)
            //this.seat1.getComponent("Seat").refresh();  
        }
        else{
            this.seat2.getComponent("Seat").emoji(name)
            //this.seat2.getComponent("Seat").refresh();  
        }
    },
    oniptChat:function(eid,strstr){
        cc.log("888888888888888888888888888888888888eiptChat=",strstr)
        if(KBEngine.app.player().id==eid) {
            this.seat1.getComponent("Seat").chat(strstr)
           // this.seat1.getComponent("Seat").refresh();  
        }
        else{
            this.seat2.getComponent("Seat").chat(strstr)
            //this.seat2.getComponent("Seat").refresh();     
        }
    },
    playerReadyStateChange:function(eid,state){
        cc.log("playerReadyStateChange")
        if(KBEngine.app.player().id==eid) {   
            this.seat1.active=true 
            this.seat1.getComponent("Seat")._isReady=true
            this.seat1.getComponent("Seat").refresh();  
        }else{
            this.seat2.active=true 
            this.seat2.getComponent("Seat")._isReady=true
            this.seat2.getComponent("Seat").refresh();   
        }    

    },
    onupdateGamestates:function(curID,time){
        cc.log("onupdateGamestates")
        this.newTurn(curID,time)

    },
    updategamestuts:function(num){
        if(num==1){//服务器正在playing中
            this.node.getChildByName("start").active=false
        }
        else{//一局已结束
            this.node.getChildByName("start").active=true
        }
    },
    onotherNetcut:function(curID){
        cc.log("onotherNetcut。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。")
        if(curID==0){
            this.gameHint.string = "其他玩逃命，游戏马上结束.......";
            this.seat2.active=false;
        }
        else{
            this.gameHint.node.active=true
            this.gameHint.string = "玩家"+KBEngine.app.entities[curID].accountName +"掉线，请等待.......";
        }
        this.gameHint.node.opacity=255
        var action = cc.fadeTo(13.0, 0);
        this.gameHint.node.runAction(action);
        //this.gameState.newTurn(15);

        
    },

    onDisconnected : function() {
        KBEngine.INFO_MSG("disconnect! will try to reconnect...");
        //var action = cc.fadeTo(1.0, 0);
        this.gameHint.node.opacity=255
        this.gameHint.string = "disconnect! will try to reconnect...";
        
        this.Destroyplayer()
        KBEngine.app.reloginBaseapp();
    },
    
    onReloginBaseappTimer : function(self) {
        KBEngine.INFO_MSG("will try to reconnect(" + this.reloginCount + ")...");
    },
    
    onReloginBaseappFailed : function(failedcode) {
        KBEngine.INFO_MSG("reogin is failed(断线重连失败), err=" + KBEngine.app.serverErr(failedcode));   
    },
        
    onReloginBaseappSuccessfully : function(){
        KBEngine.INFO_MSG("reogin is successfully!(断线重连成功!)");
        this.gameHint.node.opacity=255	
        this.gameHint.node.active=true
        var action = cc.fadeTo(8.0, 0);
        this.gameHint.string = "reogin is successfully!(断线重连成功!)";

        this.gameHint.node.runAction(action);
    },
        
    onConnectionState : function(success) {
        if(!success) {
            KBEngine.ERROR_MSG("Connect(" + KBEngine.app.ip + ":" + KBEngine.app.port + ") is error! (连接错误)");
            this.onDisconnected()
        }
        else {
            KBEngine.INFO_MSG("Connect successfully, please wait...(连接成功，请等候...)");
        }
    },
    reqChangeReadyState:function(){
        this.node.getChildByName("start").active=false
        var player = KBEngine.app.player();
        if(player){
            player.reqChangeReadyState()
        }   
        this.seat1.getComponent("Seat").setReady(true)
        this.seat1.getComponent("Seat").refresh();    
    },
    entity_updateholds:function(holds,entity){
        cc.log("entity_updateholds",entity.id,holds)
        if(entity.className == "Avatar") {
            if(entity.id==KBEngine.app.player().id) {      
                //this.seat1.active=true
                this.seat1.getComponent("Seat")._holds=holds
                this.seat1.getComponent("Seat").refresh();    
            }else{  //scalex==-1,
                //this.seat2.active=true
                this.seat2.getComponent("Seat")._holds=holds
                this.seat2.getComponent("Seat").refresh();    
            }
        }  
    },
    game_begin_push:function(entity){
        cc.log("WorldScene::game_begin_push")
        //this.seat1.active=true
        //this.seat2.active=true
        //this.seat1.getComponent("Seat")._holds=entity.holds
        this.seat1.getComponent("Seat")._isReady=false
        this.seat1.getComponent("Seat").refresh(); 

        this.seat2.getComponent("Seat")._isReady=false
        this.seat2.getComponent("Seat").refresh();  
    },
    onEnterWorld: function (entity) {
        //SCALE=1;
        cc.log("onEnterWorld entity.id=",entity.id)
        if(!entity.isPlayer()) {
            var ae = null;
            if(KBEngine.app.player().id==entity.id) {    
                    this.seat1.active=true
                    //this.seat1.getComponent("Seat")._isReady=false
                    this.seat1.getComponent("Seat")._userName=entity.accountName
                    this.seat1.getComponent("Seat").avatarUrl=entity.avatarUrl
                    this.seat1.getComponent("Seat").refresh();  
                    //this.entities[entity.id] = entity;  
                    cc.log("WorldScene::onEnterWorld=",this.seat1.getComponent("Seat")._isReady)
            }else{  //scalex==-1,
                this.node.getChildByName("bg2").getChildByName("matching").active=false;
                    this.seat2.active=true
                    //this.seat2.getComponent("Seat")._isReady=true
                    this.seat2.getComponent("Seat")._userName=entity.accountName
                    this.seat2.getComponent("Seat").avatarUrl=entity.avatarUrl
                    this.seat2.getComponent("Seat").refresh();   
                    //this.entities[entity.id] = entity; 
                    cc.log("WorldScene::onEnterWorld=",this.seat2.getComponent("Seat")._isReady)
                }    
            }
    },
    
    onEnterWorld2: function (entityID) {
        cc.log("onEnterWorld2")
        var entity=KBEngine.app.entities[entityID]
        //SCALE=1;
        cc.log("onEnterWorld entity.id=",entity.id)
            if(KBEngine.app.player().id==entity.id) {    
                    this.seat1.active=true
                    //this.seat1.getComponent("Seat")._isReady=false
                    this.seat1.getComponent("Seat")._userName=entity.accountName
                    this.seat1.getComponent("Seat").avatarUrl=entity.avatarUrl
                    this.seat1.getComponent("Seat").refresh();  
                    //this.entities[entity.id] = entity;  
                    cc.log("WorldScene::onEnterWorld=",this.seat1.getComponent("Seat")._isReady)
            }else{  //scalex==-1,
                    this.node.getChildByName("bg2").getChildByName("matching").active=false;
                    this.seat2.active=true
                    //this.seat2.getComponent("Seat")._isReady=true
                    this.seat2.getComponent("Seat")._userName=entity.accountName
                    this.seat2.getComponent("Seat").avatarUrl=entity.avatarUrl
                    this.seat2.getComponent("Seat").refresh();   
                    //this.entities[entity.id] = entity; 
                    cc.log("WorldScene::onEnterWorld=",this.seat2.getComponent("Seat")._isReady)
                }    
    },
    onLeaveWorld: function (entity) {
        cc.log("onLeaveWorld",entity.id,entity.className)
        /*
        cc.log("onLeaveWorld",entity.id,entity.className)
        if(this.entities[entity.id] && entity.className == "Avatar"){
            this.entities[entity.id].removeFromParent()
            this.entities[entity.id]=null
        }  
        */    
    },

    onAvatarEnterWorld : function(avatar) {
        cc.log("onAvatarEnterWorld")
        this.createPlayer(avatar);
    },

   
    updatePosition : function(entity) {
       
    },	  
    
    set_position: function(entity) {
        
    },

    setCameraTarget: function(entityID){
        
       
    },

    checkPlayerHasItem: function(left) {
        //cc.log("test14")
      
    },

    newTurn: function(avatar,eid, second,card01,card02,card03,card04){
        //window.AudioMgr.stopBGM()
        //window.AudioMgr.playSFX("turn")

        this.gameState.newTurn(second);
        this.clock.active=true
        if(!this.gameState.isGameStart()) {
            this.gameState.setGameStart(true);
            //var action = cc.fadeTo(1.0, 0);
            //this.label.string = "游戏开始 !!!";
            //this.label.node.runAction(action);
        }
        this.card1selected=false
        this.card2selected=false
        this.card3selected=false
        this.card4selected=false

        this.card1.setScale(0.8)
        this.card2.setScale(0.8)
        this.card3.setScale(0.8)
        this.card4.setScale(0.8)

        this.card1.active=true
        this.card2.active=true
        this.card3.active=true
        this.card4.active=true
        
        this.card01=card01;
        this.card02=card02;
        this.card03=card03;
        this.card04=card04;
        ////////////////////////////
        var A_act1=null
        var A_act2=null
        var A_act3=null
        var A_act4=null
        var B_act1=null
        var B_act2=null
        var B_act3=null
        var B_act4=null

        var x1=this.seat1cardpos.x;
        var y1=this.seat1cardpos.y

        var x2=this.seat2cardpos.x;
        var y2=this.seat2cardpos.y
        var card1origposx=this.card1origpos.x
        var card1origposy=this.card1origpos.y

        var card2origposx=this.card2origpos.x
        var card2origposy=this.card2origpos.y

        var card3origposx=this.card3origpos.x
        var card3origposy=this.card3origpos.y

        var card4origposx=this.card4origpos.x
        var card4origposy=this.card4origpos.y
        cc.log("this.curid=",eid)
        cc.log("ddddddddddddddddddddthis.seat2cardpos=",x1,y1)
        cc.log("ddddddddddddddddddddthis.seat1cardpos=",x2,y2)
        cc.log("ddddddddddddddddddddthis..card1origpos=",card1origposx,card1origposy)
        cc.log("ddddddddddddddddddddthis..card2origpos=",card2origposx,card2origposy)
        cc.log("ddddddddddddddddddddthis..card2origpos=",card3origposx,card3origposy)
        cc.log("ddddddddddddddddddddthis..card2origpos=",card4origposx,card4origposy)

        this.card1.stopAllActions()
        this.card2.stopAllActions()
        this.card3.stopAllActions()
        this.card4.stopAllActions()
        if(eid==0){//各回各家
 

            A_act1=cc.moveTo(1,cc.v2(x1,y1))
            A_act2=cc.moveTo(1,cc.v2(x1,y1))

            A_act3=cc.moveTo(1,cc.v2(x2,y2))
            A_act4=cc.moveTo(1,cc.v2(x2,y2))
        }
        else if(eid==KBEngine.app.player().id){
            cc.log("eid==KBEngine.app.player().id,moveto seat1",eid,KBEngine.app.player().id)
            A_act1=cc.moveTo(1,cc.v2(x1,y1))
            A_act2=cc.moveTo(1,cc.v2(x1,y1))
            A_act3=cc.moveTo(1,cc.v2(x1,y1))
            A_act4=cc.moveTo(1,cc.v2(x1,y1))

        }
        else{
            cc.log("eid!=KBEngine.app.player().id,moveto seat2",eid,KBEngine.app.player().id)
            A_act1=cc.moveTo(1,cc.v2(x2,y2))
            A_act2=cc.moveTo(1,cc.v2(x2,y2))
            A_act3=cc.moveTo(1,cc.v2(x2,y2))
            A_act4=cc.moveTo(1,cc.v2(x2,y2))
        }
        var self=this;

        this.card1num=2+parseInt((card01+1000-1061)/4)  //1,2,3,4
        this.card2num=2+parseInt((card02+1000-1061)/4)
        this.card3num=2+parseInt((card03+1000-1061)/4)
        this.card4num=2+parseInt((card04+1000-1061)/4)
        if (this.card1num>10) {this.card1num=1}
        if (this.card2num>10) {this.card2num=1}
        if (this.card3num>10) {this.card3num=1}
        if (this.card4num>10) {this.card4num=1}

        var self=this
        var fun1=cc.callFunc(function(target){
            target.x=x1,
            target.y=y1;
            card01=card01+1000;
            var url="card_"+card01+"@2x"
            target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame
            /*
            cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
            self.card1.getComponent(cc.Sprite).spriteFrame= spriteFrame
            }); */
        }, this.card1);
       
        
        var fun2=cc.callFunc(function(target){
            target.x=x1
            target.y=y1
            card02=card02+1000;
            var url="card_"+card02+"@2x"
            target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame
        }, this.card2);
        var fun3=cc.callFunc(function(target){
            target.x=x2
            target.y=y2
            card03=card03+1000;
            var url="card_"+card03+"@2x"
            target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame
        }, this.card3);
        var fun4=cc.callFunc(function(target){
            target.x=x2
            target.y=y2
            card04=card04+1000;
            var url="card_"+card04+"@2x"
            target.getComponent(cc.Sprite).spriteFrame=self.node.getChildByName(url).getComponent(cc.Sprite).spriteFrame
        }, this.card4);

        var fun11=cc.callFunc(function(target){
            target.x=card1origposx
            target.y=card1origposy
        }, this.card1);
        
        var fun22=cc.callFunc(function(target){
            target.x=card2origposx
            target.y=card2origposy
        }, this.card2);
        var fun33=cc.callFunc(function(target){
            target.x=card3origposx
            target.y=card3origposy
        }, this.card3);
        var fun44=cc.callFunc(function(target){
            target.x=card4origposx
            target.y=card4origposy
        }, this.card4);

        B_act1=cc.moveTo(1,cc.v2(card1origposx,card1origposy))
        B_act2=cc.moveTo(1,cc.v2(card2origposx,card2origposy))
        B_act3=cc.moveTo(1,cc.v2(card3origposx,card3origposy))
        B_act4=cc.moveTo(1,cc.v2(card4origposx,card4origposy))

        if(eid==12345){
            this.card1.runAction(cc.sequence(fun1,B_act1,fun11))
            this.card2.runAction(cc.sequence(fun2,B_act2,fun22))
            this.card3.runAction(cc.sequence(fun3,B_act3,fun33))
            this.card4.runAction(cc.sequence(fun4,B_act4,fun44))

        }
        else{
            this.card1.runAction(cc.sequence(A_act1,fun1,cc.delayTime(1),B_act1,fun11))
            this.card2.runAction(cc.sequence(A_act2,fun2,cc.delayTime(1),B_act2,fun22))
            this.card3.runAction(cc.sequence(A_act3,fun3,cc.delayTime(1),B_act3,fun33))
            this.card4.runAction(cc.sequence(A_act4,fun4,cc.delayTime(1),B_act4,fun44))
        }

        /////////////////////////////

        cc.log("wwwwwwnewTurn",avatar.id, second,card01,card02,card03,card04)

        this.opt.active=true
        this.act=[]
  
       
    },


    resetItem: function() {
    
    },

    otherAvatarOnPickUpItem: function(avatarID, itemID, position) {
        
    },

    otherAvatarThrowItem: function(avatarID, itemID, force){
        
    },

    otherAvatarOnStopWalk: function(avatarID, pos){
        
    },

    otherAvatarOnStartWalk: function(avatarID, moveFlag){
        
        
    },

    otherAvatarRecoverItem: function(avatarID, itemID) {
        //cc.log("test18")
    },

    otherAvatarOnLeftJump: function(avatarID){
        
    },

    otherAvatarOnRightJump: function(avatarID){
        
    },

    onRecvDamage: function(avatarID, harm, hp) {
        //cc.log("WorldScene::otherAvatarRecvDamage: avatarID=%d, harm=%d, hp=%d ", avatarID, harm, hp);
        
    },

    onAvatarDie: function(avatarID) {
        //cc.log("WorldScene::onAvatarDie, avatarid=%d", avatarID)
        
    },

    onGameOver: function(avatarID, isWin, hp, totalTime, totalHarm, score) {
        if(avatarID == KBEngine.app.player().id) {
            HP = hp;
            TOTAL_TIME = totalTime;
            OtherHP = totalHarm;
            SCORE = score;
            this.unInstallEvents();
            if(isWin) {
                cc.director.loadScene("WinScene");
            } else {
                cc.director.loadScene("LoseScene");
            }
        }
        //cc.log("8888888888888888888888888888888888888888888888888888888888888888888888888888888888888")
        //this.disEnableControlPlayer();
        //this.unInstallEvents();
        this.player = null;
    },

    onResetItem: function(itemID, position) {
        ///SCALE=1;
       
    
        //item.setPosition(position.x*SCALE, position.z*SCALE);
    },

    Destroyplayer:function(){
        /*
        cc.log("Avatar client die so destroy WorldScene playerprefab")
        if(this.player) {
            this.player.removeFromParent(true)
        }
        */

    },
    createPlayer: function(avatar) {
       // SCALE=1;
        cc.log("new createPlayer this.player=，avatar.modelID=",this.player,avatar.modelID )

        if(!this.player) {
            if(avatar.id==KBEngine.app.player().id) {
                this.seat1.active=true
                this.seat1.getComponent("Seat")._userName=avatar.accountName
                this.seat1.getComponent("Seat").avatarUrl=avatar.avatarUrl
                //this.seat1.getComponent("Seat")._isReady=true
                this.seat1.getComponent("Seat").refresh();
                this.player =  this.seat1;
                //this.entities[avatar.id]=this.player 
            }else{
                this.seat2.active=true
                //this.seat2.getComponent("Seat")._isReady=true
                this.seat2.getComponent("Seat")._userName=avatar.accountName
                this.seat2.getComponent("Seat").avatarUrl=avatar.avatarUrl
                this.seat2.getComponent("Seat").refresh();
                this.player =  this.seat2;
                //this.entities[avatar.id]=this.player 
            }
            //var ctrl= this.player.addComponent("AvatarControl");
            //var action= this.player.addComponent("AvatarAction");
            this.player.setPosition(avatar.position.x*SCALE, avatar.position.z*SCALE);
            //this.entities[avatar.id] = this.player;
        }
        cc.log("after createPlayer this.player=，avatar.modelID=",this.player,avatar.modelID )
    },

    onAvatarContinueGame: function(avatar) {
       this.createPlayer(avatar);
    },

    enableControlPlayer: function() {
    
    },

    disEnableControlPlayer: function() {
        
    },
});
