import { User } from '../../../types';
import getConnection from '../../../database/getConnection';

export const fetchInformation = async (token: string, id?: string): Promise<User | false> => {
    const connection = await getConnection();

    return false;
};
