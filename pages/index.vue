<script setup>
    
onMounted(() => {
    const game = new Game();
    
    game.players.next([
        new Player({x: 50, y: 200, game}),
    ]);

    game.platforms.next([
        new Platform({x: 100, y: 100, width: '20%', height: '50px', background: 'yellow', game}),
        new Platform({x: 0, y: 0, width: '100%', height: '25px', background: 'green', game}),
    ]);


    game.run();

});
</script>

<template>
    <div>
    </div>
</template>

<style lang="scss" scoped>
</style>