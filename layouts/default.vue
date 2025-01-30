<script setup>
import { socket } from '../socket.ts';
import Watch from 'public/core/watch.js';
import '../public/assets/basic.css';

const online = ref(false);
const transport = ref('N/A');

// ---------------------------------------------------- GLOBAL SOCKET
onMounted(() => {
    Game.socket.next(socket);
    Game.addPlatforms([
        new Platform({ x: 0, y: 0, width: '100%', height: '56px', background: 'url("/assets/level1_floor.png") repeat-x', game, id: 'main' }),
    ]);
    new Watch();
});

// ---------------------------------------------------- DISCONNECT
function onDisconnect() {
    online.value = false;
    transport.value = 'N/A';
}

socket.on('disconnect', onDisconnect);

const { data } = await useFetch('https://api.ipify.org?format=json');

useHead({
    title: 'Super Mario Bros Online',
    script: [
        {
            src: 'core/rxjs.umd.min.js',
            body: true,
        },
        {
            src: 'core/functions.js',
            body: true,
        },
        {
            src: 'core/event.js',
            body: true,
        },
        {
            src: 'core/collision.js',
            body: true,
        },
        {
            src: `core/index.js`,
            body: true,
        },
        {
            src: `core/person.js`,
            body: true,
        },
        {
            src: `core/sprite_css.js`,
            body: true,
        },
        {
            src: `core/game.js`,
            body: true,
        },
        {
            src: `core/platform.js`,
            body: true,
        },
        {
            src: `core/movimentation.js`,
            body: true,
        },
        {
            src: `core/player.js`,
            body: true,
        },
        {
            src: `core/decoration.js`,
            body: true,
        },
        {
            src: 'core/items.js',
            body: true,
        },
        {
            src: 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js',
            body: true
        },
        {
            src: 'core/animations.js',
            body: true
        }
    ],
});
</script>

<template>
    <div
        style="
            z-index: 1;
            position: fixed;
            right: 15px;
            top: 15px;
            user-select: none;
            text-shadow: 1px 1px 0px #fff, -2px -1px 0px #fff, -2px 1px 0px #fff;
            font-weight: bold;
            font-size: 26px;
        "
    >
        {{ data.ip }}
    </div>
    <div>
        <div id="game">
            <div id="content">
                <slot />
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
    /* transform: scaleY(-1); */
    height: 100vh;

    & .player {
        z-index: 500;
    }

    & .platform {
        z-index: 500;
    }
}

</style>
