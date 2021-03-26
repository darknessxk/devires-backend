import { Router } from 'express';
import login from './login';
import user from './user';

const router = Router();

router.use('/user', user);
router.use('/login', login);

export default router;
