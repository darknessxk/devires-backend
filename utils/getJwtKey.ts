import { JWK, fromKeyLike } from 'jose/jwk/from_key_like';
import fs from 'fs';

export const getPrivateJwtKey = async (): Promise<JWK> => {
    const { JWT_PVK } = process.env;

    if (JWT_PVK) {
        const fileBuffer = fs.readFileSync(JWT_PVK);

        return fromKeyLike(fileBuffer);
    } else {
        throw new Error('JWT_PVK environment is missing');
    }
};
