import { Router } from 'express';
import controllers from '../controllers/userControllers.js';

const router = Router();

router.get('/', controllers.getUserInfo);
router.get('/:id', controllers.getUserInfoById);

export default router;
