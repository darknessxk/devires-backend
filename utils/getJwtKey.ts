import fs from 'fs';

type JwtKeys = 'PBK' | 'PVK';

export const getJwtKey = async (type: JwtKeys): Promise<Buffer> => {
    const KEY = process.env[`JWT_${type}`];

    if (KEY) {
        return fs.readFileSync(KEY);
    } else {
        throw new Error(`JWT_${type} environment is missing`);
    }
};
