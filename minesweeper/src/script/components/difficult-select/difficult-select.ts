import {BaseComponent} from '../base-component.ts';
import {DifficultLevel} from '../../app/settings.ts';
import {gameState, settings} from '../../index.ts';

export class DifficultSelect extends BaseComponent<HTMLElement> {
    public readonly difficultButtons: BaseComponent<HTMLElement>[];

    constructor(tag: string, classes: string[] = []) {
        super(tag, classes);
        this.difficultButtons = [];
    }

    public render() {
        const difficultTitle = new BaseComponent('p', ['difficult-title']).getComponent();
        difficultTitle.innerText = 'Difficult';
        this.component.append(difficultTitle);
        const difficultButtons = Object.values(DifficultLevel);
        difficultButtons.forEach(btn => {
            const difficultBtn = new BaseComponent('div', ['difficult-dtn', btn]);
            this.difficultButtons.push(difficultBtn);
            if (btn === 'Easy' && gameState.steps === 0) {
                difficultBtn.addClassName('active');
            }
            const difficultBtnComponent = difficultBtn.getComponent();
            difficultBtnComponent.addEventListener('click', () => {
                this.difficultSelect(difficultBtn);
            });
            difficultBtnComponent.innerText = `${btn}`;
            this.component.append(difficultBtnComponent);
        });
    }

    private difficultSelect(button: BaseComponent<HTMLElement>) {
        button.toggleClassName('active');
        if (button.classes.includes('Easy')) {
            settings.changeDifficult(DifficultLevel.Easy);
        } else if (button.classes.includes('Medium')) {
            settings.changeDifficult(DifficultLevel.Medium);
        } else if (button.classes.includes('Hard')) {
            settings.changeDifficult(DifficultLevel.Hard);
        }
        // selectLineInput.value = howNeedBombs;
        this.difficultButtons.forEach(btn => {
            btn.removeClassName('active');
        });
        button.addClassName('active');
        // refresh();
    }
}