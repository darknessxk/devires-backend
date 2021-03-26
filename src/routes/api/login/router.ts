import { Router as ERouter } from 'express';
const router = ERouter();

router.post('/', (req, res) => {
    res.send('!');
});

export const Router = router;
