Player.prototype.move = function() {

	if ( ball.actor.x < stage.getBounds().width/2 ) {
		if ( this.pad.y > ball.actor.y ) {
				this.update("up");
			} else {
				this.update();
		}
	} 
};