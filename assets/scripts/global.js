// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
'use strict'

var SceneControl = cc.Class({
  name: 'SceneControl',

  properties: {
    duration: 0.2
  },

  switchScene: function (oldScene, newScene) {
    var canvas = cc.director.getScene().getChildByName(oldScene)
    cc.tween(canvas).to(this.duration, { opacity: 0 }).call(function () {
      cc.director.loadScene(newScene)
    }).start()
  },
  fadeIn: function (sceneName) {
    var canvas = cc.director.getScene().getChildByName(sceneName)
    canvas.opacity = 0
    cc.tween(canvas).to(this.duration, { opacity: 255 }).start()
  }

})

var GameData = cc.Class({
  name: 'GameData',

  properties: {
    musicId: 0,
    finalScore: 98.7,
    award: ''
  }
})

window.sceneControl = new SceneControl()

window.gameData = new GameData()
