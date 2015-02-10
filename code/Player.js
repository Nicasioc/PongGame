var Player = function(name, domId, image, side) {
    this.score = 0;
    this.name = name;
    this.id = domId;
    this.padVelocity = PAD_VELOCITY;
    this.pad = new createjs.Bitmap( image );
    this.pad.setBounds(0, 0, PAD_SIZE.width, PAD_SIZE.height);
    
    this.pad.regX = PAD_SIZE.width/2;
    this.pad.regY = PAD_SIZE.height/2;
    
    this.initialize = function () {
       	if( side == "right" ) {
		    this.pad.x = 20;
    	} else {
		    this.pad.x = stage.canvas.width - 20;
    	}
    };

    this.update = function (direction) {
	    if( direction === "up" ) {
	        this.pad.y -= this.padVelocity; 
	        if ( this.pad.y - PAD_SIZE.height/2 <= 0 ) {
	            this.pad.y = 0 + PAD_SIZE.height/2;
	        } 
	    } else {
	        this.pad.y += this.padVelocity; 
	        if ( this.pad.y+this.pad.getBounds().height/2 >= stage.getBounds().height  ) {
	            this.pad.y = stage.getBounds().height-this.pad.getBounds().height/2;
	        } 
	    }
	};

	this.resetPostion = function() {
		this.pad.y = stage.canvas.height/2;
	}

    this.resetPostion();
}