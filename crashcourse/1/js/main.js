// Call enchant.js
enchant();

window.onload = function()
{
	game = new Game(320, 480);
	game.scale = 1;
	game.onload = function()
	{
		hello = new Label('Hello Van');
		hello.x = 10;
		hello.y = 30;
		game.rootScene.addChild(hello);
	}
	game.start();
}
