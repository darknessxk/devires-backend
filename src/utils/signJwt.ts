import { sign } from 'jsonwebtoken';
import { getJwtKey } from './';

export const signJwt = <T extends Record<string, unknown>>(data: T): string => {
    const key = getJwtKey('PVK');
    return sign(JSON.stringify(data), key, { algorithm: 'RS256' });
};
