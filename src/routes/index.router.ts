import { Router } from 'express';
import authRoter from './account.router';
import userRouter from './user.router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = (app: Router) => {
  app.use('/auth', authRoter);
  app.use('/users', userRouter);
};

export default routes;
