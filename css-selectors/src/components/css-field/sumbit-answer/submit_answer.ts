import { checkElement } from '../../../helpers/check_element';
import { getLevelNubmer } from '../../../helpers/get_level_number';
import { LevelBuilder } from '../../../level-builder/level_builder';
import { levels } from '../../../level-builder/levels/levels';
import { KeyCode } from '../../../types/types';

export class SubmitAnswer extends LevelBuilder {
  private submitBtn = checkElement<HTMLDivElement>('.code-container__button');
  private input = checkElement<HTMLInputElement>('.code-container__input');

  public submitBtnClickHandler () {
    this.submitBtn.addEventListener('click', () => {
      this.submit();
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === KeyCode.enter || e.code === KeyCode.numpadEnter) {
        this.submit();
      }
    });
  }

  private submit () {
    const gameLevelInSidebar = checkElement<HTMLInputElement>('.game-level_active');
    const levelNumber = getLevelNubmer();
    if (levels[levelNumber - 1].answer.includes(this.input.value)) {
      super.goUpElements();
      const moveElement = checkElement<HTMLElement>('.move');
      moveElement.addEventListener('animationend', () => {
        const selectLevel = checkElement<HTMLDivElement>('.game-level_active');
        const doneCheck = checkElement<HTMLDivElement>('.game-level__state', selectLevel);
        doneCheck.classList.add('game-level__state_done');
        this.input.value = '';
        this.input.classList.add('code-container__input_strobe');
        this.checkAllTasksDone(gameLevelInSidebar, levelNumber);
      })
    } else if (this.input.value.length) {
      this.wrongAnswer();
    }
  }

  private checkAllTasksDone (element: HTMLElement, levelNumber: number) {
    const gameState = document.querySelectorAll('.game-level__state_done');
    if (gameState.length === levels.length) {
      this.victory();
    } else {
      element.classList.remove('game-level_active');
      this.changeLevel(levelNumber);
    }
  }

  private changeLevel (levelNumber: number) {
    if (levelNumber === levels.length) {
      this.changeLevel(0);
    } else {
      const nextLevel = document.getElementById(`${levelNumber + 1}`);
      if (nextLevel instanceof HTMLElement) {
        const levelState = checkElement<HTMLElement>('.game-level__state', nextLevel);
        if (levelState.classList.contains('game-level__state_done')) {
          this.changeLevel(levelNumber + 1);
        } else {
          nextLevel.classList.add('game-level_active');
          super.buildLevel(null);
        }
      }
    }
  }

  private victory() {
    const victory = document.createElement('div');
    victory.classList.add('victory');
    const victoryText = document.createElement('p');
    victoryText.classList.add('victory-text');
    victoryText.innerText = 'Victory!';
    victory.append(victoryText);
    const appContainer = checkElement<HTMLDivElement>('.app-container');
    appContainer.append(victory);
  }

  private removeMoveClass () {
    if(this instanceof HTMLElement){
      this.classList.remove('move');
      this.removeEventListener('animationend', this.removeMoveClass);
    }
  }

  private wrongAnswer() {
    const codeContainer = checkElement<HTMLElement>('.code-container');
    codeContainer.classList.add('move');
    codeContainer.addEventListener('animationend', this.removeMoveClass);
  }

}
