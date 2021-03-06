// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 100 * this.speed * dt;
    // Check if the player is closer to the bug
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
		player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};


var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}
// Now write your own player class
// This class requires an update(), render() and


// Update the player position to the initail position when it reaches to the water
Player.prototype.update = function() {
    if (this.y < 20) {
        this.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// a handleInput() method.
Player.prototype.handleInput = function(key) {
        if(key === "left" && this.x > 33) {
            this.x -= 100;
        } else if(key === "right"  && this.x < 400) {
            this.x += 100
        } else if(key === "up" && this.y > 18) {
            this.y -= 80;
        } else if(key === "down" && this.y < 380) {
            this.y += 80
        }
}

// Reset the player position to the initail position when it's collisions with an enemy
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];


// Place the player object in a variable called player
var player = new Player(200, 380);






// shuffle rows function for creating an enemy
function randomYAxis() {
    var rowsPositions  = [58, 141, 224];
    var shuffleRows = Math.floor((Math.random() * 3));
    return rowsPositions[shuffleRows];
}

// Add a new enemy every second
setInterval(function(){
            // create enemy from outsite random point
            var xAxis = Math.floor((Math.random() * 100) - 200);
            var yAxis = randomYAxis();
            // random speed for the new enemy from 1 to 5
            var speed = (Math.floor((Math.random() * 5) + 1));
            var enemy = new Enemy(xAxis, yAxis, speed);
            allEnemies.push(enemy);
}, 1000);


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
