import express from 'express';

import appConfigRouter from '@/routes/appConfig';
import authRouter from '@/routes/auth';
import customerRouter from '@/routes/customer';

const app = express();
const port: number = 3000;

app.use(express.json());
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', customerRouter);
apiRouter.use('/app-config', appConfigRouter);

app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
