import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export const connectDB = async() =>{
    try{
        const db = await connect(process.env.MONGO_URL as string);
        console.log(`MongoDB connected: ${db.connection.host}`);
    }catch(err){
        console.log(`Error: ${err}`);
    };
};