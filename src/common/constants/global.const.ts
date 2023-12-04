import axios from 'axios';
import bcrypt from 'bcrypt';
export enum Locales {
  VI = 'vi',
  EN = 'en',
  JA = 'ja',
  KR = 'kr',
}

export enum Roles {
  ADMIN = 1,
  USER = 2,
}

export const COMMON_SEED_PASSWORD_USER = bcrypt.hashSync('123456', 10);

export const CODE_COMMON_FAILED = axios.HttpStatusCode.InternalServerError;

export enum LocalesFullText {
  VI = 'Vietnamese',
  EN = 'English',
  JA = 'Japanese',
  KR = 'Korean',
}
export const BASE_URL = '/api/v1';

export const APP_LOCALES = [Locales.EN];

export const VALIDATION_ERROR = 'Validation error';

export const HTTP_CODE = axios.HttpStatusCode;

export const EVENTS = {
  SEND_NOTIFY: 'SEND_NOTIFY',
};

export enum ErrorMessage {
  UNIQUE = 'duplicate key value violates unique constraint',
  QUERY_WRONG = 'Make sure your query is correct.',
  DATE_TIME_INVALID = 'date/time field value out of range',
  FAILING_ROW = 'Failing row contains',
  FIELD_REQUIRED = 'can be not blank',
  MIN_LENGTH = 'min',
  INVALID_EMAIL = 'INVALID_EMAIL',
  LENGTH = 'LENGTH',
  INVALID_DATE = 'INVALID_DATE',
  INVALID_BOOLEAN = 'INVALID_BOOLEAN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const LIMIT_PER_PAGE = 20;

export const ERROR_VALIDATION_MESSAGE = {
  FIELD_REQUIRED: (field: string) => `${field} is required`,
  MIN_LENGTH: (field: string, minLength: number) => `${field} must be at least ${minLength} characters`,
  INVALID_EMAIL: (field: string) => `${field} Invalid email`,
  LENGTH: (field: string, length: number) => `${field} must be ${length} characters`,
  INVALID_DATE: (field: string) => `${field} Invalid date`,
  INVALID_ARRAY: (field: string) => `${field} Invalid array`,
  INVALID_BOOLEAN: (field: string) => `${field} Invalid boolean value`,
  UNIQUE: 'Unique constraint violation',
  QUERY_WRONG: 'Query is invalid',
  DATE_TIME_INVALID: 'Invalid date or time',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};

export const PHONE_REGEX = /^\d{10}$/;
