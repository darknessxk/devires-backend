import { createConnection, Connection, getRepository } from 'typeorm';
import { User } from './models/User';
import { Type } from './models/Type';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { randomNumber } from '../utils/randomNumber';
import { generateUser } from '../utils/test/generateUser';

let connectionCache: Connection;

export default {
    get: async (): Promise<Connection> => {
        if (connectionCache) return connectionCache;
        const testMode = process.env.NODE_ENV === 'test';

        if (testMode) {
            connectionCache = await createConnection({
                type: 'sqlite',
                database: ':memory:',
                dropSchema: true,
                entities: [User, Type],
                synchronize: false,
                logging: false
            });

            await connectionCache.query('PRAGMA foreign_keys=OFF');
            await connectionCache.synchronize();
            await connectionCache.query('PRAGMA foreign_keys=ON');

            const userRepo = await getRepository(User);
            const typeRepo = await getRepository(Type);

            const count = await typeRepo.count({ where: { description: ['Root', 'Admin', 'Default'] } });

            if (count === 0) {
                await typeRepo.insert({ description: 'Root' });
                await typeRepo.insert({ description: 'Admin' });
                await typeRepo.insert({ description: 'Default' });
            }

            const types = await typeRepo.find();

            const users: QueryDeepPartialEntity<User>[] = [];

            users.push({ ...generateUser(), id: 'c6fb7cd5-a111-4fb2-bf96-65869c1932c7', email: 'root@jest.ts', type: types[0] });
            users.push({ ...generateUser(), type: types[1] });
            users.push({ ...generateUser(), id: '2e540e08-a293-491a-8b8d-a18a15512184', email: 'default@jest.ts', type: types[2] });

            for (let u = 0; u < 7; u++) {
                const type = types[randomNumber(types.length - 1)];
                users.push({ ...generateUser(), type });
            }

            await userRepo.insert(users);
        } else {
            connectionCache = await createConnection();
        }

        return connectionCache;
    },
    close: async (): Promise<void> => {
        if (connectionCache) await connectionCache.close();
    }
};
