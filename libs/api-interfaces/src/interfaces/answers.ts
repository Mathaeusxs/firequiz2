import { DbAnswers } from "../db-entities"

export interface Answer extends DbAnswers {
}

export const DefaultAnswer: Partial<Answer> = {
  id: null,
  answer: null,
  correct: false,
}
