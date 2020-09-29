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
        player: {
            default: null,
            type: cc.Node,
        },

        camera: {
            default: null,
            type: cc.Camera,
        },

        cameraControl: {
            default: null,
            type: cc.Node,
        },

        canvas: {
            default: null,
            type: cc.Node,
        },

        item: {
            default: null,
            type: cc.Node,
        },

        pickTouchRange: {
            default: null,
            type: cc.Node,
        },

        itemID : 0,

        enableEvent: false,
    },

    onLoad () {
        /*
        this.canvas = cc.find("Canvas");
        this.camera = cc.find("Camera").getComponent(cc.Camera);
        this.cameraControl = cc.find("Camera").getComponent("CameraControl");

        //this.camera = cc.find("Canvas/Main Camera").getComponent(cc.Camera);
        //this.cameraControl = cc.find("Canvas/Main Camera").getComponent("CameraControl");

        this.sky = cc.find("World/sky_bg");
        this.skyBox = this.sky.getBoundingBoxToWorld();

        this.ctx = cc.find("worldDraw").getComponent(cc.Graphics);
        this.itemBox = null;
       
        if(!cc.sys.isMobile) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        //this.oriStickPos=cc.Vec2(0,0)
        */
    },

    setTouchControl: function(touchControl,pickTouchRange) {
        /*
        this.touchControl = touchControl;
        this.stickBg = this.touchControl.getChildByName("joyStickBg");
        this.oriStickPos = this.stickBg.position;
        this.stick = this.stickBg.getChildByName("joyStick");
        this.touchRadius = this.touchControl.getBoundingBoxToWorld().width/2;
        this.stickBgRadius = this.stickBg.getBoundingBoxToWorld().width/2;

        //this.pickTouchRange = cc.find("touchRange");
        //this.pickTouchRange.active = true;
        this.pickTouchRange=pickTouchRange
        this.pickTouchRange.active = true;

        this.createTouchEvent();
        */
    },

    createTouchEvent: function() {//touchControl是游戏杆
        this.touchControl.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.touchControl.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        this.touchControl.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
        this.touchControl.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnded, this);

        this.pickTouchRange.on(cc.Node.EventType.TOUCH_START, this.touchPickIem, this);
        this.pickTouchRange.on(cc.Node.EventType.TOUCH_MOVE, this.touchAdjustThrow, this);
        this.pickTouchRange.on(cc.Node.EventType.TOUCH_END, this.touchStartThrow, this);
        this.pickTouchRange.on(cc.Node.EventType.TOUCH_CANCEL, this.touchStartThrow, this);
        //this.canvas.on(cc.Node.EventType.TOUCH_START, this.touchPickIem, this);
        //this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.touchAdjustThrow, this);
        //this.canvas.on(cc.Node.EventType.TOUCH_END, this.touchStartThrow, this);
        //this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.touchStartThrow, this);
    },

    enableEventListen: function() {
        this.enableEvent = true;
        //this.enableMouseEvent()
    },

    disEnableEventListen: function() {
        this.enableEvent = false;
        //this.disEnableMouseEvent()
    },

    isEnable: function() {
        return this.enableEvent;
    },

    enableMouseEvent: function() {/*

        this.canvas.on(cc.Node.EventType.MOUSE_MOVE, this.mouseAdjustThrow, this);
        this.canvas.on(cc.Node.EventType.MOUSE_UP, this.starThrowItem, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.mouseAdjustThrow, this);
        this.node.on(cc.Node.EventType.MOUSE_UP , this.starThrowItem, this);

        if(this.item) {
            this.item.on(cc.Node.EventType.MOUSE_MOVE, this.mouseAdjustThrow, this);
            this.item.on(cc.Node.EventType.MOUSE_UP , this.starThrowItem, this);
        }
        */
    },

    disEnableMouseEvent: function() {
        /*
        this.canvas.off(cc.Node.EventType.MOUSE_MOVE, this.mouseAdjustThrow, this);
        this.canvas.off(cc.Node.EventType.MOUSE_UP, this.starThrowItem, this);
        this.node.off(cc.Node.EventType.MOUSE_MOVE, this.mouseAdjustThrow, this);
        this.node.off(cc.Node.EventType.MOUSE_UP , this.starThrowItem, this);

        if(this.item) {
            this.item.off(cc.Node.EventType.MOUSE_MOVE, this.mouseAdjustThrow, this);
            this.item.off(cc.Node.EventType.MOUSE_UP , this.starThrowItem, this);
        }
        */
    },

    onKeyDown: function(event) {
        if(!this.enableEvent) return;

        switch(event.keyCode) {
            case cc.macro.KEY.a: 
                this.player.leftWalk();
                break;

            case cc.macro.KEY.d:
                this.player.rightWalk();
                break;

            case cc.macro.KEY.w:
                this.player.jump();
                break;
        };
    },

    onKeyUp: function(event) {
        if(!this.enableEvent) return;

        switch(event.keyCode) {
            case cc.macro.KEY.a: 
            case cc.macro.KEY.d:
                this.player.stopWalk();                          
                break;
            };
    },

    setPlayer: function(player) {
        if(player) {
            this.player = player.getComponent("AvatarAction");
        }
    },

    touchControlPlayer: function(point) {
        var angle =  Math.atan2(point.y, point.x) * (180/Math.PI); 
        //向右走
        if( (angle > -90 && angle < 0 || angle > 0 && angle < 30)  && this.player)  
        {  
            this.player.rightWalk();
        } 
        else if( (angle < -90 && angle >= -180 || angle <= 180 && angle > 150) && this.player)  
        {
            this.player.leftWalk();
        }
        else if(angle >= 30 && angle <= 60 && this.player)  
        {
            this.player.touchRightJump();
        }
        else if(angle >= 120 && angle <= 150 && this.player)  
        {
           this.player.touchLeftJump();
        }
        else if(angle > 60 && angle < 120 && this.player)  
        {
            this.player.jump();
        }
    },

    resetJoyStick: function() {
        this.stickBg.setPosition(this.oriStickPos);
        this.stick.setPosition(0, 0);
    },

    onTouchBegan: function(event) {
        cc.log("AvatarControl.onTouchBegan")
        if(!this.enableEvent) return;
        
        var touchPos = this.touchControl.convertToNodeSpaceAR(event.getLocation());

        this.stickBg.setPosition(touchPos);
    } ,

    onTouchMoved: function(event) {
        if(!this.enableEvent) return;

        var touchPos = this.stickBg.convertToNodeSpaceAR( event.getLocation());

        var normal = touchPos.normalize();
        var point = normal.mul(this.stickBgRadius);
        this.stick.setPosition(point);
        this.touchControlPlayer(point);
        
    } ,

    onTouchEnded: function(event) {
        if(!this.enableEvent) return;

        this.stickBg.setPosition(this.oriStickPos);
        this.stick.setPosition(0, 0);
        if(this.player) {
            this.player.stopWalk();
        }
    } ,

    touchPickIem: function(event) {
        if(!this.enableEvent) return;
        cc.log("AvatarControl.touchPickIem")
        if(this.player) {
            //var pos = this.camera.getCameraToWorldPoint(event.getLocation());
            var pos=cc.Vec2(0,0)
            this.camera.getScreenToWorldPoint(event.getLocation(),pos)
            var item = this.player.touchPickItem(pos);

            if(item)  this.item = item;
        }
    },

    touchAdjustThrow: function(event) {
        //if(!this.enableEvent){cc.log("AvatarControl.touchAdjustThrow this.enableEvent==false")}
        if(!this.enableEvent) return;

        if(this.player) {
            //var pos = this.camera.getCameraToWorldPoint(event.getLocation());
            var pos=cc.Vec2(0,0)
            this.camera.getScreenToWorldPoint(event.getLocation(),pos)
            cc.log("touch move pos=",pos.x,pos.y)
            this.player.touchAdjustThrow(pos);


        }
    },
    
    touchStartThrow: function(event) {
        //if(!this.enableEvent){cc.log("AvatarControl.touchStartThrow this.enableEvent==false")}
        if(!this.enableEvent) return;

        if(this.player) {
            if(this.item) this.cameraControl.setTarget(this.item);
           // var pos = this.camera.getCameraToWorldPoint(event.getLocation());
            var pos=cc.Vec2(0,0)
            this.camera.getScreenToWorldPoint(event.getLocation(),pos)
            var point = new cc.Vec2(pos.x, pos.y);
            this.player.throw(point);
        }
    },

    mouseAdjustThrow: function(event) {
        if(!this.enableEvent) return;
        //cc.log("mouseAdjustThrow1111111111111111111111111111111")
        //var pos = this.camera.getCameraToWorldPoint(event.getLocation());
        var pos=cc.Vec2(0,0)
        this.camera.getScreenToWorldPoint(event.getLocation(),pos)
        var point = new cc.Vec2(pos.x, pos.y);
        this.player.adjustThrow(point);
    },

    starThrowItem: function(event) {
        if(!this.enableEvent) return;

        cc.log("player start throw item");
       // var pos = this.camera.getCameraToWorldPoint(event.getLocation());
        var pos=cc.Vec2(0,0)
        this.camera.getScreenToWorldPoint(event.getLocation(),pos)
        var point = new cc.Vec2(pos.x, pos.y);
       
        if(this.item) {
            this.cameraControl.setTarget(this.item);
        }
        
        this.player.throw(point);
        //this.cameraControl.decrease()
        //if(!cc.sys.isMobile) {
        if(cc.sys.isMobile) {
            cc.log("disEnableMouseEvent")
            this.disEnableMouseEvent();
        }
    },

    pickUpItem: function(item, itemID, pickPos) {
        /*
        if(!this.enableEvent) return;

        cc.log("AvatarControl.pickUpItem:");
        this.player.onMousePickUpItem(item, itemID, pickPos);
        this.item = item;
        //if(!cc.sys.isMobile) {
        if(!cc.sys.isMobile) {
            this.enableMouseEvent();
        }
        */
    },

    checkItemOutRange: function() {
        /*
        var ret = false;
        if(this.item) {
            this.skyBox = this.sky.getBoundingBoxToWorld();
            this.itemBox = this.item.getBoundingBoxToWorld();

            if(this.itemBox.xMax < this.skyBox.xMin || this.itemBox.xMin > this.skyBox.xMax || this.itemBox.yMin < this.skyBox.yMin) {
                ret = true;
            } 
        }

        return ret;
        */
        
    },

    update: function (dt) {
        var player = KBEngine.app.player();
        if(player == undefined || !player.inWorld)
            return;
        //this.oriStickPos.x=this.node.x+20;
        //同步位置
        player.position.x = this.node.x/SCALE;
        player.position.y = 0;
        player.position.z = this.node.y/SCALE;
        player.isOnGround = 1;
        player.direction.z = this.player.node.scaleX;

            /*
            if(itemAction.isThrowed && (itemSpeed == 0) && (!isOutRange)){
                var itempos= new KBEngine.Vector3();
                itempos.x=this.item.position.x/SCALE
                itempos.y=0
                itempos.z=this.item.position.z/SCALE
                player.uploaditempos(itemAction.itemID,itempos)           //同步石头的位置到服务器
            }
            //cc.log("itemAction.isThrowed && (isOutRange ||itemSpeed == 0",itemAction.isThrowed ,isOutRange,itemSpeed)
            if( itemAction.isThrowed && (isOutRange ||itemSpeed == 0) ) {
                //cc.log("itemAction.isThrowed && (isOutRange ||itemSpeed == 0 =>new turn");
                itemAction.setThrowed(false);
                this.item = null;
                player.newTurn();
                //var curAvatarID=this.node.parent.getComponent("WorldScene").curAvatarID
                //cc.log("curAvatarID=",curAvatarID)
                //this.node.parent.getComponent("WorldScene").setCameraTarget(curAvatarID);
                //出界就产生新的石头
                if(isOutRange) {
                    player.resetItem(itemAction.itemID);
                }
            }*/
    },
});
