import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import appConfigRouter from '@/routes/appConfig.routes';
import authRouter from '@/routes/auth.routes';
import customerRouter from '@/routes/customer.routes';
import verificationCodeRouter from '@/routes/verificationCode.routes';

import authMiddleware from '@/middlewares/auth.middleware';
import errorHandlingMiddleware from '@/middlewares/errorHandling.middleware';

dotenv.config();
export const app = express();
const port: number = 3000;
const apiRouter = express.Router();

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS.split(',');

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) {
        return cb(null, true);
      }

      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', authMiddleware, customerRouter);
apiRouter.use('/config', authMiddleware, appConfigRouter);
apiRouter.use('/code', authMiddleware, verificationCodeRouter);

app.use('/api', apiRouter);
app.use(errorHandlingMiddleware);

app.listen(port, '0.0.0.0', () => {
  console.log(`App is listening on port ${port}`);
});
