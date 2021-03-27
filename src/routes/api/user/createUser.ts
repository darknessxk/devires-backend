import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import connection from '../../../database/connectionHandler';

export const createUser = async (id: string): Promise<User[]> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    const users = await repo.find({ id });

    return users && users.map(({ type, status, email, id }) => ({ id, status, email, type }));
};
