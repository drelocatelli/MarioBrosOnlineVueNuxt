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
                    return this.firstLevelSurpriseBox(player, playerRect, surpriseBox, surpriseBoxRect);
            }
        }

    }

    /**
     * Checks for collision between the player and the surprise box.
     * If a collision is detected, triggers any associated events or effects.
     * 
     * @param {Player} player - The player object to check for collision with the surprise box.
     * @param {Number} levelNumber - The current level number.
     */
    static surpriseCoin(player, levelNumber) {
        const surpriseCoins = document.querySelectorAll('.surprise_coin');
        const playerRect = player.element.getBoundingClientRect();

        this.itemTopCollision = undefined;
        
        for(let surpriseCoin of surpriseCoins) {
            const surpriseCoinRect = surpriseCoin.getBoundingClientRect();

            switch(levelNumber) {
                case 1:
                    return this.firstLevelSurpriseCoin(player, playerRect, surpriseCoin, surpriseCoinRect);
            }
        }

    }

    static firstLevelSurpriseCoin(player, playerRect, surpriseBox, surpriseBoxRect) {
        const x = 718;
        const y = surpriseBoxRect.bottom - playerRect.height - 8;

        this.surpriseCb(player, playerRect, surpriseBox, 'coin_surprise_item', 'coin_surprise_1', (playerRect.left >= 708 && playerRect.left < 755), x, y, (surpriseItem) => {
            Animations.firstSurpriseCoinAnim(surpriseBox, surpriseItem);
        });
    }

  
    static firstLevelSurpriseBox(player, playerRect, surpriseBox, surpriseBoxRect) {
        const x = surpriseBoxRect.right - playerRect.width + 8;
        const y = surpriseBoxRect.bottom - playerRect.height - 8;

        this.surpriseCb(player, playerRect, surpriseBox, 'surprise_item', 'box_surprise_1', playerRect.left >= 755, x, y, (surpriseItem) => {
            Animations.firstSurpriseBoxAnim(surpriseBox, surpriseItem);
        });
    }

    static surpriseCb(player, playerRect, surpriseBox, surpriseClass, surpriseClassItemId, posXColission, objectPosX, objectPosY, cb) {
        Collision.onBottomCollision(async (platform) => {
            const surpriseItemEl = Game.element.querySelector('.' + surpriseClass);
            
            // add only once
            if(surpriseItemEl && surpriseItemEl.length != 0) {
                return;
            }

            const surpriseItem = document.createElement('div');


            // first surprise box
           if(platform.id == 1) {
            // right platform
            if(posXColission)
            if(this.itemTopCollision == undefined) {

                const x = objectPosX;
                const y = objectPosY;

                // create box surprise
                surpriseItem.classList.add(surpriseClassItemId);
                surpriseItem.classList.add(surpriseClass);
                surpriseItem.classList.add('box_surprise_position_right');
                surpriseItem.style.position = 'absolute';
                
                surpriseItem.style.top = y + 'px';
                surpriseItem.style.left = x + 'px';

            console.log(surpriseItem)


                Game.element.appendChild(surpriseItem);

                cb(surpriseItem);
            }

        }

       }, player.overlapX, player.overlapY, player.yVelocity, playerRect, surpriseBox);
    }
    
}