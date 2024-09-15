import { Router } from 'express';
import { UserController } from './controllers/UserController';

export const router = Router();

const userController = new UserController();

router.post('/user', UserController.createUser);
router.get('/user', UserController.getAllUsers);
router.delete('/user', UserController.deleteUser);
