import { Server } from '../server';
import request from 'supertest';
import connectionHandler from '../database/connectionHandler';
import dotenv from 'dotenv';

describe('Api /login Route', () => {
    const app = Server();
    const loginInfo = {
        email: 'testing@jest.ts',
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
