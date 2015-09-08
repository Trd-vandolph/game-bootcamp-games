/**/
var PAD_LINK = "./img/pad.png";
var MSG_LINK = "./img/message.png";
var colorTable = [
					["#ffaaaa", "#ff0000", "#00ff00", "#0000ff"],
					["#0000ff", "#ff0000", "#ffff00", "#00ff00"],
					["#00ff00", "#ff0000", "#0000ff", "#ffff00"],
					["#ff0000", "#ff00ff", "#bbbbbb", "#00ff00"]
				];
var padNum = 0;
var scene;

enchant();
window.onload = function(){
    game = new Core(320, 320);
	game.preload(PAD_LINK, MSG_LINK);
    game.fps = 30;
    game.onload = function(){
    	game.replaceScene(new StartScene());
    }
    game.start();
};
var StartScene = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		scene = this;
		transparentScreen = new Sprite(game.width, game.height);
		transparentScreen.image = null;
		msg = new Sprite(320, 40);
		msg.image = game.assets[MSG_LINK];
		msg.y = (game.height-msg.height)/2;
		scene.addChild(msg);
		pad = new Array();
		for(var i=0; i<2; i++){
			pad[i] = new Array();
			for(var j=0; j<2; j++){ 
				pad[i][j] = new Sprite(100, 100);
				pad[i][j].image = game.assets[PAD_LINK];
				pad[i][j].x = 30+160*i;	// 30*(1+2*i)+100*i
				pad[i][j].y = 30+160*j;	// 30*(1+2*i)+100*i
				pad[i][j].frame = 2+i+j*2;
				scene.addChild(pad[i][j]);
				pad[i][j].ontouchstart = function(){
					padNum = this.frame - 2;
					msg.frame++;
					scene.addChild(transparentScreen);
					msg.tl.delay(game.fps*1.5).then(function(){
						game.replaceScene(new GameScene());
					})
				}
			}
		}
	}
});
var GameScene = Class.create(Scene, {
	initialize: function(_num){
		Scene.call(this); scene = this;
		combo = 0;
		maxCombo = 0;
		uninput = true;	// 入力が何もないときtrue
		scoreLabel = new ScoreLabel(10, 10);
		scene.addChild(scoreLabel);
		comboLabel = new MutableText(10, 26);
		comboLabel.label = "COMBO:";
		comboLabel.text = comboLabel.label + combo;
		scene.addChild(comboLabel);
		timeLabel = new TimeLabel(10, 42, 'countdown');
		timeLabel.time = 30;
		scene.addChild(timeLabel);
		scene.square = new Array(10);
		for(var i=10; i>=0; i--){
			scene.square[i] = new Square(i);
			scene.addChild(scene.square[i]);
		}
		pad = new Pad();
		pad.x = game.width-(pad.width+10);
		pad.y = game.height-(pad.height+10);
		scene.addChild(pad);
		scene.addEventListener('inputstart', function(){
			var input = game.input;
			if((input.left && scene.square[0].colorNum == 0) || (input.right && scene.square[0].colorNum == 1) || (input.up && scene.square[0].colorNum == 2) || (input.down && scene.square[0].colorNum == 3)){
				combo++;
				maxCombo = Math.max(maxCombo, combo);
				scoreLabel.score += 100+20*combo;	// スコア計算は全てここで行っています
			}else{combo = 0;}
			comboLabel.text = comboLabel.label + combo;
			for(var i=0; i<=10; i++) scene.square[i].update();
		});
		scene.onenterframe = function(){
			if(timeLabel._time<=0) game.end(scoreLabel.score, "スコア:" + scoreLabel.score +"点、最大コンボ:" + maxCombo + "回");
		}
	}
})
var Square = Class.create(Sprite, {
	initialize: function(i){
		Sprite.call(this, 15*(10-i), 15*(10-i));
		this.colorNum = Math.floor(Math.random()*4);
		this.backgroundColor = colorTable[padNum][this.colorNum];
		this.x = 20+25*i;
		this.y = game.height-(this.height+25*i)-20;
		this.num = i;
		this.opacity = 0.5;
	},
	update: function(){
		if(this.num<10) this.colorNum = scene.square[this.num+1].colorNum;
		else this.colorNum = Math.floor(Math.random()*4);
		this.backgroundColor = colorTable[padNum][this.colorNum];
	}
});