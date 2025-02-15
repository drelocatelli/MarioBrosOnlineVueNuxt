class Movimentation {
    constructor(vm, event) {
        switch (event.key) {
            case 'ArrowLeft':
                Movimentation.left(vm);
                Person.running({player: vm, position: 'left'});
                vm.mergeCSS();
                break;
            case 'ArrowRight':
                Movimentation.right(vm);
                Person.running({player: vm, eventType: event.type,  position: 'right'});
                vm.mergeCSS();
                break;
            case 'ArrowUp':
                Person.jumping(vm, 'right');
                vm.mergeCSS();
                Movimentation.jump(vm);
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
        if(!player.jumping) {
            player.yVelocity = -10;
            player.jumping = true;
        }
    }
}
