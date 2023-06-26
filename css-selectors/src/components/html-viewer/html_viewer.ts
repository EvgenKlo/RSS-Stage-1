import { checkElement } from '../../helpers/check_element';
import { ShowTag } from '../../hints/show_tag';
import { levels } from '../../level-builder/levels/levels';

export class HtmlViewer extends ShowTag {
  
  public markupBuild (level: number) {
    const markupContainer = checkElement<HTMLElement>('.code-container__html-markup');
    markupContainer.innerText = '';
    const markupStringHeader = document.createElement('p');
    markupStringHeader.classList.add('code-container__string-text_html-header');
    markupStringHeader.innerText = '<div class="table">';
    markupContainer.append(markupStringHeader);
    levels[level - 1].markup.forEach((item, index) => {
      const markupString = document.createElement('p');
      markupString.classList.add('code-container__string-text_html');
      markupString.innerText = item;
      markupString.dataset.item = `${index + 1}`;
      markupContainer.append(markupString);
      this.addListnerOnTag(markupString);
    })
    const markupStringFooter = document.createElement('p');
    markupStringFooter.classList.add('code-container__string-text_html-header');
    markupStringFooter.innerText = '</div>';
    markupContainer.append(markupStringFooter);
  }

  private addListnerOnTag(element: HTMLElement) {
    element.addEventListener('mouseover', () => {
      const table = checkElement<HTMLDivElement>('.table');
      const elementOnTable = table.querySelector(`[data-item="${element.dataset.item}"]`);
      if(elementOnTable instanceof HTMLElement) {
        super.createClue(elementOnTable)
      }
    })

    element.addEventListener('mouseout', () => {
      super.deleteClue();
    })
  }

}
