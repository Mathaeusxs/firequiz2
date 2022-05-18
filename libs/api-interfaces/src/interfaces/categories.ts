import { DbCategories } from "../db-entities"

export enum Categories {
  "Pionirji" = "pionirji",
  "Mladinci" = "mladinci",
  "Pripravniki" = "pripravniki",
}

export type CategoriesDisplay = {
  [key in Categories]: string;
}

export const CategorieNames: CategoriesDisplay = {
  [Categories.Pionirji]: 'Pionirji',
  [Categories.Mladinci]: 'Mladinci',
  [Categories.Pripravniki]: 'Pripravniki',
}





export interface Categorie extends DbCategories {
}

export const DefaultCategorie: Partial<Categorie> = {
  id: null,
  name: null,
  active: true,
  description: null,
}
