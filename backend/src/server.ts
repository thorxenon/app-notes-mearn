import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRouter'
import { errorHandler, notFound } from './middlewares/errorMiddleware';

dotenv.config()
const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT as string)