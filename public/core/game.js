
const { BehaviorSubject } = rxjs;

class Game {
    static area = document.querySelector('#game').getBoundingClientRect();
    static element = document.getElementById('game');
    static currentGame = new BehaviorSubject(undefined);
    static socket = new BehaviorSubject(undefined);
    
    static platforms = new BehaviorSubject([]);
    static players = new BehaviorSubject([]);
    static decorations = new BehaviorSubject([]);

    /**
     * Adds decorations to the current game.
     * @param {Decoration[]} decorations - An array of Decoration objects to add to the game.
     */
    static addDecorations(decoration) {
        this.decorations.next([
            ...this.decorations.value,
            ...decoration
        ]);
    }

    /**
     * Adds players to the current game.
     * @param {Player[]} players - An array of Player objects to add to the game.
     */

    static addPlayers(players) {
        this.players.next([
            ...this.players.value,
            ...players
        ]);
    }

    /**
     * Removes a player from the game.
     * @param {string} playerId the id of the player to remove
     */
    static removePlayer(playerId) {
        const currentPlayers = this.players.value.filter((player) => player.id != playerId);
        this.players.next(currentPlayers);

        // remove player on dom
        document.querySelector(`.player#${playerId}`).remove();
        document.querySelector(`#${playerId}.user_name`).remove();
    }

    /**
     * Adds platforms to the current game.
     * @param {Platform[]} platforms The platforms to add.
     */
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
                player.updatePosition();
                Items.surpriseBox(player);
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
