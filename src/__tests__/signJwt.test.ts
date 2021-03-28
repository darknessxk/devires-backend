import { signJwt } from '../utils';
import dotenv from 'dotenv';

dotenv.config({ path: '.test.env' });

test('signature', () => {
    try {
        const response = signJwt({ test: '1234' });
        expect(response).toBeDefined();
    } catch (e) {
        expect(e).not.toBeDefined();
    }
});
