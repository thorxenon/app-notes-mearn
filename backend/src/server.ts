import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config()
const app = express();

app.use('/api',routes);

app.get('/', (req, res)=>{
    res.send('Api is running baby')
})

app.listen(process.env.PORT as string)