import { Server } from 'socket.io';

export default class SocketServer {
  
  constructor(server) {
      this.#setUpSocket(server);
  }

  #setUpSocket(server){
    const io = new Server(server);

    io.on('connection', (socket) => {
    /*   console.log('Someone is connected'); */
  
      socket.on('chat message', (msg) => {
       /*  console.log(msg); */
        io.emit('chat message', msg);
      });
  
      socket.on('disconnect', () => {
      /*   console.log('Someone is disconnected'); */
      });
    });
  }

}