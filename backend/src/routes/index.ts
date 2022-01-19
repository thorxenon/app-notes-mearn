import { Router } from "express";
import * as notesController from '../controllers/notesController';

const router = Router();

router.get('/notes', notesController.getNotes);
router.get('/notes/:id' , notesController.getOneNote);
router.post('/notes');
router.put('/notes/:id');
router.delete('/notes/:id');




export default router;