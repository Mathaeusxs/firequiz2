import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenPayload, User } from '@libs/api-interfaces/index';
import { DbResetTokens } from '@libs/api-interfaces/db-entities';

@Injectable()
export class TokensService {

  constructor(
    @InjectRepository(DbResetTokens) private readonly tokenRepository: Repository<DbResetTokens>,
  ) {
  }

  /** GET LIST / ITEM **/

  async getUserRefreshToken(user: User, payload: RefreshTokenPayload) {

    const token = await this.tokenRepository.find({
      token: payload.token,
      usersId: user.id
    });

    if (token.length === 0) throw new UnauthorizedException('User refresh token don\'t exist!');
    return token;
  }

  //** CREATE / EDIT **/

  async saveRefreshToken(user: User, payload: RefreshTokenPayload) {

    const created = await this.tokenRepository.save({
      usersId: user.id,
      token: payload.token,
      expires: payload.expires,
      created: new Date()
    });

    return created;
  }

  //** DELETE **//

  async removeUserRefreshToken(user: User, token: string) {
    await this.tokenRepository.delete({
      token: token,
      usersId: user.id
    });
    return true;
  }

  async removeAllUserRefreshTokens(id: number) {
    await this.tokenRepository.delete({
      usersId: id
    });
    return true;
  }

  //** PRIVATE HELPER **//

}
