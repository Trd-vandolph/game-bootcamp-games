// Call enchant.js
enchant();

// Run game on after page loads
window.onload = function()
{
	//game size
	var game = new Game(320,480);
	
	//loading the image
	game.preload('res/penguinSheet.png');

	//loading the game
	game.scale = 1;
	game.onload = function()
	{
		//create sprite for penguin
		peg = new Sprite(30,43);
		
		//distance
		peg.x = 10;
		peg.y = 10;

		//zoom in / out
		peg.scaleX = 1;
		peg.scaleY = 1;

		//call the image / save loaded image on the variable peg
		peg.image = game.assets['res/penguinSheet.png'];
		game.rootScene.addChild(peg);
	}
	game.start();

}