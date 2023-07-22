import { IGarageResponse, ICarResponse, ICreateCarRequest } from '../../../types';
import { createElement } from '../../../6_shared/lib/helpers/create-element';
import { GarageBox } from '../../../5_entities/garage-box/garage-box';
import { deleteCar } from './../../../6_shared/api/delete-car'
import './style.scss'
import { getGarage } from './../../../6_shared/api/get-cars';
import { IGarageContainer } from '../type';
import { garageMenu } from '../../garage-menu/garage-menu';
import { IGarageBox } from './../../../5_entities/garage-box/types'
import { updateCar } from '../../../6_shared/api/update-car'
import { AnimateCar } from '../../../4_features/animate-car/animate-car';

export class Garage {
  garage: HTMLElement
  garageContainer: IGarageContainer
  constructor(garageContainer: IGarageContainer){
    this.garage = this.createGarage();
    this.garageContainer = garageContainer
  }

  public garageItems = new Array<HTMLElement>;
  public removeBtns = new Array<HTMLElement>;
  public selectBtns = new Array<HTMLElement>;
  public garageBoxes = new Array<IGarageBox>;

  public createNewPageGarage(response: ICarResponse[], pageNumber: number) {
    this.garageItems = [];
    this.removeBtns = [];
    this.selectBtns = [];
    this.garageBoxes = [];
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

  private async updateCarMethod(garageBox: IGarageBox) {
    event?.preventDefault();
    const form1 = garageMenu.forms[1].children[0] as HTMLInputElement;
    const form2 = garageMenu.forms[1].children[1] as HTMLInputElement;
    const newCarData: ICreateCarRequest = {
      name: form1.value || garageBox.name,
      color: form2.value || garageBox.color
    }
    form1.value = '';
    form2.value = '#65E6D1';
    
    const response = await updateCar(newCarData, garageBox.id);

    garageBox.name = response.name;
    garageBox.carName.innerText = garageBox.name;
    garageBox.color = response.color;
    garageBox.car.innerHTML = `<svg enable-background="new 0 0 1000 600" overflow="visible" version="1.1" viewBox="0 0 1000 450"><path d="m251.99 369.53c-3.653 0-6.615 2.962-6.615 6.615s2.962 6.615 6.615 6.615 6.615-2.962 6.615-6.615-2.961-6.615-6.615-6.615zm0 18.772c-1.548 0-2.804 1.256-2.804 2.805 0 1.548 1.255 2.804 2.804 2.804s2.804-1.256 2.804-2.804c0-1.549-1.255-2.805-2.804-2.805zm7.431 8.607v22.711c6.642-1.127 12.776-3.74 18.053-7.483l-16.059-16.059c-0.648 0.307-1.312 0.587-1.994 0.831zm12.505-11.337l16.058 16.058c3.744-5.276 6.354-11.413 7.482-18.055h-22.713c-0.245 0.682-0.52 1.349-0.827 1.997zm-2e-3 -18.852c0.307 0.648 0.585 1.313 0.83 1.995h22.712c-1.127-6.642-3.74-12.776-7.483-18.054l-16.059 16.059zm-29.358-10.507c0.649-0.308 1.313-0.587 1.995-0.831v-22.711c-6.642 1.127-12.776 3.74-18.053 7.483l16.058 16.059zm9.424-52.279c-39.881 0-72.212 32.33-72.212 72.212s32.331 72.212 72.212 72.212c39.882 0 72.212-32.33 72.212-72.212s-32.33-72.212-72.212-72.212zm0 123.79c-28.487 0-51.58-23.093-51.58-51.58 0-28.486 23.093-51.58 51.58-51.58s51.58 23.094 51.58 51.58c0 28.487-23.093 51.58-51.58 51.58zm0-63.739c1.549 0 2.804-1.256 2.804-2.805 0-1.548-1.255-2.804-2.804-2.804-1.548 0-2.804 1.256-2.804 2.804 1e-3 1.549 1.256 2.805 2.804 2.805zm25.484-23.834c-5.276-3.743-11.412-6.355-18.053-7.482v22.711c0.682 0.244 1.347 0.522 1.995 0.83l16.058-16.059zm-45.418 26.566l-16.058-16.059c-3.744 5.277-6.355 11.413-7.482 18.055h22.713c0.244-0.682 0.519-1.348 0.827-1.996zm-5.55 45.419c5.277 3.743 11.413 6.355 18.055 7.482v-22.711c-0.682-0.244-1.348-0.522-1.996-0.83l-16.059 16.059zm4.721-28.563h-22.711c1.127 6.642 3.739 12.777 7.482 18.055l16.059-16.06c-0.307-0.648-0.586-1.313-0.83-1.995zm8.606-7.431c0-1.549-1.255-2.804-2.804-2.804s-2.804 1.255-2.804 2.804 1.255 2.804 2.804 2.804c1.548 0 2.804-1.255 2.804-2.804zm24.315 0c0 1.549 1.255 2.804 2.804 2.804s2.804-1.255 2.804-2.804-1.255-2.804-2.804-2.804c-1.549 1e-3 -2.804 1.256-2.804 2.804zm547.49-6.614c-3.653 0-6.615 2.962-6.615 6.615s2.962 6.615 6.615 6.615 6.615-2.962 6.615-6.615-2.962-6.615-6.615-6.615zm-9.424-13.317c0.648-0.308 1.313-0.587 1.994-0.831v-22.711c-6.642 1.127-12.776 3.74-18.054 7.483l16.06 16.059zm9.424 32.089c-1.549 0-2.804 1.256-2.804 2.805 0 1.548 1.255 2.804 2.804 2.804s2.804-1.256 2.804-2.804c-1e-3 -1.549-1.256-2.805-2.804-2.805zm7.43 8.607v22.711c6.642-1.127 12.775-3.74 18.053-7.483l-16.059-16.059c-0.648 0.307-1.312 0.587-1.994 0.831zm13.331-13.334c-0.244 0.682-0.52 1.349-0.826 1.997l16.058 16.058c3.744-5.276 6.354-11.413 7.482-18.055h-22.714zm104.87-91.42c-9.801-15.004-34.896-20.235-54.012-26.477-133.49-32.242-177.88-21.747-200.16-24.888-4.495-1.199-8.503-5.123-12.179-7.413-8.057-5.019-16.418-9.434-24.358-14.298-13.119-8.036-73.653-41.146-90.02-47.128-35.963-13.142-92.818-23.68-229.82-12.708-5.56-1.528-8.916-6.016-14.826-7.414-5.846-1.383-11.214 1.693-15.356 2.648 0.075 4.491-0.326 8.136-1.059 11.649-26.775 11.291-53.869 19.953-80.488 31.242-11.108 4.711-22.569 9.32-33.89 14.297-7.042 3.097-13.77 7.495-21.71 10.062-8.624 2.786-18.051 1.527-27.536 3.706-17.267 3.967-35.99 4.497-55.071 4.766-2.181 3.738-5.977 7.503-6.884 12.18 3.305 1.02 4.412 3.298 4.236 7.942-5.84 8.653-4.274 20.981-4.236 34.949-12.441 6.37-14.333 29.711-11.12 48.187l-1.059 4.767c0.665 5.223 2.365 10.742 2.647 16.415 4.672 3.133 9.968 8.167 13.238 12.709 1.595 2.215 2.371 6.033 5.295 6.884 15.631 11.41 94.785 13.768 94.785 13.768l4.164 0.228c-0.637-3.934-0.973-7.969-0.973-12.082 0-41.478 33.625-75.102 75.102-75.102 41.478 0 75.102 33.624 75.102 75.102 0 6.966-0.952 18.277-2.728 24.678l416.07-0.736c-2.527-7.52-3.898-15.57-3.898-23.941 0-41.478 33.624-75.102 75.102-75.102s75.102 33.624 75.102 75.102c0 7.27-1.036 14.297-2.964 20.945l4.252-0.089s32.779-1.584 40.773-5.296c7.994-3.711 11.12-14.297 11.12-14.297l-2.118-22.24c1e-3 -1e-3 9.847-47.13-0.529-63.015zm-664.56-54.536c-24.887-16.535-11.702-35.842-12.373-35.781-0.398 0.354-0.685 0.636-0.865 0.827 0.528-0.559 0.788-0.82 0.865-0.827 6.412-5.714 43.006-31.271 172.82-31.474 4.06 22.768 8.12 52.68 12.179 75.446-52.233-1.583-155.04-0.7-172.63-8.191zm334.66 8.467c-11.408 0-124.97-0.031-124.97-0.031s-18.331-48.33-24.887-75.157c0.763 0.07 23.298 1.055 23.298 1.055s44.613 5.079 72.546 14.298c21.976 7.253 65.363 36.403 66.19 38.126-13.053 0.668-16.143 10.95-12.178 21.709zm204.26 57.848c-39.882 0-72.212 32.33-72.212 72.212s32.33 72.212 72.212 72.212 72.212-32.33 72.212-72.212-32.331-72.212-72.212-72.212zm0 123.79c-28.486 0-51.58-23.093-51.58-51.58 0-28.486 23.094-51.58 51.58-51.58 28.487 0 51.58 23.094 51.58 51.58 0 28.487-23.093 51.58-51.58 51.58zm-19.935-61.007l-16.059-16.059c-3.743 5.277-6.354 11.413-7.481 18.055h22.713c0.244-0.682 0.519-1.348 0.827-1.996zm7.777 9.425c0-1.549-1.256-2.804-2.805-2.804-1.548 0-2.804 1.255-2.804 2.804s1.256 2.804 2.804 2.804c1.55 0 2.805-1.255 2.805-2.804zm12.158-12.157c1.549 0 2.804-1.256 2.804-2.805 0-1.548-1.255-2.804-2.804-2.804s-2.804 1.256-2.804 2.804c0 1.549 1.255 2.805 2.804 2.805zm25.484-23.834c-5.277-3.743-11.412-6.355-18.054-7.482v22.711c0.682 0.244 1.347 0.522 1.995 0.83l16.059-16.059zm-13.327 35.991c0 1.549 1.256 2.804 2.805 2.804 1.548 0 2.804-1.255 2.804-2.804s-1.256-2.804-2.804-2.804c-1.549 1e-3 -2.805 1.256-2.805 2.804zm-37.642 35.994c5.277 3.743 11.413 6.355 18.055 7.482v-22.711c-0.683-0.244-1.348-0.522-1.996-0.83l-16.059 16.059zm4.721-28.563h-22.711c1.127 6.642 3.739 12.777 7.482 18.055l16.059-16.06c-0.308-0.648-0.586-1.313-0.83-1.995zm41.527-14.86h22.711c-1.127-6.642-3.739-12.776-7.482-18.054l-16.059 16.059c0.307 0.648 0.586 1.313 0.83 1.995z" fill="${garageBox.color}"/></svg>`
    
    const inputName = garageMenu.forms[1].children[0] as HTMLInputElement;
    inputName.disabled = true;
    const inputColor = garageMenu.forms[1].children[1] as HTMLInputElement;
    inputColor.disabled = true;
  }

  public async updateCar(garageBox: IGarageBox) {
    const inputName = garageMenu.forms[1].children[0] as HTMLInputElement;
    inputName.disabled = false;
    const inputColor = garageMenu.forms[1].children[1] as HTMLInputElement;
    inputColor.disabled = false;

    garageMenu.forms[1].children[2].addEventListener('click', this.updateCarMethod.bind(this, garageBox), { once: true })
  }

  private addCar(response: ICarResponse, pageNumber: number = 1) {
    const garageBox = new GarageBox(response);
    garageBox.removeBtn.button.addEventListener('click', async () => {
      await this.deleteCar(garageBox.garageBox, pageNumber);
    })
    garageBox.selectBtn.button.addEventListener('click', async () => {
      await this.updateCar(garageBox);
    })
    garageBox.startBtn.button.addEventListener('click', async () => {
      AnimateCar.startAnimate(garageBox);
    })
    this.removeBtns.push(garageBox.removeBtn.button);
    this.selectBtns.push(garageBox.selectBtn.button);
    this.garageItems.push(garageBox.garageBox);
    this.garage.append(garageBox.garageBox);
    this.garageBoxes.push(garageBox);
  }

  private createGarage() {
    const garage = createElement('div', ['garage']);
    return garage;
  }

}
