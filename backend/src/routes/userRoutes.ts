import { Router } from "express";
import * as userController from '../controllers/userController';
import { protect } from "../middlewares/auth";

const router = Router();

router.post('/', userController.registerUser);
router.post('/login' , userController.login);
router.post('/register', userController.registerUser);
router.post('/logout', userController.logout);
router.post('/profile', protect, userController.updateUserProfile)


export default router;