import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import connection from '../../../database/connectionHandler';

export const getUserById = async (userId: string): Promise<User | false> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    const user = await repo.findOne({ id: userId });

    if (!user) return false;

    const { type, status, email, id } = user;

    return { id, status, email, type };
};
