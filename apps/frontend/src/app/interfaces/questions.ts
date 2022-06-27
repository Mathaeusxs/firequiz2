export enum QuestionTypes {
  "Text" = "text"
}
/* export enum AnswerTypes {
  "Text" = "text"
} */

export interface Question {
  question: string,
  type: QuestionTypes,
  main_answer: string[],
  fake_answers: string[]
  points?: number
}

export interface GeneratedQuestion extends Question {
  answers: string[],
  correct: number,
}

/* export interface Answer {
  text: string,
  type: AnswerTypes,
  correct: boolean,
} */
