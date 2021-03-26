import { sign } from 'jsonwebtoken';
import { getJwtKey } from './';

export const signJwt = <T extends object>(data: T): string => {
    const key = getJwtKey('PVK');
    return sign(data, key, { algorithm: 'RS256' });
};
