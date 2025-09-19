class Platform {

    /**
     * Constructor for Platform.
     *
     * @param {{ x: number|string, y: number|string, width: number|string, height: number|string, background: string, css: string, game: Game, id: string, classList: string }} params
     * @param {number|string} params.x - x position of the platform
     * @param {number|string} params.y - y position of the platform
     * @param {number|string} params.width - width of the platform
     * @param {number|string} params.height - height of the platform
     * @param {string} params.background - background of the platform
     * @param {string} params.css - additional css for the platform
     * @param {Game} params.game - the game object
     * @param {string} params.id - id of the platform
     * @param {string} params.classList - additional class names for the platform
     *
     * Creates an element and sets it's properties.
     */
    constructor({ x, y, width, height, background, css, game, id, classList }) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.width = width;
        this.height = height;
        this.background = background;
        this.game = game;
        this.id = id;
        this.css = css;
        this.classList = classList;

        this.createElement();
    }

    createElement() {
        var platformEl = document.createElement('div');
        platformEl.classList.add('platform');
        platformEl.id = this.id;
        this.element = platformEl;
        if (this.css) {
            const existingCssText = this.element.getAttribute('style') || '';
            const mergedCssText = SpriteCss.mergeCssText(existingCssText, this.css);
            this.element.setAttribute('style', mergedCssText);
        }
        Core.gameEl.appendChild(platformEl);
    }

    draw() {
        this.element.style.position = 'absolute';
        this.element.style.bottom = this.y + 'px';
        this.element.style.height = this.height;
        this.element.style.background = this.background;
        this.element.style.width = this.width;
        this.element.style.left = this.x + 'px';
        this.element.style.zIndex = 500;
        this.element.setAttribute('class', this.classList);
    }
}
