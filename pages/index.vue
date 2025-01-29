<script setup>
onMounted(() => {
    Game.addDecorations([
        // plantas
        new Decoration({x: 15, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-y: -574px; background-size: 570px;'}),
        new Decoration({x: 35, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-x: -614px; background-position-y: -574px; background-size: 570px;'}),

        new Decoration({x: 575, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-y: -574px; background-size: 570px;'}),
        new Decoration({x: 605, y: 53, width: '48px', height: '34px', background: 'url("/assets/basic.png") repeat-x', css: 'background-position-x: -614px; background-position-y: -574px; background-size: 570px;'}),

        // coconut trees
        new Decoration({x: 300, y: -27, width: '132px', height: '435px', background: 'url("/assets/levels/one/coconut_tree.png") 205px 0 / 270px repeat-x', css: 'z-index:1;'}),
        new Decoration({x: 349, y: 53, width: '132px', height: '435px', background: 'url("/assets/levels/one/coconut_tree.png") 205px 0 / 270px repeat-x'}),
        new Decoration({x: 439, y: 8, width: '132px', height: '435px', background: 'url("/assets/levels/one/coconut_tree.png") 205px 0 / 270px repeat-x'}),

    ]);
    
    Game.addPlatforms([
        new Platform({x: 705, y: 150, width: '107px', height: '36px', css: 'background: url("/assets/basic.png") no-repeat; background-position: 0 -530px; background-size: 670px;', classList: 'surprise_box', id: 1}),
    ]);
    

    Game.run(
        // player cb
        (player) => {
            Items.surpriseBox(player, 1);
        }
    );

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
