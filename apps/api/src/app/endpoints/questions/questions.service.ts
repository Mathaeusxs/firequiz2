
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbQuestions, Question } from '@libs/api-interfaces/index';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(DbQuestions) private readonly qRepository: Repository<DbQuestions>,
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
  async save(data: Question) {
    return await this.qRepository.save(data);
  }


  async update(id: number, data: Question) {
    const item = await this.getSingleById(id);
    await this.qRepository.save({ ...item, ...data });
    return id;
  }

  async updatePartial(id: number, data: Question) {
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
