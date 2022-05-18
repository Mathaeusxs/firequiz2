import { DbResetTokens } from '../db-entities';

export interface ResetToken extends DbResetTokens {

}

export interface TokenPayload {
  userId: number;
  username: string;
  expires: Date;
  created: Date;
}

export interface RefreshTokenPayload {
  userId: number;
  username: string;
  token: string;
  expires: Date;
  created: Date;
}
