import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.cookies.authtoken;

  if (!token) return res.status(400).json({ message: 'token is not valid' });

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    next();
  } catch (err) {
    return res.status(400).json({ message: "token wasn't validated" });
  }
};

export default authMiddleware;
