cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        target:cc.Node,
        sprite:cc.SpriteFrame,
        checkedSprite:cc.SpriteFrame,
        checked:false,
        groupId:-1,
    },

    // use this for initialization
    onLoad: function () {
        if(window.radiogroupmgr == null){
            var RadioGroupMgr = require("RadioGroupMgr");
            window.radiogroupmgr = new RadioGroupMgr();
            window.radiogroupmgr.init();
        }
       // console.log(typeof(cc.vv.radiogroupmgr.add));
        window.radiogroupmgr.add(this);

        this.refresh();
    },
    
    refresh:function(){
        var targetSprite = this.target.getComponent(cc.Sprite);
        if(this.checked){
            targetSprite.spriteFrame = this.checkedSprite;
        }
        else{
            targetSprite.spriteFrame = this.sprite;
        }
    },
    
    check:function(value){
        this.checked = value;
        this.refresh();
    },
    
    onClicked:function(){
        window.radiogroupmgr.check(this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    onDestroy:function(){
        if(window.radiogroupmgr){
            window.radiogroupmgr.del(this);            
        }
    }
});
