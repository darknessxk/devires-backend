import { createConnection, Connection } from 'typeorm';

let connectionCache: Connection;



export default {
    get: async () => {
        if (connectionCache) return connectionCache;

        connectionCache = await createConnection();

        return connectionCache;
    },
    close: async () => {
        if (connectionCache) connectionCache.close();
    }
};
