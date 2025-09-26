import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT_TOKEN as string;

const authMiddleware: RequestHandler = async (req, _res, next) => {
  const token = req.cookies['authtoken'];

  if (!token) throw new Error('Access denied');

  try {
    const verified = jwt.verify(token.split(' ')[1], secretKey);
    req.user = verified;
    next();
  } catch (err) {
    throw new Error("token wasn't validated");
  }
};

export default authMiddleware;
