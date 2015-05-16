var keys = [],player1,player2,ball,stage,playBot, player1Name, player2Name;

function init() {

    //DOM stuff
    var canvas  = document.getElementById("pong");
    var gameContainer  = document.getElementById("gameContainer");

    //game
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    gameContainer.style.height = CANVAS_HEIGHT+"px";
    gameContainer.style.width = CANVAS_WIDTH+"px";
    stage = new createjs.Stage("pong");
    stage.setBounds(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    createjs.Ticker.setFPS(60)

    //Load sound
    createjs.Sound.registerSound("snd/pipe.mp3", "ballImpact", 3);
    createjs.Sound.registerSound("snd/coin.mp3", "ballGoal", 3);
    createjs.Sound.registerSound("snd/gameover.mp3", "gameOver", 3);

    /*
     * ACTORS
     */

    //actors
    players = [];
    players.push( new Player( player1Name||"Player 1" ,PLAYER1_ID, PLAYER1_IMAGE) );
    players.push( new Player( player2Name||"Player 2" ,PLAYER2_ID, PLAYER2_IMAGE, "right") );
    ball = new Ball(6, 10);


    //Players
    players[0].initialize();
    players[1].initialize();
    //ball
    ball.initialize();

    /* Add actors */
    stage.addChild(players[0].pad);
    stage.addChild(players[1].pad);
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
            players[0].update("up");
        }
        if( keys[KEYCODE_P1_DOWN] ) {
            players[0].update("down");
        }
        if (!playBot) {
            if( keys[KEYCODE_P2_UP] ) {
                players[1].update("up");
            }
            if( keys[KEYCODE_P2_DOWN] ) {
                players[1].update("down");
            }
        } else {
            players[1].move();
        }

        ball.updatePosition();
        stage.update();


        /* COLISIONS - start */
        //ball floor and roof collission
        if ( ball.actor.y-ball.actor.getBounds().height/2 < 0 || ball.actor.y + ball.actor.getBounds().height/2 > stage.getBounds().height ) {
            if (ball.actor.y<0) {
                ball.actor.y = 0 + ball.actor.getBounds().height/2 + 1
            }
            if( ball.actor.y>stage.getBounds().height ) {
                ball.actor.y = stage.getBounds().height - ball.actor.getBounds().height/2 - 1
            };

            ball.ballSpeedY *= -1;
        }
        //ball goals collisions
        if ( ball.actor.x < 0 || ball.actor.x + BALL_SIZE > stage.getBounds().width ) {

            BALL_SPEED_X *= -1;

            if(ball.actor.x < 0) {
                updateScore( players[1] );
            } else {
                updateScore( players[0] );
            }

            createjs.Sound.play("ballGoal");
            ball.resetPosition();

        }

        //destroy phantom when pases half screen
        if (ball.hasPhantom) {
            if (ball.phantom.x < stage.getBounds().width/2 ) {
                ball.destroyPhantom();
                stage.removeChild(ball.phantom);
            };
        };

        //pads collisions
        for (var i = 0; i < players.length; i++) {
            var padCollision = ndgmr.checkRectCollision(players[i].pad,ball.actor);
            if( padCollision ) {

                ball.ballSpeedX *=-1;

                if ( ball.actor.y < players[i].pad.y && ball.actor.y > players[i].pad.y - players[i].pad.getBounds().height/2  ) {
                    if (ball.ballSpeedY > 0 ) {
                        ball.ballSpeedY *=-1
                    };
                } else {
                    if (ball.ballSpeedY < 0 ) {
                        ball.ballSpeedY *=-1
                    };
                }
                // si toca player 1 crea phantom ball
                if ( players[i].id == "player1" ) {
                    ball.createPhantom();
                    stage.addChild(ball.phantom);
                }
            }
        };


        /* Phantom ball */
        //phantomBall.updatePosition();
        //@TODO: Si toca al both crear otra instancia de Ball con el doble de velocidad que desaparece al llegar a la mitad de la cancha.

        /* COLISIONS - end */

    }
}

init();