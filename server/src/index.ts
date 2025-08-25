import express from 'express';

const app = express();
const port: number = 3000;

app.get('/', (_req, res) => {
  res.send('Hello TS Express');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
