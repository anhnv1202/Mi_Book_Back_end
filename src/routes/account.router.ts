import passport from '@config/passport.config';
import AuthController from '@controller/account.controller';
import jwtMiddleware from '@middlewares/jwt.middleware';
import validate from '@middlewares/validation.middleware';
import userValidation from '@validation/user.validation';
import express, { Response } from 'express';

const authRoter = express.Router();

authRoter.post('/register', validate(userValidation.validateRegisterAccount), AuthController.register);
authRoter.post('/login', validate(userValidation.validateLoginAccount), AuthController.login);
authRoter.post('/logout', AuthController.logout);
authRoter.post('/refresh-token', jwtMiddleware.checkTokenExpired, AuthController.refreshToken);
// router.get('/getAll', adminMiddleware, AccountController.getAllAccount);
// router.get('/getDetail', auth, AccountController.getDetailAccount);

authRoter.get('/login/success', (req, res: Response) => {
  if (req.user) {
    const user = req.user;
    res.clearCookie('user');
    res.status(200).json({
      error: false,
      message: 'Successfully Loged In',
      user: user,
    });
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
});

authRoter.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
});

// authRoter.get('/google', passport.authenticate('google', ['profile', 'email']));

authRoter.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/login/failed',
  }),
);

// authRoter.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });

authRoter.put(
  '/change-password',
  jwtMiddleware.authenticateJwt,
  validate(userValidation.checkChangePassword),
  AuthController.changePassword,
);
authRoter.put('/forgot-password', validate(userValidation.checkForgotPassword), AuthController.forgotPassword);
// router.put('/addCart', auth, AccountController.addCart);

export default authRoter;
