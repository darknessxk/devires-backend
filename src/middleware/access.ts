import { Response, NextFunction, Request } from 'express';
import { checkAccess } from '../utils';

export const access = (req: Request, res: Response, next: NextFunction): void => {
    const {
        user: {
            type: {
                description
            }
        }
    } = req;

    if (checkAccess(description)) {
        next();
    } else {
        res.status(401).send({ msg: 'Access denied' });
    }
};
