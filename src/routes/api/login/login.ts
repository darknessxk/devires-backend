import { User as DatabaseUser } from '../../../database/models/User';
import { User } from '../../../types';
import getConnection from '../../../database/getConnection';
import { passwordHash } from '../../../utils';

export const login = async (email: string, password: string): Promise<User | false> => {
    const connection = await getConnection();
    const userRepository = connection.getRepository(DatabaseUser);
    const hashed = passwordHash(password);

    const user = await userRepository.findOne({
        where: {
            email,
            password: hashed
        }
    });

    return user as User || false;
};
