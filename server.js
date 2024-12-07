import  dotenv  from 'dotenv';
dotenv.config();

import findportAvaible from './src/config/findPortAvaible.js';
import { createServer } from 'node:http';
import app from './src/config/app.js';
import SocketServer from './src/sockets/chatSockets.js';

const server = createServer(app);
const socket = new SocketServer(server);

const PORT = await findportAvaible(process.env.PORT ?? 80);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


