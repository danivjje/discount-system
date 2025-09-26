import { authUser, checkAuth } from '@/controllers/authController';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/login', authUser);
authRouter.get('/check', checkAuth);

export default authRouter;
