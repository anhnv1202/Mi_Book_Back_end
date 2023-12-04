import { HTTP_CODE } from '@common/constants/global.const';
import { Config } from '@config/common.config';
import { AppError, ManagedError } from '@models';
import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { handleAppError } from './error.handling.middleware';
const checkTokenExpired = (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req?.header('Authorization');

    const token = Authorization?.replace('Bearer ', '');
    if (!token) {
      throw new AppError('Token is required', HTTP_CODE.NotFound);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jwt.verify(token, Config.ACCESS_TOKEN, (err: VerifyErrors, user) => {
      if (err && err.message === 'jwt expired') {
        next();
      }
    });
    next();
  } catch (error) {
    throw new ManagedError('jwt', error);
  }
};

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(/\s/)[1];

    jwt.verify(token, Config.ACCESS_TOKEN || '', (err, user) => {
      if (err) {
        return handleUnauthorized(req, res);
      }
      req.body.user = user;

      next();
    });
  } else {
    return handleUnauthorized(req, res);
  }
};

function handleUnauthorized(req: Request, res: Response) {
  return handleAppError(req, res)(new AppError('Unauthorized request', 401));
}

export default { checkTokenExpired, authenticateJwt };
