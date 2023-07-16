import { ICarResponse } from './../../types'

export interface IGarageContainer {
  garageContainer: HTMLElement,
  pageNumber: number,
  garage: IGarage,
  garageTittle: HTMLElement,
  pageNumberText: HTMLElement,
  carsCount: number,
  changePageBtns: HTMLElement[],
  buildAutodrom: () => void,
}

export interface IGarage {
  garage: HTMLElement,
  garageItems: HTMLElement[],
  addCarInGarage: (response: ICarResponse) => void,
  createNewPageGarage: (response: ICarResponse[], pageNumber: number) => void
}
