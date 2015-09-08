/************************************************************************************************
    Predefined Enchant.js Variables / Objects
    
    Event.A_BUTTON_DOWN - Event occurring when the a button is pressed core, scene
    Event.A_BUTTON_UP - Event occurring when the a button is releasedcore, scene
    Event.ADDED - Event occurring when a node is added to a groupnode
    Event.ADDED_TO_SCENE - Event occurring when a node is added to a scenenode
    Event.B_BUTTON_DOWN - Event occurring when the b button is pressedcore, scene
    Event.B_BUTTON_UP - Event occurring when the b button is releasedcore, scene
    Event.DOWN_BUTTON_DOWN - Event occurring when the down button is pressedcore, scene
    Event.DOWN_BUTTON_UP - Event occurring when the down button is releasedcore, scene
    Event.ENTER - Event occurring when a scene beginsscene
    Event.ENTER_FRAME - Event occurring when a new frame is being processedcore, scene
    Event.EXIT - Event occurring when the scene endsscene
    Event.EXIT_FRAME - Event occurring when frame processing is about to endcore
    Event.INPUT_CHANGE - Event occurring when a button input changescore, scene
    Event.INPUT_END -  Event occurring when a button input endscore, scene
    Event.INPUT_START - Event occurring when a button input beginscore, scene
    Event.LEFT_BUTTON_DOWN - Event occurring when the left button is pressedcore, scene
    Event.LEFT_BUTTON_UP - Event occurring when the left button is releasedcore, scene
    Event.LOAD - Event dispatched upon completion of game loadingcore
    Event.PROGRESS - Events occurring during game loadingcore
    Event.REMOVED -     Event occurring when a node is removed from a groupnode
    Event.REMOVED_FROM_SCENE - Event occurring when a node is removed from a scenenode
    Event.RENDER - Event occurring when an entity is renderedentity 
    Event.RIGHT_BUTTON_DOWN - Event occurring when the right button is pressedcore, scene
    Event.RIGHT_BUTTON_UP - Event occurring when the right button is releasedcore, scene
    Event.TOUCH_END - Event occurring when a touch related to the node has endednode
    Event.TOUCH_MOVE - Event occurring when a touch related to the node has movednode
    Event.TOUCH_START - Event occurring when a touch related to the node has begunnode
    Event.UP_BUTTON_DOWN - Event occurring when the Up button is pressedcore, scene
    Event.UP_BUTTON_UP - Event occurring when the Up button is releasedcore, scene

**************************************************************************************************/
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;

enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.preload('../images/chara0.png','../images/map0.png');
    game.scale = 1;
    game.onload = function(){
        var bg = new Sprite(320,320);
        var maptip = game.assets['../images/map0.png'];
        var image = new Surface(320,320);
        
    	var girl = new Sprite(32,32);
    	girl.image = game.assets['../images/chara0.png'];
    	girl.x = 160 - 16;
    	girl.y = 160 - 16;
    	girl.frame = 7;
    	girl.toX = girl.x;
    	girl.toY = girl.y;
    	girl.dir = DIR_DOWN;
    	girl.anim = [
    			15,16,17,15, //left
    			24,25,26,24, //right
    			33,34,35,33, //up
    			6,7,8,6 //down
    	];
    	gx = new Label('girl.x:' + girl.x);
    	gxx = new Label('girl.toX:' + girl.toX);
        gy = new Label('girl.y:' + girl.y);
        gyy = new Label('girl.toY:' + girl.toY);
    	gx.x = 124;
        gy.y = 5;
        gyy.y = 124;
    	girl.addEventListener(Event.ENTER_FRAME, function(){
    		if (girl.y > girl.toY){
    			girl.dir = DIR_UP;
    			if (Math.abs(girl.y - girl.toY) < 3){
    				girl.y = girl.toY;
    			} else {
    				girl.y -=3;
    			}
    		} else if (girl.y < girl.toY) { 
    			girl.dir = DIR_DOWN; 
    			if (Math.abs(girl.y - girl.toY) < 3) { 
    				girl.y = girl.toY; 
    			} else { 
    				girl.y += 3;
    			}
    		}
    		if (girl.x > girl.toX) { 
    			girl.dir = DIR_LEFT; 
    			if (Math.abs(girl.x - girl.toX) < 3) { 
    				girl.x = girl.toX; 
    			} else { 
    					girl.x -= 3; 
    			}
    		} else if (girl.x < girl.toX) { 
    			girl.dir = DIR_RIGHT; 
    			if (Math.abs(girl.x- girl.toX) < 3) { 
    				girl.x = girl.toX; 
    			} else { 
    				girl.x += 3; 
    			}
    		}
    		gx.text = 'girl.x:' + girl.x;
    		gxx.text = 'girl.toX:' + girl.toX;
            gy.text = 'girl.y:' + girl.y;
            gyy.text = 'girl.toY:' + girl.toY;

    		if (girl.x == girl.toX && girl.y == girl.toY){
    			girl.age = 1;
    		}
    		girl.frame = girl.anim[girl.dir * 4 + (girl.age % 4)];
    		

    	});
    		bg.addEventListener(Event.TOUCH_START, function(e){
    			girl.toX = e.x - 16;
    			girl.toY = e.y - 16;
    		});
    		bg.addEventListener(Event.TOUCH_MOVE, function(e){
    			girl.toX = e.x - 16;
    			girl.toY = e.y - 16;
    		});

        for(var j=1; j<320; j+=16){
            for(var i=1; i<320; i+=16){
                image.draw(maptip,0,0,16,16,i,j,16,16);
            }
        }
        bg.image = image;
        game.rootScene.addChild(bg);
        game.rootScene.addChild(girl);
        game.rootScene.addChild(gx);
        game.rootScene.addChild(gxx);
        
    }
    game.start();
    
}