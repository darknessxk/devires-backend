import { createConnection, Connection, getRepository } from 'typeorm';
import { User } from './models/User';
import { Type } from './models/Type';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { randomNumber } from '../utils/randomNumber';
import { generateUser } from '../utils/test/generateUser';

let connectionCache: Connection;

export default {
    get: async (testMode: boolean = false) => {
        if (connectionCache) return connectionCache;

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
            for (let u = 0; u < 10; u++) {
                const type = types[randomNumber(types.length - 1)];
                users.push({ ...generateUser(), type });
            }

            await userRepo.insert(users);
        } else {
            connectionCache = await createConnection();
        }

        return connectionCache;
    },
    close: async () => {
        if (connectionCache) connectionCache.close();
    }
};
