import { checkJwt, signJwt } from '../utils';
import dotenv from 'dotenv';

dotenv.config({ path: '.test.env' });

test('fail to parse invalid value', () => {
    try {
        checkJwt('invalid stuff');
    } catch (e) {
        expect(e).toBeDefined();
    }
});

test('parse valid jwt token', () => {
    const testKey = `TEST-${Math.random() * 1024 * Date.now()}`;

    const token = signJwt({ [testKey]: true });
    const parsedValue = checkJwt(token);
    expect(Object.keys(parsedValue).includes(testKey)).toBeTruthy();
});
