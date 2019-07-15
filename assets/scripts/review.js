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
        cover: {
            default: null,
            type: cc.Node
        },
        titleDisplay: {
            default: null,
            type: cc.Label
        },
        artistDisplay: {
            default: null,
            type: cc.Label
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        awardDisplay: {
            default: null,
            type: cc.Label
        },
        returnBtn: {
            default: null,
            type: cc.Node
        }
    },
    loadMusicInfo: function(sheet) {
        this.titleDisplay.string = sheet.title;
        this.artistDisplay.string = sheet.artist;
    },
    onLoad() {
        sceneControl.fadeIn('review');
        cc.tween(this.scoreDisplay.node).delay(0.5).to(0.5, {position: cc.v2(-310, -50)}).start();
        cc.tween(this.awardDisplay.node).delay(1).to(0.5, {position: cc.v2(-310, -120)}).start();
        cc.loader.loadRes(`covers/cover${gameData.musicId}`, cc.SpriteFrame, function(err, spriteFrame) {
            this.cover.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }.bind(this));
        cc.loader.loadRes(`sheets/${gameData.musicId}`, function(err, jsonAssert) {
            this.loadMusicInfo(jsonAssert.json);
        }.bind(this));
        this.returnBtn.on(cc.Node.EventType.TOUCH_END, function() {
            sceneControl.switchScene('review', 'select');
        });
        this.score = 0.0;
        this.finalScore = gameData.finalScore;
        this.awardDisplay.string = gameData.award;
    },
    start() {

    },

    update(dt) {
        if(this.score < this.finalScore && this.scoreDisplay.node.x == -310) {
            this.score = this.score+0.6 >= this.finalScore ? this.finalScore : this.score+0.6;
            this.scoreDisplay.string = (this.score).toFixed(1)+'%';
        }
    },
});
