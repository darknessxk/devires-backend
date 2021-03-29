import { Router as ERouter } from 'express';
import * as UserApi from './';
import { authentication } from '../../../middleware/authentication';
import { access } from '../../../middleware/access';
import { checkAccess } from '../../../utils';

const router = ERouter();

router.use(authentication);

router.get('/', async (req, res) => {
    const {
        user: {
            id,
            type: { description }
        },
        body
    } = req;

    res.send(checkAccess(description)
        ? await UserApi.listUsers(body || {})
        : await UserApi.getUserById(id));
});

router.get('/:id', access, async (req, res) => {
    const { params: { id } } = req;

    if (!id) {
        res.status(400).end();
        return;
    }

    const result = await UserApi.getUserById(id);

    if (!result) {
        res.sendStatus(404).end();
        return;
    }

    res.send(result);
});

router.post('/', access, async (req, res) => {
    const { email, status, password, type } = req.body;

    const result = await UserApi.createUser({ email, status, password, type });

    res.sendStatus(result ? 201 : 409);
});

router.delete('/', access, async (req, res) => {
    const { body: { id } } = req;
    if (!id) {
        res.status(400).end();
        return;
    }

    const result = await UserApi.deleteUser(id);
    res.sendStatus(result ? 204 : 409);
});

router.patch('/', access, async (req, res) => {
    const { body: { id, email, status, password, type } } = req;

    if (!id) {
        res.status(400).end();
        return;
    }

    const result = await UserApi.updateUser(id, { email, status, password, type });

    res.status(result ? 202 : 409).send({ user: result || {} });
});

export const Router = router;
