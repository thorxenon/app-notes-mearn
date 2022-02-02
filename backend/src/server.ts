import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRouter'
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import path from 'path'

dotenv.config()
const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/notes', noteRoutes);

// ----------------- deployment ----------------------

__dirname = path.resolve();

if(process.env.NODE_ENV as string === 'production'){
    app.use(express.static(path.join('../frontend/build')));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })
}else{
    app.get('/', (req, res) =>{
        res.send('API is running...');
    })
}

// ----------------- deployment ----------------------

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT as string)