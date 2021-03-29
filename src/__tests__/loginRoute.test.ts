import { Server } from '../server';
import request from 'supertest';
import { close as dbClose, initialize as dbInit } from '../database/connectionHandler';
import dotenv from 'dotenv';
import { seedDatabase } from '../utils/test';

describe('Api /login Route', () => {
    const app = Server();
    const loginInfo = {
        email: 'root@jest.ts',
        password: '1234'
    };

    dotenv.config({ path: '.test.env' });
    beforeAll(async () => {
        await dbInit();
        return seedDatabase();
    });
    afterAll(async () => dbClose());

    test('no email', () => {
        return request(app)
            .post('/api/login')
            .send({ ...loginInfo, email: undefined })
            .expect(400);
    });

    test('no password', () => {
        return request(app)
            .post('/api/login')
            .send({ ...loginInfo, password: undefined })
            .expect(400);
    });

    test('invalid email', () => {
        return request(app)
            .post('/api/login')
            .send({ ...loginInfo, email: 'INVALID' })
            .expect(400);
    });

    test('invalid password', () => {
        return request(app)
            .post('/api/login')
            .send({ ...loginInfo, password: 'INVALID' })
            .expect(401);
    });

    test('valid login', () => {
        return request(app)
            .post('/api/login')
            .send(loginInfo)
            .expect(200);
    });
});
