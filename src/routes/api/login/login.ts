import { User as DatabaseUser } from '../../../database/models/User';
import { User } from '../../../types';

export const login = (username: string, password: string): User | false => {
    return false;
};
