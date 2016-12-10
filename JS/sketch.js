var scl = 25;

function setup() {
	createCanvas(600, 600);

	snakeGame = new SnakeGame(15, 15);

}

function draw() {

	snakeGame.checkEnd();
	snakeGame.update();
	snakeGame.draw(scl);
}


function keyPressed() {
	snakeGame.keyPressed(keyCode);
}

