import { Router as ERouter } from 'express';
import { login } from './login';
import { IsEmail } from 'class-validator';
import { signJwt } from '../../../utils';
const router = ERouter();

router.post('/', async (req, res) => {
    const {
        body: {
            email, password
        }
    } = req;

    if (!email || !password) {
        res.status(400).end();
        return;
    }

    if (!IsEmail(email)) {
        res.status(400).end();
    }

    const loginResult = await login(email, password);

    if (!loginResult) {
        res.status(401).end();
    } else {
        const token = signJwt(loginResult);
        res.status(200).send({ token });
    }
});

export const Router = router;
