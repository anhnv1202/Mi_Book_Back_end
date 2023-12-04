import { PHONE_REGEX } from '@common/constants/global.const';
import { body } from 'express-validator';

const checkIsEmpty = (param: string, message: string) => body(param).notEmpty().withMessage(message);
const checkLength = (param: string, min: number, max: number, message: string) =>
  body(param).isLength({ min, max }).withMessage(message);

const checkMinLength = (param: string, min: number, message: string) =>
  body(param).isLength({ min }).withMessage(message);

const checkMaxLength = (param: string, max: number, message: string) =>
  body(param).isLength({ max }).withMessage(message);

const checkIsEmail = (param: string, message: string) => body(param).isEmail().withMessage(message);
const checkIsString = (param: string, message: string) => body(param).isString().withMessage(message);
const checkIsArray = (param: string, message: string) => body(param).isArray().withMessage(message);
const checkIsNumber = (param: string, message: string) => body(param).isNumeric().withMessage(message);
const checkIsBoolean = (param: string, message: string) => body(param).isBoolean().withMessage(message);
const checkIsDate = (param: string, message: string) => body(param).isDate().withMessage(message);

const checkIsPhoneNumber = (value: string): boolean => {
  return PHONE_REGEX.test(value);
};

export {
  checkIsArray,
  checkIsBoolean,
  checkIsDate,
  checkIsEmail,
  checkIsEmpty,
  checkIsNumber,
  checkIsPhoneNumber,
  checkIsString,
  checkLength,
  checkMaxLength,
  checkMinLength,
};
