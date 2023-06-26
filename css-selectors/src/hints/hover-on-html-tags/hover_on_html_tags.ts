import { checkElement } from "../../helpers/check_element";

export class HoverOnHTMLTags {

  public addHover(element: HTMLElement) {
    const markupInHTMLField = checkElement<HTMLElement>('.code-container__html-markup');
    const elementInHTMLField = markupInHTMLField.querySelector(`[data-item="${element.dataset.item}"]`);
      if(elementInHTMLField) {
        elementInHTMLField.classList.add('active');
      }
  }

  public removeHover() {
    const activeElementInHTMLField = checkElement<HTMLElement>('.code-container__string-text_html.active');
    activeElementInHTMLField.classList.remove('active');
  }
}
