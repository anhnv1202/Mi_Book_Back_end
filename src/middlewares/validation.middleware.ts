import { AppError } from '@/models';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleAppError } from './error.handling.middleware';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (validations: any) => async (req: Request, res: Response, next: NextFunction) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return handleAppError(req, res)(new AppError(errors.array()[0].msg, 403));
};

export default validate;
