import express from 'express';

import { Roles } from '@common/constants/global.const';
import UserController from '@controller/user.controller';
import jwtMiddleware from '@middlewares/jwt.middleware';
import checkRolePermission from '@middlewares/role.middleware';
import validate from '@middlewares/validation.middleware';
import userValidation from '@validation/user.validation';
// import { adminMiddleware, auth, checkTokenExpired } from '../middlewares/AdminMiddleware';

const userRouter = express.Router();
userRouter.get('/get-all', UserController.getAll);
userRouter.post(
  '/active',
  jwtMiddleware.authenticateJwt,
  checkRolePermission([Roles.ADMIN]),
  validate(userValidation.validateCheckActive),
  UserController.active,
);

export default userRouter;
