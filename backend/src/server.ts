import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import cors from 'cors';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config()
const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.use('/api',routes);

app.get('/', (req, res)=>{
    res.send('Api is running baby')
})

app.use('/api/users',userRoutes)

app.listen(process.env.PORT as string)