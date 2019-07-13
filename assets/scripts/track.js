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
        hitDist: 50,

        dropDuration: 3,

        keyPrefab: {
            default: null,
            type: cc.Prefab
        },

        buttonPrefab: {
            default: null,
            type: cc.Prefab
        },
    },


    addButton: function () {
        let newButton = cc.instantiate(this.buttonPrefab);

        newButton.getComponent('button').railWay = this;

        this.node.addChild(newButton);
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

        this.musicSheet = [];
        this.keyQueue = [];
        this.sheetIndex = 0;

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
            if (this.keyQueue[0].y + this.keyQueue[0].height / 2 < 0) {
                this.destroyKey();

            }
        }
    },

    onTouch(buttonY) {
        if (this.keyQueue.length > 0) {
            let keyY = this.keyQueue[0].y - this.keyQueue[0].height / 2;
            let dist = keyY - buttonY;
            if (dist <= this.hitDist) {
                this.score++;
            }
            this.destroyKey();
        }
        cc.log(this.score);
    }
});
