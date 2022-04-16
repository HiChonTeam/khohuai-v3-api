import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expressSession from 'express-session';
import * as dotenv from 'dotenv';

dotenv.config();

// routes
import * as Routes from './Routers';

const app: Application = express();
const port = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://chon:1234@cluster0.ycbuv.mongodb.net/khohuai-v3?retryWrites=true&w=majority", {
}).then(() => {
    console.log('Connnect MongoDB Successfully');
}).catch((err: any) => {
    console.log(err.message)
})

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(options))
// app.use(cookieParser());

// const sessionConfig = {
// 	name: "session",
//     keys: ['khohuai']
// };
// app.use(cookieSession(sessionConfig))

class User {
    id?: string = ''
    email?: string = '';
}
class Cart {
    qty?: number = 0;
}
declare module 'express-session' {
    interface SessionData {
        uid: string | null
        [key: string]: any;
    }
}


const sessionOptions: expressSession.SessionOptions = {
    name: 'session',
    secret: "khohuai",
    saveUninitialized: true,
    resave: false,
}

app.use(expressSession(sessionOptions))

app.use(express.json());
app.listen(port, () => {
    console.clear();
    console.log('server start on port ', port);
})
app.get('/', (req, res) => { res.send('Hello World') });
app.use('/auth', Routes.AuthRoute);
app.use('/user', Routes.UserRoute);
app.use('/cart', Routes.CartRoutes);
app.use('/lottery', Routes.LotteryRoute);