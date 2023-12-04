import { AppError } from '@/models';
import { CODE_COMMON_FAILED } from '@common/constants/global.const';
import LogService from '@config/log.config';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';

/**
 * Handle `AppError` instance error
 */
export function handleAppError(req: Request, res: Response) {
  return (error: AppError) => {
    const { baCode, message } = error;
    LogService.logAppErrorRequest(req)(baCode, message);

    res.status(error.code).json({
      code: baCode,
      result: null,
      message: message,
    });
  };
}

/**
 * Handle non-`AppError` error types
 */
export function handleError(req: Request, res: Response) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error: any) => {
    console.log({ error });
    let errorMsg = '';
    if (typeof error === 'string') {
      errorMsg = error;
    } else if (error && typeof error === 'object') {
      let errorStr = error.toString();
      // Prevent unhelpful error log
      if (!errorStr || errorStr === '[object Object]') {
        errorStr = JSON.stringify(error);
      }
      // Check if error stack trace exists
      if (error.stack) {
        errorStr += `\n  Stack Trace: ${error.stack}`;
      }
      // Check if `type-orm` error
      if (error instanceof TypeORMError) {
        errorStr += `\n  TypeORM: ${error.message}`;
      }
      errorMsg = errorStr;
    } else {
      errorMsg = 'Unknown server error';
    }
    LogService.logErrorRequest(req)(errorMsg);

    res.status(500).json({
      origin: error.origin,
      code: CODE_COMMON_FAILED,
      result: null,
      message: errorMsg,
    });
  };
}
