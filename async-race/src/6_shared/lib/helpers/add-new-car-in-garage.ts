import { GarageBox } from '../../../5_entities/garage-box/garage-box'
import { ICarResponse } from './../../../types'

export function addNewCarInGarage(response: ICarResponse){
  const garageBox = new GarageBox(response);
  return garageBox.garageBox;
}
