import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

import authRouter from './Routes/auth.js';
import userRouter from './Routes/user.js';
import doctorRouter from './Routes/doctor.js';
import reviewRouter from './Routes/review.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: true,
};
mongoose.set('strictQuery', false);
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongodb');
  } catch (err) {
    console.log('Connected to mongodb failed: ' + err);
  }
};
app.get('/', (req, res) => {
  res.send('Runing Server');
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/reviews', reviewRouter);

// Asynchronous
app.listen(port, () => {
  connectMongo();
  console.log('Server is running on port ' + port);
});
