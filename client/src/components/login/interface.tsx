export interface User {
  userid: string;
  firstname: string;
  lastname: string;
  address: string;
  mobileno: string;
  email: string;
  password: string;
  img: string;
  type: string;
  status: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface Context {
  user: User;
  loginUser: LoginUser;
  error: boolean;
}
