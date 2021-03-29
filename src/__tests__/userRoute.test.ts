import { Server } from '../server';
import request from 'supertest';
import { close as dbClose, initialize as dbInit } from '../database/connectionHandler';
import dotenv from 'dotenv';
import { signJwt } from '../utils';
import { login } from '../routes/api/login';
import { getRepository } from 'typeorm';
import { Type } from '../database/models';
import { generateUser, seedDatabase } from '../utils/test';

describe('Api /user Route', () => {
    let targetId: string;
    const targetEmail = 'api@testing.jest';
    const app = Server();

    let jwtRoot = '';
    let jwtDefault = '';

    dotenv.config({ path: '.test.env' });
    beforeAll(async (done) => {
        await dbInit();
        await seedDatabase();

        {
            const loginResult = await login('root@jest.ts', '1234');

            if (loginResult) {
                jwtRoot = signJwt(loginResult);
            }
        }

        {
            const loginResult = await login('default@jest.ts', '1234');

            if (loginResult) {
                targetId = loginResult.id;
                jwtDefault = signJwt(loginResult);
            }
        }

        done();
    });

    afterAll(async () => dbClose());

    test('access deny', () => {
        return request(app).get('/api/user').expect(400);
    });

    test('invalid token', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', 'invalid token')
            .expect(/[iI]nvalid [tT]oken/)
            .expect(400);
    });

    test('invalid group', () => {
        return request(app)
            .post('/api/user')
            .set('authorization', jwtDefault)
            .expect(401);
    });

    test('create user', async () => {
        const typeRepo = await getRepository(Type);
        const type = await typeRepo.findOneOrFail({ description: 'Default' });

        return request(app)
            .post('/api/user')
            .set('authorization', jwtRoot)
            .send({
                ...generateUser(),
                type
            })
            .expect(201);
    });

    test('update user', () => {
        return request(app)
            .patch('/api/user')
            .set('authorization', jwtRoot)
            .send({
                id: targetId,
                email: targetEmail
            })
            .expect(202);
    });

    test('user list', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', jwtRoot)
            .expect(200);
    });

    test('get self', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', jwtDefault)
            .expect(200);
    });

    test('delete user', () => {
        return request(app)
            .delete('/api/user')
            .set('authorization', jwtRoot)
            .send({ id: targetId })
            .expect(204);
    });
});
