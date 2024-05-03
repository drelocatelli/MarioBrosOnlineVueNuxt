<script setup>
    
onMounted(() => {
    const game = new Game();
    
    game.addPlatforms([
        new Platform({x: 0, y: 0, width: '100%', height: '56px', background: 'url("/assets/level1_floor.png") repeat-x', game}),
    ]);

    game.addDecorations([
        // plants
        new Decoration({x: 15, y: 53, width: '48px', height: '35px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-y: -198px; background-size: 570px;', game}),
        new Decoration({x: 35, y: 53, width: '48px', height: '35px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-x: -90px; background-position-y: -198px; background-size: 570px;', game}),
    ]);
    
    game.addPlayers([
        new Player({x: 50, y: 200, background: 'url("/assets/mario.png") no-repeat', css: Person.initial(), game}),
    ]);
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
    background-color: #48ace8 !important;
    background-position-y: -50px;
    background-size: 620px;
    image-rendering: pixelated;
}

</style>