
<script lang="ts" setup>
useHead({
    title: 'Super Mario Bros Online',
    script: [
    {
      src: 'core/rxjs.umd.min.js',
      body: true
    },
    {
      src: `core/index.js`,
      body: true
    },
    {
      src: `core/game.js`,
      body: true
    },
    {
      src: `core/platform.js`,
      body: true
    },
    {
      src: `core/player.js`,
      body: true
    },
  ],
});


</script>

<template>
    <div>
        <div id="game">
            <slot/>
        </div>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

#game {
    position: relative;
    width: 400px;
    height: 300px;
    background-color: lightblue;
    width: 100%;
    height: 100vh;
    transform: scaleY(-1);
}

.platform {
  position: absolute;
}

.player {
  clip-path: circle();
}

</style>