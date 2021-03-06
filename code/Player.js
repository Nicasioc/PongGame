/**
 * [Player description]
 * @param {string} name  name to display on hud
 * @param {string} domId id to identify the actor
 * @param {string} image url for image
 * @param {string} side  wich side wil be placed right/left
 */
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

	this.move = function() {
		//TODO: Si existe phantom ball tiene que seguir a esa y no a la ball comun
		if ( ball.hasPhantom ) {
			if ( this.pad.y > ball.phantom.y ) {
					this.update("up");
				} else {
					this.update();
			}
		} else {
			if ( ball.actor.x < stage.getBounds().width/3 ) {
				if ( this.pad.y > ball.actor.y ) {
						this.update("up");
					} else {
						this.update();
				}
			}
		}
	}

    this.resetPostion();
}