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
    beforeAll(async () => connectionHandler.get());
    afterAll(async () => connectionHandler.close());

    test('test login', () => {
        return request(app)
            .post('/api/login')
            .send(loginInfo)
            .expect(200);
    });
});
