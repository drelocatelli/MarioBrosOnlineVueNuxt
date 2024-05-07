class Movimentation {
    
    static left(player) {
        player.xVelocity = -5;
    }

    static right(player) {
        player.xVelocity = 5;
    }

    static stop(player) {
        console.log('stop')
        player.xVelocity = 0;
        console.log(player);
    }

    static jump(player) {
        if (!player.jumping) {
            player.yVelocity = -10;
            player.jumping = true;
        }
    }
}