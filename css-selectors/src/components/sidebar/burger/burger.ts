import './style.scss';
import { checkElement } from './../../../helpers/check_element';

export class Burger {
  public openCloseLevelMenu (): void {
    const hamb = checkElement<HTMLDivElement>('.hamb');

    hamb.addEventListener('click', () => {
      hamb.classList.toggle('active');
      document.querySelector('.sidebar')?.classList.toggle('open')
    })
  }
}
