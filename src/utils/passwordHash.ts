import { createHash } from 'crypto';

export const passwordHash = (pwd: string) => {
    const hash = createHash('sha256');
    return hash
        .update(pwd)
        .digest()
        .toString('hex');
};
