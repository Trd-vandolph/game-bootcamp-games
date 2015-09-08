enchant();
rootScene
enchant.Action
window.onload = function(game){
	game = new Game(320,320);
	game.preload('res/fishsheet.png');
	game.scale = 1;
	game.onload = function(){
		fish = new Sprite(32,32);
		//assign iamge to fish
		fish.image = game.assets['res/fishsheet.png'];
		fish.frame = 0;
		fish.addEventListener('touchend', function(){
			this.frame += 3;
		});
		game.rootScene.addChild(fish);
		enchant.ac
	}
	game.start();
}