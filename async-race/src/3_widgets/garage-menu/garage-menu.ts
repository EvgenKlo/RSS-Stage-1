import './style.scss';
import { createElement } from './../../6_shared/lib/helpers/create-element';
import { ICreateCarRequest } from './../../types';
import { setCarInGarage } from './../../6_shared/api/create-car';
import { IGarageContainer } from './../garage-container/type';
import { addNewCar } from './../../4_features/add-new-car/addNewCar';
import { updateCar } from './../../6_shared/api/update-car';

export class GarageMenu {
  garageContainer: IGarageContainer
  constructor(garageContainer: IGarageContainer){
    this.garageContainer = garageContainer
  }
  public garageMenu = createElement('div', ['garage-menu']);
  private forms = this.createForm();
  private buttons = this.createBtnsInMenu();

  public buildMenu() {
    this.garageMenu.append(...this.forms, this.buttons);
    return this.garageMenu;
  }

  private createForm() {
    const forms = ['Create', 'Update'];
    const result = new Array<HTMLFormElement>;
    forms.forEach((item) => {
      const form = createElement('form', ['create-car-form']) as HTMLFormElement;
      const placeholder = 'Enter car name'
      this.createInputForCreateCar(form, item, placeholder);
      result.push(form);
    })
    return result;
  }

  private createInputForCreateCar(parent: HTMLFormElement, value: string, placeholder: string) {
    const inputs = ['text', 'color'];
    inputs.forEach((item) => {
      const input = createElement('input', [`create-car-form__input-${item}`]) as HTMLInputElement;
      parent.append(input);
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
    const submitBtn = createElement('input', [`create-car-form__submit-btn`]) as HTMLInputElement;
    parent.append(submitBtn);
    submitBtn.type = 'submit';
    submitBtn.value = value;

    if(value === 'Create'){
      this.addSubmitCreateCar(parent);
    }
    
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

      addNewCar(response, this.garageContainer);
      
    })
  }

  public updateCar(form: HTMLFormElement) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form1 = form.children[0] as HTMLInputElement;
      const form2 = form.children[1] as HTMLInputElement;
      const newCarData: ICreateCarRequest = {
        name: form1.value || 'Selected Car Name',
        color: form2.value
      }
      form1.value = '';
      form2.value = '#65E6D1';
      
      //const response = await updateCar(newCarData, );

      //addNewCar(response, this.garageContainer);
      
    })
  }

  private createBtnsInMenu() {
    const buttons = ['Race', 'Reset', 'Generate Cars'];
    const classes = [['menu__btn', 'menu__btn-race'], ['menu__btn', 'menu__btn-reset'], ['menu__btn', 'menu__btn-generate-cars']];
    const menuBtnContainer = createElement('div', ['menu__btn-container']);
    this.garageMenu.append(menuBtnContainer);
    buttons.forEach((item, index) => {
      const btn = createElement('div', classes[index]);
      menuBtnContainer.append(btn);
      btn.innerText = item;
      btn.addEventListener('click', () => {
        console.log(btn);
      })
    })
    return menuBtnContainer;
  }
}

//export const menu = new GarageMenu;
