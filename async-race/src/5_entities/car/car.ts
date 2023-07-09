import './car.scss';
import { ICar } from "./types";
import { createElementInDOM } from "../../6_shared/lib/dom/create-element";

export class Car {
  private car: ICar;
  private parent: HTMLElement;
  constructor(car: ICar, parent: HTMLElement) {
    this.car = car,
    this.parent = parent
  }

  public createBox() {
    const box = createElementInDOM('div', ['garage__box', 'box'], this.parent);
    this.createBoxHeader(box);
    this.createTrack(box);
  }

  private createBoxHeader(parent: HTMLElement) {
    const boxHeaderContainer = createElementInDOM('div', ['box__header-container'], parent);
    const boxHeaderBtn = ['Select', 'Remove'];
    boxHeaderBtn.forEach((item) => {
      const btn = createElementInDOM('div', ['box__header-btn', `box__header-btn_${item.toLocaleLowerCase()}`], boxHeaderContainer);
      btn.innerText = item;
      btn.addEventListener('click', () => {
        console.log(btn)
      })
    })
    const carName = createElementInDOM('p', ['box__tittle'], boxHeaderContainer);
    carName.innerText = this.car.name;
  }

  private createStartStopBtn(parent: HTMLElement) {
    const buttons = ['Go', 'Off'];
    const buttonsInDom: HTMLElement[] = [];
    buttons.forEach((item) => {
      const btn = createElementInDOM('div', ['box__track-btn', `box__track-btn_${item.toLocaleLowerCase()}`], parent);
      buttonsInDom.push(btn);
      btn.innerText = item;
      if(item === 'Go') {
        btn.classList.add('active');
      }
      btn.addEventListener('click', () => {
        buttonsInDom.forEach((item) => {
          item.classList.remove('active');
        })
        btn.classList.add('active');
      })
    })
  }

  private createTrack(parent: HTMLElement) {
    const trackContainer = createElementInDOM('div', ['box__track-container'], parent);
    this.createStartStopBtn(trackContainer);
    const track = createElementInDOM('div', ['box__track'], trackContainer);
    const finish = createElementInDOM('div', ['box__track-finish'], trackContainer);
    const car = createElementInDOM('div', ['box__car'], track);
  }

}
