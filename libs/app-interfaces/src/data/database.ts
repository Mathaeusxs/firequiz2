import { Categorie } from "./categories";
import { Discipline } from "./disciplines";
import { Question } from "./questions";

export interface MainDatabase {
  categorie: Categorie,
  disciplines: {
    discipline: Discipline,
    questions: Question[]
  }[]
}
