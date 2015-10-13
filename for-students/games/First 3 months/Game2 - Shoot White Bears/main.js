enchant();

Bear = enchant.Class.create(Sprite, { //bear class creation
    initialize: function(){ //prepare our bear class
        var game = enchant.Game.instance; //enable us to use game assets
        Sprite.call(this, 32, 32); //size of the bear
        this.image = game.assets['chara1.png']; //bear image to use
    }
});

Player = enchant.Class.create(Bear, { //create player class
    initialize: function(){ //prepare player class
        Bear.call(this); //call bear class to use its properties
        this.frame = 0; //assign image frame for our bear
    }, //put comma "," whenever to add another property or method to a class
    onenterframe: function(){ //Player new method
        if(this.age % 15 == 0){ //time delay for the bulet to be fired
            var bullet = new Bullet(this.x + 10,  //x-axis distance from the bear
                                    this.y - 15); //y-axis distance from the bear
            this.scene.addChild(bullet); //add bullet to game screen.
        }

    }
});

Enemy = enchant.Class.create(Bear, { //create Enemy subclass of Bear class
    initialize: function(){ //prepare enemy class
        Bear.call(this, 32, 32); //call Bear class
        this.frame = 5; //enemy image frame to use
        this.y = -32; //distance from top (y-axis)
        this.x = Math.random() * 288; //distance from the left (x-axis)
        this.addEventListener('enterframe', function(){ //add event
            this.y +=1; //increase distance from the top (y-axis)
        });
    }
});

SineEnemy = enchant.Class.create(Enemy, { //create SineEnemy subclass of Enemy
    initialize: function() {
        Enemy.call(this); //call Enemy class
        this.addEventListener('enterframe', function() { //add event
            this.x += Math.sin(this.age / 20); //calculate sway motion (x-axis)
        });
    }
});

Bullet = enchant.Class.create(Sprite, { //create bullet class
    initialize: function(x,y){ //prepare bullet class
    var game = enchant.Game.instance; //use game assets
        Sprite.call(this, 16, 16); //call sprite class and set size
        this.image = game.assets['icon0.png']; //image to use
        this.frame = 48; //frame image to use 
        this.x = x; //position for the left (x-axis)
        this.y = y; //position from top (y-axis)
        this.addEventListener('enterframe', function(){ //add event
            this.y -=2; //decrease distance from to top by 2 every frame event
        });
    }
});

window.onload = function(){ //load window object
    game = new Game(320, 320); //game screen 320 x 320
    game.preload('chara1.png','icon0.png','background.jpg'); //game assets
    game.scale = 1; //scale game screen fit to its specified screen size
    game.onload = function(){ //load game
               
        player = new Player(); //call Player class, 
            player.x = 200; //distance from left (x-axis)
            player.y = 250; //distance from top (y-axis)
            
        info = new Label('Score: '); //create score text
            info.x = 10; //distance from the left (x-axis)
            info.y = 30; //distance from the top (y-axis)
            
        game.score = 0; //initial game score value
                  
        touchX = 150; //new initial bear position from the left (x-axis)
        touchY = 250; //new initial bear position from top (y-axis)
        game.rootScene.addEventListener('touchstart', function(e){
            touchX = e.x; //starting value of the distance form the left (x-axis)
            touchY = e.y;//starting value of the distance from top (y-axis)
        });
        
        game.rootScene.addEventListener('touchmove', function(e){
            touchX = e.x; //current value of the distance form the left (x-axis)
            touchY = e.y; //current value of the distance from top (y-axis)
        });
        
        player.addEventListener('enterframe', function(){ //add event to player
            this.x += (touchX - this.x - 10) / 10; //new bear position (x-axis)
            this.y += (touchY - this.y - 10) / 10; //new bear positin (y-axis)
        });
        
        game.rootScene.addEventListener('enterframe', function(){ //add event
            if(game.frame % 40 == 0){ //specific time for the enemy to appear
                this.addChild(new (Math.random() > 0.5 ? Enemy : SineEnemy)());
                    //application of sway motion game feature
            }
            
            var set = Bullet.intersect(Enemy); //intersect detection
            for(var i = 0, l = set.length; i < l; i++){ //check every enemy in contact with bullet
                if(Bullet.intersect(Enemy)){ //detect collision
                    game.score++; //increase game score by 1
                    info.text = 'Score: ' + game.score; //display score
                }
               
                set[i][0].remove(); //remove enemy if in contact
                set[i][1].remove();
            }
            
            var set2 = Player.intersect(Enemy); //count intersect probability
            for(var ii = 0, ll = set2.length; ii < ll; ii++){ //check every enemy in contact with bullet
                if(Player.intersect(Enemy)){ //condition if player collide with enemy
                    player.frame = 5; //frame to use
                    game.end(); //game over
                }
            }
        });
        
        bg = new Sprite(320, 320); //create background surface 320 x 320
        bg.image = game.assets['background.jpg']; //background image to use
       
        game.rootScene.addChild(bg); 
        game.rootScene.addChild(player); 
        
        title = new Label('Shoot White Bears'); //create new label for Title
        title.x = 90; //distance from the left (x-axis)
        title.y = 10; //distance from the top (y-axis)
        title.font = "16px sans-serif"; //text style
                
        game.rootScene.addChild(title); 
        game.rootScene.addChild(info);

        
        
        
    }
    game.start(); //start the game
}

