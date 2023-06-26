import { levels } from './levels/levels';
import { checkElement } from '../helpers/check_element';
import { getLevelNubmer } from '../helpers/get_level_number';
import { ShowTag } from '../show-tag/show_tag';
import { HtmlViewer } from '../components/html-viewer/html_viewer';
import { cleanInput } from '../helpers/clean_input'

export class LevelBuilder extends ShowTag {

  private markup = new HtmlViewer;

  public buildLevel (gameLevel: number | null) {
    const playingField = checkElement<HTMLDivElement>('.table');
    playingField.innerHTML = '';
    cleanInput();
    const selectLevel = gameLevel ? gameLevel : getLevelNubmer();
    const levelTitle = checkElement<HTMLDivElement>('.level-title');
    this.markup.markupBuild(selectLevel);
    levelTitle.innerText = `${levels[selectLevel - 1].levelTitle}`;
    const level = levels[selectLevel - 1];
    level.items.forEach((item, index) => {
      const element = document.createElement(item);
      const classItem = level.classes[index] ? level.classes[index] : null;
      if(classItem) {
        element.classList.add(`${classItem}`)
      }
      playingField.append(element);
      element.addEventListener('mouseover', () => {
        super.createClue(element);
      });
      element.addEventListener('mouseout', () => {
        super.deleteClue();
      });
    });

  }
}
