import express from 'express';

import authRouter from './auth.routes.js';
import customerRouter from './customer.routes.js';
import appConfigRouter from './appConfig.routes.js';
import verificationCodeRouter from './verificationCode.routes.js';
import authMiddleware from '@/middlewares/auth.middleware.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', authMiddleware, customerRouter);
apiRouter.use('/config', authMiddleware, appConfigRouter);
apiRouter.use('/code', authMiddleware, verificationCodeRouter);

export default apiRouter;
