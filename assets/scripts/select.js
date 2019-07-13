// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let global = require('global');

cc.Class({
    extends: cc.Component,

    properties: {
        pageView: {
            default: null,
            type: cc.PageView
        },
        coverSet: {
            default: null,
            type: cc.Node
        },
        musicInfo: {
            default: null,
            type: cc.Node
        },
        returnBtn: {
            default: null,
            type: cc.Node
        }
    },
    enterGame: function() {
        cc.director.loadScene('inGame');
    },
    updateMusicInfo: function() {
        let index = this.pageView.getCurrentPageIndex();
        this.musicInfo.children[0].getComponent(cc.Label).string = this.playlist[index].title;
        this.musicInfo.children[1].getComponent(cc.Label).string = this.playlist[index].artist;
    },
    toMenu: function() {
        cc.director.loadScene('menu');
    },
    toInGame: function(musicId) {
        global.musicId = musicId;
        cc.director.loadScene('inGame');
    },
    onLoad () {
        cc.loader.loadRes('playlist', function(err, jsonAssert) {
            this.playlist = jsonAssert.json;
            this.updateMusicInfo();
        }.bind(this));
        this.returnBtn.on(cc.Node.EventType.TOUCH_END, this.toMenu, this);
        for(let i = 0;i < this.coverSet.children.length;i++) {
            this.coverSet.children[i].on(cc.Node.EventType.TOUCH_END, this.toInGame.bind(this, i), this);
        }
    },

    start () {
        this.pageView.setCurrentPageIndex(global.musicId);
    },

    update (dt) {
        
    },
});
