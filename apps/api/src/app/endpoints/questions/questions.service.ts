import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { DbAnswers, DbQuestions } from '@libs/app-entities';
import { Question } from '@libs/app-interfaces/data';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(DbQuestions) private readonly qRepository: Repository<DbQuestions>,
    @InjectRepository(DbAnswers) private readonly aRepository: Repository<DbAnswers>,
  ) {
  }

  /** GET LIST / ITEM **/
  async getAll(modUser = false) {
    return await this.qRepository.find({
      relations: this.setRelations(['quiz', 'answers'], { modUser })
    });
  }

  async getAllQuiz(quizId: number[]) {
    return await this.qRepository.find({
      where: { quizId: In(quizId) },
      relations: ['answers']
    });
  }

  async getSingleById(id: number, modUser = false) {
    return await this.qRepository.findOne({
      where: { id },
      relations: this.setRelations(['quiz', 'answers'], { modUser })
    });
  }

  // CREATE / EDIT
  async save(data: Question) {
    const newData = await this.qRepository.save(data);
    this.updateQuestionAnswers(newData);
    return newData;
  }

  async update(id: number, data: Question) {
    const item = await this.getSingleById(id);
    this.updateQuestionAnswers(data);
    await this.qRepository.save({ ...item, ...data });
    return id;
  }

  async updatePartial(id: number, data: Question) {
    const report = await this.qRepository.update(id, data);
    this.updateQuestionAnswers(data);
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

  // ANSWERS
  private updateQuestionAnswers(question: Question) {
    // Delete All existing for this question
    this.aRepository.delete({
      questionsId: question.id
    });

    // Add new
    for(let answer of question.answers) {
      answer.modUser = question.modUser;
      answer.questionsId = question.id;
      answer.id = null;
      this.aRepository.save(answer);
    }
  }
}
