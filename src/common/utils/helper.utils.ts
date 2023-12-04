import LogService from '@config/log.config';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleLogError(error: any) {
  if (process.env.NODE_ENV === 'production') {
    LogService.logErrorFile(JSON.stringify(error));
  } else {
    LogService.logError('STACK', error.stack);
    LogService.logError('PATH', error.path);
    LogService.logError('BODY REQUEST', JSON.stringify(error?.body)?.slice(0, 500) + '...');
  }
}

export const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
