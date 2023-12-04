import BaseController from '@base/base.controller';
import { AppError } from '@models';
import AuthRepository from '@repository/auth.repository';
import jwtService from '@services/jwt.service';
import { NextFunction, Request, Response } from 'express';

class _AuthController extends BaseController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await AuthRepository.login(req.body);
      const { refreshToken, ...newResponse } = response;
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // chi lay dc qua http k lay dc qua js
        secure: false, // khi nao deloy se chuyen thanh true
        path: '/',
        sameSite: 'strict',
      });
      this.success(req, res)(newResponse);
    } catch (e) {
      next(this.getManagedError(e));
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthRepository.register(req.body);
      this.success(req, res)(user);
    } catch (e) {
      next(this.getManagedError(e));
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log('refresh token: ' + refreshToken);

      if (!refreshToken) {
        throw new AppError('the-token-required');
      }
      const response = await jwtService.refreshTokenServices(refreshToken);
      console.log(response);

      this.success(req, res)(response);
    } catch (e) {
      next(this.getManagedError(e));
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie('refreshToken');
      this.success(req, res)();
    } catch (e) {
      next(this.getManagedError(e));
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await AuthRepository.changePassword(req.body.user.id, req.body);
      this.success(req, res)(user);
    } catch (e) {
      next(this.getManagedError(e));
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await AuthRepository.forgotPassword(req.body);
      this.success(req, res)(response, 'forgot-password-successfully');
    } catch (e) {
      next(this.getManagedError(e));
    }
  };
}

const AuthController = new _AuthController('AUTH_CONTROLLER');
export default AuthController;
