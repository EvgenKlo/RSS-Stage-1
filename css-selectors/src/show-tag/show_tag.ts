import './show_tag.scss';
import { checkElement } from '../helpers/check_element';

export class ShowTag {
  public createClue (element: HTMLElement) {
    const clueContainer = document.createElement('div');
    clueContainer.classList.add('clue-container');
    const clueText = document.createElement('p');
    clueText.classList.add('clue-text')
    clueText.innerText = `${element.outerHTML}`;
    clueContainer.append(clueText);
    element.append(clueContainer);
  }

  public deleteClue () {
    const clue = checkElement<HTMLElement>('.clue-container');
    clue.remove();
  }
}
