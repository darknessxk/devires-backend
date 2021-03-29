import { Request, Response, NextFunction } from 'express';
import { checkAccess } from '../utils';

export const access = (req: Request, res: Response, next: NextFunction): void => {
    const { user } = req;

    if (user) {
        if (checkAccess(user.type.description)) {
            next();
        } else {
            res.status(401).send({ msg: 'Access denied' });
        }
    } else {
        res.status(400).send({ msg: 'Invalid token' });
    }
};
