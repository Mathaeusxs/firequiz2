import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbUsers } from '@libs/app-entities';
import { User, UserRanks, UserUpdate } from '@libs/app-interfaces/data';

import { TokensService } from './tokens.service';
import { environment } from '@environment';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(DbUsers) private readonly usersRepository: Repository<DbUsers>,
    private tokensService: TokensService,
  ) { }

  get repository() {
    return this.usersRepository;
  }

  /** GET LIST / ITEM **/

  async getAll() {
    return await this.usersRepository.find({
      relations: ["modUser"]
    });
  }

  async getSingleById(id: number) {
    return await this.usersRepository.findOne({
      where: { id }
    });
    // return await this.findUser(id);
  }

  async getSingleByUsername(name: string) {
    return await this.findUserByUsername(name,false);
  }

  async getSingleByEmail(email: string) {
    return await this.findUserByField('email', email, false);
  }

  async getMainAdminUser() {
    return await this.usersRepository.findOne({
      where: {
        username: environment.adminUser.name,
        id: environment.adminUser.id
      }
    });
  }

  async createAdminIfNotExist() {
    const user = await this.getMainAdminUser();

    if (!user) {
      return await this.save({
        id: environment.adminUser.id,
        name: environment.adminUser.name,
        username: environment.adminUser.name,
        password: environment.adminUser.name,
        email: environment.adminUser.name,
        active: true,
        rank: UserRanks.SuperAdmin,
      } as User)
    } else {
      return user;
    }
  }

  async getUserForAuth(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['id','username','name','password','salt','active']
    });

    if (!user) throw new NotFoundException(`Could not find user by username: ${username}`);
    if (!user.active) throw new UnauthorizedException(`User "${username}" isn't active`);
    return user;
  }

  async checkModified(givenId:number,modTime:Date){
    const ans=await this.usersRepository.findOne(
      {
        where:{
          id:givenId,
          modified:MoreThan(modTime)
        },
        relations:['modUser']
      }
    )
    return ans;
  }

  //** CREATE / EDIT **/
  async save(user: User) {
    // Mybe some user fields validation?

    // user.rank = 1;
    user.active = true;
    return await this.usersRepository.save(user);
  }

  async update(id: number, user: UserUpdate) {
    // On password change remove all tokens of user - logout everywhere
    if (user.passwordChange
      && user.passwordConfirm
      && user.password) {
        this.tokensService.removeAllUserRefreshTokens(id);
    }

    await this.usersRepository.update(id, user);
    return id;
  }

  //** DELETE **//

  async delete(id: number) {
    await this.usersRepository.delete(id);
    return id;
  }

  //** PRIVATE HELPER **//
  private async findUserByUsername(username: string, exists=true) {

    const user = await this.usersRepository.findOne({
      where: { username }
    });

    if (!user && exists) throw new NotFoundException(`Could not find user by username: ${username}`);
    return user;
  }

  private async findUserByField(field: string, value: string | number | boolean, exist = true) {
    const user = await this.usersRepository.findOne({
      [field]: value
    });
    if (!user && exist) throw new NotFoundException(`Could not find by ${field}: ${value}`);
    return user;
  }
}
