enchant();

window.onload = function(){
	game = new Game(320, 320);
	game.preload('chara1.png','icon0.png','bg.png');
	game.fps = 24;
	game.scale = 1;
		
	game.onload = function(){
		 msg = new Label("CATCH BANANA V.2");
		 score = new Label('SCORE: ');
			score.x = 10;
			score.y = 20;
		 miss = new Label('MISSED: ');
			miss.x = 10;
			miss.y = 40;
		 bonus = new Label('BONUS(grape): ');
			bonus.x = 10;
			bonus.y = 60;
		 gtotal = new Label('GRAND TOTAL: ');
			gtotal.x = 10;
			gtotal.y = 80;
		 
		game.scores = 0;
		game.missed = 0;
		game.bonuses = 0;
		game.total = 0;
	
		background = new Sprite(320, 320);
			background.image = game.assets['bg.png'];
			
		player = new Sprite(32, 32);
			player.image = game.assets['chara1.png'];
			player.frame = 0;
			player.x = 0;
			player.y = 220;

		game.rootScene.addEventListener('touchstart', function(e){
			player.x = e.x;
		});
		
		game.rootScene.addEventListener('touchmove', function(e){
			player.x = e.x;
		});
		
		game.rootScene.addEventListener('enterframe', function(){
			if(game.frame % 5 == 0){
				addBanana();	
			}
			
			if(game.frame % 60 == 0){
				addGrape();
				ends();
			}
		});
		
		game.rootScene.addChild(background);	
		game.rootScene.addChild(msg);
		game.rootScene.addChild(score);
		game.rootScene.addChild(miss);
		game.rootScene.addChild(bonus);
		game.rootScene.addChild(gtotal);
		game.rootScene.addChild(player);
			
	}
	game.start();
}

function addBanana(){

    var banana = new Sprite(16, 16); 
    banana.x = rand(320);  
    banana.y = 0;
    banana.image = game.assets['icon0.png'];
    banana.frame = 16;
	
	banana.addEventListener('enterframe', function(e){
		if(this.intersect(player)){
			game.rootScene.removeChild(this);
			game.scores++;
			score.text = "SCORE: " + game.scores;
			game.total = game.scores + game.bonuses;
			gtotal.text = "GRAND TOTAL: " + game.total;
		}else{
			if(this.y <= 320){
				this.y +=3;
				if(this.y == 300){
					game.missed++;
					miss.text = "MISSED: " + game.missed;
				}
			}
		}
	});
	
    game.rootScene.addChild(banana);
}

function addGrape(){
	var grape = new Sprite(16, 16);
		grape.image = game.assets['icon0.png'];
		grape.frame = 17;
		grape.x = rand(320);
		grape.y = 0;
		
		grape.addEventListener('enterframe', function(){
			if(this.intersect(player)){
				game.rootScene.removeChild(this);
				game.bonuses +=5;
				bonus.text = "BONUS(grape): " + game.bonuses;
				game.total = game.scores + game.bonuses;
				gtotal.text = "GRAND TOTAL: " + game.total;
			}else{
				if(this.y <= 320){
					this.y += 10;
				}
			}
		});
	game.rootScene.addChild(grape);
}

function ends(){
	var bomb = new Sprite(16, 16);
		bomb.image = game.assets['icon0.png'];
		bomb.frame = 24;
		bomb.x = rand(320);
		bomb.y = 0;
		
		bomb.addEventListener('enterframe', function(){
			if(this.intersect(player)){
				game.rootScene.removeChild(player);
				game.end();
			}else{
				if(this.y <= 320){
					this.y += 8;
				}
			}
		});
		game.rootScene.addChild(bomb);
}

function rand(num){
	return Math.floor(Math.random() * num);
}



