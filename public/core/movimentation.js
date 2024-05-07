class Movimentation {
    
    static left(player) {
        player.xVelocity = -5;
    }

    static right(player) {
        player.xVelocity = 5;
    }

    static stop(player) {
        player.xVelocity = 0;
    }

    static jump(player) {
        if (!player.jumping) {
            player.yVelocity = -10;
            player.jumping = true;
        }
    }
}