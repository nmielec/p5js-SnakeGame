SnakeGame = function(boardW, boardH) {
	this.boardW = boardW || 15;
	this.boardH = boardH || 15;

	this.score;
	this.snake;
	this.food;

	this.ended = false;

	this.init = function() {
		this.ended = false;
		this.score = 0;
		this.snake = new Snake(floor(this.boardW/2), floor(this.boardH/2));
		this.food = this.generateFood();
		this.setFrameRate();
	};

	this.update = function()
	{
		if(!this.ended) {
			this.snake.update();

			if(this.isSnakeOnFood()){
				this.score++;
				this.snake.eat();
				this.food = this.generateFood();
				this.setFrameRate();
			}
		}
	};

	this.draw = function(scl){

		fill(245, 215, 110); 
		noStroke();
		rect(0, 0, this.boardW*scl, this.boardH*scl);

		this.food.draw(scl);
		this.snake.draw(scl);

		fill(247, 202, 24);
		rect(0, this.boardH*scl, this.boardW*scl, 1.4*scl);
		fill(108, 122, 137);
		textSize(scl);
		textFont("Segoe UI");
		text("Score : " + this.score, 0, (this.boardH+1)*scl, this.boardW*scl);

		// text("Speed : " + ecil(frameRate()), (this.boardW/2)*scl, (this.boardH+1)*scl);
		if(this.ended)
			text("Space to reset", (this.boardW/2)*scl, (this.boardH+1)*scl);
	};

	this.generateFood = function() {
		var noSnakeThere = true;
		do {
			x = floor(random(this.boardW));
			y = floor(random(this.boardH));
			if(this.snake)
				noSnakeThere = !this.snake.isThere(x,y);
		} while (!noSnakeThere);
		return new Food(x,y);
	};

	this.checkEnd = function() {
		this.ended = this.snake.bitItself || this.isSnakeOut();
		return this.ended;
	};

	this.isSnakeOnFood = function() {
		if(this.snake.x === this.food.x &&
			this.snake.y === this.food.y)
			return true;
		return false;
	}

	this.isSnakeOut = function() {
		var x = this.snake.x;
		var y = this.snake.y;
		if( x > this.boardW-1 || 
			y > this.boardH-1 || 
			x < 0 || 
			y < 0 )
		{
			return true;
		}
		return false;
	}

	this.keyPressed = function(kCode) {
		// Moving the snake
		if (kCode == LEFT_ARROW) {
			this.snake.moveLeft();
		}
		if (kCode == RIGHT_ARROW) {
			this.snake.moveRight();
		}
		if (kCode == UP_ARROW) {
			this.snake.moveUp();
		}
		if (kCode == DOWN_ARROW) {
			this.snake.moveDown();
		}

		// Reseting the game - 32 = SPACEBAR
		if(kCode == 32){ 
			this.init();
		}
	}

	this.setFrameRate = function(){
		// Ramp, Plateau, Ramp, Plateau
		var S1 = 20, S2 = 50, S3 = 100;
		var FR1 = 4, FR2 = 10, FR3 = 17;
		var slope1 = (FR2-FR1)/S1, slope2 = (FR3-FR2)/(S3-S2);
		fr = FR3;
		if(this.score < S3)
			fr = FR2 + slope2*this.score;
		if(this.score < S2)
			fr = FR1 + slope1*this.score;

		frameRate(fr);
	}


	this.init();
}


Food = function(x, y) {
	this.x = x;
	this.y = y;

	this.draw = function(scl) {
		noStroke();
		fill(22, 160, 133);
		ellipse(this.x*scl+scl/2, this.y*scl+scl/2, 0.8*scl);
	}
}

