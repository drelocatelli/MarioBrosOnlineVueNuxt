<script setup>
    
onMounted(() => {
    const game = new Game();

    game.addPlatforms([
        new Platform({x: 0, y: 0, width: '100%', height: '56px', background: 'url("/assets/level1_floor.png") repeat-x', game}),
    ]);

    game.addDecorations([
        new Decoration({x: 15, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-y: -574px; background-size: 570px;', game}),
        new Decoration({x: 35, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-x: -614px; background-position-y: -574px; background-size: 570px;', game}),
    ]);

    Core.listen((socket) => {
        socket.on('login', (event) => {
            console.log(`%c Entrou no game: ${event.id}`, "background:green; color:white;")
            game.addPlayers([
                new Player({id: event.id, x: 50, y: 65, background: 'url("/assets/mario.png") no-repeat', css: Person.initial(), game}),
            ]);
        });

        socket.on('logout', (playerId) => {
            game.removePlayer(playerId);
        });
    })

    game.run();

});
</script>

<template>
    <div>
    </div>
</template>

<style lang="scss">
#game {
    background: url(/assets/background1.png) repeat-x;
    background-color: #8CC0B8 !important;
    background-position-y: 0;
    background-size: 620px;
    image-rendering: pixelated;
}

</style>