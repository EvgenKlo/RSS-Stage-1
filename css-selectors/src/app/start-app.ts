import { Burger } from '../components/sidebar/burger/burger';
import { SidebarView } from '../components/sidebar/view-sidebar/view_sidebar';
import { SubmitAnswer } from '../sumbit-answer/submit_answer';
import { AppState } from './app-state';
import { HelpButton } from './../components/help-button/help_btn';

export class StartApp {
  private appState = new AppState;
  
  public startApp() {

    window.addEventListener('beforeunload', () => {
      this.appState.setState();
    });

    window.addEventListener('load', () => {

      const sidebarTitle = new SidebarView;

      sidebarTitle.generateTitle();

      const sumbit = new SubmitAnswer;

      sumbit.submitBtnClickHandler();

      this.appState.getState();

      const burger = new Burger;

      burger.openCloseLevelMenu();

      const helpBtn = new HelpButton;

      helpBtn.addClickHendlerOnHelpButton();
      
    });

  }
}
