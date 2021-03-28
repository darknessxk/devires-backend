import { Router as ERouter } from 'express';
import * as UserApi from './';
import { authentication } from '../../../middleware/authentication';
import { access } from '../../../middleware/access';
import { checkAccess } from '../../../utils/checkAccess';

const router = ERouter();

router.use(authentication);

router.get('/', async (req, res) => {
    const { user, body } = req;

    if (user) {
        if (checkAccess(user.type.description)) {
            res.send(await UserApi.listUsers(body || {}));
        } else {
            res.send(await UserApi.listUsers({ id: user.id }));
        }
    } else {
        res.sendStatus(401);
    }
});

router.get('/:id', access, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).end();
    } else {
        res.send(await UserApi.getUserById(id));
    }
});

router.post('/', access, async (req, res) => {
    const { email, status, password, type } = req.body;
    res.send(await UserApi.createUser({ email, status, password, type }));
});

router.delete('/', access, async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).end();
    } else {
        res.send(await UserApi.deleteUser(id));
    }
});

router.patch('/', access, async (req, res) => {
    const { id, email, status, password, type } = req.body;

    if (!id) {
        res.status(400).end();
    } else {
        res.send(await UserApi.updateUser(id, { email, status, password, type }));
    }
});

export const Router = router;
