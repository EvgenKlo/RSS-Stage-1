import { createElement } from './../../../6_shared/lib/helpers/create-element';

export class Button {
  name: string;
  classes: string[];
  button: HTMLElement
  constructor(name: string, classes: string[]) {
    this.name = name;
    this.classes = classes;
    this.button = this.buildButton();
  }

  public appendTo(parent: HTMLElement) {
    parent.append(this.button)
  }

  private buildButton(){
    const button = createElement('div', this.classes);
    button.innerText = this.name;
    return button;
  }
}
