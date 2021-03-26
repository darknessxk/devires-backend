import { getJwtKey } from './getJwtKey';
import { verify } from 'jsonwebtoken';

export const checkJwt = (token: string) => {
    const key = getJwtKey('PBK');
    return verify(token, key, { algorithms: ['RS256'] });
};
