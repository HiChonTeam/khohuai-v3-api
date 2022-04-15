import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routes
import { AuthRoute } from './Routers';

const app: Application = express();
const port = process.env.port || 4000;
mongoose.connect('mongodb://localhost:27017/jwt', {
}).then(() => {
    console.log('Connnect MongoDB Successfully');
}).catch((err: any) => {
    console.log(err.message)
})

const allowedOrigins = ['http://localhost:4000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(options))
app.use(cookieParser());
app.use(express.json());
app.listen(port, () => {
    console.clear();
    console.log('server start on port 4000');
})
app.use('/auth', AuthRoute);