import * as UserApi from '../routes/api/user';
import { generateUser, seedDatabase } from '../utils/test';
import { getRepository } from 'typeorm';
import { Type } from '../database/models/Type';
import { close as dbClose, initialize as dbInit } from '../database/connectionHandler';
import { User as DbUser } from '../database/models/User';
import { User } from '../types';

describe('api - user', () => {
    const targetEmail = 'api@testing.jest';
    let userData: User;

    beforeAll(async (done) => {
        await dbInit();
        await seedDatabase();

        const repoUser = await getRepository(DbUser);
        const users = await repoUser.find({ relations: ['type'] });

        if (!users) {
            throw new Error('Unable to find any user');
        }

        userData = users[0];

        done();
    });

    afterAll(async () => dbClose());

    test('get user by id', async () => {
        const user = await UserApi.getUserById(userData.id);
        expect(user && (user.id === userData.id && user.email === userData.email && user.type.id === userData.type.id)).toBeTruthy();
    });

    test('create user', async () => {
        const typeRepo = await getRepository(Type);

        const type = await typeRepo.findOneOrFail({ description: 'Default' });

        const result = await UserApi.createUser({
            ...generateUser(),
            type
        });
        expect(result).toBeTruthy();
    });

    test('update user', async () => {
        const user = await UserApi.updateUser(userData.id, { email: targetEmail });

        expect(user && user.email === targetEmail).toBeTruthy();
    });

    test('delete user', async () => {
        const result = await UserApi.deleteUser(userData.id);
        expect(result).toBeTruthy();
    });

    test('fetch user list', async () => {
        const users = await UserApi.listUsers();
        expect(users && users.length > 0).toBeTruthy();
    });
});
