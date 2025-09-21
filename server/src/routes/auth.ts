import { authUser } from '@/controllers/authController';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/login', authUser);

export default authRouter;
