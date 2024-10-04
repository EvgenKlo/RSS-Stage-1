import {BaseComponent} from '../base-component.ts';
import {gameState} from '../../index.ts';

export class ClickCountPanel extends BaseComponent<HTMLElement> {
    public update() {
        this.component.innerText = `Steps: ${gameState.steps}`;
    }
}

