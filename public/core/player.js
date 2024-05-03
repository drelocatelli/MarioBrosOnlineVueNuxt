class Player {

    isColliding = false;
    
    constructor({ x, y, width, height, background, game }) {
        this.x = x;
        this.width = width ?? 50;
        this.height = height ?? 50;
        this.y = Game.area.height - y - this.height;
        this.jumping = false;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.background = background ?? 'red';
        this.game = game ?? [];
        this.createElement(x, y, width, height, background);
        this.makePlayerCommands();
        this.update();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('player');
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.background = this.background;
        this.element.style.position = 'absolute';
        this.element.style.bottom = this.y + 'px';
        this.element.style.left = this.x ?? 0;
        Game.element.appendChild(this.element);
    }

    update() {
        this.applyGravity();
        this.checkCollision();
        this.updatePosition();
    }

    makePlayerCommands() {
        const vm = this;
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                vm.moveLeft();
            } else if (event.key === 'ArrowRight') {
                vm.moveRight();
            } else if (event.key === 'ArrowUp') {
                vm.jump();
            }
        });

        document.addEventListener('keyup', function (event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                vm.stopMoving();
            }
        });
    }

    applyGravity() {
        const {platforms} = this.game;
        const gravity = 0.3;
        // Check if the player is colliding with a platform
        platforms.subscribe((platforms) => {
            platforms.forEach(platform => {
                if (
                  this.x < platform.x + platform.width &&
                  this.x + this.width > platform.x &&
                  this.y + this.height > platform.y &&
                  this.y < platform.y + platform.height
                ) {
                  this.isColliding.next(true);
                  return; // Para a execução do loop forEach se houver colisão
                }
              });
        });

        // Check if the player is colliding with the bottom of the screen
        const screenHeight = Game.area.height;
        if (this.y + this.height >= screenHeight) {
            this.isColliding.next(true);
        }

        // Apply gravity only if there is no collision
        if (!this.isColliding) {
            this.yVelocity += gravity;
        }
    }

    checkCollision() {
        const {platforms} = this.game;

        // Check if the player is above the ceiling
        if (this.y < 0) {
          this.y = 0;
          this.yVelocity = 0;
        }
      
        // Check collision with platforms
        platforms.subscribe((platforms) => {
            for (let platform of platforms) {
            const elementRect = this.element.getBoundingClientRect();
            const platformRect = platform.element.getBoundingClientRect();
            const platformHeight = parseInt(platform.height); // Convert platform height to a number
          
            //   if (
            //     elementRect.x < platformRect.x + platformRect.width &&
            //     elementRect.x + elementRect.width > platformRect.x &&
            //     elementRect.y + elementRect.height > platformRect.y &&
            //     elementRect.y < platformRect.y + platformHeight // Check if player's top is below platform's bottom
            //   ) {
            //     this.jumping = false;
            //     this.yVelocity = 0;
            //     elementRect.y = platformRect.y - this.height;
            //   }

                if (
                    elementRect.x < platformRect.x + platformRect.width &&
                    elementRect.x + elementRect.width > platformRect.x &&
                    elementRect.y + elementRect.height > platformRect.y &&
                    elementRect.y < platformRect.y + platformHeight // Check if player's top is below platform's bottom
                ) {
                    this.jumping = false;
                    this.yVelocity = 0;
                    this.y = platformRect.y - this.height;
                }
            }
        });

        // Check collision with the bottom of the screen
        const screenHeight = Game.area.height - 25;
        if (this.y + this.height > screenHeight) {
          this.y = screenHeight - this.height;
          this.yVelocity = 0;
          this.jumping = false;
        }
      }

  
    updatePosition() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.element.style.left = this.x + 'px';
        this.element.style.bottom = this.y + 'px';
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
        this.element.style.left = this.x + 'px';
        this.element.style.bottom = this.y + 'px';
        this.element.style.bottom = Game.area.height - this.y - this.height + 'px';
    }
}