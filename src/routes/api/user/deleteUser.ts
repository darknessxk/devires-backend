import { User as DbUser } from '../../../database/models/User';
import connection from '../../../database/connectionHandler';

export const deleteUser = async (id: string): Promise<boolean> => {
    const conn = await connection.get();
    const repo = conn.getRepository(DbUser);

    const result = await repo.delete({ id });

    return (result.affected || 0) > 0;
};
