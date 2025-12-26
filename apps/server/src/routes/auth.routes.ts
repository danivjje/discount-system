import { authUser, checkAuth } from '@/controllers/auth.controller.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/login', authUser);
authRouter.get('/check', checkAuth);

export default authRouter;
