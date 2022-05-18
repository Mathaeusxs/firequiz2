
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { DbCategories, Categorie } from '@libs/api-interfaces/index';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(DbCategories) private readonly catRepository: Repository<DbCategories>,
  ) {
  }

  /** GET LIST / ITEM **/
  async getAll() {
    return await this.catRepository.find();
  }

  async getSingleById(id: number) {
    return await this.catRepository.findOne({
      where: { id }
    });
  }

  async checkModified(id: number, modDate: Date){
    return await this.catRepository.findOne(
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
    if (!item && exist) throw new NotFoundException(`Could not find discipline by ${field}: ${value}`);
    return item;
  }
}
