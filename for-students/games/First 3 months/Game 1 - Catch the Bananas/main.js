enchant();

window.onload = function() {
    game = new Game(320, 320);
    game.fps = 24;
    game.scale = 1;
    game.preload(['chara1.gif','icon0.gif','bg.png']);
    //プリロードする画像を相対パスで指定
    // Specifies the image to be pre-loaded with a relative path

    game.onload = function() {
    // プリロード終了後に呼ばれる関数を指定する
    // Specify a function to be called after the preload end

        // ここから、クマのキャラクターを表示する処理
        // From here, processing for displaying the character of the bear
        bear = new Sprite(32, 32);  // 32x32サイズの Sprite オブジェクトを生成 //  generating a Sprite object of 32x32 size
        bear.x = 0;                 // Sprite の左上のx座標を指定 // Specify the upper left corner of the x-coordinate of the Sprite
        bear.y = 218;               // Sprite の左上のy座標を指定 // Specify the upper left of the y-coordinate of the Sprite

        score = new Label(); //adding scores variable
        miss = new Label(); //adding missed banana variable
        miss.y = 15;

        bear.image = game.assets['chara1.gif']; // 画像を指定 // Specify the image
        bear.frame = 0;
        // 「chara1.gif」を32x32の格子で切り取ったのち、0番目(=左上)のものを用いる
        // After cut "chara1.gif" in a grid of 32x32, to use one of the 0-th (= upper left)
        // ゲーム中に frame の値を操作することで、アニメーションを表現できる
        // By manipulating the values ​​of the frame during the game, it is possible to represent animation

        background = new Sprite(320, 320);  // 320x320 サイズの Sprite オブジェクトを生成 // generating a Sprite object of 320x320 size
        background.x = background.y = 0;    // Sprite の左上の x, y 座標を指定 // Sprite in the upper left of x, to specify the y-coordinate
        background.image = game.assets['bg.png'] // bg.png を指定 // bg.png

        // タッチしたときにクマを移動させる
        // Move the bear when you touch
        game.rootScene.addEventListener('touchstart', function(e){
            bear.x = e.localX
        });

        // タッチ座標が動いたときにクマを移動させる
         // I move the bear when the touch coordinates is moved
        game.rootScene.addEventListener('touchmove', function(e){
            bear.x = e.localX
        });

        game.score = 0;
        game.miss = 0;

        score.text = 'Score: ' + game.score;
        miss.text = 'Missed Banana\'s: ' + game.miss;

        game.rootScene.addEventListener('enterframe',function(){
            if(game.frame % 6 == 0){
                // 6フレームごとにバナナを増やす関数を実行
                // Run the function to increase the banana every six frames
                addBanana();
            }
            if(game.miss == 20){
                game.end(game.score, game.score + " 本のバナナを取りました!");
                // 結果を表示 (スコア, 結果のテキストの順で)
                // Display the results (score, in the order of the results of text)
            }
        });

        game.rootScene.addChild(background);
        game.rootScene.addChild(bear);
        game.rootScene.addChild(score);
        game.rootScene.addChild(miss);

    }
    game.start();
    // プリロードをスタート
    // To start a preload
}

// バナナを増やす関数 (6フレームごとに呼ばれる)
// Function to increase the banana (called every six frames)
function addBanana(pos){

    var banana = new Sprite(16, 16);    // Spriteを生成 // generate sprites
    banana.x = rand(320);               // 0 から 319 のあいだの乱数 // random numbers between the  0-319
    banana.y = 0;
    banana.image = game.assets['icon0.gif'];

    banana.frame = 16;
    // icon0.gif を 16x16 サイズの格子に区切ったとき、左上を 0番目として数えて
    // When you separated icon0.gif to grid of 16x16 size, by counting the upper left as 0th
    // 16番目にある画像 (バナナ) を指定
    // Specify the image (banana) on the 16th

    banana.addEventListener('enterframe', function(e) {
        if(this.intersect(bear)){       // bearとの当たり判定 //hit determination of the bear
            game.rootScene.removeChild(this); // 画面から消去 // erased from the screen
            game.score ++;                    // スコアを加算 // and adding the score
            score.text = 'Score: ' + game.score; // counting the score
        }else{
          if(this.y <= 300){
            this.y += 3;                // y座標を増やす (落下) // y coordinates (falling)
            if(this.y == 300){
              game.miss ++;             // スコアを加算 // and adding the missed banana's
              miss.text = 'Missed Banana\'s: ' + game.miss; // counting the missed banana's
            }
          }
        }

    });
    game.rootScene.addChild(banana);
    // バナナを画面に追加
    // Add the bananas to the screen
}

// 引数 num を受け取って、0 から (num - 1) までの乱数を返す関数
// Receives arguments num, from 0 (num - 1) function that returns a random number up to
function rand(num){
    return Math.floor(Math.random() * num);
}
