class Movimentation {
    constructor(vm, event) {
        switch (event.key) {
            case 'ArrowLeft':
                Movimentation.left(vm);
                vm.css = Person.running('left');
                vm.mergeCSS();
                break;
            case 'ArrowRight':
                Movimentation.right(vm);
                vm.css = Person.running('right');
                vm.mergeCSS();
                break;
            case 'ArrowUp':
                vm.css = Person.jumping('right');
                vm.mergeCSS();
                Movimentation.jump(vm);
                setTimeout(() => {
                    vm.css = Person.initial();
                    vm.mergeCSS();
                }, 500);
                break;
        }
    }

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
            player.jumping = true;
            if (!Collision.hasTopCollision(player)) {
                player.yVelocity = -10;
            } else if(Collision.whichPlatformCollisionAtTop(player)) {
                player.yVelocity = 0;
            }
        }
    }
}
