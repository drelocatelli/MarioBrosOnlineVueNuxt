<script setup>
import { socket } from '../socket.ts';

const online = ref(false);
const transport = ref('N/A');

// ---------------------------------------------------- GLOBAL SOCKET
onMounted(() => {
    Game.socket.next(socket);
    Core.listen((socket) => {
      // listen playes login
        socket.on('login', (event) => {
            console.log(`%c Entrou no game: ${event.id}`, 'background:green; color:white;');
            Game.addPlayers([new Player({ id: event.id, x: 50, y: 65, background: 'url("/assets/mario.png") no-repeat', css: Person.initial() })]);
        });

        socket.on('logout', (playerId) => {
            Game.removePlayer(playerId);
        });
    });
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
}
</style>
