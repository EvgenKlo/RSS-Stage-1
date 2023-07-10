import { createElementInDOM } from './../../6_shared/lib/dom/create-element'

export class WinnersView {
  private main: HTMLElement;
  constructor(main: HTMLElement) {
    this.main = main;
  }

  public buildWinners() {
    if(!this.main.classList.contains('main_winners')) {
      this.main.innerHTML = '';
      this.main.classList.toggle('main_winners');
      this.main.classList.toggle('main_garage');
    }
  }

}
