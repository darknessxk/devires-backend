import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import connection from '../../../database/connectionHandler';

export const listUsers = async (): Promise<User[]> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    const users = await repo.find();

    return users && users.map(({ type, status, email, id }) => ({ id, status, email, type }));
};
