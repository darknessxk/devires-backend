import { passwordHash } from '../utils';

test('invalid hash', () => {
    expect(passwordHash('1234') !== '1234').toBeTruthy();
});

test('valid hash', () => {
    const hashed = passwordHash('1234');
    expect(hashed === passwordHash('1234')).toBeTruthy();
});
