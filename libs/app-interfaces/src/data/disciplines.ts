import { DbDisciplines } from "@libs/app-entities"

export interface Discipline extends DbDisciplines {
}

export const DefaultDiscipline: Partial<Discipline> = {
  id: null,
  name: null,
  active: true,
  description: null,
}
