import { checkElement } from './../../../helpers/check_element';

export class Input {
  private input = checkElement<HTMLInputElement>('.code-container__input');

  public listnerOnInput () {
    this.input.addEventListener('input', () => {
      this.inputNoStrobe();
    })
  }

  public inputNoStrobe () {
    this.input.classList.remove('code-container__input_strobe');
    this.input.addEventListener('input', () => {
      if(this.input.value === '') {
        this.inputStrobe();
      }
    })
  }

  public inputStrobe () {
    this.input.classList.add('code-container__input_strobe');
  }
}
