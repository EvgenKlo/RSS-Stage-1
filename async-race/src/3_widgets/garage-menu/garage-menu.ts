import './style.scss';
import { createElement } from './../../6_shared/lib/helpers/create-element';
import { ICreateCarRequest } from './../../types';
import { setCarInGarage } from './../../6_shared/api/create-car';
import { IGarageContainer } from './../garage-container/type';
import { addNewCar } from './../../4_features/add-new-car/addNewCar';
import { updateCar } from './../../6_shared/api/update-car';
import { garageContainer } from './../garage-container/garage-container'
import { Button } from '../../6_shared/lib/ui-components/button';
import { generate100Cars } from './../../4_features/generate-100-cars/generate-100-cars';
import { getGarage } from '../../6_shared/api/get-cars';
import { Race } from './../../4_features/race/race'

class GarageMenu {
  public garageMenu = createElement('div', ['garage-menu']);
  public forms = this.createForm();
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
      if(value === 'Update') {
        input.disabled = true;
      }
    })
    const submitBtn = new Button(value, [`create-car-form__submit-btn`]);
    parent.append(submitBtn.button);

    if(value === 'Create'){
      this.addSubmitCreateCar(parent, submitBtn.button);
    }
    
  }

  private async addSubmitCreateCar(form: HTMLFormElement, submitBtn: HTMLElement) {
    submitBtn.addEventListener('click', async (e) => {
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

      addNewCar(response, garageContainer);
      
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
      btn.addEventListener('click', async () => {
        if(item === 'Generate Cars') {
          const requestArr = generate100Cars();
          requestArr.map((item) => setCarInGarage(item))
          if(garageContainer.changePageBtns[1].classList.contains('off')) {
            garageContainer.buildAutodrom();
          } else {
            const response = await getGarage(garageContainer.pageNumber);
            if(response?.carsCount){
              garageContainer.carsCount = +response.carsCount;
              garageContainer.garageTittle.innerText = `Garage (${garageContainer.carsCount})`;
              garageContainer.pageNumberText.innerText = `Page ${garageContainer.pageNumber} of ${Math.ceil(garageContainer.carsCount / 7)}`;
            }
          }
        }
        if(item === 'Race') {
          Race.startRace(garageContainer.garage.garageBoxes)
        }
      })
    })
    return menuBtnContainer;
  }
}

export const garageMenu = new GarageMenu();
