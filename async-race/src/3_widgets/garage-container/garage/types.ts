import { ICarResponse } from './../../../types'

export interface IGarage {
  garage: HTMLElement,
  garageItems: Array<HTMLElement>;
  createNewPageGarage: (response: ICarResponse[], pageNumber: number) => void
}
