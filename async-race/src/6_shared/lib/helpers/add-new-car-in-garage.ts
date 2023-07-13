import { GarageBox } from '../../../5_entities/garage-box/garage-box'
import { ICreateCarResponse } from './../../../types'

export function addNewCarInGarage(response: ICreateCarResponse){
  const garageBox = new GarageBox(response);
  return garageBox.garageBox;
}
