
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbQuiz, Quiz } from '@libs/api-interfaces/index';

@Injectable()
export class QuizzesService {

  constructor(
    @InjectRepository(DbQuiz) private readonly qRepository: Repository<DbQuiz>,
  ) {
  }

  /** GET LIST / ITEM **/
  async getAll() {
    return await this.qRepository.find();
  }

  async getSingleById(id: number) {
    return await this.qRepository.findOne({
      where: { id }
    });
  }

  async checkModified(id: number, modDate: Date){
    return await this.qRepository.findOne(
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
  async save(data: Quiz) {
    return await this.qRepository.save(data);
  }


  async update(id: number, data: Quiz) {
    const item = await this.getSingleById(id);
    await this.qRepository.save({ ...item, ...data });
    return id;
  }

  async updatePartial(id: number, data: Quiz) {
    const report = await this.qRepository.update(id, data);
    return report.affected > 0 ? true: false;
  }

  //** DELETE **//

  async delete(id: number) {
    await this.qRepository.delete(id);
    return id;
  }

  //** PRIVATE HELPER **//
  private async findByField(field: string, value: string | number | boolean, exist = true) {
    const item = await this.qRepository.findOne({
      where: {
        [field]: value
      }
    })
    if (!item && exist) throw new NotFoundException(`Could not find by ${field}: ${value}`);
    return item;
  }
}
