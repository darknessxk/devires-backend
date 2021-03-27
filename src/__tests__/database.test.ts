import { createConnection, getConnection, Entity, getRepository } from 'typeorm';
import { User } from '../database/models/User';
import { Type } from '../database/models/Type';
import { passwordHash } from '../utils';

beforeEach(async () => {
    return createConnection({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [User, Type],
        synchronize: true,
        logging: false
    });
});

afterEach(async () => {
    return getConnection().close();
});

test('check if is able to fetch user repo', async () => {
    try {
        const repo = await getRepository(User);
        expect(repo).toBeDefined();
    } catch (e) {
        expect(e).not.toBeDefined();
    }
});

test('check if is able to fetch type repo', async () => {
    try {
        const repo = await getRepository(Type);
        expect(repo).toBeDefined();
    } catch (e) {
        expect(e).not.toBeDefined();
    }
});

test('check if is able to create user', async () => {
    try {
        const repo = await getRepository(User);
        expect(repo).toBeDefined();

        const typeRepo = await getRepository(Type);
        expect(repo).toBeDefined();

        const type = await typeRepo.findOneOrFail({
            where: {
                description: 'Admin'
            }
        });

        repo.insert({
            status: true,
            email: 'jest@jest.com',
            password: passwordHash('one-cat'),
            type
        });
    } catch (e) {
        expect(e).not.toBeDefined();
    }
});
