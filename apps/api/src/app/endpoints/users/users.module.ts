
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbUsers, DbResetTokens } from '@libs/app-entities';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokensService } from './tokens.service';
import { DbUsersSubscriber } from './users.subscribers';

@Module({
  imports: [
    TypeOrmModule.forFeature([DbUsers, DbResetTokens]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    TokensService,
    DbUsersSubscriber
  ],
  exports: [
    UsersService,
    TokensService
  ],
})
export class UsersModule {}
