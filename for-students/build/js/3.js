var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

enchant();
window.onload = function() {
    //create game object
    var game = new Core(320, 320);
    game.fps = 16;
    game.scale = 1;

    //load images
    game.preload('http://enchantjs.com/assets/images/chara1.gif',
        'http://enchantjs.com/assets/images/map0.gif');

    //called when the loading is complete
    game.onload = function() {
        //create the background
        var bg = new Sprite(320, 320);
        bg.backgroundColor = "rgb(0, 200, 255)";
        var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(320, 320);
        for (var i = 0; i < 320; i += 16) {
            image.draw(maptip, 3 * 16, 0, 16, 16, i, 320 - 16, 16, 16);
        }
        bg.image = image;
        game.rootScene.addChild(bg);
        
        //The d-pad should be created below this line
		var pad = new Pad();
		pad.x = 0;
		pad.y = 220;
		game.rootScene.addChild(pad);
		
        //create bear
        var bear = new Sprite(32, 32);
        bear.image  = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
        bear.x      = 160 - 16;
        bear.y      = 320 - 16 - 32;
        bear.status = STATUS_WAIT;
        bear.anim   = [10, 11, 10, 12];
        bear.frame  = 10;
        game.rootScene.addChild(bear);
        
        //frame loop for the bear
        bear.addEventListener(Event.ENTER_FRAME, function() {
            //up
            if (bear.status != STATUS_JUMP) {
                bear.status = STATUS_WAIT;
                if (game.input.up) {
                    bear.status = STATUS_JUMP;
                    bear.age = 0;
                }
            }
            //left
            if (game.input.left) {
                bear.x -= 3;
                bear.scaleX = -1;
                if (bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
            }

            //right
            else if (game.input.right) { 
                bear.x += 3;
                bear.scaleX = 1;
                if (bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
            }

            //when jumping
            if (bear.status == STATUS_JUMP) {
                if (bear.age < 8) {
                    bear.y -= 8;
                } else if (bear.age < 16) {
                    bear.y += 8;
                } else {
                    bear.status = STATUS_WAIT;
                }
            }

            //frame setting
            if (bear.status == STATUS_WAIT) {
                bear.frame = bear.anim[0];            
            } else if (bear.status == STATUS_WALK) {
                bear.frame = bear.anim[bear.age % 4];            
            } else if (bear.status == STATUS_JUMP) {
                bear.frame = bear.anim[1];            
            }

            //go back and fortb
            if(bear.scaleX == 1){
            bear.frame = [1,1,1,1,1,2,2,2,2];
                bear.x +=8;
                if(bear.x == 320 -32){
                    bear.scaleX = -1;
                }
            } else {
                bear.x -=8;
                if(bear.x === 0){
                    bear.scaleX = 1;
                }

            }
        });

    };
    
    //start game
    game.start();
};


