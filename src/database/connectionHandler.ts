import { createConnection, Connection } from 'typeorm';
import { User, Type } from './models';

let connectionCache: Connection;

export const initialize = async (): Promise<void> => {
    if (connectionCache) return;

    const testMode = process.env.NODE_ENV === 'test';

    if (!testMode) {
        connectionCache = await createConnection();
        return;
    }

    connectionCache = await createConnection({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [User, Type],
        synchronize: false,
        logging: false
    });
};

export const get = async (): Promise<Connection> => {
    if (connectionCache) return connectionCache;
    await initialize();
    return connectionCache;
};

export const close = async (): Promise<void> => {
    if (connectionCache) await connectionCache.close();
};
