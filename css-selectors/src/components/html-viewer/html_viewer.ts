import { checkElement } from '../../helpers/check_element';
import { levels } from '../../levels/levels';

export class HtmlViewer {
  public markupBuild (level: number) {
    const markupContainer = checkElement<HTMLElement>('.code-container__html-markup');
    markupContainer.innerText = '';
    const markupStringHeader = document.createElement('p');
    markupStringHeader.classList.add('code-container__string-text_html-header');
    markupStringHeader.innerText = '<div class="table">';
    markupContainer.append(markupStringHeader);
    levels[level - 1].markup.forEach((item) => {
      const markupString = document.createElement('p');
      markupString.classList.add('code-container__string-text_html');
      markupString.innerText = item;
      markupContainer.append(markupString);
    })
    const markupStringFooter = document.createElement('p');
    markupStringFooter.classList.add('code-container__string-text_html-header');
    markupStringFooter.innerText = '</div>';
    markupContainer.append(markupStringFooter);
  }
}
