import './style.scss';
import { checkElement } from '../../../helpers/check_element';
import { LevelBuilder } from '../../../level-builder/level_builder';
import { levels } from '../../../levels/levels';
import { ResetProgressBtn } from './reset-progress-button/reset_progress'

export class SidebarView extends LevelBuilder {
  public sidebar = checkElement<HTMLDivElement>('.sidebar');

  public generateTitle () {
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.classList.add('sidebar__title-text');
    sidebarTitle.textContent = `Level 1 of ${levels.length}`;
    this.sidebar.append(sidebarTitle);
  }

  public generateLevelsList (levelNumber = 1) {
    levels.forEach((item) => {
      const listItem = document.createElement('div');
      listItem.classList.add('game-level');
      listItem.id = `${item.levelNumber}`;
      if (item.levelNumber === levelNumber) {
        listItem.classList.add('game-level_active');
      }
      this.addClickHandlerOnListItem(listItem);

      const gameLevelState = document.createElement('div');
      gameLevelState.classList.add('game-level__state');
      listItem.append(gameLevelState);

      const gameLevelNumber = document.createElement('p');
      gameLevelNumber.classList.add('game-level__text', 'game-level__text_number');
      gameLevelNumber.textContent = `${item.levelNumber}`;
      listItem.append(gameLevelNumber);

      const gameLevelTitle = document.createElement('p');
      gameLevelTitle.classList.add('game-level__text', 'game-level__text_title');
      gameLevelTitle.textContent = `${item.levelTitle}`;
      listItem.append(gameLevelTitle);

      this.sidebar.append(listItem);

      super.buildLevel(levelNumber);
    })

    this.createResetBtn();

  }

  private addClickHandlerOnListItem (listItem: HTMLElement) {
    listItem.addEventListener('click', () => {
      if (!listItem.classList.contains('game-level_active')) {
        const activeLevel = checkElement<HTMLElement>('.game-level_active');
        activeLevel.classList.remove('game-level_active');
        listItem.classList.add('game-level_active');
        super.buildLevel(null);
      }
    })
  }

  private createResetBtn () {
    const resetBtn = new ResetProgressBtn;
    resetBtn.createResetBtn();
    this.sidebar.append(resetBtn.resetBtn);
    this.addClickHandlerOnResetBtn(resetBtn.resetBtn)
  }

  private addClickHandlerOnResetBtn (btn: HTMLElement) {
    btn.addEventListener('click', () => {
      const levelsList = this.sidebar.querySelectorAll('.game-level');
      levelsList.forEach((item) => {
        item.remove();
      })
      btn.remove();
      this.generateLevelsList();
    })
  }
}
