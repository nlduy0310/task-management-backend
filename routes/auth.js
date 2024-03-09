import { Router } from 'express';
import controllers from '../controllers/authControllers.js';
const router = Router();

router.post('/', controllers.handleLogin);

export default router;
