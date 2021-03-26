import { getJwtKey } from '../utils';

test('getJwtKey without env variable JWT_PBK', () => {
    expect(() => getJwtKey('PBK')).toThrow('JWT_PBK environment is missing');
});

test('getJwtKey with env variable JWT_PBK', () => {
    expect(() => getJwtKey('PBK')).toBeDefined();
});

test('getJwtKey without env variable JWT_PVK', () => {
    expect(() => getJwtKey('PVK')).toThrow('JWT_PVK environment is missing');
});

test('getJwtKey with env variable JWT_PVK', () => {
    expect(() => getJwtKey('PVK')).toBeDefined();
});
