import { phoneScheme, verifyCodeScheme } from '@packages/shared';
import { RequestHandler } from 'express';
import * as verificationCodeService from '@/services/verificationCode.service.js';
import { UnauthorizedError } from '@/errors/index.js';

export const createCode: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const phone: string = phoneScheme.parse(body.phone);
    await verificationCodeService.create(phone);
    return res.status(200).end();
  } catch (err) {
    return next(err);
  }
};

export const verifyCode: RequestHandler = async (req, res, next) => {
  try {
    const { phone, code } = verifyCodeScheme.parse(req.body);
    const result: boolean = await verificationCodeService.verify(phone, code);
    if (result) {
      return res.status(200).end();
    }

    throw new UnauthorizedError('Введёный SMS-код неверный');
  } catch (err) {
    return next(err);
  }
};
