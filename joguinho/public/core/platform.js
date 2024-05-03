class Platform {
    x; y; width; height; background; game; element;
    
    constructor({x, y, width, height, background, game}) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.width = width;
        this.height = height;
        this.background = background;
        this.game = game;

        this.createElement();
    }

    createElement() {
        var platformEl = document.createElement("div");
        platformEl.classList.add('platform');
        this.element = platformEl;
        Core.gameEl.appendChild(platformEl);
    }

    draw() {
        this.element.style.position = 'absolute';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.background = this.background;
    }
}