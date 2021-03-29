import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import { initialize as dbInit } from '../../../database/connectionHandler';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { getRepository } from 'typeorm';

export const listUsers = async (data?: QueryDeepPartialEntity<DbUser>): Promise<User[]> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    let users: DbUser[];
    if (data) {
        users = await repo.find({ where: data, relations: ['type'] });
    } else {
        users = await repo.find({ relations: ['type'] });
    }

    return users && users.map(({ type, status, email, id }) => ({ id, status, email, type }));
};
