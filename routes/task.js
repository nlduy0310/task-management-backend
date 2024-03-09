import { Router } from 'express';
import controllers from '../controllers/taskControllers.js';

const router = Router();

router.get('/:id', controllers.getUserTasks);
router.post('/', controllers.createTask);
router.patch('/:id', controllers.updateTaskById);

export default router;
