<script setup>
    
onMounted(() => {
    Game.addPlatforms([
        new Platform({x: 0, y: 180, width: '20%', height: '26px', background: 'url("/assets/level1_floor.png") repeat-x', game}),
        new Platform({x: 450, y: 300, width: '20%', height: '26px', background: 'url("/assets/level1_floor.png") repeat-x', game}),
    ]);

    Game.addDecorations([
        new Decoration({x: 15, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-y: -574px; background-size: 570px;', game}),
        new Decoration({x: 35, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-x: -614px; background-position-y: -574px; background-size: 570px;', game}),
    ]);
    
    Game.run();

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