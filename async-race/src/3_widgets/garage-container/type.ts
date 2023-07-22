import { IGarageBox } from '../../5_entities/garage-box/types';
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
  garageBoxes: IGarageBox[];
  removeBtns: Array<HTMLElement>;
  selectBtns: Array<HTMLElement>;
  addCarInGarage: (response: ICarResponse) => void,
  createNewPageGarage: (response: ICarResponse[], pageNumber: number) => void
}
