import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import { initialize as dbInit } from '../../../database/connectionHandler';
import { passwordHash } from '../../../utils';
import { getRepository } from 'typeorm';

export const login = async (email: string, pass: string): Promise<User | false> => {
    await dbInit();
    const userRepository = getRepository(DbUser);
    const password = passwordHash(pass);

    const user = await userRepository.findOne({
        where: { email, password },
        relations: ['type'],
        select: ['id', 'status', 'email', 'type']
    });

    return user as User || false;
};
