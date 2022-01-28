import { Request, Response } from 'express';
import User from '../models/User';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = asyncHandler(async(req: Request, res: Response) =>{
    const { name, email, password, pic } = req.body;
    const user = await User.findOne({ email });

    if(user){
        res.status(400).json({error: 'User already exists'});
        return;
    };

    const hash = bcrypt.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password: hash,
        pic
    });

    if(newUser){
        const token = jwt.sign(
            {id: newUser._id, email: newUser.email},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn:'2hr'}
        );

        newUser.token = token;
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name.firstName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            pic: newUser.pic,
            token
        });
    }else{
        res.status(400).json({error: 'Error ocurred!'});
    };
});

export const login = async(req: Request, res: Response) =>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user){
        const hashCompare = bcrypt.compareSync(password, user.password);

        if(hashCompare){
            user.token = '';
            const token = jwt.sign(
                {id: user._id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn:'2hr'}
            );

            user.token = token;
            user.save();
            res.status(200).json({
                status: true,
                token,
                name: user.name,
                pic: user.pic,
                isAdmin: user.isAdmin
            });
        }else{
            res.status(400).json({error: "E-mail or password incorrects"});
            return
        };
    }else{
        res.status(400).json({error: "E-mail or password incorrects"});
        return
    };
    
};

export const logout = async(req: Request, res: Response) =>{
    const token = req.body.token;
    let payload;
    payload = await <any>jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    const user = await User.findById(payload._id);
    
    if(user){
        user.token = ''
        user.save();
        res.json({status:true, msg:'logout successful'});
    }else{
        res.status(400).json({error: "access denieded!"});
    };
};