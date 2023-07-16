import './style.scss';
import { createElement } from './../../6_shared/lib/helpers/create-element';
import { getGarage } from './../../6_shared/api/get-cars';
import { IGarageResponse } from '../../types';
import { Garage } from './garage/garage';
import { changePage } from './../../4_features/change-page/change-page'

export class GarageContainer {
  public garageContainer = createElement('div', ['garage__container']);
  public changePageBtnContainer = createElement('div', ['garage__change-page-btn-container']);
  public garage = new Garage();
  public garageTittle = this.createAutodromTittle();
  public pageNumberText = this.createPageNumberText();
  public pageNumber = 1;
  public carsCount = 0;
  public changePageBtns = new Array<HTMLElement>;

  public async buildAutodrom() {
    this.garage.garage.innerHTML = '';
    const response = await getGarage(this.pageNumber);
    if(response){
      this.garageTittle.innerText = `Garage (${response.carsCount})`;
      this.carsCount = Number(response.carsCount);
      this.pageNumberText.innerText = `Page ${this.pageNumber} of ${Math.ceil(Number(response.carsCount) / 7)}`;
      await this.garage.createNewPageGarage(response.garage);
      this.garageContainer.append(this.garage.garage);
      this.createChangePageBtn(response);
      this.garageContainer.append(this.changePageBtnContainer);
    }
  }

  private createAutodromTittle() {
    const garageTittle = createElement('h2', ['garage__tittle']);
    garageTittle.innerText = `Garage (0)`;
    this.garageContainer.append(garageTittle);
    return garageTittle;
  }

  private createPageNumberText() {
    const pageNumberText = createElement('p', ['garage__page-text']);
    pageNumberText.innerText = `Page `;
    this.garageContainer.append(pageNumberText);
    return pageNumberText;
  }

  private createChangePageBtn(response: IGarageResponse) {
    this.changePageBtns = [];
    this.changePageBtnContainer.innerHTML = '';
    const changePageBtn = ['Prev', 'Next'];
    changePageBtn.forEach((item) => {
      const btn = createElement('div', ['garage__change-btn', `garage__change-btn_${item.toLocaleLowerCase()}`]);
      this.changePageBtnContainer.append(btn);
      btn.innerText = item;
      if (this.pageNumber === 1 && item === 'Prev') {
        btn.classList.add('off')
      } else if (Number(response.carsCount) / 7 <= this.pageNumber && item === 'Next') {
        btn.classList.add('off')
      } else {
        btn.addEventListener('click', () => {
          this.pageNumber = changePage(btn, this.pageNumber);
          this.changePageBtnContainer.remove();
          this.buildAutodrom();
        })
      }
      this.changePageBtns.push(btn);
    })
  }

}
