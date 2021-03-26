import * as UserApi from './user';
import * as LoginApi from './login';
import { Router } from 'express';

const router = Router();

router.use('/login', LoginApi.Router);
router.use('/user', UserApi.Router);

export const ApiRoute = router;
