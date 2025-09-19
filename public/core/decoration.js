class Decoration {
    constructor({ x, y, width, height, background, css, game, classList }) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.background = background;
      this.game = game;
      this.css = css;
      this.classList = classList;
  
      this.createElement();
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.style.background = this.background;
      this.element.style.height = this.height;
      this.element.style.width = this.width;
      this.element.style.position = "absolute";
      this.element.style.bottom = this.y + "px";
      this.element.style.left = this.x + "px";
      this.element.classList.add("decoration");
      this.element.setAttribute('class', this.classList);
  
      if (this.css) {
        const existingCssText = this.element.getAttribute("style") || "";
        const mergedCssText = SpriteCss.mergeCssText(existingCssText, this.css);
        this.element.setAttribute("style", mergedCssText);
      }
  
      Core.gameEl.appendChild(this.element);
    }
  }
  