import {BaseComponent} from '../base-component.ts';

/**
 * Представляет заголовок приложеня.
 */
export function createTitle() {
    const title = new BaseComponent('h1', ['title']);
    const titleComponent = title.getComponent();
    titleComponent.innerText = 'Minesweeper';
    return title;
}