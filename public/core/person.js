class Person {

    static basic = `
            height: 62px;
            width: 47px;';
            background-size: 560px;
            background-position-y: bottom;
    `;

    static resetPos(player, position = 'right') {
        const {element} = player;
        element.style.backgroundPositionX =  `${position == 'right' ?  '0' : '0' }`;
    }

    static initial(player = undefined, position = 'right') {
        return `
            ${this.basic}
            `;
    }

    static running({player, eventType = undefined, position = 'right'}) {
        const {element} = player;

        if(position == 'right') {
            
            const positions = ['-50px', '-48px', '-104px', '-155px'];
            let index = 0;
            
            const interval = setInterval(() => {
                if(!player.isMoving) {
                    clearInterval(interval);
                } else {
                    element.style.backgroundPositionX = positions[index];
                    index = (index + 1) % positions.length;
                }
            }, 100);

        }
    }

    static async jumping(player, position = 'right') {
        const {element} = player;
        // jumping
        element.style.backgroundPositionX =  `${position == 'right' ?  '-205px' : '-205px' }`;

        await Functions.wait(300);

        // on ground
        this.resetPos(player, position);
        
    }
    
}