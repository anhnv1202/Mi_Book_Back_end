import BaseController from '@base/base.controller';
import UserRepository from '@repository/user.repository';
import { NextFunction, Request, Response } from 'express';

class _UserController extends BaseController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepository.getAll();
      this.success(req, res)({ user: users });
    } catch (e) {
      this.getManagedError(e);
    }
  }

  active = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await UserRepository.active(req.body);
      this.success(req, res)(user);
    } catch (e) {
      next(this.getManagedError(e));
    }
  };
}

const UserController = new _UserController('AUTH_CONTROLLER');
export default UserController;
