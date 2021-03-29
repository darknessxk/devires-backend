import { Server } from '../server';
import request from 'supertest';
import { close as dbClose, initialize as dbInit } from '../database/connectionHandler';
import dotenv from 'dotenv';
import { signJwt } from '../utils';
import { getRepository } from 'typeorm';
import { Type, User as DbUser } from '../database/models';
import { generateUser, seedDatabase } from '../utils/test';
import { User } from '../types';

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
        const userRepo = getRepository(DbUser);

        const defaultUser = await userRepo.findOneOrFail({
            where: {
                email: 'default@jest.ts'
            },
            relations: ['type']
        }) as User;

        const rootUser = await userRepo.findOneOrFail({
            where: {
                email: 'root@jest.ts'
            },
            relations: ['type']
        }) as User;

        jwtRoot = `Bearer ${signJwt(rootUser)}`;
        targetId = defaultUser.id;
        jwtDefault = `Bearer ${signJwt(defaultUser)}`;

        done();
    });

    afterAll(async () => dbClose());

    test('access deny', () => {
        return request(app).get('/api/user').expect(400);
    });

    test('invalid header', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', 'No Bearer')
            .expect(400);
    });

    test('invalid token', () => {
        return request(app)
            .get('/api/user')
            .set('authorization', 'Bearer invalid token')
            .expect(/[iI]nvalid [tT]oken/)
            .expect(400);
    });

    test('user not found', () => {
        return request(app)
            .post('/api/user/invalidId')
            .set('authorization', jwtRoot)
            .expect(404);
    });

    test('invalid group', () => {
        return request(app)
            .post('/api/user')
            .set('authorization', jwtDefault)
            .expect(/[Aa]ccess [Dd]enied/)
            .expect(401);
    });

    test('invalid group', () => {
        return request(app)
            .post('/api/user')
            .set('authorization', jwtDefault)
            .expect(/[Aa]ccess [Dd]enied/)
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
            .expect(/api@testing\.jest/)
            .expect(200);
    });

    test('deny delete without access', () => {
        return request(app)
            .delete('/api/user')
            .send({ id: targetId })
            .set('authorization', jwtDefault)
            .expect(401);
    });

    test('deny create without access', () => {
        return request(app)
            .post('/api/user')
            .set('authorization', jwtDefault)
            .expect(401);
    });

    test('deny update without access', () => {
        return request(app)
            .patch('/api/user')
            .set('authorization', jwtDefault)
            .expect(401);
    });

    test('delete user without id', () => {
        return request(app)
            .delete('/api/user')
            .set('authorization', jwtRoot)
            .send({ id: undefined })
            .expect(400);
    });

    test('delete user', () => {
        return request(app)
            .delete('/api/user')
            .set('authorization', jwtRoot)
            .send({ id: targetId })
            .expect(204);
    });
});
