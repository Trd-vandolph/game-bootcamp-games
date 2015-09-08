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
enchant();

window.onload = function(game){
    game = new Core(320, 320);
    game.preload('../images/chara1.png');
    game.scale = 1;
    game.onload = function(){
        bear = new Sprite(32, 32);
        bear.image = game.assets['../images/chara1.png'];
        bear.frame = 4;
        bear.addEventListener(Event.ENTER_FRAME, function(){
            this.x += 3;
        });
        game.rootScene.addChild(bear);
        
    }
    game.start();
}