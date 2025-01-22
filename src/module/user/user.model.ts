export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
export interface IUserUpdateDTO {
  name?: string;
  email?: string;
  password?: string;
}
