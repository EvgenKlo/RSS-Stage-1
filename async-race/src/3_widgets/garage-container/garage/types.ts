import { ICarResponse } from './../../../types'

export interface IGarage {
  garage: HTMLElement,
  garageItems: Array<HTMLElement>;
  removeBtns: Array<HTMLElement>;
  selectBtns: Array<HTMLElement>;
  createNewPageGarage: (response: ICarResponse[], pageNumber: number) => void
}
