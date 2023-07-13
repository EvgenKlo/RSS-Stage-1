import './garage-view.scss';
import { createElementInDOM } from '../../6_shared/lib/dom/create-element';
import { getGarage } from '../../6_shared/api/get-cars';
import { IGarageResponse, ICreateCarRequest } from './../../types';
import { GarageBox } from '../../5_entities/garage-box/garage-box';
import { setCarInGarage } from './../../6_shared/api/create-car';
import { addNewCarInGarage } from './../../6_shared/lib/helpers/add-new-car-in-garage'


export class GarageView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  private menu: HTMLElement | undefined;
  private pageNumber = 1;
  private countCarsOnThisPage = 0;

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
      const placeholder = 'Enter car name'
      this.createInputForCreateCar(form, item, placeholder);
    })
  }

  private createInputForCreateCar(parent: HTMLFormElement, value: string, placeholder: string) {
    const inputs = ['text', 'color'];
    inputs.forEach((item) => {
      const input = createElementInDOM('input', [`create-car-form__input-${item}`], parent) as HTMLInputElement;
      input.type = item;
      input.name = 'name';
      if(item === 'color') {
        input.value = '#65E6D1';
        input.name = 'color';
      }
      if(item === 'text') {
        input.placeholder = placeholder;
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
        name: form1.value || 'New Car',
        color: form2.value
      }
      form1.value = '';
      form2.value = '#65E6D1';
      
      const response = await setCarInGarage(newCarData);

      if(this.countCarsOnThisPage < 7) {
        const garage = document.querySelector('.garage');
        garage?.append(addNewCarInGarage(response));
      }
      
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

  private createGarageContainer(parent: HTMLElement) {
    const garageContainer = createElementInDOM('div', ['garage__container'], parent);
    const garage = createElementInDOM('div', ['garage'], garageContainer);
    this.createGarage(garage);
    this.createChangePageBtn(garageContainer);
  }

  private async createGarage(parent: HTMLElement) {
    const garageResponse = await getGarage();
    if(garageResponse) {
      this.createGarageTittle(parent, garageResponse);
      this.createPageNumberText(parent, garageResponse);
      this.createCars(parent, garageResponse);
    }
  }

  private createGarageTittle(parent: HTMLElement, response: IGarageResponse) {
    const garageTittle = createElementInDOM('h2', ['garage__tittle'], parent);
    garageTittle.innerText = `Garage (${response.carsCount})`;
  }

  private createPageNumberText(parent: HTMLElement, response: IGarageResponse) {
    const pageNumberText = createElementInDOM('p', ['garage__page-text'], parent);
    pageNumberText.innerText = `Page #${this.pageNumber}`;
  }

  private createCars(parent: HTMLElement, response: IGarageResponse) {
    this.countCarsOnThisPage = 0;
    response.garage.forEach((item) => {
      const garageBox = new GarageBox(item);
      this.countCarsOnThisPage++;
      parent.append(garageBox.garageBox)
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
