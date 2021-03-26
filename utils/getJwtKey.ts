import fs from 'fs';
import { JwtKeys } from '../types';

const keysCache: JwtKeys = {
    PBK: Buffer.alloc(1),
    PVK: Buffer.alloc(1)
};

export const getJwtKey = (type: keyof JwtKeys): Buffer => {
    const KEY = process.env[`JWT_${type}`];

    if (KEY) {
        if (keysCache[type].length > 2) {
            return keysCache[type];
        } else {
            keysCache[type] = fs.readFileSync(KEY);
        }
        return keysCache[type];
    } else {
        throw new Error(`JWT_${type} environment is missing`);
    }
};
