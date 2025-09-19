import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();
  let players: string[] = [];
  
  io.bind(engine);

  io.on("connection", (socket: any) => {
    // all sockets
    let users = io.engine.clientsCount;
    
    // add player
    players.push(socket.id);
    const forwardedFor = socket.handshake.headers?.["x-forwarded-for"];
    const socketIp =
      (forwardedFor ? forwardedFor.split(",")[0] : socket.handshake.address) || "unknown";

    // emit
    io.sockets.emit('login', {users, id: socket.id, address: socketIp});
    io.sockets.emit('new_connection', {usersCount: users, id: socket.id});
    
    // listen
    socket.on('disconnect', (event: any) => {
      io.sockets.emit('logout', socket.id);

      // remove player
      players = players.filter((player) => player !== socket.id);
    })

    socket.on('name_changed', (event : {name: string, id: string}) => {
      io.sockets.emit('name_changed', event);
    });

    // watch keys
    socket.on('keydown', (event: {key: string}) => {
      (event as any)['player'] = socket.id;
      io.sockets.emit('player_movement', event);
    });

    socket.on('keyup', (event: {key: string}) => {
      (event as any)['player'] = socket.id;
      io.sockets.emit('player_movement', event);
    });

  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      //@ts-ignore
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      }
    }
  }));
});