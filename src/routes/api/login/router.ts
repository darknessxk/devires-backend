import { Router as ERouter } from 'express';
import { login } from './login';
import { isEmail } from 'class-validator';
import { signJwt } from '../../../utils';
const router = ERouter();

router.post('/', async (req, res) => {
    const {
        body: {
            email, password
        }
    } = req;

    if (!email || !password) {
        res.sendStatus(400).end();
        return;
    }

    if (!isEmail(email)) {
        res.sendStatus(400).end();
        return;
    }

    const loginResult = await login(email, password);

    if (!loginResult) {
        res.sendStatus(401).end();
        return;
    }

    const token = signJwt(loginResult);
    res.status(200).send({ token });
});

export const Router = router;
