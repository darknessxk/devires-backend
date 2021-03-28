import { User as DbUser } from '../../../database/models/User';
import connection from '../../../database/connectionHandler';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export const createUser = async (data: QueryDeepPartialEntity<DbUser>): Promise<boolean> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    const result = await repo.insert(data);

    return result.identifiers.length > 0;
};
