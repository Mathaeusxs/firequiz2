
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '../constants';
import { TokenPayload, User } from '@libs/api-interfaces/index';

import { UsersService } from '@api/endpoints/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private usersService: UsersService
  )
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: TokenPayload) {
    // Can get any data from DB to return
    const ans=await this.usersService.getSingleById(payload.userId);
    return {
      id: payload.userId,
      username: payload.username,
      rank:ans.rank
    } as User;
  }
}
