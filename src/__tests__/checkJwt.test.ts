import { checkJwt, signJwt } from '../utils';
import dotenv from 'dotenv';

dotenv.config({ path: '.test.env' });

type ITestJsonData = {
    stringValue: string;
}

test('fail to parse invalid value', () => {
    try {
        checkJwt('invalid stuff');
    } catch (e) {
        expect(e).toBeDefined();
    }
});

test('parse valid jwt token', () => {
    const stringValue = `TEST-${Math.random() * 1024 * Date.now()}`;
    const data: ITestJsonData = {
        stringValue
    };

    const token = signJwt(data);
    const parsedValue = checkJwt(token) as ITestJsonData;
    expect(parsedValue.stringValue === stringValue).toBeTruthy();
});
