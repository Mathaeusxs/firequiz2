import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Categorie } from '@libs/app-interfaces/data';
import { DbCategories } from '@libs/app-entities';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(DbCategories) private readonly catRepository: Repository<DbCategories>,
  ) {
  }

  get repository() {
    return this.catRepository;
  }

  /** GET LIST / ITEM **/
  async getAll(modUser = false) {
    return await this.catRepository.find({
      relations: this.setRelations([], { modUser })
    });
  }

  async getSingleById(id: number, modUser = false) {
    return await this.catRepository.findOne({
      where: { id },
      relations: this.setRelations([], { modUser })
    });
  }

  // CREATE / EDIT
  async save(data: Categorie) {
    return await this.catRepository.save(data);
  }

  async update(id: number, data: Categorie) {
    const item = await this.getSingleById(id);
    await this.catRepository.save({ ...item, ...data });
    return id;
  }

  async updatePartial(id: number, data: Categorie) {
    const report = await this.catRepository.update(id, data);
    return report.affected > 0 ? true: false;
  }

  //** DELETE **//

  async delete(id: number) {
    await this.catRepository.delete(id);
    return id;
  }

  //** PRIVATE HELPER **//
  private async findByField(field: string, value: string | number | boolean, exist = true) {
    const item = await this.catRepository.findOne({
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
