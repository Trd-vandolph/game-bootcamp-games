
//set character status
var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

enchant();

window.onload = function(){
    var game = new Core(320, 320);
        game.fps = 16;
        game.scale = 1;

        game.preload('chara1.png','map0.png');

        game.onload = function(){
            bear = new Sprite(32, 32);
            bear.image = game.assets['chara1.png'];
            bear.x = 160;
            bear.y = 250;
            bear.status = STATUS_WAIT;
            bear.anim   = [10, 11, 10, 12];
            bear.frame = 10;

            game.rootScene.addChild(bear);


            //set directions

        bear.addEventListener(Event.ENTER_FRAME, function(){
                //waiting & upward 
                if(bear.status != STATUS_JUMP){
                    bear.status = STATUS_WAIT;
                    if(game.input.up){
                        bear.status = STATUS_JUMP;
                        bear.age = 0;                   
                    }
                }
                //jumping
                if(bear.status == STATUS_JUMP){
                    if(bear.age < 8){
                        bear.y -= 8;
                    }else if(bear.age < 16){
                        bear.y += 8;
                    }else {
                        bear.status = STATUS_WAIT;
                    }
                }

                //leftward
                if(game.input.left){
                    bear.x -= 3;
                    bear.scaleX = -1;
                    if(bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
                }

                //righward
                if(game.input.right){
                    bear.x += 3;
                    bear.scaleX = 1;
                    if(bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
                }

                 //frame setting
                if (bear.status == STATUS_WAIT) {
                    bear.frame = bear.anim[0];            
                } else if (bear.status == STATUS_WALK) {
                    bear.frame = bear.anim[bear.age % 4];            
                } else if (bear.status == STATUS_JUMP) {
                    bear.frame = bear.anim[1];            
                }


            });

            pad = new Pad();
                pad.x = 0;
                pad.y = 220;

            game.rootScene.addChild(pad);


        }
        game.start();
}