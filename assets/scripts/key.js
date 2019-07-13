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
        widthScaling: 0.9,
        heightScaling: 0.05,
    },



    setDropAction: function () {
        let drop = cc.moveBy(this.dropDuration, cc.v2(0, -this.dropDist));

        return cc.repeatForever(drop);
    },

    onLoad: function () {
        this.node.width = this.railWay.node.width * this.widthScaling;
        this.node.height = this.railWay.node.height * this.heightScaling;
        this.node.x = 0;
        this.node.y = this.railWay.node.height * (1 - this.heightScaling / 2);

        // 下落的距离是从起始位置到轨道中buttomLine的位置
        this.dropDist = this.node.y - this.node.height / 2
            - this.railWay.getComponent('track').buttomLineY;

        this.dropAction = this.setDropAction();
        this.node.runAction(this.dropAction);
    },

});
