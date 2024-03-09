import { Router } from 'express';
import controllers from '../controllers/refreshTokenController.js';
const router = Router();

router.get('/', controllers.handleRefreshToken);

export default router;
