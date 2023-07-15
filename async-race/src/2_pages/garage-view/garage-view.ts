import './garage-view.scss';
import { createElementInDOM } from '../../6_shared/lib/dom/create-element';
import { getGarage } from '../../6_shared/api/get-cars';
import { IGarageResponse, ICreateCarRequest, ICarResponse } from './../../types';
import { GarageBox } from '../../5_entities/garage-box/garage-box';
import { setCarInGarage } from './../../6_shared/api/create-car';
import { addNewCarInGarage } from './../../6_shared/lib/helpers/add-new-car-in-garage';
import { Garage } from '../../3_widgets/garage-container/garage/garage';
import { GarageContainer } from './../../3_widgets/garage-container/garage-container';
import { GarageMenu } from './../../3_widgets/garage-menu/garage-menu'


export class GarageView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  private menu = new GarageMenu().buildMenu();
  private pageNumber = 1;
  private countCarsOnThisPage = 0;

  public async buildGarage() {
    if(!this.main.classList.contains('main_garage') && !this.main.classList.contains('main_winners')) {
      this.main.classList.add('main_garage');
      this.main.append(this.menu);

      const garage = new GarageContainer();
      await garage.buildAutodrom();
      this.main.append(garage.garageContainer)
    } else if(!this.main.classList.contains('main_garage')) {
      this.main.innerHTML = '';
      this.main.classList.toggle('main_garage');
      this.main.classList.toggle('main_winners');
      this.main.append(this.menu);

      const garage = new GarageContainer();
      await garage.buildAutodrom();
      this.main.append(garage.garageContainer)
    }
  }

}
