import { User as DatabaseUser } from '../../../database/models/User';
import { User } from '../../../types';
 import connection from '../../../database/connectionHandler';
import { passwordHash } from '../../../utils';

export const login = async (email: string, password: string): Promise<User | false> => {
    const conn = await connection.get();
    const userRepository = conn.getRepository(DatabaseUser);
    const hashed = passwordHash(password);

    const user = await userRepository.findOne({
        where: {
            email,
            password: hashed
        }
    });

    return user as User || false;
};
