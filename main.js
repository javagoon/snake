var c,ctx;
var xspeed = 6, yspeed = 6;
var xdir= xspeed, ydir=0;

var snake;
var snakeBody = [];   // will contain snake objects
var pillX,pillY;

var states = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN:3
};
var dir = states.RIGHT;
var keys = { RIGHT:39, LEFT:37, UP:38, DOWN:40};

var snakeEC6;

function Snake(x, y) {
	  var col = getRandomColor();
	  this.x=x; this.y=y;
	  this.draw = function() {
		  ctx.beginPath();
	      ctx.arc(this.x, this.y, 16, 0, 2 * Math.PI, false);
	      ctx.fillStyle = col;
      	  ctx.fill();
 	  },
	  this.update = function() {
	  	if(this.x <=0)
	  		this.x = c.width;
	  	if(this.x > c.width)
	  		this.x=0;
	  	if(this.y <=0)
	  		this.y = c.height;
	  	if(this.y > c.height)
	  		this.y = 0;
	  	this.x+=xdir;
	  	this.y+=ydir;
	  }
}

// Get random position of next pill drop
function dropPill() {
	pillX = Math.floor((Math.random() * c.width));
	pillY = Math.floor((Math.random() * c.height));
}

function getRandomColor(){
	var color =  "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
 	return color;
}

function gameLoop() {
	requestAnimationFrame(gameLoop);

	ctx.fillStyle = "green";
	ctx.clearRect(0,0,c.width, c.height);
	//ctx.fillRect(0,0,800,800);
	
	// Draw pill
	ctx.fillRect(pillX,pillY,30,30);

	snakeBody[0].update();   // update head of snake

	for(var i=snakeBody.length-1; i>0;i--)
	{
		snakeBody[i].x = snakeBody[i-1].x;
		snakeBody[i].y = snakeBody[i-1].y;
	}
	for(var i=0; i<snakeBody.length;i++)  // draw all bodies of snake
		snakeBody[i].draw();	

// EC6 stuff
	snakeEC6.draw(ctx);
}

function addBody(x,y) {	
	var tail = snakeBody.length-1;    // get last body	
	var xx = snakeBody[tail].x;
	var yy = snakeBody[tail].y;
	snake = new Snake(xx+x, yy+y);
	snakeBody.push(snake);
}

function keyPush(evt) {
	switch(evt.keyCode) {
		case keys.LEFT: // moving left
			if(dir != states.RIGHT) {
				xdir=-xspeed;
				ydir=0;
				dir = states.LEFT;
			}
			break;
		case keys.RIGHT: // moving right
			if(dir != states.LEFT) {
				xdir=xspeed;
				ydir=0;
				dir = states.RIGHT;
			}
			break;
		case keys.UP:  // moving up
			if(dir != states.DOWN) {
				ydir=-yspeed;
				xdir=0;
				dir = states.UP;
			}
			break;
		case keys.DOWN: // moving down
			if(dir != states.UP) {
				ydir=yspeed;
				xdir=0;
				dir = states.DOWN;
			}
			break;
		case 65:			
			break;	
	}
}

function initGame() {
	snake = new Snake(300,100);
	snakeBody.push(snake);
	for( i = 0; i<100; i++)
		addBody(-50,0);
	
	c = document.getElementById("myCanvas");
	ctx = c.getContext('2d');

	document.addEventListener("keydown",keyPush);
	dropPill();
	setInterval('dropPill()', 5000);

	// EC6 stuff
	snakeEC6 = new SnakeEC6(20,200);

	gameLoop();
}

// New EC6 stuff
class SnakeEC6{
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	draw(ctx) {
		 ctx.beginPath();
	     ctx.arc(this.x, this.y, 16, 0, 2 * Math.PI, false);
	     ctx.fillStyle = 'white';
      	 ctx.fill();
      	 this.update();
	}
	update() {
		this.x++;
	}
}