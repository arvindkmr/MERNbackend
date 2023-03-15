import express from 'express';
import productRoute from './routes/product.js';
import errorMiddleware from './MiddleWare/error.js';
import userRoute from './routes/userRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import testingRoute from './routes/testingRoute.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from "cors"

const app = express();
// app.use(cors({
//     origin: '*'
// }));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
//routes import
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', paymentRoute);
app.use('/api/v1', testingRoute);

//middleware for error
app.use(errorMiddleware);
export default app;
