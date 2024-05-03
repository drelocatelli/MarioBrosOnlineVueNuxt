
<script setup>
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
      src: `core/person.js`,
      body: true
    },
    {
      src: `core/sprite_css.js`,
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
    {
      src: `core/decoration.js`,
      body: true
    },
    
  ],
});

</script>

<template>
    <div>
        <div id="game">
          <div id="content">
              <slot/>
          </div>
        </div>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#game {
    position: fixed;
    background-color: lightblue;
    width: 100%;
    transform: scaleY(-1);
    height: 100vh;
}

</style>