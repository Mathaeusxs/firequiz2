import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbDisciplines } from '@libs/app-entities';
import { Discipline } from '@libs/app-interfaces/data';

@Injectable()
export class DisciplinesService {

  constructor(
    @InjectRepository(DbDisciplines) private readonly disRepository: Repository<DbDisciplines>,
  ) {
  }

  get repository() {
    return this.disRepository;
  }

  /** GET LIST / ITEM **/
  async getAll(modUser = false) {
    return await this.disRepository.find({
      relations: this.setRelations([], { modUser })
    });
  }

  async getSingleById(id: number, modUser = false) {
    return await this.disRepository.findOne({
      where: { id },
      relations: this.setRelations([], { modUser })
    });
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

  private setRelations(relations: string[] = [], props: { [key in string]: boolean }) {
    if (props.modUser) relations.push('modUser')
    return relations;
  }
}
