import { ERROR_VALIDATION_MESSAGE } from '@common/constants/global.const';
import {
  checkIsArray,
  checkIsBoolean,
  checkIsDate,
  checkIsEmail,
  checkIsEmpty,
  checkLength,
  checkMinLength,
} from './index';

const validateRegisterAccount = [
  checkIsEmpty('email', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Email')),
  checkIsEmail('email', ERROR_VALIDATION_MESSAGE.INVALID_EMAIL('Email')),
  checkIsEmpty('username', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Username')),
  checkMinLength('username', 6, ERROR_VALIDATION_MESSAGE.MIN_LENGTH('Username', 6)),
  checkIsEmpty('password', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Password')),
  checkMinLength('password', 6, ERROR_VALIDATION_MESSAGE.MIN_LENGTH('Password', 6)),
  checkIsEmpty('rePassword', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Confirm Password')),
  checkMinLength('rePassword', 6, ERROR_VALIDATION_MESSAGE.MIN_LENGTH('Confirm Password', 6)),
];

const validateRegisterUser = [
  checkIsEmail('email', ERROR_VALIDATION_MESSAGE.INVALID_EMAIL('Email')),
  checkLength('phone', 10, 10, ERROR_VALIDATION_MESSAGE.LENGTH('Phone', 10)),
  checkIsDate('dateOfBirth', ERROR_VALIDATION_MESSAGE.INVALID_DATE('Date Of Birth')),
  checkIsBoolean('gender', ERROR_VALIDATION_MESSAGE.INVALID_BOOLEAN('gender')),
];

const validateLoginAccount = [
  checkIsEmpty('username', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Username')),
  checkIsEmpty('password', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Password')),
];

const validateCheckActive = [
  checkIsEmpty('isActive', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Is Active')),
  checkIsBoolean('isActive', ERROR_VALIDATION_MESSAGE.INVALID_BOOLEAN('Is Active')),
  checkIsEmpty('listId', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('List Id')),
  checkIsArray('listId', ERROR_VALIDATION_MESSAGE.INVALID_ARRAY('List Id')),
];

const checkChangePassword = [
  checkIsEmpty('oldPassword', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Old Password')),
  checkMinLength('oldPassword', 6, ERROR_VALIDATION_MESSAGE.MIN_LENGTH('Old Password', 6)),
  checkIsEmpty('newPassword', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('New Password')),
  checkMinLength('newPassword', 6, ERROR_VALIDATION_MESSAGE.MIN_LENGTH('New Password', 6)),
  checkIsEmpty('rePassword', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Confirm Password')),
  checkMinLength('rePassword', 6, ERROR_VALIDATION_MESSAGE.MIN_LENGTH('Confirm Password', 6)),
];

const checkForgotPassword = [
  checkIsEmpty('email', ERROR_VALIDATION_MESSAGE.FIELD_REQUIRED('Email')),
  checkIsEmail('email', ERROR_VALIDATION_MESSAGE.INVALID_EMAIL('Email')),
];

export default {
  checkChangePassword,
  checkForgotPassword,
  validateLoginAccount,
  validateRegisterAccount,
  validateRegisterUser,
  validateCheckActive,
};
