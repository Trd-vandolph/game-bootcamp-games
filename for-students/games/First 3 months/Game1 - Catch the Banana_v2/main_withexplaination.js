enchant();

window.onload = function() {
    game = new Core(320, 320);
    game.fps = 24;
	game.scale = 1;
    game.preload(['chara1.gif','icon0.gif']);

    game.onload = function() {
     var bear = new Sprite(32, 32);  
        bear.x = 0; 
        bear.y = 218;   
        bear.image = game.assets['chara1.gif']; 
        bear.frame = 4;
      	
        game.rootScene.addEventListener('touchstart', function(e){
            bear.x = e.localX;
        });

        game.rootScene.addEventListener('touchmove', function(e){
            bear.x = e.localX;
        });

        game.rootScene.addEventListener('enterframe',function(){
            if(game.frame % 6 == 0){
                addBanana();
            }
        });
        game.rootScene.addChild(bear);
    }
    game.start();
}

function addBanana(pos){

    var banana = new Sprite(16, 16); 
    banana.x = rand(320); 
    banana.y = 0;
    banana.image = game.assets['icon0.gif'];
    banana.frame = 16;
	banana.addEventListener('enterframe', function(e) {
        if(this.intersect(bear)){ 
            game.rootScene.removeChild(this); 
        }else{
          if(this.y <= 300){
            this.y += 3; 
          }
        }
    });
    game.rootScene.addChild(banana);
}

function rand(num){
    return Math.floor(Math.random() * num);
}



