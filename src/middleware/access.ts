import { Request, Response, NextFunction } from 'express';
import { checkAccess } from '../utils/checkAccess';

export const access = (req: Request, res: Response, next: NextFunction): void => {
    const { user } = req;

    if (user) {
        if (checkAccess(user.type.description)) {
            next();
        } else {
            res.status(402).send({ msg: 'Access denied' });
        }
    } else {
        res.status(400).send({ msg: 'Invalid token' });
    }
};
