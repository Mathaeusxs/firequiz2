
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

import { RefreshTokenPayload, TokenPayload, User } from '@libs/api-interfaces/index';

import { UsersService } from '@api/endpoints/users/users.service';
import { TokensService } from '@api/endpoints/users/tokens.service';

import { jwtConstants } from './constants';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private jwtService: JwtService
  ) {

  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.getUserForAuth(username);
    if (user &&
      await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result as User;
    } else {
      throw new UnauthorizedException('Invalid password!');
    }
  }

  async getUser(user: User) {
    return await this.usersService.getSingleById(user.id);
  }

  async login(user: User) {

    const [access_token, access_payload]
      = await this.generateToken(user, jwtConstants.secret, jwtConstants.tokenExpires);
    const [refresh_token, refresh_payload]
      = await this.generateRefreshToken(user, jwtConstants.refreshSecret, jwtConstants.refreshExpires);

    // Save refresh token to DB
    await this.tokensService.saveRefreshToken(user, refresh_payload as RefreshTokenPayload);

    return {
      access_token,
      refresh_token
    };
  }

  async logout(user: User, token: RefreshTokenPayload) {

    // Remove refresh token from DB
    await this.tokensService.removeUserRefreshToken(user, token.token)

    return true;
  }

  // TODO: Refresh token
  async refresh(user: User, token: RefreshTokenPayload) {

    const refreshToken = await this.tokensService.getUserRefreshToken(user, token);

    if (!refreshToken) throw new UnauthorizedException('Token dont exist!');

    const [access_token, access_payload]
      = await this.generateToken(user, jwtConstants.secret, jwtConstants.tokenExpires);

    return {
      access_token
    }
  }

  // /** PRIVATE HELPERS **/

  private async generateRefreshToken(user: User, secret: string, expires = '90d') {
    const [expire_value, expire_unit] = expires.split(/([0-9]+)/).filter(Boolean);

    const payload: RefreshTokenPayload = {
      username: user.username,
      userId: user.id,
      expires: moment().add(expire_value, expire_unit as moment.unitOfTime.DurationConstructor).toDate(),
      created: moment().toDate(),
      token: await bcrypt.genSalt(),
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: expires,
      secret: secret
    });
    return [token, payload];
  }

  private async generateToken(user: User, secret: string, expires = '15m') {
    const [expire_value, expire_unit] = expires.split(/([0-9]+)/).filter(Boolean);

    const payload: TokenPayload = {
      username: user.username,
      userId: user.id,
      expires: moment().add(expire_value, expire_unit as moment.unitOfTime.DurationConstructor).toDate(),
      created: moment().toDate(),
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: expires,
      secret: secret
    });

    return [token, payload];
  }
}
