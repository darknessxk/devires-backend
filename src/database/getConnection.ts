import { createConnection, Connection } from 'typeorm';

let connectionCache: Connection;

export default async () => {
    if (connectionCache) return connectionCache;

    connectionCache = await createConnection();

    return connectionCache;
};
