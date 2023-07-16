import { IGarageResponse, ICarResponse } from '../../../types';
import { createElement } from '../../../6_shared/lib/helpers/create-element';
import { GarageBox } from '../../../5_entities/garage-box/garage-box';
import { deleteCar } from './../../../6_shared/api/delete-car'
import './style.scss'
import { getGarage } from './../../../6_shared/api/get-cars';
import { IGarageContainer } from '../type';

export class Garage {
  garage: HTMLElement
  garageContainer: IGarageContainer
  constructor(garageContainer: IGarageContainer){
    this.garage = this.createGarage();
    this.garageContainer = garageContainer
  }

  public garageItems = new Array<HTMLElement>;

  public createNewPageGarage(response: ICarResponse[], pageNumber: number) {
    this.garageItems = [];
    response.forEach((item) => {
      this.addCar(item, pageNumber)
    })
  }

  public addCarInGarage(response: ICarResponse) {
    if(this.garageItems.length < 7){
      this.addCar(response);
    }
  }

  public async deleteCar(garageBox: HTMLElement, pageNumber: number) {
    await deleteCar(garageBox.id);
    const response = await getGarage(pageNumber);
    this.garageContainer.pageNumber = pageNumber;
    this.garageContainer.buildAutodrom();
  }

  private addCar(response: ICarResponse, pageNumber: number = 1) {
    const garageBox = new GarageBox(response);
    garageBox.removeBtn.button.addEventListener('click', () => {
      this.deleteCar(garageBox.garageBox, pageNumber);
    })
    this.garageItems.push(garageBox.garageBox);
    this.garage.append(garageBox.garageBox)
  }

  private createGarage() {
    const garage = createElement('div', ['garage']);
    return garage;
  }

}
