import './show_tag.scss';
import { checkElement } from '../helpers/check_element';
import { HoverOnHTMLTags } from './hover-on-html-tags/hover_on_html_tags';

export class ShowTag extends HoverOnHTMLTags {

  public createClue (element: HTMLElement) {
    const clueContainer = document.createElement('div');
    clueContainer.classList.add('clue-container');
    const clueText = document.createElement('p');
    clueText.classList.add('clue-text')
    clueText.innerText = `${element.dataset.markup}`;
    clueContainer.append(clueText);
    element.append(clueContainer);
    element.classList.add('active');
    super.addHover(element);
  }

  public deleteClue () {
    const clue = checkElement<HTMLElement>('.clue-container');
    clue.parentElement?.classList.remove('active');
    clue.remove();
    super.removeHover();
  }
}
