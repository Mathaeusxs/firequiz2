
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbDisciplines, Discipline } from '@libs/api-interfaces/index';

@Injectable()
export class DisciplinesService {

  constructor(
    @InjectRepository(DbDisciplines) private readonly disRepository: Repository<DbDisciplines>,
  ) {
  }

  /** GET LIST / ITEM **/
  async getAll() {
    return await this.disRepository.find();
  }

  async getSingleById(id: number) {
    return await this.disRepository.findOne({
      where: { id }
    });
  }

  async checkModified(id: number, modDate: Date){
    return await this.disRepository.findOne(
      {
        where:{
          id,
          modified: MoreThan(modDate)
        },
        relations:['modUser']
      }
    )
  }

  // CREATE / EDIT
  async save(data: Discipline) {
    return await this.disRepository.save(data);
  }


  async update(id: number, data: Discipline) {
    const item = await this.getSingleById(id);
    await this.disRepository.save({ ...item, ...data });
    return id;
  }

  async updatePartial(id: number, data: Discipline) {
    const report = await this.disRepository.update(id, data);
    return report.affected > 0 ? true: false;
  }

  //** DELETE **//

  async delete(id: number) {
    await this.disRepository.delete(id);
    return id;
  }

  //** PRIVATE HELPER **//
  private async findByField(field: string, value: string | number | boolean, exist = true) {
    const item = await this.disRepository.findOne({
      where: {
        [field]: value
      }
    })
    if (!item && exist) throw new NotFoundException(`Could not find by ${field}: ${value}`);
    return item;
  }
}
