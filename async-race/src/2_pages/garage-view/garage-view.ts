import './garage-view.scss';
import { createElementInDOM } from '../../6_shared/lib/dom/create-element';
import { getGarage } from '../../6_shared/api/get-cars';
import { IGarageResponse, ICreateCarRequest, ICarResponse } from './../../types';
import { GarageBox } from '../../5_entities/garage-box/garage-box';
import { setCarInGarage } from './../../6_shared/api/create-car';
import { addNewCarInGarage } from './../../6_shared/lib/helpers/add-new-car-in-garage';
import { Garage } from './../../3_widgets/garage/garage'


export class GarageView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  private menu: HTMLElement | undefined;
  private pageNumber = 1;
  private countCarsOnThisPage = 0;

  public async buildGarage() {
    //const response = await this.getResponse();


    if(!this.main.classList.contains('main_garage') && !this.main.classList.contains('main_winners')) {
      this.main.classList.add('main_garage');
      this.createMenu();
      const garage = await this.createGarageContainer()
      if(garage){
        this.main.append(garage);
      }
    } else if(!this.main.classList.contains('main_garage')) {
      this.main.innerHTML = '';
      this.main.classList.toggle('main_garage');
      this.main.classList.toggle('main_winners');
      this.createMenu();
      const garage = await this.createGarageContainer()
      if(garage){
        this.main.append(garage);
      }
    }
  }

  private async getResponse () {
    try {
      const response = await getGarage(this.pageNumber);
      console.log(response)
      return response;
    }
    catch {
      console.log('hi')
    }
  };

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

  private async createGarageContainer() {
    const garageContainer = createElementInDOM('div', ['garage__container']);
    const response = await this.getResponse();
    if(response){
      const garage = new Garage();
      garage.createNewPageGarage(response.garage);
      return garage.garage;
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
