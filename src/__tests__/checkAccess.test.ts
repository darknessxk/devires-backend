import { checkAccess } from '../utils';

describe('access check util', () => {
    test('deny access', () => {
        expect(checkAccess('anything invalid')).toBeFalsy();
    });

    test('grant access', () => {
        expect(checkAccess('Root')).toBeTruthy();
    });
});
