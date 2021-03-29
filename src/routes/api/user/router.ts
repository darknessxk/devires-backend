import { Router as ERouter } from 'express';
import * as UserApi from './';
import { authentication } from '../../../middleware/authentication';
import { access } from '../../../middleware/access';
import { checkAccess } from '../../../utils';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User as DbUser } from '../../../database/models/User';

const router = ERouter();

router.use(authentication);

router.get('/', async (req, res) => {
    const { user, body } = req;

    if (!user) {
        res.sendStatus(401).end();
        return;
    }

    const payload: QueryDeepPartialEntity<DbUser> =
         checkAccess(user.type.description)
             ? (body || {})
             : { id: user.id };

    res.send(await UserApi.listUsers(payload));
});

router.get('/:id', access, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).end();
        return;
    }

    res.send(await UserApi.getUserById(id));
});

router.post('/', access, async (req, res) => {
    const { email, status, password, type } = req.body;

    const result = await UserApi.createUser({ email, status, password, type });

    res.sendStatus(result ? 201 : 409);
});

router.delete('/', access, async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).end();
        return;
    }

    const result = await UserApi.deleteUser(id);
    res.sendStatus(result ? 204 : 409);
});

router.patch('/', access, async (req, res) => {
    const { id, email, status, password, type } = req.body;

    if (!id) {
        res.status(400).end();
        return;
    }

    const result = await UserApi.updateUser(id, { email, status, password, type });

    console.log({ result, id });

    res.status(result ? 202 : 409).send({ user: result || {} });
});

export const Router = router;
