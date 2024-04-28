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