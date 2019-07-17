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
        startBtn: {
            default: null,
            type: cc.Node
        }
    },
    onLoad () {
        sceneControl.fadeIn('menu');
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function() {
            sceneControl.switchScene('menu', 'select');
        });
        cc.tween(this.startBtn.getChildByName('arrowRight')).repeatForever(
            cc.tween().by(0.8, { x: 80 }).by(0.8, { x: -80 })
        ).start();
    },
});
