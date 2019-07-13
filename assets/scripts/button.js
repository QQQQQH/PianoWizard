// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        widthScaling: 1,
        heightScaling: 0.2,
    },

    onTouch(event) {
        this.railWay.onTouch();
    },

    onLoad: function () {
        this.node.width = this.railWay.node.width * this.widthScaling;
        this.node.height = this.railWay.node.height * this.heightScaling;
        this.node.x = 0;
        this.node.y = this.railWay.node.height * (this.heightScaling / 2);
        // 添加触摸监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },

    onDestroy: function () {
        // 销毁事件
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    },


    // update (dt) {},
});
