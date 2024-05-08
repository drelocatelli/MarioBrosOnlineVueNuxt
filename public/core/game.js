
const { BehaviorSubject } = rxjs;

class Game {
    static area = document.querySelector('#game').getBoundingClientRect();
    static element = document.getElementById('game');
    static currentGame = new BehaviorSubject(undefined);
    static socket = new BehaviorSubject(undefined);
    
    static platforms = new BehaviorSubject([]);
    static players = new BehaviorSubject([]);
    static decorations = new BehaviorSubject([]);

    static addDecorations(decoration) {
        this.decorations.next([
            ...this.decorations.value,
            ...decoration
        ]);
    }

    static addPlayers(players) {
        this.players.next([
            ...this.players.value,
            ...players
        ]);
    }

    static removePlayer(playerId) {
        const currentPlayers = this.players.value.filter((player) => player.id != playerId);
        this.players.next(currentPlayers);

        // remove player on dom
        // document.querySelector(`.player#${playerId}`).remove();
    }

    static addPlatforms(platforms) {
        this.platforms.next([
            ...this.platforms.value,
            ...platforms
        ]);
    }

    static run() {
        // return
        Game.currentGame.next(this);
        this.players.subscribe((players) => {
            for (const player of players) {
                player.update();
            }
        })
        this.platforms.subscribe((platforms) => {
            for (const platform of platforms) {
                platform.draw();
            }
        })
        requestAnimationFrame(this.run.bind(this));
    }    
}
