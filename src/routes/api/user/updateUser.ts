import { User as DbUser } from '../../../database/models/User';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../../../types';
import { getRepository } from 'typeorm';
import { initialize as dbInit } from '../../../database/connectionHandler';

export const updateUser = async (id: string, data: QueryDeepPartialEntity<DbUser>): Promise<User | undefined> => {
    await dbInit();
    const repo = getRepository(DbUser);

    try {
        let user = await repo.findOneOrFail(id);

        user = { ...user, ...data as DbUser };

        return await repo.save(user);
    } catch {
        return undefined;
    }
};
