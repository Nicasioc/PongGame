function Ball (BALL_SPEED, _BALL_SIZE) {
	var _BALL_SPEED = BALL_SPEED;
	var _BALL_SIZE = BALL_SIZE;
	this.ballSpeedX = BALL_SPEED;
	this.ballSpeedY = BALL_SPEED;
	this.actor = new createjs.Bitmap("img/ball.png");

	this.initialize = function() {
	    this.actor.setBounds( 0, 0, _BALL_SIZE, _BALL_SIZE);
	    this.actor.regX = _BALL_SIZE/2;
	    this.actor.regY = _BALL_SIZE/2;
	    this.resetPosition();
	};

	this.update = function () {
	    //ball collision
	    this.actor.y += this.ballSpeedY;
	    this.actor.x += this.ballSpeedX;
	};

	this.resetPosition = function() {
	    this.actor.x = stage.getBounds().width/2;
	    this.actor.y = stage.getBounds().height/2;
	    this.ballSpeedY = _BALL_SPEED;
		this.ballSpeedX = _BALL_SPEED;
	    if (Math.random()*10 < 5 ) {
	    	this.ballSpeedX*=-1
	    } else {
	    	this.ballSpeedY*=-1	    	
	    };
	    stage.update();
	}

}






