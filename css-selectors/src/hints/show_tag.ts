import './show_tag.scss';
import { HoverOnHTMLTags } from './hover-on-html-tags/hover_on_html_tags';

export class ShowTag extends HoverOnHTMLTags {
  private clue: HTMLElement = document.createElement('div');

  public createClue (element: HTMLElement) {
    this.clue.classList.add('clue-container');
    const clueText = document.createElement('p');
    clueText.classList.add('clue-text')
    clueText.innerText = `${element.dataset.markup}`;
    this.clue.append(clueText);
    element.append(this.clue);
    element.classList.add('active');
    super.addHover(element);
  }

  public deleteClue () {
    this.clue.innerHTML = '';
    this.clue.parentElement?.classList.remove('active');
    this.clue.remove();
    super.removeHover();
  }
}
