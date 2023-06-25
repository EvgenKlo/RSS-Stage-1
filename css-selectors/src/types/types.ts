export enum KeyCode {
  enter ='Enter',
  numpadEnter = 'NumpadEnter'
}

type ArrClasses = string | null;

export type ArrForSaveProgress = boolean | null;

export interface ILevel {
  levelNumber: number,
  levelTitle: string,
  items: string[],
  classes: ArrClasses[],
  answer: string,
  markup: string[],
}
