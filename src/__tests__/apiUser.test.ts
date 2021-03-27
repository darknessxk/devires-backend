import * as UserApi from '../routes/api/user';

describe('api - user', () => {
    test('get user by id', async () => {
        await UserApi.getUserById("");
    });
});
