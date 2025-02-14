import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

// Route to register a new user
userRouter.post('/register', registerUser);

// Route to login a user
userRouter.post('/login', loginUser);

export default userRouter;