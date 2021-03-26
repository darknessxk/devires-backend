import { getJwtKey } from '../utils';

test('getJwtKey without env variable JWT_PBK', () => {
    delete process.env.JWT_PBK;
    expect(() => getJwtKey('PBK')).toThrow('JWT_PBK environment is missing');
});

test('getJwtKey with env variable JWT_PBK', () => {
    expect(() => {
        process.env.JWT_PBK = './keys/jwt.pbk';
        getJwtKey('PBK');
    }).not.toThrow();
});

test('getJwtKey without env variable JWT_PVK', () => {
    delete process.env.JWT_PVK;
    expect(() => getJwtKey('PVK')).toThrow('JWT_PVK environment is missing');
});

test('getJwtKey with env variable JWT_PVK', () => {
    expect(() => {
        process.env.JWT_PVK = './keys/jwt.pvk';
        getJwtKey('PVK');
    }).not.toThrow();
});
