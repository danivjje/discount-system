import { authUser, checkAuth, registerUser } from '@/controllers/authController';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/login', authUser);
authRouter.get('/check', checkAuth);
authRouter.post('/register', registerUser);

export default authRouter;
