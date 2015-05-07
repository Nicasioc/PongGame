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
    ball = new Ball(3, 10);
    phantomBall = new Ball(10);

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
    stage.addChild(phantomBall.actor);

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
        phantomBall.update();
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

/*            
            if (BALL_SPEED_Y < 0) {
                BALL_SPEED_Y-=BALL_SPEED_MODIFIER
            } else {
                BALL_SPEED_Y+=BALL_SPEED_MODIFIER;
            }
            if (BALL_SPEED_X < 0) {
                BALL_SPEED_X-=BALL_SPEED_MODIFIER;
            } else {
                BALL_SPEED_X+=BALL_SPEED_MODIFIER;
            }
*/
        }

        //ball goals collisions
        if ( ball.actor.x < 0 || ball.actor.x + BALL_SIZE > stage.getBounds().width ) {
            BALL_SPEED_X *= -1;
            if(ball.actor.x < 0) {
                updateScore( player2 );
            } else {
                updateScore( player1 );
            }
            createjs.Sound.play("ballGoal");
            ball.resetPosition();
        }

        //pads collisions
        if ( this.actor.x+BALL_SIZE/2 > player1.pad.x - player1.pad.getBounds().width/2 )  {

            if( this.actor.y > player1.pad.y && this.actor.y < player1.pad.y+player1.pad.getBounds().height/2 ) {
                BALL_SPEED_Y = -BALL_SPEED_Y;
                if (BALL_SPEED_Y < 0 ) {
                    BALL_SPEED_Y *= -1;
                };
                BALL_SPEED_X *= -1;
                this.actor.x = this.actor.x+BALL_SIZE/2-player1.pad.getBounds().width/2 - 1
                createjs.Sound.play("ballImpact");
            }
            if( this.actor.y < player1.pad.y && this.actor.y > player1.pad.y-player1.pad.getBounds().height/2 ) {
                BALL_SPEED_Y = BALL_SPEED_Y;
                if (BALL_SPEED_Y > 0 ) {
                    BALL_SPEED_Y *= -1;
                };
                BALL_SPEED_X *= -1;
                this.actor.x = this.actor.x+BALL_SIZE/2-player1.pad.getBounds().width/2 - 1
                createjs.Sound.play("ballImpact");
            }
        };

        if ( this.actor.x-BALL_SIZE/2 < player2.pad.x + player2.pad.getBounds().width/2 )  {

            if( this.actor.y > player2.pad.y && this.actor.y < player2.pad.y+player2.pad.getBounds().height/2 ) {
                BALL_SPEED_Y = -BALL_SPEED_Y;
                if (BALL_SPEED_Y < 0 ) {
                    BALL_SPEED_Y *= -1;
                };
                BALL_SPEED_X *= -1;
                this.actor.x = this.actor.x+BALL_SIZE/2+player2.pad.getBounds().width/2 + 1
                createjs.Sound.play("ballImpact");
            }
            if( this.actor.y < player2.pad.y && this.actor.y > player2.pad.y-player2.pad.getBounds().height/2 ) {
                BALL_SPEED_Y = BALL_SPEED_Y;
                if (BALL_SPEED_Y > 0 ) {
                    BALL_SPEED_Y *= -1;
                };
                BALL_SPEED_X *= -1;
                this.actor.x = this.actor.x+BALL_SIZE/2+player2.pad.getBounds().width/2 + 1
                createjs.Sound.play("ballImpact");
            }
        };
        /* COLISIONS - end */


    }
}

init();