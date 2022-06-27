import { DbCategories } from "@libs/app-entities"

export interface Categorie extends DbCategories {
}

export const DefaultCategorie: Partial<Categorie> = {
  id: null,
  name: null,
  active: true,
  description: null,
}
