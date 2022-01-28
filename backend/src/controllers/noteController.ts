import { Request, Response } from 'express';
import Note from '../models/Note';
import User from '../models/User';

export const getNotes = async(req: Request, res: Response) =>{
    const notes = await Note.find();

    res.json(notes);
};

export const createNote = async(req: Request, res: Response) =>{
    const { title, content, category } = req.body;

    if(!title || !content || !category){
        res.status(400)
        .json({error:'Please fill all the Fields!'})
    }else{
        const note = await new Note({
            user: req.user._id,
            title,
            content,
            category
        });

        const newNote = await note.save();
        res.json(newNote);
    };
};

export const getNoteById = async(req: Request, res:Response) =>{
    if(req.params.id){
        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(400).json({error: 'Note not found!'});
        }
        const thisNoteIsMine = await User.findById(req.user._id);

        if(note.user == thisNoteIsMine._id.toString()){
            res.json(note);
        }else{
            res.status(400).json({error: "This note isn't belongs you!"});
        };
    };
};

export const updateNote = async(req: Request, res: Response) =>{
    if(!req.params.id){
        res.status(400).json({error: 'note id not found!'});
    }
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);
    const thisNoteIsMine = await User.findById(req.user._id);

    if(!note){
        return res.status(400).json({error: 'note not found!'});
    }

    if(note.user != thisNoteIsMine._id.toString()){
        return res.status(400).json({error: 'an error inespered ocurred!'});
    }

    let update: any = {};

    if(title){
        update.title = title;
    }

    if(content){
        update.content = content;
    }

    if(category){
        update.category = category;
    }

    await Note.findByIdAndUpdate(req.params.id, {$set:update}, <any>{new:true});
    
    return res.json({status: true});
};