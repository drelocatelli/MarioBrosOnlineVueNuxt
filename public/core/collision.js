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
    
}
