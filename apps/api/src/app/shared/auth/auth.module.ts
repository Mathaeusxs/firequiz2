
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@api/endpoints/users/users.module';

import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh.strategy';

import { SessionSerializer } from './session.serializer';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.tokenExpires },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    JwtRefreshTokenStrategy,
    JwtRefreshGuard,
    SessionSerializer
  ],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})

export class AuthModule {}
