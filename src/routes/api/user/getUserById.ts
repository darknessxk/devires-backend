import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import { getRepository } from 'typeorm';
import { initialize as dbInit } from '../../../database/connectionHandler';

export const getUserById = async (userId: string): Promise<User | undefined> => {
    await dbInit();
    const repo = getRepository(DbUser);

    const user = await repo.findOne({ id: userId }, { relations: ['type'] });

    return user as User;
};
