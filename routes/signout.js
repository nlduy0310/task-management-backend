import { Router } from 'express';
import controllers from '../controllers/signoutController.js';

const router = Router();

router.get('/', controllers.handleSignout);

export default router;
