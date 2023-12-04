import BaseRepository from '@base/base.repository';
import {
  AccessPayload,
  ChangePassword,
  ForgotPassword,
  ICreateUser,
  ILogin,
} from '@common/interfaces/account.interface';
import { GetCustomRepo } from '@common/utils/custom_repository.util';
import AppDataSource from '@database/data_source';
import { User } from '@entities/user.entity';
import { AppError } from '@models';
import jwtService from '@services/jwt.service';
import { sendEmailForgotPassword } from '@services/mail.service';
import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

class _AuthRepository extends BaseRepository<User> {
  register = async (data: ICreateUser): Promise<User> => {
    const { username, email, password, rePassword } = data;
    const user = await this.findOneBy({ username });
    if (user) {
      throw new AppError('username-already-exist');
    }
    const hash = bcrypt.hashSync(password, 10);
    if (password !== rePassword) throw new AppError('not-match-pass-repass');

    return await this.save({ username, password: hash, email });
  };

  login = async (data: ILogin): Promise<{ accessToken: string; refreshToken: string }> => {
    const { username, password } = data;
    const checkUser = await this.findOneBy({
      username,
    });
    if (!checkUser) throw new AppError('user-not-exist');
    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      throw new AppError('password-is-incorrect');
    }
    const payload: AccessPayload = {
      id: checkUser?.id,
      username: checkUser?.username,
      role: checkUser?.role,
    };
    const accessToken = await jwtService.generalAccessToken(payload);
    const refreshToken = await jwtService.generalRefreshToken(payload);
    return { accessToken, refreshToken };
  };

  changePassword = async (id: number, data: ChangePassword): Promise<UpdateResult> => {
    const { oldPassword, newPassword, rePassword } = data;
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new AppError('the-user-is-not-defined');
    }
    if (newPassword !== rePassword) {
      throw new AppError('password-is-not-match-confirm-password');
    }
    const comparePassword = bcrypt.compareSync(oldPassword, user.password);
    if (!comparePassword) {
      throw new AppError('the-password-is-incorrect');
    }
    const hash = bcrypt.hashSync(data.newPassword, 10);
    return await this.update(id, { password: hash });
  };

  forgotPassword = async (data: ForgotPassword): Promise<UpdateResult | boolean> => {
    const { email } = data;
    const user = await this.findOneBy({ email });
    if (!user) {
      throw new AppError('the-user-was-not-registered');
    }
    const newPassword = await sendEmailForgotPassword(email, user.username);
    const hash = bcrypt.hashSync(newPassword, 10);
    return await this.update({ id: user.id }, { password: hash });
  };
}

const AuthRepository = GetCustomRepo(User, _AuthRepository, AppDataSource);

export default AuthRepository;
