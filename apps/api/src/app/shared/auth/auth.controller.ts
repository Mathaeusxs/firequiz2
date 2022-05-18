import { Controller, UseGuards, Post, Request, Get, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req) {
    return this.authService.getUser(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.user, req.authInfo);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user, req.authInfo);
  }
}
