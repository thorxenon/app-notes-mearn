import { Router } from "express";
import * as noteController from '../controllers/noteController';
import { protect } from "../middlewares/auth";

const router = Router();

router.get('/', protect, noteController.getNotes);
router.post('/create', protect, noteController.createNote);
router.get('/:id', protect, noteController.getNoteById);
router.put('/:id', protect, noteController.updateNote);
router.delete('/:id', protect, noteController.deleteNote);

export default router;