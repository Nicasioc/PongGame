var keys = [],player1,player2,ball,stage,playBot, player1Name, player2Name;

function init() {
    var canvas  = document.getElementById("pong");
    var gameContainer  = document.getElementById("gameContainer");
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    gameContainer.style.height = CANVAS_HEIGHT+"px";
    gameContainer.style.width = CANVAS_WIDTH+"px";
    stage = new createjs.Stage("pong");
    stage.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    createjs.Ticker.setFPS(60)

    player1 = new Player( player1Name||"Player 1" ,PLAYER1_ID, PLAYER1_IMAGE);
    player2 = new Player( player2Name||"Player 2" ,PLAYER2_ID, PLAYER2_IMAGE, "right");
    ball = new Ball();

    //sound
    createjs.Sound.registerSound("snd/pipe.mp3", "ballImpact", 3);
    createjs.Sound.registerSound("snd/coin.mp3", "ballGoal", 3);
    createjs.Sound.registerSound("snd/gameover.mp3", "gameOver", 3);

    /*
     * ACTORS
     */

    //Players
    player1.initialize();
    player2.initialize();
    //ball
    ball.initialize();

    /* Add actors */
    stage.addChild(player1.pad);
    stage.addChild(player2.pad);
    stage.addChild(ball.actor);

    /*
        EVENT LISTENER
    */
    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
        if ( e.keyCode == 80 ) {
            createjs.Ticker.paused = !createjs.Ticker.paused; 
        }
    });

    createjs.Ticker.addEventListener("tick", loop );

    //start paused
    createjs.Ticker.paused = true;

    //Refresh canvas
    stage.update();

}

function loop(event) {

    if(!event.paused) {

        if( keys[KEYCODE_P1_UP] ) { 
            player1.update("up");
        }
        if( keys[KEYCODE_P1_DOWN] ) { 
            player1.update("down"); 
        }
        if (!playBot) { 
            if( keys[KEYCODE_P2_UP] ) { 
                player2.update("up");
            }
            if( keys[KEYCODE_P2_DOWN] ) { 
                player2.update("down"); 
            } 
        } else {
            player2.move();
        }

        ball.update();
        stage.update();
    }
}

init();