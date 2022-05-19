// import { GeneratedQuestion } from './questions';
import { Categories } from "./categories";
import { Disciplines } from "./disciplines";
import { DbQuiz } from '../db-entities';

export interface QuizParams {
  categorie: Categories,
  discipline: Disciplines,
  names?: {
    categorie: string,
    discipline: string,
  }
  num_questions: number,
  countdown?: number
};

/*
export interface Quiz {
  params: QuizParams;
  questions: GeneratedQuestion[];
  currentIndex: number,
  points: number,
};*/

export interface QuickParams {
  num_questions: number;
  disciplines: {
    [key in string]: boolean
  }
  categories: {
    [key in string]: boolean
  },
  countdown: number;
};


export interface Quiz extends DbQuiz {
  params: QuizParams;
  currentIndex: number,
  points: number,
}

export const DefaultQuestions: Partial<Quiz> = {
  id: null,
  name: null,
  params: null,
  currentIndex: 0,
  points: 0,
  active: true
}
