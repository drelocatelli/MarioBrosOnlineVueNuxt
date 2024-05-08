import {ref} from 'vue';

class Game {
    static area = document.querySelector('#game').getBoundingClientRect();
    static element = document.getElementById('game');
    static currentGame = ref(undefined);
    static socket = ref(undefined);
    
    platforms = ref([]);
    players = ref([]);
    decorations = ref([]);

    addDecorations(decoration) {
        this.decorations.value = [
            ...this.decorations.value,
            ...decoration
        ];
    }

    addPlayers(players) {
        this.players.value = [
            ...this.players.value,
            ...players
        ];
    }

    removePlayer(playerId) {
        const currentPlayers = this.players.value.filter((player) => player.id != playerId);
        this.players.value = currentPlayers;

        // remove player on dom
        document.querySelector(`.player#${playerId}`).remove();
    }

    addPlatforms(platforms) {
        this.platforms.value = [
            ...this.platforms.value,
            ...platforms
        ];
    }

    run() {
        // return
        Game.currentGame.value = this;
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
