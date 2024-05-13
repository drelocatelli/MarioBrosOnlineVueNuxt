const movimentationEvent = new CustomEvent('player-movimentation');

class Player {
    isColliding = false;

    constructor({ x, y, width, height, background, css, id, game }) {
        this.gravity = 0.18;
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
        this.name = undefined;
        this.isMoving = false;
        this.createElement(x, y, width, height, background);
        this.shareCommands();
        this.listenEvents();
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

        this.playerName = document.createElement('span');
        this.playerName.id = this.id;
        this.playerName.classList.add('user_name');
        document.body.appendChild(this.playerName);

        if (this.css) {
            this.mergeCSS();
        }
        Game.element.appendChild(this.element);
    }

    update() {
        this.applyGravity();
        this.checkCollision();
    }

    listenEvents() {
        const vm = this;
        vm.movimentationEvent();
    }

    movimentationEvent() {
        document.addEventListener(GameEvent.playerMovimentation, (e) => {
            const { detail } = e;
            const { event } = detail;
            const { player } = detail;
            player.isMoving = true;

            if (event.type == 'keyup') {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    player.css = Person.initial();
                    player.mergeCSS();
                    Movimentation.stop(player);
                }
            } else if (event.type == 'keydown') {
                new Movimentation(player, event);
            }
        });
    }

    updatePosition() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.yVelocity += this.gravity;

        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';

        // Set player name position on screen
        this.playerName.style.position = 'absolute';
        this.playerName.style.top = this.y - 30 + 'px';
        this.playerName.style.left = this.x + 'px';
        this.playerName.style.userSelect = 'none';
        this.playerName.style.fontWeight = 'bold';
        this.playerName.style.textTransform = 'uppercase';
        this.playerName.innerText = this.name ?? this.id.slice(0, 6);

        this.responsivePos();
    }

    responsivePos() {
        // Responsive position
        const { innerWidth } = window;

        if (innerWidth <= 768) {
            // Small screens (up to 768px)
            this.element.style.left = this.x - 110 + 'px';
            this.playerName.style.left = this.x - 110 + 'px';
        } else if (innerWidth <= 1366) {
            // Medium screens (769px to 1366px)
            this.element.style.left = this.x - 110 + 'px';
            this.playerName.style.left = this.x - 110 + 'px';
        } else {
            // Large screens (1367px and above)
            this.element.style.left = this.x + 'px';
            this.playerName.style.left = this.x + 'px';
        }
    }

    shareCommands() {
        const vm = this;
        document.addEventListener('keydown', function (event) {
            const props = { player: vm.id, key: event.key, type: 'keydown' };
            Core.send('keydown', props);
        });

        document.addEventListener('keyup', function (event) {
            const props = { player: vm.id, key: event.key, type: 'keyup' };
            Core.send('keyup', props);
        });
    }

    applyGravity() {
        const { platforms } = this.game.getValue();

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
        const platforms = this.game.value.platforms.getValue();

        // Check if the player is above the ceiling
        if (this.y < 0) {
            this.y = 0;
            this.yVelocity = 0;
        }

        
        // Check collision with platforms
        for (let platform of platforms) {
            const playerRect = this.element.getBoundingClientRect();
            const platformRect = platform.element.getBoundingClientRect();
            
            if (
                platform.id !== 'main' &&
                Collision.isColliding(platformRect, playerRect) &&
                !Collision.isAbove(playerRect, platformRect) &&
                Collision.hasTopCollision(playerRect, platformRect)
            ) {
                this.jumping = false;
                this.yVelocity -= this.gravity;
            }

            if (
                playerRect.x < platformRect.x + platformRect.width &&
                playerRect.x + playerRect.width > platformRect.x &&
                playerRect.y + playerRect.height > platformRect.y &&
                playerRect.y < platformRect.y + platformRect.height // Check if player's top is below platform's bottom
            ) {
                this.jumping = false;
                this.yVelocity = 0;

                //change it for player size
                const playerSizeDist = 12;
                this.y = platformRect.y - this.height - playerSizeDist;
            }
        }

        // Check collision with the bottom of the screen
        const screenHeight = Game.area.height - 25;
        if (this.y + this.height > screenHeight) {
            this.y = screenHeight - this.height;
            this.yVelocity = 0;
            this.jumping = false;
        }
    }
}
