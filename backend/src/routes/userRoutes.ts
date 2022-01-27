import { Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', userController.registerUser);
router.post('/login' , userController.login);
router.post('/register', userController.registerUser);
router.post('/logout', userController.logout);


export default router;