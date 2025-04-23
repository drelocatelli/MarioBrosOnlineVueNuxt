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

    static hasTopCollision(element1, element2) {
        let platforms = Game.platforms.getValue().filter((platform) => platform.id !== 'main');
        for (let platform of platforms) {
            const element1rect = element1.element.getBoundingClientRect();
            const element2Rect = element2 ?? platform.element.getBoundingClientRect();

            return (
                (element1rect.y + element1rect.height > element2Rect.y + element2Rect.height) && 
                element1rect.x + element1rect.width < element2Rect.x + element2Rect.width
            );
        }
    }

    // return what platform has colliding at the top
    static whichPlatformCollisionAtTop(element1) {
        let platforms = Game.platforms.getValue().filter((platform) => platform.id !== 'main');
        const platform = platforms.find(platform => Collision.hasTopCollision(element1));
        return platform;
    }

    static isHorizontalCollision(rect1, rect2) {
        return (
            (rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x) ||
            (rect2.x < rect1.x + rect1.width &&
             rect2.x + rect2.width > rect1.x)
        );
    }

  
    /**
     * Executes a callback if the bottom of a rectangle has collided with another.
     * @param {function} cb - callback to execute if the bottom of the rectangle has collided.
     * @param {number} overlapX - the overlap of the x coordinates of the two rectangles.
     * @param {number} overlapY - the overlap of the y coordinates of the two rectangles.
     * @param {number} yVelocity - the vertical velocity of the rectangle.
     * @param {DOMRect} rect1 - the first rectangle.
     * @param {DOMRect} rect2 - the second rectangle.
     */
    static onBottomCollision(cb, overlapX, overlapY, yVelocity, rect1, platform) {
        const platformRect = platform.getBoundingClientRect();
        
        if(overlapX > overlapY) {
            if(yVelocity < 0 && rect1.y > platformRect.y) {
                // width collision
                if(rect1.x + rect1.width > platformRect.x && rect1.x < platformRect.x + platformRect.width) {
                    cb(platform);
                }
            }
        }
        
    }

}
