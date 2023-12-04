import { Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function apiResponseResult(res: Response, data: any, statusCode: number) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

function apiResponseError(res: Response, statusCode: number, message: string) {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
}

export default { apiResponseError, apiResponseResult };
