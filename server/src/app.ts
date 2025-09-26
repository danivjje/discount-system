import express from 'express';

import appConfigRouter from '@/routes/appConfig';
import authRouter from '@/routes/auth';
import customerRouter from '@/routes/customer';

const app = express();
const port: number = 3000;
const apiRouter = express.Router();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');

  if (req.method === 'OPTIONS') return res.sendStatus(200);

  next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', customerRouter);
apiRouter.use('/config', appConfigRouter);

app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
