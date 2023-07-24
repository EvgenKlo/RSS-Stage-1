import './style.scss'
import { createElement } from './../../6_shared/lib/helpers/create-element';

class WinnerMassage {
  public massageContainer = this.creatMassageContainer();
  public massage = this.massageText();

  private creatMassageContainer() {
    const massageContainer = createElement('div', ['massage-container', 'off']);
    massageContainer.addEventListener('click', () => {
      massageContainer.classList.add('off');
    });
    return massageContainer;
  }

  private massageText() {
    const massage = createElement('p', ['massage-container__text']);
    this.massageContainer.append(massage)
    return massage;
  }
}

export const winnerMassage = new WinnerMassage;
