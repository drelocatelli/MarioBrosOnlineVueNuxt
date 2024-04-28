var area = document.querySelector('#game').getBoundingClientRect();
const game = document.getElementById('game');

class Game {
    constructor() {
        game.style.setProperty('transform', 'scaleY(-1)');
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
