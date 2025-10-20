import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import appConfigRouter from '@/routes/appConfig';
import authRouter from '@/routes/auth';
import customerRouter from '@/routes/customer';

import authMiddleware from '@/middlewares/auth.middleware';
import errorsHandlingMiddleware from '@/middlewares/errors-handling.middleware';

const app = express();
const port: number = 3000;
const apiRouter = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', authMiddleware, customerRouter);
apiRouter.use('/config', authMiddleware, appConfigRouter);
// apiRouter.use('/customers', customerRouter);
// apiRouter.use('/config', appConfigRouter);

app.use('/api', apiRouter);
app.use(errorsHandlingMiddleware);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
