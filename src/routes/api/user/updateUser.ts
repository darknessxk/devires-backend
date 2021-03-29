import { User as DbUser } from '../../../database/models/User';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../../../types';
import { getRepository } from 'typeorm';
import { initialize as dbInit } from '../../../database/connectionHandler';

export const updateUser = async (id: string, data: QueryDeepPartialEntity<DbUser>): Promise<User | undefined> => {
    await dbInit();
    const repo = getRepository(DbUser);

    let user = await repo.findOne(id);

    if (!user) return;

    user = { ...user, ...data as DbUser };

    return await repo.save(user);
};
