import { Request, Response, NextFunction } from 'express';
import { isJWT } from 'class-validator';
import { checkJwt } from '../utils';
import { User } from '../types';

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
    const {
        headers: { authorization }
    } = req;

    if (authorization) {
        const authSplit = 'Bearer';

        if (!authorization.includes(authSplit)) {
            res.sendStatus(400).end();
            return;
        }

        const jwtToken = authorization.split(authSplit)[1].substring(1);

        if (!isJWT(jwtToken)) {
            res.status(400).send({ msg: 'Invalid token' });
        }

        const token = checkJwt(jwtToken);

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
