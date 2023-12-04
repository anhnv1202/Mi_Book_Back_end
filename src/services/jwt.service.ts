import { AccessPayload } from '@common/interfaces/account.interface';
import { Config } from '@config/common.config';
import { AppError } from '@models';
import jwt from 'jsonwebtoken';

const generalAccessToken = async (payload: AccessPayload): Promise<string> => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    Config.ACCESS_TOKEN,
    { expiresIn: '10s' },
  );
  return accessToken;
};

const generalRefreshToken = async (payload: AccessPayload): Promise<string> => {
  const refreshToken = jwt.sign(
    {
      ...payload,
    },
    Config.REFRESH_TOKEN,
    { expiresIn: '365d' },
  );
  return refreshToken;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refreshTokenServices = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, Config.REFRESH_TOKEN, async (err, user: AccessPayload) => {
        if (err) {
          reject(new AppError('the-authentication-token'));
        }
        const accessToken = await generalAccessToken({
          id: user?.id,
          username: user?.username,
          role: user?.role,
        });
        resolve(accessToken);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenServices,
};
