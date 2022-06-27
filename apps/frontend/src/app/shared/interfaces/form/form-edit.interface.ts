export interface FormEditRoute<T> {
  data?: T;
  storeSave: boolean,
}

export interface FormEditSaveEmit<T> {
  data?: T;
  mode: boolean,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultFormEditRoute: FormEditRoute<any> = {
  data: null,
  storeSave: true,
}
