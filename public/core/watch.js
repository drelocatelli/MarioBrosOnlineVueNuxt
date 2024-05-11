export default class Listenables {
    socket;
    
    constructor() {
        const vm = this;
        Core.listen((socket) => {
            vm.socket = socket;
            vm.playerConn();
            vm.playerMovements();
        });

    }

    playerConn() {
        this.socket.on('login', (event) => {
            console.log(`%c Entrou no game: ${event.id}`, 'background:green; color:white;');
        });

        this.socket.on('new_connection', (event) => {
            const newPlayer = new Player({ id: event.id, x: 50, y: 65, background: 'url("/assets/mario.png") no-repeat', css: Person.initial() });
            Game.addPlayers([newPlayer]);
        });

        this.socket.on('logout', (playerId) => {
            console.log(`%c Saiu do game: ${playerId}`, 'background:red; color:white;');
            Game.removePlayer(playerId);
        });
    }

    playerMovements() {
        this.socket.on('player_movement', (event) => {
            const players = Game.players.getValue();
            const player = players.find((player) => player.id == event.player);
            if(player) {
                player.listenMove(player, event);
            } else {
                Game.addPlayers([new Player({ id: event.player, x: 50, y: 65, background: 'url("/assets/mario.png") no-repeat', css: Person.initial() })]);
            }
        });
    }
    
}