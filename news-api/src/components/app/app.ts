import { checkElement } from '../../helpers/check_element';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    public controller;
    public view;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        checkElement<HTMLElement>('.sources').addEventListener('click', (e: Event) =>
        this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
