import { checkElement } from './../../helpers/check_element';
import { getLevelNubmer } from './../../helpers/get_level_number';
import { cleanInput } from '../../helpers/clean_input';
import { levels } from '../../level-builder/levels/levels';
import { Input } from '../css-field/input/input';

export class HelpButton extends Input {
  public pauseTime = 500;
  public helpButton = checkElement<HTMLElement>('.help-btn');

  public addClickHendlerOnHelpButton() {
    this.helpButton.addEventListener('click', this.printSelectorInInput);
  }

  private removeClickHendlerOnHelpButton() {
    this.helpButton.removeEventListener('click', this.printSelectorInInput);
  }

  private printSelectorInInput = () => {
    this.removeClickHendlerOnHelpButton();
    const level = getLevelNubmer();
    this.selectLevelWithHelp();
    const input = cleanInput();
    const answerArr = levels[level - 1].answer[0].split('');
    input.value += answerArr[0];
    super.inputNoStrobe();
    answerArr.shift();
    this.printSymbol(answerArr, input);
  }

  private printSymbol(answerArr: string[], input: HTMLInputElement) {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(answerArr[0])
      }, this.pauseTime)
    }).then(data => {
      input.value += data;
      answerArr.shift();
      if(answerArr.length > 0) {
        this.printSymbol(answerArr, input);
      } else {
        this.addClickHendlerOnHelpButton();
      }
    })
  }

  private selectLevelWithHelp() {
    const gameLevelInSidebar = checkElement<HTMLInputElement>('.game-level_active');
    const helpCheck = checkElement<HTMLElement>('.game-level__state', gameLevelInSidebar);
    helpCheck.classList.add('game-level__state_help', 'game-level__state_done');
  }

}
