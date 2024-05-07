import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket: any) => {
    let users = io.engine.clientsCount;

    // emit
    io.sockets.emit('login', {users, id: socket.id});
    
    // listen
    socket.on('disconnect', (event: any) => {
      io.sockets.emit('logout', socket.id);
    })
    
    socket.on('keydown', (event: {player: string, key: string}) => {
      io.sockets.emit('keydownPressed', event);
    });

    socket.on('keyup', (event: {player: string, key: string}) => {
      io.sockets.emit('keyupPressed', event);
    });
    
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});