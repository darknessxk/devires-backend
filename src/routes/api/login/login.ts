import { User as DbUser } from '../../../database/models/User';
import { User } from '../../../types';
import connection from '../../../database/connectionHandler';
import { passwordHash } from '../../../utils';

export const login = async (email: string, pass: string): Promise<User | false> => {
    const conn = await connection.get();
    const userRepository = conn.getRepository(DbUser);
    const password = passwordHash(pass);

    const user = await userRepository.findOne({
        where: { email, password },
        relations: ['type'],
        select: ['id', 'status', 'email', 'type']
    });

    return user as User || false;
};
