import { Request, Response } from 'express';
import User from '../models/User';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = asyncHandler(async(req: Request, res: Response) =>{
    const { firstName, lastName, email, password, pic } = req.body;
    const user = await User.findOne({ email });

    if(user){
        res.status(400).json({error: 'User already exists'});
        return;
    };

    const hash = bcrypt.hashSync(password, 10);

    const newUser = new User({
        name:{
            firstName,
            lastName
        },
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
            name:{
                fistName:newUser.name.firstName,
                lastName:newUser.name.lastName
            },
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

export const updateUserProfile = async(req: Request, res: Response) =>{
    const  id  = req.user.id;

    const { email, pic, password, newPassword } = req.body;
    const {firstName, lastName} = req.body.name;

    const user = await User.findById(id);
    let updateUser:any = {};

    if(user){
        if(firstName){
            let fName = {
                firstName,
                lastName: user.name.lastName
            };
            updateUser.name = fName;
        };

        if(lastName){
            let lName = {
                firstName: user.name.firstName,
                lastName
            };
            updateUser.name = lName ;
        };

        if(firstName && lastName ){
            let fName = {
                firstName,
                lastName  
            };
            updateUser.name = fName || req.user.name;           
        };

        if(email){
            updateUser.email = email || req.user.email;
        };

        if(pic){
            updateUser.pic = pic || req.user.pic
        };

        if(newPassword){
            const hash =  bcrypt.hashSync(newPassword, 10);
            updateUser.password = hash || user.password;
        };       

        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign(
                {id: req.user._id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn:'2hr'}
            );
            updateUser.token = token;
            await User.findByIdAndUpdate(
                user._id,
                {$set: updateUser},
                { rawResult: true }
            );         
            res.status(201).json({
                success: true,
                token
            });

        }else{
            res.json({error: 'password incorrect'});
        };
    }else{
        res.status(404).json({error: 'User not found!'});
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