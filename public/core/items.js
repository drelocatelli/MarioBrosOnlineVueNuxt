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
        Collision.onBottomCollision(async (platform) => {
            const surpriseItemEl = Game.element.querySelector('.surprise_item');
            
            // add only once
            if(surpriseItemEl && surpriseItemEl.length != 0) {
                return;
            }
            
            const surpriseItem = document.createElement('div');

            // first surprise box
           if(platform.id == 1) {
            if(playerRect.left >= 755)
            if(this.itemTopCollision == undefined) {

                const x = surpriseBoxRect.right - playerRect.width + 8;
                const y = surpriseBoxRect.bottom - playerRect.height - 8;

                // create box surprise
                surpriseItem.classList.add('box_surprise_1');
                surpriseItem.classList.add('surprise_item');
                surpriseItem.classList.add('box_surprise_position_right');
                surpriseItem.style.position = 'absolute';
                
                surpriseItem.style.top = y + 'px';
                surpriseItem.style.left = x + 'px';

                Game.element.appendChild(surpriseItem);

                Animations.firstSurpriseBoxAnim(surpriseBox, surpriseItem);

                return;

                const currentSurprisePosYConst = parseInt(surpriseItem.style.top);
                let currentSurprisePosY = parseInt(surpriseItem.style.top);

                const currentSurprisePosXConst = parseInt(surpriseItem.style.left);
                let currentSurprisePosX = parseInt(surpriseItem.style.left);

                let topMovimentation = setInterval(() => {
                    // set surprise movimentation top
                    currentSurprisePosY -= 0.5;
                    if(
                        currentSurprisePosY <= currentSurprisePosYConst &&
                        currentSurprisePosY >= currentSurprisePosYConst - 50
                    ) {
                        surpriseItem.style.top = currentSurprisePosY + 'px';
                    } else {
                        clearInterval(topMovimentation);
                    }
                }, 1);

                await Functions.wait(300);

                let rightMovimentation = setInterval(() => {
                    // set surprise movimentation right
                    currentSurprisePosX += 0.7;
                    if(
                        currentSurprisePosX >= currentSurprisePosXConst &&
                        currentSurprisePosX <= currentSurprisePosXConst + 50
                    ) {
                        surpriseItem.style.left = currentSurprisePosX + 'px';
                    } else {
                        clearInterval(rightMovimentation);
                    }
                }, 3);

                await Functions.wait(300);

                const mainPlatform = Game.platforms.getValue().find(platform => platform.id == 'main').element.getBoundingClientRect();


                // make surprise fall
                let fallMovimentation = setInterval(() => {
                    const mainPlatformPosY = mainPlatform.top - mainPlatform.height
                    
                    currentSurprisePosY += 0.8;

                    if (
                        currentSurprisePosY < mainPlatformPosY + 28
                    ) {
                        surpriseItem.style.top = currentSurprisePosY + 'px';
                    } else {
                        clearInterval(fallMovimentation);
                    }

                }, 0.1);

                await Functions.wait(800);
                

                let leftMovimentation = setInterval(() => {
                    // set surprise movimentation right
                    currentSurprisePosX -= 0.7;
                    if(
                        currentSurprisePosX <= currentSurprisePosX + 200 
                    ) {
                        surpriseItem.style.left = currentSurprisePosX + 'px';
                    } else {
                        clearInterval(leftMovimentation);
                    }
                }, 3);
                

                this.itemTopCollision = surpriseItem;
            }

        }

       }, player.overlapX, player.overlapY, player.yVelocity, playerRect, surpriseBox);
    }
    
}