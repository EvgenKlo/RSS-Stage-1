import { levels } from '../levels/levels';
import { checkElement } from '../helpers/check_element';
import { getLevelNubmer } from '../helpers/get_level_number';
import { ShowTag } from '../show-tag/show_tag';
import { HtmlViewer } from '../components/html-viewer/html_viewer';

export class LevelBuilder extends ShowTag {

  private markup = new HtmlViewer;

  public buildLevel (gameLevel: number | null) {
    const playingField = checkElement<HTMLDivElement>('.table');
    playingField.innerHTML = '';
    let selectLevel;
    if (gameLevel !== null) {
      selectLevel = gameLevel;
    } else {
      selectLevel = getLevelNubmer();
    }
    const levelTitle = checkElement<HTMLDivElement>('.level-title');
    this.markup.markupBuild(selectLevel);
    levelTitle.innerText = `${levels[selectLevel - 1].levelTitle}`;
    levels[selectLevel - 1].items.forEach((item) => {
      const element = document.createElement(item);
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
