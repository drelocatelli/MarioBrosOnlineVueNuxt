var area = document.querySelector('#game').getBoundingClientRect();
const game = document.getElementById('game');

class Game {
    constructor() {
        game.style.setProperty('transform', 'scaleY(-1)');
    }
}

class Player {
 constructor(x, y) {
     this.x = x;
     this.y = y;
     this.width = 50;
     this.height = 50;
     this.jumping = false;
     this.xVelocity = 0;
     this.yVelocity = 0;
 }

 update() {
     this.applyGravity();
     this.checkCollision();
     this.updatePosition();
 }

 applyGravity() {
     var gravity = 0.3;
     this.yVelocity += gravity;
 }

 checkCollision() {
     // Check if the player is above the ceiling
     if (this.y < 0) {
         this.y = 0; // Set the player's y position to 0 (attached to the ceiling)
         this.yVelocity = 0; // Set the player's y velocity to 0 (prevent it from falling)
     }

     // Check collision with a platform (assuming there is a global variable called 'platform')
     if (
         this.x < platform.x + platform.width &&
         this.x + this.width > platform.x &&
         this.y + this.height > platform.y
     ) {
         this.jumping = false;
         this.yVelocity = 0;
         this.y = platform.y - this.height;
     }
 }

 updatePosition() {
     this.x += this.xVelocity;
     this.y += this.yVelocity;
     var playerElement = document.getElementById("player");
     playerElement.style.left = this.x + "px";
     playerElement.style.bottom = this.y + "px";
 }

 moveLeft() {
     this.xVelocity = -5;
 }

 moveRight() {
     this.xVelocity = 5;
 }

 stopMoving() {
     this.xVelocity = 0;
 }

 jump() {
     if (!this.jumping) {
         this.yVelocity = -10;
         this.jumping = true;
     }
 }

 setPosition(x, y) {
     this.x = x;
     this.y = y;
     var playerElement = document.getElementById("player");
     playerElement.style.left = this.x + "px";
     playerElement.style.bottom = this.y + "px";
     playerElement.style.bottom = (area.height - this.y - this.height) + "px";

 }
}
 class Platform {
     constructor(x, y, width, height) {
         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height;
     }

     draw() {
         var platformElement = document.getElementById("platform");
         platformElement.style.left = this.x + "px";
         platformElement.style.bottom = this.y + "px";
         platformElement.style.width = this.width + "px";
         platformElement.style.height = this.height + "px";
     }

 }


 new Game();
 
// create player
var player = new Player(50, 0);
var platform = new Platform(0, 300, 400, "100%");

 // Controle do jogador
 document.addEventListener("keydown", function(event) {
     if (event.key === "ArrowLeft") {
         player.moveLeft();
     } else if (event.key === "ArrowRight") {
         player.moveRight();
     } else if (event.key === "ArrowUp") {
         player.jump();
     }
 });

 document.addEventListener("keyup", function(event) {
     if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
         player.stopMoving();
     }
 });

 // Loop do jogo
 function gameLoop() {
     player.update();
     platform.draw();
     requestAnimationFrame(gameLoop);
 }

 gameLoop();
