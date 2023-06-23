import { SidebarView } from "../components/sidebar/view-sidebar/view_sidebar";
import { getLevelNubmer } from '../helpers/get_level_number';

export class AppState extends SidebarView {
  private prefix = 'EvgenKlo_'

  public setState() {
    const levelNumber = getLevelNubmer();
    localStorage.setItem(`${this.prefix}gameLevel`, String(levelNumber));

    const levelsList = document.querySelectorAll('.game-level__state');
    const doneLevels: boolean[] = [];
    levelsList.forEach((item) => {
      if (item.classList.contains('game-level__state_done')) {
        doneLevels.push(true);
      } else {
        doneLevels.push(false);
      }
    })
    localStorage.setItem(`${this.prefix}doneLevel`, JSON.stringify(doneLevels));
  }

  public getState() {
    const gameLevel = Number(localStorage.getItem(`${this.prefix}gameLevel`));
    if (gameLevel) {
      super.generateLevelsList(gameLevel);
    } else {
      super.generateLevelsList();
    }
  }

}
