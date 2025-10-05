import express from 'express';
import cookieParser from 'cookie-parser';

import appConfigRouter from '@/routes/appConfig';
import authRouter from '@/routes/auth';
import customerRouter from '@/routes/customer';
import authMiddleware from './middlewares/auth.middleware';

const app = express();
const port: number = 3000;
const apiRouter = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');

  if (req.method === 'OPTIONS') return res.sendStatus(200);

  next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', authMiddleware, customerRouter);
apiRouter.use('/config', authMiddleware, appConfigRouter);

app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
