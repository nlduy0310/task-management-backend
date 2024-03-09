import { Router } from 'express';
import controllers from '../controllers/signupControllers.js';
const router = Router();

router.post('/', controllers.handleNewUser);

export default router;
