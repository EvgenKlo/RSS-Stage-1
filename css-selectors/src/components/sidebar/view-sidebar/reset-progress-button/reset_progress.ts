import './style.scss'

export class ResetProgressBtn {
  public resetBtn = document.createElement('div');

  public createResetBtn () {
    this.resetBtn.classList.add('reset-btn');
    const resetBtnTitle = document.createElement('p');
    resetBtnTitle.classList.add('reset-btn__title');
    resetBtnTitle.innerText = 'Reset Progress';
    this.resetBtn.append(resetBtnTitle);
  }

}
