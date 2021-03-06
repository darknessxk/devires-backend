import { Router } from 'express';
import { ApiRoute } from './api';

const router = Router();

router.use('/api', ApiRoute);

export default router;
