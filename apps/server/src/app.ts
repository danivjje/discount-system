import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import appConfigRouter from '@/routes/appConfig.routes';
import authRouter from '@/routes/auth.routes';
import customerRouter from '@/routes/customer.routes';

import authMiddleware from '@/middlewares/auth.middleware';
import errorHandlingMiddleware from '@/middlewares/errorHandling.middleware';

dotenv.config();
export const app = express();
const port: number = 3000;
const apiRouter = express.Router();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', authMiddleware, customerRouter);
apiRouter.use('/config', authMiddleware, appConfigRouter);

app.use('/api', apiRouter);
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
