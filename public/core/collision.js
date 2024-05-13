class Collision {
    static isAbove(rect1, rect2) {
        return rect2.height + rect2.bottom >= rect1.bottom;
    }

    static isColliding(rect1, rect2) {
        // check height and bottom position
        return (
            rect1.height + rect1.bottom <= rect2.height + rect2.bottom &&
            // check width and left position
            rect1.width + rect1.left + 50 >= rect2.width + rect2.left
        );
    }

    static hasTopCollision(rect1, rect2) {
        return rect1.top < rect2.bottom && rect1.bottom > rect2.bottom;
    }

}
