import { createHash } from 'crypto';

export const passwordHash = (password: string): string => {
    const hash = createHash('sha256');
    return hash
        .update(password)
        .digest()
        .toString('hex');
};
