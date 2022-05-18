
import { DbUsers } from '../db-entities';

export interface User extends DbUsers {

}

export interface UserUpdate extends User {
  passwordChange: boolean;
  passwordConfirm: string;
}

export interface UserJwtPayload {
  id: number,
  username: string,
}

export interface UserLoginPayload {
  access_token: string;
  refresh_token: string;
}

export enum UserRanks {
  "User" = 10,
  "Admin" = 20,
  "SuperAdmin" = 30
}

export const UserRanksList = Object.values(UserRanks).filter(value => isNaN(Number(value)) === false)

export const DefaultUser: Partial<UserUpdate> = {
  id: null,
  name: null,
  username: null,
  email: null,
  rank: 10,
  password: null,
  passwordConfirm: null,
  passwordChange: false,
  active: true,
}
