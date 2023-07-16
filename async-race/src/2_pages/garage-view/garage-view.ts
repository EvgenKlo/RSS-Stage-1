import { GarageContainer } from './../../3_widgets/garage-container/garage-container';
import { GarageMenu } from './../../3_widgets/garage-menu/garage-menu'


export class GarageView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  private garageContainer = new GarageContainer();
  private menu = new GarageMenu(this.garageContainer);

  public async buildGarage() {
    if(!this.main.classList.contains('main_garage') && !this.main.classList.contains('main_winners')) {
      this.main.classList.add('main_garage');
      this.main.append(this.menu.buildMenu());

      await this.garageContainer.buildAutodrom();
      this.main.append(this.garageContainer.garageContainer);

    } else if(!this.main.classList.contains('main_garage')) {
      this.main.innerHTML = '';
      this.main.classList.toggle('main_garage');
      this.main.classList.toggle('main_winners');
      this.main.append(this.menu.buildMenu());

      await this.garageContainer.buildAutodrom();
      this.main.append(this.garageContainer.garageContainer);
    }
  }

}
