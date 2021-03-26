import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('...');
});

router.post('/', (req, res) => {
    res.send('...');
});

router.patch('/', (req, res) => {
    res.send('...');
});

router.delete('/', (req, res) => {
    res.send('...');
});

export default router;
