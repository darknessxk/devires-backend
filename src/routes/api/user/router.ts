import { Router as ERouter } from 'express';
import * as UserApi from './';

const router = ERouter();

router.get('/', async (req, res) => {
    res.send(await UserApi.listUsers());
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.send(await UserApi.getUserById(id));
});

router.post('/', async (req, res) => {
    const { email, status, password, type } = req.body;
    res.send(await UserApi.createUser({ email, status, password, type }));
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    res.send(await UserApi.deleteUser(id));
});

router.patch('/', async (req, res) => {
    const { id, email, status, password, type } = req.body;
    res.send(await UserApi.updateUser(id, { email, status, password, type }));
});

export const Router = router;
