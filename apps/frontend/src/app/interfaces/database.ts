import { Categories } from "./categories";
import { Disciplines } from "./disciplines";
import { Question } from "./questions";

export interface MainDatabase {
  categorie: Categories,
  disciplines: {
    discipline: Disciplines,
    questions: Question[]
  }[]
}
