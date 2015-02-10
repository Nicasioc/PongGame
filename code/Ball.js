function Ball () {

	this.actor = new createjs.Bitmap("img/ball.png");

	this.initialize = function() {
	    this.actor.setBounds( 0, 0, BALL_SIZE, BALL_SIZE);
	    this.actor.regX = BALL_SIZE/2;
	    this.actor.regY = BALL_SIZE/2;
	    this.resetPosition();
	};

	this.update = function () {
	    //ball collision
	    this.actor.y += BALL_SPEED_Y;
	    this.actor.x += BALL_SPEED_X;


	    //floor and roof collission
	    if ( this.actor.y-this.actor.getBounds().height/2 < 0 || this.actor.y + this.actor.getBounds().height/2 > stage.getBounds().height ) {
	    	if (this.actor.y<0) {
	    		this.actor.y = 0 + this.actor.getBounds().height/2 + 1
	    	} 
	    	if( this.actor.y>stage.getBounds().height ) {
	    		this.actor.y = stage.getBounds().height - this.actor.getBounds().height/2 - 1
	    	};
	        
	        BALL_SPEED_Y = BALL_SPEED_Y*-1;
	        
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
	    }

	    //goals collisions
	    if ( this.actor.x < 0 || this.actor.x + BALL_SIZE > stage.getBounds().width ) {
	        BALL_SPEED_X *= -1;
	        if(this.actor.x < 0) {
	            updateScore( player2 );
	        } else {
	            updateScore( player1 );
	        }
        	createjs.Sound.play("ballGoal");
	        this.resetPosition();
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

	};

	this.resetPosition = function() {
	    this.actor.x = stage.getBounds().width/2;
	    this.actor.y = stage.getBounds().height/2;
	    BALL_SPEED_Y = BALL_SPEED;
		BALL_SPEED_X = BALL_SPEED;
	    if (Math.random()*10 < 5 ) {
	    	BALL_SPEED_X*=-1
	    } else {
	    	BALL_SPEED_Y*=-1	    	
	    };
	    stage.update();
	}

}






