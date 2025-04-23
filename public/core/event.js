class GameEvent {

    static playerMovimentation = 'playerMovimentation';
    
    static dispatchPlayerMovimentation(player, event) {
        document.dispatchEvent(new CustomEvent(GameEvent.playerMovimentation, {detail: {player, event}}));
    }

}