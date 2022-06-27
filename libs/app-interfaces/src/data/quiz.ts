// import { GeneratedQuestion } from './questions';
import { DbQuiz } from "@libs/app-entities"

import { Categorie } from "./categories";
import { Discipline } from "./disciplines";

export interface QuizRouteParams {
  quizId: number,
  num_questions: number,
  countdown?: number
};

export interface QuickParams {
  num_questions: number;
  disciplines: Discipline[]
  categories: Categorie[]
  countdown: number;
};

export interface Quiz extends DbQuiz {
  params: QuizRouteParams;
  currentIndex: number,
  points: number,
}

export const DefaultQuiz: Partial<Quiz> = {
  id: null,
  name: null,
  params: null,
  currentIndex: 0,
  points: 0,
  active: true
}
