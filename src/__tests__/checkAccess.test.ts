import { checkAccess } from '../utils/checkAccess';

describe('access check util', () => {
    test('deny access', () => {
        expect(checkAccess('anything invalid')).toBeFalsy();
    });

    test('grant access', () => {
        expect(checkAccess('Root')).toBeTruthy();
    });
});
