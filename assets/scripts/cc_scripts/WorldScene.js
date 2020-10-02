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

    onLoad () {
        this.installEvents();
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
        if(this.card1selected==false){
            this.card1selected=true
            this.card1.setScale(1)
            this.act.push(this.card1num)
        }
        else{
            this.card1selected=false
            this.card1.setScale(0.8)
            var index = this.act.indexOf(this.card1num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }
    },
    onTouchEndedcard2:function(){
        if(this.card2selected==false){
            this.card2selected=true
            this.card2.setScale(1)
            this.act.push(this.card2num)
        }
        else{
            this.card2selected=false
            this.card2.setScale(0.8)
            var index = this.act.indexOf(this.card2num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }

    },
    onTouchEndedcard3:function(){
        if(this.card3selected==false){
            this.card3selected=true
            this.card3.setScale(1)
            this.act.push(this.card3num)
        }
        else{
            this.card3selected=false
            this.card3.setScale(0.8)
            var index = this.act.indexOf(this.card3num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }

    },
    onTouchEndedcard4:function(){
        if(this.card4selected==false){
            this.card4selected=true
            this.card4.setScale(1)
            this.act.push(this.card4num)
        }
        else{
            this.card4selected=false
            this.card4.setScale(0.8)
            var index = this.act.indexOf(this.card4num)
            if (index > -1) {
                this.act.splice(index, 1);
            }
        }
    },
    update: function (dt) {
        this.label.string=this.act.join("")
        
    },
    onaddact:function(){
        this.act.push("+")

    },
    onreduceact:function(){
        this.act.push("-")

    },
    onmulact:function(){
        this.act.push("*")

    },
    ondivact:function(){
        this.act.push("/")

    },
    onlefact:function(){
        this.act.push("(")

    },
    onrigact:function(){
        this.act.push(")")

    },
    ondelact:function(){
        this.act.pop()

    },
    onsureact:function(){
        var str=this.act.join("")
        try{
            var res=eval(str);
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
    onotherNetcut:function(curID){
        cc.log("onotherNetcut")
        if(curID==0){
            this.gameHint.string = "其他玩逃命，游戏马上结束.......";
            this.seat2.active=false;
        }
        else{
            this.gameHint.string = "其他玩家掉线，请等待.......";
        }
        this.gameHint.node.opacity=255
        var action = cc.fadeTo(13.0, 0);
        this.gameHint.node.runAction(action);
        this.gameState.newTurn(15);

        
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
                    this.seat1.getComponent("Seat").refresh();  
                    //this.entities[entity.id] = entity;  
                    cc.log("WorldScene::onEnterWorld=",this.seat1.getComponent("Seat")._isReady)
            }else{  //scalex==-1,
                    this.seat2.active=true
                    //this.seat2.getComponent("Seat")._isReady=true
                    this.seat2.getComponent("Seat")._userName=entity.accountName
                    this.seat2.getComponent("Seat").refresh();   
                    //this.entities[entity.id] = entity; 
                    cc.log("WorldScene::onEnterWorld=",this.seat2.getComponent("Seat")._isReady)
                }    
            }
    },

    onLeaveWorld: function (entity) {
        cc.log("onLeaveWorld",entity.id,entity.className)
        if(this.entities[entity.id] && entity.className == "Avatar"){
            this.entities[entity.id].removeFromParent()
            this.entities[entity.id]=null
        }      
    },

    onAvatarEnterWorld : function(avatar) {
        cc.log("onAvatarEnterWorld")
        this.createPlayer(avatar);
    },

    otherAvatarOnJump: function(entity) {
        var ae = this.entities[entity.id];
		if(ae == undefined)
            return;
            
        ae.isOnGround = entity.isOnGround;
        if(!ae.isOnGround)
            return;

        var action = ae.getComponent("AvatarAction");
        action.onJump();
    },

    updatePosition : function(entity) {
        //cc.log("test11")
        //SCALE=1;
        if(entity.className == "Item")
            return;

		var ae = this.entities[entity.id];
		if(ae == undefined)
            return;
    
        var player = KBEngine.app.player();
        if(player && player.inWorld && player.id == entity.id)
            return;
        
        ae.isOnGround = entity.isOnGround;
        if(entity.direction.z >= 1)  {
            ae.scaleX = 1;
        }else if(entity.direction.z <= -1) {
            ae.scaleX = -1;
        }
        var position = cc.v2(entity.position.x*SCALE, entity.position.z*SCALE);
        var action = ae.getComponent("AvatarAction");
        action.onStartMove(position);
    },	  
    
    set_position: function(entity) {
        //SCALE=1;
        //cc.log("test12")
        if(!this.entities) return;

        var ae = this.entities[entity.id];
		if(ae == undefined)
			return;
		
		ae.x = entity.position.x * SCALE;
        ae.y = entity.position.z * SCALE;
        ae.setPosition(ae.x, ae.y);
    },

    setCameraTarget: function(entityID){
        
        var ae = this.entities[entityID];
		if(ae == undefined)
            return;
            
        this.cameraControl.setTarget(ae);
        cc.log("setCameraTarget finished")
    },

    checkPlayerHasItem: function(left) {
        //cc.log("test14")
        var count = 0;
        for(var i in this.items) {
            var item = this.items[i];
            if(left) {
                if(item.x < 80) count++;
            } else {
                if(item.x > 350) count++;
            }
        }

        return count;
    },

    newTurn: function(avatar,eid, second,card01,card02,card03,card04){
        this.gameState.newTurn(second);
        this.clock.active=true
        if(!this.gameState.isGameStart()) {
            this.gameState.setGameStart(true);
            //var action = cc.fadeTo(1.0, 0);
            //this.label.string = "游戏开始 !!!";
            //this.label.node.runAction(action);
        }
        this.card1.active=true
        this.card2.active=true
        this.card3.active=true
        this.card4.active=true
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
            A_act1=cc.moveTo(1,cc.v2(x1,y1))
            A_act2=cc.moveTo(1,cc.v2(x1,y1))

            A_act3=cc.moveTo(1,cc.v2(x1,y1))
            A_act4=cc.moveTo(1,cc.v2(x1,y1))

        }
        else{
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

        var fun1=cc.callFunc(function(target){
            target.x=x1,
            target.y=y1;
            card01=card01+1000;
            var url="Game/card/"+"card_"+card01+"@2x"
            cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
            self.card1.getComponent(cc.Sprite).spriteFrame= spriteFrame
            });
        }, this.card1);
        
        var fun2=cc.callFunc(function(target){
            target.x=x1
            target.y=y1
            card02=card02+1000;
            url="Game/card/"+"card_"+card02+"@2x"
            cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
            self.card2.getComponent(cc.Sprite).spriteFrame= spriteFrame
            });
        }, this.card2);
        var fun3=cc.callFunc(function(target){
            target.x=x2
            target.y=y2
            card03=card03+1000;
            url="Game/card/"+"card_"+card03+"@2x"
            cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
            self.card3.getComponent(cc.Sprite).spriteFrame= spriteFrame
            });
        }, this.card3);
        var fun4=cc.callFunc(function(target){
            target.x=x2
            target.y=y2
            card04=card04+1000;
            url="Game/card/"+"card_"+card04+"@2x"
            cc.loader.loadRes(url,cc.SpriteFrame,function(err,spriteFrame) {
            self.card4.getComponent(cc.Sprite).spriteFrame= spriteFrame
            });
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
     


 

        //this.card1.setScale(1)
        //this.card2.setScale(1)
        //this.card3.setScale(1)
        //this.card4.setScale(1)
  
       
    },


    resetItem: function() {
        //cc.log("test17")
        for(var i in this.items) {
            var item = this.items[i];
            item.getComponent("ItemAction").setThrowed(false);
        }
    },

    otherAvatarOnPickUpItem: function(avatarID, itemID, position) {
        cc.log("WorldScene::otherAvatarOnPickUpItem: avatarID=%d, itemID=%d ", avatarID, itemID);
        var player = this.entities[avatarID];
        var item = this.entities[itemID];
        if(player == undefined || item == undefined)
            return;
        var action = player.getComponent("AvatarAction");
        action.setPlaceItem(item, action.getItemPoint());
        action.playThrowPreAnim();
    },

    otherAvatarThrowItem: function(avatarID, itemID, force){
        cc.log("WorldScene::otherAvatarThrowItem: avatarID=%d, itemID=%d force(%f, %f)", avatarID, itemID, force.x, force.y);
        var player = this.entities[avatarID];
        var item = this.entities[itemID];
        
        if(player == undefined || item == undefined)
            return;
        //item.scaleX=-item.scaleX
        this.setCameraTarget(itemID);
        var action = player.getComponent("AvatarAction");
        action.playThrowAnim();
        action.throwItem(item, force);
    },

    otherAvatarOnStopWalk: function(avatarID, pos){
        var player = this.entities[avatarID];
        if(player == undefined)
            return;

        cc.log("WorldScene::otherAvatarOnStopWalk: avatarID=%d, pos(%f, %f) ", avatarID, pos.x, pos.y);
        var action = player.getComponent("AvatarAction");
        action.onStopWalk(pos);
    },

    otherAvatarOnStartWalk: function(avatarID, moveFlag){
        var player = this.entities[avatarID];
        if(player == undefined)
            return;

        KBEngine.INFO_MSG("WorldScene::otherAvatarOnStartWalk: avatarID=" + avatarID + " moveFlag=" + moveFlag);
        var action = player.getComponent("AvatarAction");
        if(moveFlag == MOVE_LEFT) {
            action.onLeftWalk();
        } else if(moveFlag == MOVE_RIGHT) {
            action.onRightWalk();
        }
        
    },

    otherAvatarRecoverItem: function(avatarID, itemID) {
        //cc.log("test18")
        var player = this.entities[avatarID];
        var item = this.entities[itemID];
        if(player == undefined || item == undefined)
            return;

        player.getComponent("AvatarAction").reset();
        item.getComponent("ItemAction").setPlacePrePosition();
    },

    otherAvatarOnLeftJump: function(avatarID){
        var player = this.entities[avatarID];
        if(player == undefined)
            return;

        //cc.log("WorldScene::otherAvatarOnLeftJump: avatarID= " + avatarID);
        var action = player.getComponent("AvatarAction");
        action.onLeftJump();
    },

    otherAvatarOnRightJump: function(avatarID){
        var player = this.entities[avatarID];
        if(player == undefined)
            return;

        //cc.log("WorldScene::otherAvatarOnRightJump: avatarID= " + avatarID);
        var action = player.getComponent("AvatarAction");
        action.onRightJump();
    },

    onRecvDamage: function(avatarID, harm, hp) {
        //cc.log("WorldScene::otherAvatarRecvDamage: avatarID=%d, harm=%d, hp=%d ", avatarID, harm, hp);
        var player = this.entities[avatarID];
        if(player == undefined)
            return;

        var action = player.getComponent("AvatarAction");
        action.recvDamage(harm, hp);
    },

    onAvatarDie: function(avatarID) {
        //cc.log("WorldScene::onAvatarDie, avatarid=%d", avatarID)
        var player = this.entities[avatarID];
        if(player == undefined)
            return;
        
        var anim = player.getComponent("AvatarAnim");
        var collider = player.getComponent(cc.PhysicsPolygonCollider);
        collider.sensor = true;
        anim.playDieAnim();
    },

    onGameOver: function(avatarID, isWin, hitRate, totalTime, totalHarm, score) {
        if(avatarID == KBEngine.app.player().id) {
            if(this.player.name == PIPI_NAME) {
                GAME_RESULT = isWin ? PIPI_WIN : PIPI_LOSE;
            } else {
                GAME_RESULT = isWin ? POP_WIN : POP_LOSE;
            }

            HIT_RATE = hitRate;
            TOTAL_TIME = totalTime;
            TOTAL_HARM = totalHarm;
            SCORE = score;
            
            if(isWin) {
                cc.director.loadScene("WinScene");
            } else {
                cc.director.loadScene("LoseScene");
            }
        }

        //this.disEnableControlPlayer();
        this.unInstallEvents();
        this.player = null;
    },

    onResetItem: function(itemID, position) {
        ///SCALE=1;
        cc.log("onResetItem itemID=",itemID, position)
        var item = this.entities[itemID];
        if(item == undefined) 
            return;
    
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
                //this.seat1.getComponent("Seat")._isReady=true
                this.seat1.getComponent("Seat").refresh();
                this.player =  this.seat1;
                //this.entities[avatar.id]=this.player 
            }else{
                this.seat2.active=true
                //this.seat2.getComponent("Seat")._isReady=true
                this.seat2.getComponent("Seat")._userName=avatar.accountName
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
      cc.log("enableControlPlayer")
        if(this.player) {
            this.player.getComponent("AvatarControl").enableEventListen();
        }
    },

    disEnableControlPlayer: function() {
        cc.log("enableControlPlayer3333")
        if(this.player) {
            this.player.getComponent("AvatarControl").disEnableEventListen();
            this.player.getComponent("AvatarAction").reset();
        }
    },
});
