import {BaseComponent} from '../../utils/base-component.ts';

export class DifficultSelect extends BaseComponent<HTMLElement> {
    private _difficult: string;
    public _playingFieldSize: number;
    public _howNeedBombs: number;
    public readonly difficultButtons: BaseComponent<HTMLElement>[];

    constructor(tag: string, classes: string[] = []) {
        super(tag, classes);
        this._difficult = 'Easy';
        this._playingFieldSize = 10;
        this._howNeedBombs = 10;
        this.difficultButtons = [];
    }

    public render(clickCount: number) {
        const difficultTitle = new BaseComponent('p', ['difficult-title']).getComponent();
        difficultTitle.innerText = 'Difficult';
        this.component.append(difficultTitle);
        const difficultButtons = ['Easy', 'Medium', 'Hard'];
        difficultButtons.forEach(btn => {
            const difficultBtn = new BaseComponent('div', ['difficult-dtn', btn]);
            this.difficultButtons.push(difficultBtn);
            if (btn === 'Easy' && clickCount === 0) {
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
            this._playingFieldSize = 10;
            this._howNeedBombs = 10;
        } else if (button.classes.includes('Medium')) {
            this._playingFieldSize = 15;
            this._howNeedBombs = 42;
        } else if (button.classes.includes('Hard')) {
            this._playingFieldSize = 25;
            this._howNeedBombs = 99;
        }
        // selectLineInput.value = howNeedBombs;
        this.difficultButtons.forEach(btn => {
            console.log(btn);
            btn.removeClassName('active');
        });
        button.addClassName('active');
        // refresh();
    }

    get difficult() {
        return this._difficult;
    }

    set difficult(difficult: string) {
        this._difficult = difficult;
    };

    get playingFieldSize() {
        return this._playingFieldSize;
    }

    set playingFieldSize(playingFieldSize: number) {
        this._playingFieldSize = playingFieldSize;
    }

    get howNeedBombs() {
        return this._howNeedBombs;
    }

    set howNeedBombs(howNeedBombs: number) {
        this._howNeedBombs = howNeedBombs;
    };
}