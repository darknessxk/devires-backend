import { User as DbUser } from '../../../database/models/User';
import { initialize as dbInit } from '../../../database/connectionHandler';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { getRepository } from 'typeorm';

export const createUser = async (data: QueryDeepPartialEntity<DbUser>): Promise<boolean> => {
    await dbInit();
    const repo = getRepository(DbUser);

    const result = await repo.insert(data);

    return result.identifiers.length > 0;
};
