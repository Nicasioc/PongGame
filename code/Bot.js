Player.prototype.move = function() {

	var a = this.pad.x - ball.actor.x;
	var b = this.pad.y - ball.actor.y;
	var distance = Math.sqrt( a*a + b*b );

	if ( distance < stage.getBounds().width/4 ) {
		if ( this.pad.y > ball.actor.y ) {
				this.update("up");
			} else {
				this.update();
		}		
	} 
};