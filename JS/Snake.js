Snake = function(x, y){

	this.x = x || 0;
	this.y = y || 0;

	this.xVel = 0;
	this.yVel = 1;

	this.length = 0;

	this.prevX = [];
	this.prevY = [];

	this.bitItself = false;

	this.update = function() {
		this.bitItself = false;
		for(var i = 0; i < this.length-1; i++){
			if(this.x +this.xVel === this.prevX[i] && 
				this.y +this.yVel=== this.prevY[i]) {

				this.bitItself = true;
			}

		}

		if( this.length > 0 )
		{
			for(var i = this.length-1; i >= 0 ; i--)
			{
				this.prevX[i+1] = this.prevX[i];
				this.prevY[i+1] = this.prevY[i];
			}
			this.prevX[0] = this.x;
			this.prevY[0] = this.y;
		}

		this.x += this.xVel;
		this.y += this.yVel;
	};

	this.draw = function(scl) {

		noStroke();
		fill(217, 30, 24);
		rect(this.x*scl, this.y*scl, scl, scl);
		for(var i = 0; i < this.length; i++){
			if(i%2 == 0)
				fill(108, 122, 137);
			else
				fill(217, 30, 24);
			rect(this.prevX[i]*scl+0.1*scl, this.prevY[i]*scl+0.1*scl, 0.8*scl, 0.8*scl);
		}
	};

	this.isThere = function(x, y) {
		if(this.x === x && this.y === y)
			return true;
		for(var i = 0; i < this.length ; i++)
			if(this.prevX[i] === x && this.prevY[i] == y)
				return true;
		return false;
	};

	this.eat = function() {
		this.length++;
	};

	this.moveUp = function() {
		if(this.yVel !== +1 || this.length === 0){
			this.xVel = 0;
			this.yVel = -1;
		}
	};
	this.moveDown = function() {
		if(this.yVel !== -1 || this.length === 0){
			this.xVel = 0;
			this.yVel = +1;
		}
	};
	this.moveLeft = function() {
		if(this.xVel !== +1 || this.length === 0){
			this.xVel = -1;
			this.yVel = 0;
		}
	};
	this.moveRight = function() {
		if(this.xVel !== -1 || this.length === 0){
			this.xVel = +1;
			this.yVel = 0;
		}
	};



}
