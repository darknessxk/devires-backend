import { User } from '../../../types';
import connection from '../../../database/connectionHandler';

export const fetchInformation = async (token: string, id?: string): Promise<User | false> => {
    const conn = await connection.get();

    return false;
};
