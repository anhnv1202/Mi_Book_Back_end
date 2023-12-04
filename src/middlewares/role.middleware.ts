import { AppError } from '@/models';
import { HTTP_CODE, Roles } from '@common/constants/global.const';
import { NextFunction, Request, Response } from 'express';
import { handleAppError } from './error.handling.middleware';

const checkRolePermission = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    try {
      if (!user || !user.role) {
        throw 'permission-error';
      }

      if (!roles.includes(user.role)) {
        throw 'permission-error';
      }

      next();
    } catch {
      return handleAppError(req, res)(new AppError('acess-denied', HTTP_CODE.Forbidden));
    }
  };
};
export default checkRolePermission;
