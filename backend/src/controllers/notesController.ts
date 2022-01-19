import { Request, Response } from 'express';
import notes from '../data/notes';

export const getNotes = async(req: Request, res: Response) =>{
    res.json(notes)
}

export const getOneNote = async(req: Request, res: Response) =>{
    const note = notes.find((n)=> n._id === req.params.id);

    return res.json(note);
}