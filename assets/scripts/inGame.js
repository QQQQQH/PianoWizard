// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var global = require('global');

cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        titleDisplay: {
            default: null,
            type: cc.Label
        },
        artistDisplay: {
            default: null,
            type: cc.Label
        },
        track: {
            default: [],
            type: [cc.Node]
        },
        controlBtn: {
            default: null,
            type: cc.Node
        },
        pauseBtn: {
            default: null,
            type: cc.SpriteFrame
        },
        playBtn: {
            default: null,
            type: cc.SpriteFrame
        },
        returnBtn: {
            default: null,
            type: cc.Node
        },
        audio: {
            default: null,
            type: cc.AudioClip
        },
    },
    updateTotScore: function () {
        this.totScore = this.track[0].getComponent('track').score
            + this.track[1].getComponent('track').score
            + this.track[2].getComponent('track').score
            + this.track[3].getComponent('track').score;
        this.scoreDisplay.string = 'Score: ' + this.totScore.toFixed(1);
    },
    loadSheet: function (sheet) {
        this.titleDisplay.string = sheet.title;
        this.artistDisplay.string = sheet.artist;
        this.track[0].getComponent('track').musicSheet = sheet.track[0];
        this.track[1].getComponent('track').musicSheet = sheet.track[1];
        this.track[2].getComponent('track').musicSheet = sheet.track[2];
        this.track[3].getComponent('track').musicSheet = sheet.track[3];

    },
    review: function () {
        console.log('\n\n\n\n\nfinish audio\n\n\n\n\n');
    },
    toSelect: function () {
        cc.director.loadScene('select');
    },
    control: function () {
        if (cc.audioEngine.getState(this.audioId) == 1) {
            cc.audioEngine.pause(this.audioId);
            this.controlBtn.getComponent(cc.Sprite).spriteFrame = this.playBtn;
        }
        else {
            cc.audioEngine.resume(this.audioId);
            this.controlBtn.getComponent(cc.Sprite).spriteFrame = this.pauseBtn;
        }
    },
    onLoad() {
        this.updateTotScore();
        cc.loader.loadRes(`sheets/0`, function (err, jsonAssert) {
            this.loadSheet(jsonAssert.json);
        }.bind(this));
        this.audioId = cc.audioEngine.play(this.audio, false, 1);
        this.track[0].getComponent('track').audioId = this.audioId;
        this.track[1].getComponent('track').audioId = this.audioId;
        this.track[2].getComponent('track').audioId = this.audioId;
        this.track[3].getComponent('track').audioId = this.audioId;
        cc.audioEngine.setFinishCallback(this.audioId, this.review);
        this.controlBtn.on(cc.Node.EventType.TOUCH_START, this.control, this);
        this.returnBtn.on(cc.Node.EventType.TOUCH_START, this.toSelect, this);
        console.log(global.musicId);
    },
    start() {

    },
    update(dt) {
        this.updateTotScore();
    }
});
