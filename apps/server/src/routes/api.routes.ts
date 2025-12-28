import express from 'express';

import authRouter from './auth.routes';
import customerRouter from './customer.routes';
import appConfigRouter from './appConfig.routes';
import verificationCodeRouter from './verificationCode.routes';
import authMiddleware from '@/middlewares/auth.middleware';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', authMiddleware, customerRouter);
apiRouter.use('/config', authMiddleware, appConfigRouter);
apiRouter.use('/code', authMiddleware, verificationCodeRouter);

export default apiRouter;
