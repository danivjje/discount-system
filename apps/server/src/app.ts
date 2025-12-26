import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiRouter from '@/routes/api.routes.js';
import errorHandlingMiddleware from '@/middlewares/errorHandling.middleware.js';

const port = Number(process.env.PORT) ?? 3000;
export const app = express();

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

app.use('/api', apiRouter);
app.use(errorHandlingMiddleware);

app.listen(port, '0.0.0.0', () => {
  console.log(`App is listening on port ${port}`);
});
