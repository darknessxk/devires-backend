import { getRepository } from 'typeorm';
import { User } from '../../database/models/User';
import { Type } from '../../database/models/Type';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { generateUser } from './generateUser';
import { randomNumber } from '../randomNumber';
import { get as dbGetConn } from '../../database/connectionHandler';

export const seedDatabase = async (): Promise<void> => {
    const connection = await dbGetConn();

    await connection.query('PRAGMA foreign_keys=OFF');
    await connection.synchronize();
    await connection.query('PRAGMA foreign_keys=ON');

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

    users.push({ ...generateUser(), email: 'root@jest.ts', type: types[0] });
    users.push({ ...generateUser(), email: 'admin@jest.ts', type: types[1] });
    users.push({ ...generateUser(), email: 'default@jest.ts', type: types[2] });

    for (let u = 0; u < 7; u++) {
        const type = types[randomNumber(types.length - 1)];
        users.push({ ...generateUser(), type });
    }

    await userRepo.insert(users);
};
