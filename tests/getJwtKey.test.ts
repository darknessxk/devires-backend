import { getJwtKey } from '../utils';

test('getJwtKey without env variable', () => {
    expect(() => getJwtKey('PBK')).toThrow('JWT_PBK environment is missing');
});
