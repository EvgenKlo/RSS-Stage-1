import './style.scss'
import { createElement } from "../../6_shared/lib/helpers/create-element";
import { getWinners } from './../../6_shared/api/get-winners';
import { WinnersTable } from './../../3_widgets/winners-table/winners-table'
import { Button } from "../../6_shared/lib/ui-components/button";
import { IWinnersResponse } from '../../types';

export class WinnersView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  public title = this.createWinnersTitle();
  public pageNumberText = this.createPageNumberText();
  public pageNumber = 1;
  public winnersCount?: number;
  public prevBtn = new Button('Prev', ['winners__btn', 'winners__prev-btn', 'off']);
  public nextBtn = new Button('Next', ['winners__btn', 'winners__next-btn', 'off']);
  private table = new WinnersTable();

  public async buildWinners() {
    if(!this.main.classList.contains('main_winners')) {
      this.main.innerHTML = '';
      this.main.classList.toggle('main_winners');
      this.main.classList.toggle('main_garage');
    }
    this.main.append(
      this.title,
      this.pageNumberText
      )
    const response = await getWinners(this.pageNumber);
    this.main.append(
      this.table.table,
      this.createWinnersBtnContainer()
      );

    if(response) {
      this.title.innerText = `Winners (${response.winnersCount})`;
      this.pageNumberText.innerText = `Page ${this.pageNumber} of ${Math.ceil(Number(response.winnersCount) / 10)}`;
      this.table.buildTable(response);
      this.pageSwitching(response);
    }
  }

  private createWinnersTitle() {
    const title = createElement('h1', ['winners__title']);
    return title;
  }

  private createPageNumberText() {
    const pageNumberText = createElement('p', ['winners__page-number']);
    return pageNumberText;
  }

  private createWinnersBtnContainer() {
    const winnersBtnContainer = createElement('div', ['winners__btn-container']);
    winnersBtnContainer.append(
      this.prevBtn.button,
      this.nextBtn.button
    )
    return winnersBtnContainer;
  }

  private pageSwitching(response: IWinnersResponse) {
    if(this.pageNumber !== 1) {
      this.prevBtn.button.classList.remove('off');
      this.prevBtn.button.addEventListener('click', async () => {
        this.pageNumber--;
        const prevPageResponse = await getWinners(this.pageNumber);
        if(prevPageResponse) {
          this.table.buildTable(prevPageResponse);
        }
      })
    }
    if(response.winnersCount) {
      if(+response.winnersCount / 10 > this.pageNumber) {
        this.nextBtn.button.classList.remove('off');
        this.nextBtn.button.addEventListener('click', async () => {
          this.pageNumber++;
          const nextPageResponse = await getWinners(this.pageNumber);
          if(nextPageResponse) {
            this.table.buildTable(nextPageResponse);
          }
        })
      }
    }
    
  }

}
