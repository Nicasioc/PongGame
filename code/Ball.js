function Ball (BALL_SPEED, BALL_SIZE) {
	var _BALL_SPEED = BALL_SPEED;
	var _BALL_SIZE = BALL_SIZE;
	var self = this;
	this.ballSpeedX = BALL_SPEED;
	this.ballSpeedY = BALL_SPEED;
	this.actor = new createjs.Bitmap("img/ball.png");

	this.setPosition = function(x,y) {
		this.actor.x = x;
	    this.actor.y = y;
	};

	this.updatePosition = function () {
	    this.actor.y += this.ballSpeedY;
	    this.actor.x += this.ballSpeedX;
	};

	this.setSpeed = function(speedX, speedY) {
		this.ballSpeedY;
		this.ballSpeedX;
	};

	this.randomizeDirection = function() {
		if (Math.random()*10 < 5 ) {
	    	this.ballSpeedX*=-1
	    } else {
	    	this.ballSpeedY*=-1	    	
	    };
	};

	this.resetPosition = function() {
		self.setPosition( stage.getBounds().width/2, stage.getBounds().height/2 );
		self.setSpeed( _BALL_SPEED );
		self.randomizeDirection();
	    stage.update();
	}

	this.initialize = function() {
	    this.actor.setBounds( 0, 0, _BALL_SIZE, _BALL_SIZE);
	    this.actor.regX = _BALL_SIZE/2;
	    this.actor.regY = _BALL_SIZE/2;
	    this.resetPosition();
	};

}






