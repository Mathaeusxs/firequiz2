import { DbQuestions } from "@libs/app-entities"

export enum QuestionTypes {
  "Text" = "text"
}

export interface Question extends DbQuestions {
  userAnswerId?: number,
  userAnswerCorrect?: boolean,
  userAnswerConfirmed?: boolean
}

export const DefaultQuestion: Partial<Question> = {
  id: null,
  question: null,
  type: QuestionTypes.Text,
  points: 1,
  active: true,
}
