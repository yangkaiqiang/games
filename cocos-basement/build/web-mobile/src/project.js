require=function t(e,i,c){function o(r,s){if(!i[r]){if(!e[r]){var a="function"==typeof require&&require;if(!s&&a)return a(r,!0);if(n)return n(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var d=i[r]={exports:{}};e[r][0].call(d.exports,function(t){var i=e[r][1][t];return o(i||t)},d,d.exports,t,e,i,c)}return i[r].exports}for(var n="function"==typeof require&&require,r=0;r<c.length;r++)o(c[r]);return o}({dici:[function(t,e,i){"use strict";cc._RF.push(e,"4ec7cf/p9pIabVaYORBdV/7","dici");var c=t("player");cc.Class({extends:cc.Component,properties:{dieAudio:{default:null,url:cc.AudioClip}},setInputControl:function(){var t=this,e={event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(e,i){var c=cc.moveBy(.2,cc.p(0,140));return t.node.runAction(c),!0}};cc.eventManager.addListener(e,t.node)},onLoad:function(){this.setInputControl()},noteBox:function(){return this.node.getBoundingBoxToWorld()},update:function(t){var e=cc.find("Canvas/normal").getComponent(c);cc.rectIntersectsRect(e.node.getBoundingBoxToWorld(),this.noteBox())&&(cc.audioEngine.playEffect(this.dieAudio,!1),cc.director.loadScene("gameoverScene"))},start:function(){}}),cc._RF.pop()},{player:"player"}],main:[function(t,e,i){"use strict";cc._RF.push(e,"e05cbW4NydEZJ/g48Ym8NzB","main"),cc.Class({extends:cc.Component,properties:{player:{default:null,type:cc.Node},wallWidth:80,dici:{default:null,type:cc.Prefab},diciCount:0,dici_duration:140,bgAudio:{default:null,url:cc.AudioClip},jumpAudio:{default:null,url:cc.AudioClip},playTime:60,timeLabe:{default:null,type:cc.Label},scoreLabel:{default:null,type:cc.Label},score:0},moveLeft:function(){var t=cc.moveTo(.2,cc.p(-this.node.width/2+this.wallWidth,this.player.getPositionY())),e=cc.moveTo(.1,cc.p(-this.node.width/2+this.wallWidth+30,this.player.getPositionY())),i=cc.moveTo(.1,cc.p(-this.node.width/2+this.wallWidth,this.player.getPositionY())),c=cc.sequence(e,i);0===this.player.rotationY?this.player.runAction(c):this.player.runAction(t),this.player.rotationY=0},moveRight:function(){var t=cc.moveTo(.2,cc.p(this.node.width/2-this.wallWidth,this.player.getPositionY())),e=cc.moveTo(.1,cc.p(this.node.width/2-this.wallWidth-30,this.player.getPositionY())),i=cc.moveTo(.1,cc.p(this.node.width/2-this.wallWidth,this.player.getPositionY())),c=cc.sequence(e,i);180===this.player.rotationY?this.player.runAction(c):this.player.runAction(t),this.player.rotationY=180},NewDici:function(){this.diciCount++;var t=cc.instantiate(this.dici);this.node.addChild(t);var e=cc.random0To1();t.rotationY=e>=.5?0:180,t.setPosition(this.diciPosition(e))},diciPosition:function(t){var e=0,i=0;return e=t>=.5?this.node.width/2-this.wallWidth:-this.node.width/2+this.wallWidth,i=this.diciCount<=8?this.node.height/2-this.dici_duration*this.diciCount-1*this.dici_duration:this.node.height/2-8*this.dici_duration-1*this.dici_duration,cc.p(e,i)},setInputControl:function(){var t=this,e={event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(e,i){return cc.audioEngine.playEffect(t.jumpAudio,!1),i.getCurrentTarget().convertToNodeSpace(e.getLocation()).x>t.node.width/2?t.moveRight():t.moveLeft(),t.score+=1,cc.sys.localStorage.setItem("score",t.score),t.scoreLabel.string=t.score,t.NewDici(),!0}};cc.eventManager.addListener(e,this.node)},onLoad:function(){this.score=0,cc.audioEngine.setEffectsVolume(.2),cc.audioEngine.playMusic(this.bgAudio,!0),this.setInputControl(),cc.director.preloadScene("gameoverScene"),this.player.setPosition(-this.node.width/2+80,this.node.height/2-175);for(var t=0;t<8;t++)this.NewDici();this.schedule(function(){this.playTime--,this.timeLabe.string="倒计时:"+this.playTime,this.playTime<=0&&(cc.audioEngine.pauseMusic(),cc.director.loadScene("OverScene"))},1)},start:function(){}}),cc._RF.pop()},{}],over:[function(t,e,i){"use strict";cc._RF.push(e,"c4fe2cgQaxLbYVl68pB8Bv4","over"),cc.Class({extends:cc.Component,properties:{scoreLabel:{default:null,type:cc.Label},button:{default:null,type:cc.Node}},onLoad:function(){var t=cc.sys.localStorage.getItem("score");cc.log(t),this.scoreLabel.string="最终得分："+t,this.button.on("touchstart",function(){cc.director.loadScene("mainScene")})}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";cc._RF.push(e,"50a1fwO97pJHbvKuHp1WNh3","player"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},noteBox:function(){return this.node.getBoundingBox()}}),cc._RF.pop()},{}],welcome:[function(t,e,i){"use strict";cc._RF.push(e,"c36d9IEosVOsY6CaBcyZW1X","welcome"),cc.Class({extends:cc.Component,properties:{bgAudio:{default:null,url:cc.AudioClip},startBtn:{default:null,type:cc.Node}},onLoad:function(){cc.audioEngine.playMusic(this.bgAudio,!0),cc.director.preloadScene("mainScene");var t=cc.scaleTo(.8,.9),e=cc.scaleTo(.8,1),i=cc.sequence(t,e),c=cc.repeatForever(i);this.startBtn.runAction(c),this.startBtn.on("touchstart",function(){cc.audioEngine.pauseMusic(),cc.director.loadScene("mainScene")})}}),cc._RF.pop()},{}]},{},["dici","main","over","player","welcome"]);