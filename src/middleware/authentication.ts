import { Request, Response, NextFunction } from 'express';
import { isJWT } from 'class-validator';
import { checkJwt } from '../utils';
import { User } from '../types';

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
    const {
        headers: { authorization }
    } = req;

    if (authorization) {
        if (!isJWT(authorization)) {
            res.status(400).send({ msg: 'Invalid token' });
        }

        const token = checkJwt(authorization);

        if (!token) {
            res.status(400).send({ msg: 'Invalid token' });
        } else {
            req.user = token as User;
            next();
        }
    } else {
        res.status(400).send({ msg: 'Missing token' });
    }
};
