import {BaseComponent} from '../../utils/base-component.ts';

export class ClickCountPanel extends BaseComponent<HTMLElement> {
    private _clickCount: number;

    constructor(tag: string, classes: string[] = []) {
        super(tag, classes);
        this._clickCount = 0;
    }

    public clickCounter() {
        this._clickCount++;
        this.component.innerText = `Steps: ${this._clickCount}`;
    }

    public get clickCount() {
        return this._clickCount;
    }

    public set clickCount(count: number) {
        this._clickCount = count;
        this.component.innerText = `Steps: ${this._clickCount}`;
    }
}

