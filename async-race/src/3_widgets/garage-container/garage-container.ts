import './style.scss';
import { createElement } from './../../6_shared/lib/helpers/create-element';
import { getGarage } from './../../6_shared/api/get-cars';
import { IGarageResponse } from '../../types';
import { Garage } from './garage/garage';
import { changePage } from './../../4_features/change-page/change-page'

export class GarageContainer {
  public garageContainer = createElement('div', ['garage__container']);
  private garageTittle = this.createAutodromTittle();
  private pageNumberText = this.createPageNumberText();
  private garage = new Garage();
  private pageNumber = 1;

  public async buildAutodrom() {
    this.garage.garage.innerHTML = '';
    const response = await getGarage(this.pageNumber);
    if(response){
      this.garageTittle.innerText = `Garage (${response.carsCount})`;
      this.pageNumberText.innerText = `Page ${this.pageNumber} of ${Math.ceil(Number(response.carsCount) / 7)}`;
      await this.garage.createNewPageGarage(response.garage);
      this.garageContainer.append(this.garage.garage);
      const changePageBtn = this.createChangePageBtn(response);
      this.garageContainer.append(changePageBtn);
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
    const changePageBtn = ['Prev', 'Next'];
    const changePageBtnContainer = createElement('div', ['garage__change-page-btn-container']);
    changePageBtn.forEach((item) => {
      const btn = createElement('div', ['garage__change-btn', `garage__change-btn_${item.toLocaleLowerCase()}`]);
      changePageBtnContainer.append(btn);
      btn.innerText = item;
      if (this.pageNumber === 1 && item === 'Prev') {
        btn.classList.add('off')
      } else if (Number(response.carsCount) / 7 <= this.pageNumber && item === 'Next') {
        btn.classList.add('off')
      } else {
        btn.addEventListener('click', () => {
          this.pageNumber = changePage(btn, this.pageNumber);
          changePageBtnContainer.remove();
          this.buildAutodrom();
        })
      }
    })
    return changePageBtnContainer;
  }

}
