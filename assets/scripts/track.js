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
        keyPrefab: {
            default: null,
            type: cc.Prefab
        },

        buttonPrefab: {
            default: null,
            type: cc.Prefab
        },

        keyMissParticlePrefab: {
            default: null,
            type: cc.Prefab
        },

        keyGoodParticlePrefab: {
            default: null,
            type: cc.Prefab
        },

        keyExcellentParticlePrefab: {
            default: null,
            type: cc.Prefab
        }
    },


    addButton: function () {
        let newButton = cc.instantiate(this.buttonPrefab);

        newButton.getComponent('button').railWay = this;

        this.button = newButton;
        // buttomLine的Y坐标(即button中心的Y坐标)
        this.buttomLineY = this.button.y;
        this.node.addChild(this.button);
    },

    addNewKey: function () {
        let newKey = cc.instantiate(this.keyPrefab);

        newKey.getComponent('key').railWay = this;
        newKey.getComponent('key').dropDuration = this.dropDuration;

        this.keyQueue.push(newKey);
        this.node.addChild(newKey);
    },

    onLoad: function () {
        this.score = 0;
        this.addButton();

        //this.musicSheet = [4, 5, 5.5, 6, 7];
        this.keyQueue = new Array;
        this.sheetIndex = 0;

        //得分为good和excellent的距离
        const goodDistScaling = 0.2;

        const excellentDistScaling = 0.1;
        this.goodDist = this.node.height * goodDistScaling;
        this.excellentDist = this.node.height * excellentDistScaling;

        this.dropDuration = 3;

        //this.timer = 0;
    },

    destroyKey: function () {
        this.keyQueue[0].destroy();
        this.keyQueue.shift();
    },

    update(dt) {
        this.timer = cc.audioEngine.getCurrentTime(this.audioId);
        //this.timer += dt;
        if (this.sheetIndex < this.musicSheet.length &&
            this.timer >= this.musicSheet[this.sheetIndex] - this.dropDuration) {
            this.addNewKey();
            ++this.sheetIndex;
        }
        if (this.keyQueue.length > 0) {
            // 如果琴键的上边界低于buttomLine则销毁
            if (this.keyQueue[0].y + this.keyQueue[0].height / 2 < this.button.y) {
                let newParticle = cc.instantiate(this.keyMissParticlePrefab);
                newParticle.setPosition(this.keyQueue[0].x, this.keyQueue[0].y);
                this.node.addChild(newParticle);
                this.destroyKey();
            }
        }
    },

    onTouch() {
        if (this.keyQueue.length > 0) {
            // 琴键下边界的Y坐标
            let keyY = this.keyQueue[0].y - this.keyQueue[0].height / 2;
            // 琴键的下边界和buttomLine之间的距离的绝对值
            let dist = Math.abs(keyY - this.buttomLineY);
            if (dist <= this.goodDist) {
                if (dist <= this.excellentDist) {
                    let newParticle = cc.instantiate(this.keyExcellentParticlePrefab);
                    newParticle.setPosition(this.keyQueue[0].x, this.keyQueue[0].y);
                    this.node.addChild(newParticle);
                    this.score += 2;
                }
                else {
                    let newParticle = cc.instantiate(this.keyGoodParticlePrefab);
                    newParticle.setPosition(this.keyQueue[0].x, this.keyQueue[0].y);
                    this.node.addChild(newParticle);

                    this.score++;
                }
            }
            else {
                let newParticle = cc.instantiate(this.keyMissParticlePrefab);
                newParticle.setPosition(this.keyQueue[0].x, this.keyQueue[0].y);
                this.node.addChild(newParticle);
            }
            this.destroyKey();
        }
    }
});
