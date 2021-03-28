import { User } from '../database/models/User';
import { Type } from '../database/models/Type';
import connectionHandler from '../database/connectionHandler';
import { getRepository } from 'typeorm';
import { generateUser } from '../utils/test/generateUser';

describe('database', () => {
    beforeAll(async () => connectionHandler.get());

    afterAll(async () => connectionHandler.close());

    test('find admin user', (done) => {
        (async () => {
            const userRepo = await getRepository(User);
            const typeRepo = await getRepository(Type);

            const type = await typeRepo.findOne({
                where: {
                    description: 'Admin'
                }
            });

            const user = await userRepo.findOne({
                where: { type }
            });

            expect(user).toBeDefined();
            done();
        })();
    });

    test('find root user', (done) => {
        (async () => {
            const userRepo = await getRepository(User);
            const typeRepo = await getRepository(Type);

            const type = await typeRepo.findOne({
                where: {
                    description: 'Root'
                }
            });

            const user = await userRepo.findOne({
                where: { type }
            });

            expect(user).not.toBeUndefined();
            done();
        })();
    });

    test('find default user', (done) => {
        (async () => {
            const userRepo = await getRepository(User);
            const typeRepo = await getRepository(Type);

            const type = await typeRepo.findOne({
                where: {
                    description: 'Default'
                }
            });

            if (type) {
                const user = await userRepo.findOne({ loadRelationIds: true, where: { type: type.id } });
                expect(user).toBeDefined();
            }

            done();
        })();
    });

    test('find invalid type', (done) => {
        (async () => {
            const typeRepo = await getRepository(Type);

            const type = await typeRepo.findOne({
                where: {
                    description: `${Date.now()}AwkwardRandomNameBasedOnTime?${Date.now()}`
                }
            });

            expect(type).not.toBeDefined();
            done();
        })();
    });

    test('check if is able to create user', (done) => {
        (async () => {
            const userRepo = await getRepository(User);
            const typeRepo = await getRepository(Type);

            try {
                const type = await typeRepo.findOneOrFail({
                    where: {
                        description: 'Admin'
                    }
                });

                const result = await userRepo.insert({ ...generateUser(), type });

                expect(result.identifiers.length > 0).toBeTruthy();
            } catch (e) {
                expect(e).not.toBeDefined();
            }
            done();
        })();
    });
});
