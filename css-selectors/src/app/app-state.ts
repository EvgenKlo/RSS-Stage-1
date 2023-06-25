import { SidebarView } from "../components/sidebar/view-sidebar/view_sidebar";
import { getLevelNubmer } from '../helpers/get_level_number';
import { ArrForSaveProgress } from "../types/types";

export class AppState extends SidebarView {
  private prefix = 'EvgenKlo_'

  public setState() {
    const levelNumber = getLevelNubmer();
    localStorage.setItem(`${this.prefix}gameLevel`, String(levelNumber));

    this.saveProgress();

  }

  public getState() {
    const gameLevel = Number(localStorage.getItem(`${this.prefix}gameLevel`));
    if (gameLevel) {
      super.generateLevelsList(gameLevel);
    } else {
      super.generateLevelsList();
    }
    this.getProgress();
  }

  private saveProgress () {
    const levelsList = document.querySelectorAll('.game-level__state');
    const doneLevels: ArrForSaveProgress[] = [];
    levelsList.forEach((item) => {
      if (item.classList.contains('game-level__state_help')) {
        doneLevels.push(null);
      } else if (item.classList.contains('game-level__state_done')) {
        doneLevels.push(true);
      } else {
        doneLevels.push(false);
      }
    })
    localStorage.setItem(`${this.prefix}doneLevel`, JSON.stringify(doneLevels));
  }

  private getProgress() {
    const gameProgress = localStorage.getItem(`${this.prefix}doneLevel`);
    if(gameProgress){
      const doneLevel: ArrForSaveProgress[] = JSON.parse(gameProgress);
      const gameState = document.querySelectorAll('.game-level__state');
      gameState.forEach((item, index) => {
        if(doneLevel[index] === null) {
          item.classList.add('game-level__state_help')
        } else if (doneLevel[index] === true) {
          item.classList.add('game-level__state_done')
        }
      })
    }
  }

}
