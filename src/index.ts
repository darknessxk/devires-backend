import { Server } from './server';

const { env: { PORT } } = process;
const httpPort = PORT || 1030;

Server()
    .on('listening', () => {
        console.log('Listening to port:', httpPort);
    })
    .listen(httpPort);
