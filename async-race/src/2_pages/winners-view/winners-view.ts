import './style.scss'
import { createElement } from "../../6_shared/lib/helpers/create-element";
import { getWinners } from './../../6_shared/api/get-winners';
import { WinnersTable } from './../../3_widgets/winners-table/winners-table'
import { Button } from "../../6_shared/lib/ui-components/button";
import { ISortParams, IWinnersResponse } from '../../types';

export class WinnersView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  public title = this.createWinnersTitle();
  public pageNumberText = this.createPageNumberText();
  public pageNumber = 1;
  public winnersCount?: number;
  public winnersBtnContainer = createElement('div', ['winners__btn-container']);
  public prevBtn?: HTMLElement | null;
  public nextBtn?: HTMLElement | null;
  private table = new WinnersTable();
  private sortParams: ISortParams = {
    sort: 'time',
    order: 'DESC'
  }

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
    const response = await getWinners(this.pageNumber, this.sortParams);
    this.createWinnersBtnContainer();
    this.main.append(
      this.table.table,
      this.winnersBtnContainer
      );

    if(response) {
      this.title.innerText = `Winners (${response.winnersCount})`;
      this.pageNumberText.innerText = `Page ${this.pageNumber} of ${Math.ceil(Number(response.winnersCount) / 10)}`;
      this.table.buildTable(response);
      this.pageSwitching(response);
      this.sortTable();
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
    this.winnersBtnContainer.innerHTML = '';
    this.prevBtn = null;
    this.nextBtn = null;
    const prevBtn = new Button('Prev', ['winners__btn', 'winners__prev-btn', 'off']);
    const nextBtn = new Button('Next', ['winners__btn', 'winners__next-btn', 'off']);
    this.prevBtn = prevBtn.button;
    this.nextBtn = nextBtn.button;
    this.winnersBtnContainer.append(
      prevBtn.button,
      nextBtn.button
    )
  }

  private async pageSwitching(response: IWinnersResponse) {
    if(this.pageNumber !== 1) {
      this.prevBtn?.classList.remove('off');
      this.prevBtn?.addEventListener('click', async () => {
        this.pageNumber--;
        this.buildWinners();
      })
    }
    if(response.winnersCount) {
      if(+response.winnersCount / 10 > this.pageNumber) {
        this.nextBtn?.classList.remove('off');
        this.nextBtn?.addEventListener('click', async () => {
          this.pageNumber++;
          this.buildWinners();
        })
      }
    }
  }

  private sortTable() {
    this.table.tableHeader?.addEventListener('click', (e) => {
      this.pageNumber = 1;
      const btn = e.target as HTMLElement;
      if(btn.innerText === 'Wins'){
        this.updateSortParams('wins')
      }
      if(btn.innerText === 'Best time (seconds)'){
        this.updateSortParams('time')
      }
      this.buildWinners();
    }, { once: true })
  }

  private updateSortParams(clickedBtn: string) {
    if(clickedBtn === 'wins') {
      if(this.sortParams.sort === 'time') {
        this.sortParams.sort = 'wins';
        this.sortParams.order = 'ASC'
      } else {
        this.changeASConDESC();
      }
    }
    if(clickedBtn === 'time') {
      if(this.sortParams.sort === 'wins') {
        this.sortParams.sort = 'time';
        this.sortParams.order = 'DESC'
      } else {
        this.changeASConDESC();
      }
    }
  }

  private changeASConDESC() {
    if(this.sortParams.order === 'DESC') {
      this.sortParams.order = 'ASC'
    } else {
      this.sortParams.order = 'DESC'
    }
  }
}
