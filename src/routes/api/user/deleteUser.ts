import { User as DbUser } from '../../../database/models/User';
import { initialize as dbInit } from '../../../database/connectionHandler';
import { getRepository } from 'typeorm';

export const deleteUser = async (id: string): Promise<boolean> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);
    const user = await repo.findOne(id);

    if (!user) return false;

    const result = await repo.remove([user]);

    return (result.length || 0) > 0;
};
