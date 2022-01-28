import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const protect = async(req: Request, res: Response, next: NextFunction) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            //decoding our token
            const decoded = <any>jwt.verify(token, process.env.JWT_SECRET_KEY as string);

            req.user = await User.findById(decoded.id).select("-password");
            next()
        }catch(err){
            res.status(401).json({error: 'Not authorized, token failed!'});
        }
        
    };

    if(!token){
        res.status(401).json({error: 'Not authorized, token failed!'});
    };
};