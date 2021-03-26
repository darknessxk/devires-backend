import { JWK, fromKeyLike } from 'jose/jwk/from_key_like';
import fs from 'fs';

export const getJwtKey = async (type: 'PBK' | 'PVK'): Promise<JWK> => {
    const KEY = process.env[`JWT_${type}`];

    if (KEY) {
        const fileBuffer = fs.readFileSync(KEY);

        return fromKeyLike(fileBuffer);
    } else {
        throw new Error(`JWT_${type} environment is missing`);
    }
};
