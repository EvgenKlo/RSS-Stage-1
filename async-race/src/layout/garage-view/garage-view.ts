import './garage-view.scss';
import { createElementInDOM } from '../../6_shared/lib/dom/create-element';
import { getGarage } from './../../6_shared/api/get-api/get-api-garage';
import { ICarResponse, ICreateCarRequest } from './../../types';
import { Car } from './../../5_entities/car/car';
import { setCarInGarage } from './../../6_shared/api/create-car'


export class GarageView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  private menu: HTMLElement | undefined;

  public buildGarage() {
    if(!this.main.classList.contains('main_garage') && !this.main.classList.contains('main_winners')) {
      this.main.classList.add('main_garage');
      this.createMenu();
      this.createGarageContainer(this.main);
    } else if(!this.main.classList.contains('main_garage')) {
      this.main.innerHTML = '';
      this.main.classList.toggle('main_garage');
      this.main.classList.toggle('main_winners');
      this.createMenu();
      this.createGarageContainer(this.main);
    }
  }

  private createMenu() {
    const menu = createElementInDOM('div', ['garage-menu'], this.main);
    this.menu = menu;
    this.createForm(menu);
    this.creatBtnsInMenu(menu);
  }

  private createForm(parent: HTMLElement) {
    const forms = ['Create', 'Update'];
    forms.forEach((item) => {
      const form = createElementInDOM('form', ['create-car-form'], parent) as HTMLFormElement;
      form.type = 'POST';
      this.createInputForCreateCar(form, item);
    })
  }

  private createInputForCreateCar(parent: HTMLFormElement, value: string) {
    const inputs = ['text', 'color'];
    inputs.forEach((item) => {
      const input = createElementInDOM('input', [`create-car-form__input-${item}`], parent) as HTMLInputElement;
      input.type = item;
      input.name = 'name';
      if(item === 'color') {
        input.value = '#65E6D1';
        input.name = 'color';
      }
    })
    const submitBtn = createElementInDOM('input', [`create-car-form__submit-btn`], parent) as HTMLInputElement;
    submitBtn.type = 'submit';
    submitBtn.value = value;
    this.addSubmitCreateCar(parent);
  }

  private async addSubmitCreateCar(form: HTMLFormElement) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form1 = form.children[0] as HTMLInputElement;
      const form2 = form.children[1] as HTMLInputElement;
      const newCarData: ICreateCarRequest = {
        name: form1.value,
        color: form2.value
      }
      form1.value = '';
      form2.value = '#65E6D1';
      
      await setCarInGarage(newCarData);

    })
  }

  private creatBtnsInMenu(parent: HTMLElement) {
    const buttons = ['Race', 'Reset', 'Generate Cars'];
    const classes = [['menu__btn', 'menu__btn-race'], ['menu__btn', 'menu__btn-reset'], ['menu__btn', 'menu__btn-generate-cars']];
    const menuBtnContainer = createElementInDOM('div', ['menu__btn-container'], parent);
    buttons.forEach((item, index) => {
      const btn = createElementInDOM('div', classes[index], menuBtnContainer);
      btn.innerText = item;
      btn.addEventListener('click', () => {
        console.log(btn);
      })
    })
  }

  private async createGarageContainer(parent: HTMLElement) {
    const garageContainer = createElementInDOM('div', ['garage__container'], parent);
    const garageResponse = await getGarage();
    this.createGarageTittle(garageContainer, garageResponse);
    this.createPageNumberText(garageContainer, garageResponse);
    this.createCars(garageContainer, garageResponse);
    this.createChangePageBtn(garageContainer);
  }

  private createGarageTittle(parent: HTMLElement, response: ICarResponse[]) {
    const garageTittle = createElementInDOM('h2', ['garage__tittle'], parent);
    garageTittle.innerText = `Garage (${response.length})`;
  }

  private createPageNumberText(parent: HTMLElement, response: ICarResponse[]) {
    const pageNumberText = createElementInDOM('p', ['garage__page-text'], parent);
    pageNumberText.innerText = `Page #${'Number page'}`;
  }

  private createCars(parent: HTMLElement, response: ICarResponse[]) {
    response.forEach((item) => {
      const box = new Car(item, parent);
      box.createBox();
    })
  }

  private createChangePageBtn(parent: HTMLElement) {
    const changePageBtn = ['Prev', 'Next'];
    const changePageBtnContainer = createElementInDOM('div', ['garage__change-page-btn-container'], parent);
    changePageBtn.forEach((item) => {
      const btn = createElementInDOM('div', ['garage__change-btn', `garage__change-btn_${item.toLocaleLowerCase()}`], changePageBtnContainer);
      btn.innerText = item;
      btn.addEventListener('click', () => {
        console.log(btn);
      })
    })
  }

}
