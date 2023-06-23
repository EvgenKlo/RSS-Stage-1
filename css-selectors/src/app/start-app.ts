import { Burger } from '../components/sidebar/burger/burger';
import { SidebarView } from '../components/sidebar/view-sidebar/view_sidebar';
import { SubmitAnswer } from '../sumbit-answer/submit_answer';
import { AppState } from './app-state'

export class StartApp {
  private gameState = new AppState;
  
  public startApp() {

    window.addEventListener('beforeunload', () => {
      this.gameState.setState();
    });

    window.addEventListener('load', () => {

      const sidebarTitle = new SidebarView;

      sidebarTitle.generateTitle();

      const sumbit = new SubmitAnswer;

      sumbit.submitBtnClickHandler();

      this.gameState.getState();
      const burger = new Burger;

      burger.openCloseLevelMenu();
    });

  }
}
