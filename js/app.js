// Enemies our player must avoid
var Enemy = function(lane,speed) {

    this.locationX = -50;
    this.locationY = (lane)*90 + 50 ;
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.locationX += this.speed * dt

    //whenever the enemy reach the edge bring it back
    if (this.locationX >= 505)
    	this.locationX = 0;

    // this.locationX = (this.locationX == 505)? 0:this.locationX;
    // console.log(this.locationX);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locationX, this.locationY);
};

var Player = function(locationX,locationY) {
    this.locationX = locationX;
    this.locationY = locationY;
    // this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locationX, this.locationY);
};

// a handleInput() method.

Player.prototype.handleInput = function(pressedKey){
	if (pressedKey == 'up'){
		this.locationY-=90
		//console.log(this.locationX +","+this.locationY)
	// 	if(this.locationY <= 0){
	// 	setTimeout(function(){
	// 	finish(); // you won the game		
	// }
	// 	, 250);
	// 	this.locationX = 200;
	// 	this.locationY = 400;	
		
	// }
		this.checkBorders();
	}
	if (pressedKey == 'down'){
		this.locationY+=90
		this.checkBorders();
	} 
	if (pressedKey == 'left'){
		this.locationX-=100
		this.checkBorders();
	}
	if (pressedKey == 'right'){
		this.locationX+=100
		this.checkBorders();
	}  
}

Player.prototype.checkBorders = function(){
	if (this.locationY <= 0){
		this.reset();
		finish(); // you won the game
	}
	if (this.locationY > 400){
		this.locationY = 400;
	}
	if (this.locationX < 0){
		this.locationX = 0;
	}
	if (this.locationX > 400){
		this.locationX = 400;
	}
}

Player.prototype.reset = function(){
		this.locationX = 200;
		this.locationY = 400;
	}

 function finish(){
		alert("YOU WON!");
	}	



// Now instantiate your objects.
var player = new Player(200,400);

// Place all enemy objects in an array called allEnemies

var allEnemies = [];

var newEnemy = function(){
	var lane = Math.floor(Math.random() * 3) ;  // random lane
	var enemySpeed = 100* (Math.floor(Math.random() * 5) + 1); 
	var enemyX = [lane,enemySpeed];

	return  enemyX;
}

// create enmies
	for ( var i =0 ; i<6 ; i++){
		var enemyX = newEnemy();
		allEnemies[i] = new Enemy (enemyX[0],enemyX[1])
	}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
