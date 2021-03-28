import * as UserApi from '../routes/api/user';
import { generateUser } from '../utils/test/generateUser';
import { getRepository } from 'typeorm';
import { Type } from '../database/models/Type';
import connectionHandler from '../database/connectionHandler';

describe('api - user', () => {
    const targetId = 'c6fb7cd5-a111-4fb2-bf96-65869c1932c7';
    const targetEmail = 'api@testing.jest';

    beforeAll(async () => connectionHandler.get());
    afterAll(async () => connectionHandler.close());

    test('get user by id', async () => {
        const user = await UserApi.getUserById(targetId);
        expect(user && (user.id === targetId && user.type.description === 'Root')).toBeTruthy();
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
        const user = await UserApi.updateUser(targetId, { email: targetEmail });

        expect(user && user.email === targetEmail).toBeTruthy();
    });

    test('delete user', async () => {
        const result = await UserApi.deleteUser(targetId);
        expect(result).toBeTruthy();
    });

    test('fetch user list', async () => {
        const users = await UserApi.listUsers();
        expect(users && users.length > 0).toBeTruthy();
    });
});
