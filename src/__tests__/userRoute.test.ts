import { Server } from '../server';
import request from 'supertest';
import connectionHandler from '../database/connectionHandler';
import dotenv from 'dotenv';
import { signJwt } from '../utils';
import { login } from '../routes/api/login';
import { getRepository } from 'typeorm';
import { Type } from '../database/models/Type';
import { generateUser } from '../utils/test/generateUser';

describe('Api /user Route', () => {
    const targetId = 'c6fb7cd5-a111-4fb2-bf96-65869c1932c7';
    const targetEmail = 'api@testing.jest';
    const app = Server();

    let jwtRoot = '';
    let jwtDefault = '';

    dotenv.config({ path: '.test.env' });
    beforeAll(async () => {
        {
            const loginUser = await login('root@jest.ts', '1234');

            if (loginUser) {
                jwtRoot = signJwt(loginUser);
            }
        }

        {
            const loginUser = await login('default@jest.ts', '1234');

            if (loginUser) {
                jwtDefault = signJwt(loginUser);
            }
        }

        return connectionHandler.get();
    });
    afterAll(async () => connectionHandler.close());

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

    test('test create user', async () => {
        const typeRepo = await getRepository(Type);
        const type = await typeRepo.findOneOrFail({ description: 'Default' });

        return request(app)
            .post('/api/user')
            .set('authorization', jwtRoot)
            .send({
                ...generateUser(),
                type
            })
            .expect(200);
    });

    test('test delete user', () => {
        return request(app)
            .delete('/api/user')
            .set('authorization', jwtRoot)
            .send({ id: targetId })
            .expect(200);
    });

    test('test update user', () => {
        return request(app)
            .patch('/api/user')
            .set('authorization', jwtRoot)
            .send({
                id: targetId,
                email: targetEmail
            })
            .expect(200);
    });

    test('test user list', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', jwtRoot)
            .expect(200);
    });

    test('test get self', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', jwtDefault)
            .expect(200);
    });
});