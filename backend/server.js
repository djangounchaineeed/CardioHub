import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/ConnectDB.js';
import mongoose from 'mongoose';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import cors from 'cors';

config();

const port = process.env.PORT || 3500;
const app = express();

connectDB();

app.use(cors());
app.use(express.json())

app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

mongoose.connection.on('open', () => {
    console.log('DB is connected');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
});

