class Player {
    isColliding = false;

    constructor({ x, y, width, height, background, css, id, game }) {
        this.gravity = 0.3;
        this.x = x;
        this.width = width ?? 50;
        this.height = height ?? 50;
        this.y = Game.area.height - y - this.height;
        this.jumping = false;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.background = background ?? 'red';
        this.game = Game.currentGame;
        this.css = css;
        this.id = id;
        this.createElement(x, y, width, height, background);
        this.listen();
        this.shareCommands();
        this.update();
    }

    mergeCSS() {
        const existingCssText = this.element.getAttribute('style') || '';
        const mergedCssText = SpriteCss.mergeCssText(existingCssText, this.css);
        this.element.setAttribute('style', mergedCssText);
    }

    changeCss(css) {
        this.css = css;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('player');
        this.element.id = this.id;
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.background = this.background;
        this.element.style.position = 'absolute';
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x ?? 0;
        if (this.css) {
            this.mergeCSS();
        }
        Game.element.appendChild(this.element);
    }

    update() {
        this.applyGravity();
        this.checkCollision();
    }

    listen() {
        // listen player commands from server
        Core.listen((socket) => {
            const vm = this;
            
            socket.on('player_move', function (event) {
                if(vm.element.id === event.player) {
                    vm.updatePosition(vm, event);
                    if(event.type == 'keyup') {
                        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                            vm.css = Person.initial();
                            vm.mergeCSS();
                            Movimentation.stop(vm);
                        }
                    } else if(event.type == 'keydown') {
                        new Movimentation(vm, event);
                    }
                }
            });
        });
    }

    updatePosition(vm, event) {
        const consoleStyle = vm.id == event.player ? 'background:blue; color:white;' : 'background:red; color:white;';
        console.log(`%c Apertou uma tecla (${event.key}): ${event.player == vm.id ? '(Você)' : event.player}`, consoleStyle);

        vm.x += vm.xVelocity;
        vm.y += vm.yVelocity;
        vm.yVelocity += vm.gravity;

        vm.element.style.left = vm.x + 'px';
        vm.element.style.top = vm.y + 'px';
    }

    shareCommands() {
        const vm = this;
        document.addEventListener('keydown', function (event) {
            Core.send('keydown', { player: vm.id, key: event.key, type: 'keydown' });
        });

        document.addEventListener('keyup', function (event) {
            Core.send('keyup', { player: vm.id, key: event.key, type: 'keyup' });
        });
    }

    applyGravity() {
        const {platforms} = this.game.getValue();

        const gravity = this.gravity;
        // Check if the player is colliding with a platform
        platforms.subscribe((platforms) => {
            platforms.forEach((platform) => {
                if (
                    this.x < platform.x + platform.width &&
                    this.x + this.width > platform.x &&
                    this.y + this.height > platform.y &&
                    this.y < platform.y + platform.height
                ) {
                    this.isColliding = true;
                    return; // Para a execução do loop forEach se houver colisão
                }
            });
        });

        // Check if the player is colliding with the bottom of the screen
        const screenHeight = Game.area.height;
        if (this.y + this.height >= screenHeight) {
            this.isColliding = true;
        }

        // Apply gravity only if there is no collision
        if (!this.isColliding) {
            this.yVelocity += gravity;
        }
    }

    checkCollision() {
        const {platforms} = this.game.getValue();

        // Check if the player is above the ceiling
        if (this.y < 0) {
            this.y = 0;
            this.yVelocity = 0;
        }

        // Check collision with platforms
        platforms.subscribe((platforms) => {
            for (let platform of platforms) {
                const playerRect = this.element.getBoundingClientRect();
                const platformRect = platform.element.getBoundingClientRect();
                const platformHeight = parseInt(platform.height); // Convert platform height to a number

                if (
                    playerRect.x < platformRect.x + platformRect.width &&
                    playerRect.x + playerRect.width > platformRect.x &&
                    playerRect.y + playerRect.height > platformRect.y &&
                    playerRect.y < platformRect.y + platformHeight // Check if player's top is below platform's bottom
                ) {
                    this.jumping = false;
                    this.yVelocity = 0;
                    //change it for player size
                    const playerSizeDist = 12;
                    this.y = platformRect.y - this.height - playerSizeDist;
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
}
