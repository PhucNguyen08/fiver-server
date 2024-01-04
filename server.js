import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import UserRoute from './routers/user.js';
import ConversationRoute from './routers/conversation.js';
import MessageRoute from './routers/message.js';
import OrderRoute from './routers/order.js';
import ReviewRoute from './routers/review.js';
import GigRoute from './routers/gig.js';
import AuthRoute from './routers/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connect to Mongoose');
    } catch (e) {
        console.log(e);
    }
};

const corsOptions = {
    origin: process.env.CONFIG_CORS,
    credentials: true,
    optionSuccessStatus: 200,
};

// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/public/img', express.static(process.env.FILE_STORE));
app.use('/auth', AuthRoute);
app.use('/users', UserRoute);
app.use('/messages', MessageRoute);
app.use('/conversations', ConversationRoute);
app.use('/orders', OrderRoute);
app.use('/reviews', ReviewRoute);
app.use('/gigs', GigRoute);

app.listen(PORT, () => {
    connect();
    console.log('Serving on port ' + PORT);
});
