class Core {
    static gameEl = document.querySelector('#game');
    static area = this.gameEl?.getBoundingClientRect();

    static listen(cb) {
        Game.socket.subscribe((socket) => {
            if(socket) {
                cb(socket);
            }
        })
    }
}