import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbQuiz } from '@libs/app-entities';
import { Quiz } from '@libs/app-interfaces/data';
@Injectable()
export class QuizzesService {

  constructor(
    @InjectRepository(DbQuiz) private readonly qRepository: Repository<DbQuiz>,
  ) {
  }

  get repository() {
    return this.qRepository;
  }

  /** GET LIST / ITEM **/
  async getAll(modUser = false) {
    return await this.qRepository.find({
      relations: this.setRelations(['categories', 'disciplines'], { modUser })
    });
  }

  async getSingleById(id: number, modUser = false) {
    return await this.qRepository.findOne({
      where: { id },
      relations: this.setRelations(['categories', 'disciplines'], { modUser })
    });
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

  private setRelations(relations: string[] = [], props: { [key in string]: boolean }) {
    if (props.modUser) relations.push('modUser')
    return relations;
  }
}
