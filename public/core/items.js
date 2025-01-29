class Items {

    static itemTopCollision;

    /**
     * Checks for collision between the player and the surprise box.
     * If a collision is detected, triggers any associated events or effects.
     * 
     * @param {Player} player - The player object to check for collision with the surprise box.
     * @param {Number} levelNumber - The current level number.
     */
    static surpriseBox(player, levelNumber) {
        const suprisesBoxes = document.querySelectorAll('.surprise_box');
        const playerRect = player.element.getBoundingClientRect();
        this.itemTopCollision = undefined;
        
        for(let surpriseBox of suprisesBoxes) {
            const surpriseBoxRect = surpriseBox.getBoundingClientRect();

            switch(levelNumber) {
                case 1:
                    return this.firstGame(player, playerRect, surpriseBox, surpriseBoxRect);
            }
        }

    }

  
    static firstGame(player, playerRect, surpriseBox, surpriseBoxRect) {
        Collision.onBottomCollision((platform) => {
            // first surprise box
           if(platform.id == 1) {
            if(playerRect.left >= 755)
            if(this.itemTopCollision == undefined) {

                const x = surpriseBoxRect.right - playerRect.width + 8;
                const y = surpriseBoxRect.bottom - playerRect.height - 8;

                // create box surprise
                const surpriseItem = document.createElement('div');
                surpriseItem.classList.add('box_surprise_1');
                
                surpriseItem.style.top = y + 'px';
                surpriseItem.style.left = x + 'px';
                
                Game.element.appendChild(surpriseItem);

                this.itemTopCollision = surpriseItem;
            }

        }

       }, player.overlapX, player.overlapY, player.yVelocity, playerRect, surpriseBox);
    }
    
}