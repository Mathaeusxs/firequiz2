import { DbDisciplines } from "../db-entities"

export enum Disciplines {
  "PrvaPomoc" = "prva_pomoc",
  "PozarnaPreventiva" = "pozarna_preventiva",
  "Zgodovina" = "zgodovina",
}

export type DisciplinesDisplay = {
  [key in Disciplines]: string;
}

export const DisciplineNames: DisciplinesDisplay = {
  [Disciplines.PrvaPomoc]: 'Prva pomoč',
  [Disciplines.PozarnaPreventiva]: 'Požarna preventiva',
  [Disciplines.Zgodovina]: 'Zgodovina gasilstva',
}




export interface Discipline extends DbDisciplines {
}

export const DefaultDiscipline: Partial<Discipline> = {
  id: null,
  name: null,
  active: true,
  description: null,
}
