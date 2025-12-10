import { createCode, verifyCode } from '@/controllers/verficationCode.controller';
import express from 'express';

const verificationCodeRouter = express.Router();

verificationCodeRouter.post('/send', createCode);
verificationCodeRouter.post('/verify', verifyCode);

export default verificationCodeRouter;
