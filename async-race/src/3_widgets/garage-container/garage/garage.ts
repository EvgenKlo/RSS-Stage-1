import { IGarageResponse, ICarResponse } from '../../../types';
import { createElement } from '../../../6_shared/lib/helpers/create-element';
import { GarageBox } from '../../../5_entities/garage-box/garage-box'
import './style.scss'

export class Garage {
  garage: HTMLElement
  constructor(){
    this.garage = this.createGarage()
  }

  public garageItems = new Array<HTMLElement>;

  public createNewPageGarage(response: ICarResponse[]) {
    this.garageItems = [];
    response.forEach((item) => {
      this.addCar(item)
    })
  }

  public addCarInGarage(response: ICarResponse) {
    if(this.garageItems.length < 7){
      this.addCar(response)
    }
  }

  private addCar(response: ICarResponse) {
    const garageBox = new GarageBox(response).garageBox;
    this.garageItems.push(garageBox);
    this.garage.append(garageBox)
  }

  private createGarage() {
    const garage = createElement('div', ['garage']);
    return garage;
  }

}
