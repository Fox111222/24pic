/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/

var KBEngine = require("kbengine");

KBEngine.Avatar = KBEngine.Entity.extend({
        __init__ : function()
        {
            this._super();
            if(this.isPlayer()) {
                cc.log("window.wx != undefined || window.wc=",window.wx != undefined)
                if(cc.sys.platform == cc.sys.WECHAT_GAME){
                    this.decodeEncryptedData();
                }                   
                cc.log("KBEngine.Avatar._init_")
                KBEngine.Event.fire("enterScene");
            }
        },
        onSetSpaceData:function(){
            cc.log("initSpaceDatainitSpaceDatainitSpaceDatainitSpaceData")
            KBEngine.Event.fire("onSetSpaceData");

        },
        decodeEncryptedData: function()
        {
            var encryptedData = cc.sys.localStorage.getItem("encryptedData");
            var iv = cc.sys.localStorage.getItem("iv");
            cc.log("encryptedData && iv",encryptedData , iv)
            if(encryptedData && iv) {
                cc.log("decodeEncryptedData")
                this.baseCall("decodeEncryptedData", encryptedData, iv);
            }
        },
        reqChangeReadyState:function(){
            this.cellCall("reqChangeReadyState",1);
        },
        playerReadyStateChange:function(eid,state){
            if(this.isPlayer()) {
                KBEngine.Event.fire("playerReadyStateChange", eid,state);
            }

        },
        quick_chat:function(idx){
            cc.log("quick_chat:cellCall",idx)
            this.cellCall("quick_chat",idx);
        },
        emoji:function(name){
            cc.log("emoji:cellCall",name)
            this.cellCall("emoji",name);
        },
        iptChat:function(strstr){
            cc.log("iptChat:cellCall",strstr)
            this.cellCall("iptChat",strstr);
        },
        onquick_chat:function(eid,idx){
            cc.log("quick_chat:receive",eid,idx)
            if(this.isPlayer()) {
                KBEngine.Event.fire("onquick_chat", eid,idx);
            }
        },
        onjoinPrivateRoom:function(num){
            cc.log("onjoinPrivateRoom", num)
            if(this.isPlayer()) {
                KBEngine.Event.fire("onjoinPrivateRoom", num);
            }
        },
        onemoji:function(eid,name){
            cc.log("emoji:receive",eid,name)
            if(this.isPlayer()) {
                KBEngine.Event.fire("onemoji", eid,name);
            }
        },
        oniptChat:function(eid,strstr){
            cc.log("iptChat:receive",eid,strstr)
            if(this.isPlayer()) {
                KBEngine.Event.fire("oniptChat", eid,strstr);
            }
        },
        joinRoom: function()
        {
            KBEngine.INFO_MSG("avatar " + this.id + " join room");
            this.baseCall("joinRoom");
        },
        createPrivateRoom: function()
        {
            KBEngine.INFO_MSG("avatar " + this.id + " createPrivateRoom");
            this.baseCall("createPrivateRoom");
        },
        joinPrivateRoom: function(roomkey)
        {
            KBEngine.INFO_MSG("avatar " + this.id + " joinPrivateRoom"+ roomkey);
            this.baseCall("joinPrivateRoom",roomkey);
        },
        game_begin_push:function(holds)   {
            cc.log("Avatar::game_begin_push")
            if(this.isPlayer()) {
                KBEngine.Event.fire("game_begin_push",this);
            }
        },
        onEnterWorld : function()
        {
            cc.log("avatar.onEnterWorld.......")
            this._super();
            if(this.isPlayer()) {
                KBEngine.Event.fire("onAvatarEnterWorld", this);
            }		
        },
        onEnterWorld2 : function(eid)
        {
            cc.log("avatar.onEnterWorld2.......",this.id , KBEngine.app.entity_id)

            //this._super();
            if(this.isPlayer()) {
                KBEngine.Event.fire("onEnterWorld2", eid);
            }		
        },


        onNewTurn : function(eid,second,card1,card2,card3,card4)
	    {
            KBEngine.INFO_MSG("avatar " + eid + " on new turn");
		    KBEngine.Event.fire("newTurn", this,eid,second,card1,card2,card3,card4);
        }, 
        onsureact:function(strr){
            this.cellCall("onsureact", strr);
        },
        onsyncsureact:function(eid , strr){
            cc.log("avatar::onsyncsureact== ", strr);
            //KBEngine.Event.fire("onsyncsureact", strr);
            if(this.isPlayer()) {
                KBEngine.Event.fire("oniptChat", eid,strr);
            }

        },
        newTurn : function()
	    {
            this.cellCall("newTurn");
        }, 

        
        onupdateGamestates:function(curID,time){
            KBEngine.INFO_MSG("onupdateGamestates " + curID + "/" + time);
            KBEngine.Event.fire("onupdateGamestates", curID,time);
        },
        onotherNetcut: function(avatarID)
        {
            KBEngine.INFO_MSG("avatar " + avatarID + " Netcut");
            KBEngine.Event.fire("onotherNetcut", avatarID);
        },
        onDie: function(avatarID)
        {
            KBEngine.INFO_MSG("avatar " + avatarID + " die");
            KBEngine.Event.fire("onAvatarDie", avatarID);
        },

        onGameOver: function(isWin, hitRate, totalTime, totalHarm, score)
        {
            KBEngine.INFO_MSG("Game is over: avatar " + this.id + "win= " + isWin.toString());
            KBEngine.Event.fire("onGameOver", this.id, isWin, hitRate, totalTime, totalHarm, score);
        },
        updategamestuts:function(num){
            KBEngine.Event.fire("updategamestuts",num);
        },

        continueGame: function()
        {
            this.cellCall("continueGame");
            KBEngine.INFO_MSG("avatar " + this.id + " continue game");
        },

        onContinueGame: function(avatarID)
        {
            KBEngine.INFO_MSG("avatar " + avatarID + "on continue game, local avatarID=" + this.id);
            //KBEngine.Event.fire("onAvatarEnterWorld", KBEngine.app.entity_uuid, this.id, this);
            KBEngine.Event.fire("onAvatarEnterWorld",this);
        },

       
    });
    
    
    