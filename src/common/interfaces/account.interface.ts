export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface AccessPayload {
  id: number;
  username: string;
  role: number;
}

export interface ChangeActiveAuth {
  isActive: boolean;
  listId: string[];
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

export interface ForgotPassword {
  email: string;
}
