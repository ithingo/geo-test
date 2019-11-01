export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}