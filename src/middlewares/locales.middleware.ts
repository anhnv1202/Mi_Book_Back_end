import { APP_LOCALES, Locales } from '@common/constants/global.const';
import { NextFunction, Request, Response } from 'express';
import * as i18n from 'i18n';

export const setLocal = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locale: any = APP_LOCALES.includes(req.header('Accept-Language') as Locales)
    ? req.header('Accept-Language')
    : Locales.EN;

  i18n.setLocale(locale);
  return next();
};
