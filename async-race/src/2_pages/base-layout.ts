import './base-layout.scss'
import { createElementInDOM } from '../6_shared/lib/dom/create-element';
import { GarageView } from './garage-view/garage-view';
import { WinnersView } from './winners-view/winners-view';
import { winnerMassage } from './../5_entities/win-massege/win-massage'

export class BaseLayout {
  private buttonsGarageAndWinners = new Array<HTMLElement>;
  private layout = createElementInDOM('div', ['root']);
  private header = this.createHeader();
  private buttonsInHeader = this.createButtonToHeader(this.header);
  private tittleApp = this.createTittleApp(this.header);
  private main = this.createMain(this.layout);
  private garageView = new GarageView(this.main);
  private winnersView = new WinnersView(this.main);

  private createHeader() {
    this.layout.append(winnerMassage.massageContainer)
    return createElementInDOM('div', ['header'], this.layout)
  }

  private createButtonToHeader(parentElement: HTMLElement) {
    const buttons = ['To Garage', 'To Winners'];
    const buttonsClasses = [['header-button', 'header-button_to-garage', 'on'], ['header-button', 'header-button_to-winners']];
    buttons.forEach((item, index) => {
      const button = createElementInDOM('div', buttonsClasses[index], parentElement);
      this.buttonsGarageAndWinners.push(button)
      button.innerText = item;
      button.addEventListener('click', () => {
        if(!button.classList.contains('on')) {
          this.buttonsGarageAndWinners.forEach((item) => {
            item.classList.remove('on');
          })
          button.classList.add('on');
          if(button.classList.contains('header-button_to-garage')) {
            this.garageView.buildGarage();
          } else {
            this.winnersView.buildWinners();
          }
        }
      })
    })
  }

  private createTittleApp(parentElement: HTMLElement) {
    const tittleApp = createElementInDOM('h1', ['tittle-app'], parentElement);
    tittleApp.innerText = 'Async Race';
    return tittleApp;
  }

  private createMain(parentElement: HTMLElement) {
    const viewContainer = createElementInDOM('div', ['main'], parentElement);
    const menu = new GarageView(viewContainer);
    menu.buildGarage();
    return viewContainer;
  }

}
