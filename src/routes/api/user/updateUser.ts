import { User as DbUser } from '../../../database/models/User';
import connection from '../../../database/connectionHandler';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../../../types';

export const updateUser = async (id: string, data: QueryDeepPartialEntity<DbUser>): Promise<User | false> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    let user = await repo.findOne(id);

    if (!user) return false;

    user = { ...user, ...data as DbUser };

    return await repo.save(user);
};
