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
        comboDisplay: {
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
        pauseAudio: {
            default: null,
            type: cc.AudioClip
        },
        resumeAudio: {
            default: null,
            type: cc.AudioClip
        },
        returnAudio: {
            default: null,
            type: cc.AudioClip
        }
    },
    updateTotScore: function () {
        var tmp = this.track[0].getComponent('track').score
            + this.track[1].getComponent('track').score
            + this.track[2].getComponent('track').score
            + this.track[3].getComponent('track').score;
        if (this.acScore === 0) return;
        gameData.finalScore = (tmp * 100 / this.acScore).toFixed(1);
        this.scoreDisplay.string = gameData.finalScore + '%';
    },
    loadSheet: function (sheet) {
        this.titleDisplay.string = sheet.title;
        this.artistDisplay.string = sheet.artist;
        this.acScore = sheet.track[0].length
            + sheet.track[1].length
            + sheet.track[2].length
            + sheet.track[3].length;
        // this.fullScore
        this.track[0].getComponent('track').musicSheet = sheet.track[0];
        this.track[1].getComponent('track').musicSheet = sheet.track[1];
        this.track[2].getComponent('track').musicSheet = sheet.track[2];
        this.track[3].getComponent('track').musicSheet = sheet.track[3];
    },
    control: function () {
        if (cc.audioEngine.getState(this.audioId) == 1) {
            cc.audioEngine.pause(this.audioId);
            cc.audioEngine.playEffect(this.pauseAudio, false);
            cc.director.pause();
            this.controlBtn.getComponent(cc.Sprite).spriteFrame = this.playBtn;

        }
        else {
            cc.audioEngine.playEffect(this.resumeAudio, false);
            cc.audioEngine.resume(this.audioId);
            cc.director.resume();
            this.controlBtn.getComponent(cc.Sprite).spriteFrame = this.pauseBtn;
        }
    },
    updateHitCnt: function (hit) {
        if (hit === true) {
            this.hitCnt++;
            if (!this.comboVisible) this.comboVisible = true;
            if (this.hitCnt >= 8) {
                this.comboDisplay.string = this.hitCnt + ' Combo';
                this.comboDisplay.node.scale = 0.325;
                this.comboDisplay.node.opacity = 0;
                cc.tween(this.comboDisplay.node).to(0.2, { scale: 0.25, opacity: 255 }).start();
            }
        }
        else {
            this.hitCnt = 0;
            if (this.comboVisible) {
                cc.tween(this.comboDisplay.node).to(0.3, { opacity: 0 }).start();
                this.comboVisible = false;
            }
        }
        // cc.log(this.hitCnt);
    },
    setTrack: function () {
        this.track[0].getComponent('track').game = this;
        this.track[1].getComponent('track').game = this;
        this.track[2].getComponent('track').game = this;
        this.track[3].getComponent('track').game = this;
    },
    loadSheetAndPlay: function () {
        cc.loader.loadRes(`sheets/${gameData.musicId}`, function (err, jsonAssert) {
            this.loadSheet(jsonAssert.json);
            this.audioId = cc.audioEngine.play(this.audio, false, 1);
            this.track[0].getComponent('track').timer = 0;
            this.track[1].getComponent('track').timer = 0;
            this.track[2].getComponent('track').timer = 0;
            this.track[3].getComponent('track').timer = 0;
            cc.audioEngine.setFinishCallback(this.audioId, function () {
                this.updateTotScore();
                if(gameData.finalScore === 100.0) gameData.award = 'All Combo';
                else if(this.hitCnt === this.acScore) gameData.award = 'Full Combo';
                else gameData.award = '';
                sceneControl.switchScene('inGame', 'review');
            });
        }.bind(this));
    },
    onLoad() {
        sceneControl.fadeIn('inGame');
        this.setTrack();
        cc.loader.loadRes(`audio/${gameData.musicId}`, cc.AudioClip, function (err, audioClip) {
            this.audio = audioClip;
            this.loadSheetAndPlay();
        }.bind(this));
        this.controlBtn.on(cc.Node.EventType.TOUCH_START, this.control, this);
        this.returnBtn.on(cc.Node.EventType.TOUCH_START, function () {
            cc.audioEngine.stop(this.audioId);
            cc.director.resume();
            cc.audioEngine.playEffect(this.returnAudio, false);
            sceneControl.switchScene('inGame', 'select');
        }.bind(this));
        this.acScore = 0;
        this.hitCnt = 0;
        this.comboVisible = false;
    },
    start() {

    },
    update(dt) {
        this.updateTotScore();
    }
});
