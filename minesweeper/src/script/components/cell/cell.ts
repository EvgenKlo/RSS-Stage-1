import {BaseComponent} from '../base-component.ts';

export class Cell extends BaseComponent<HTMLElement> {
    private _hasBomb: boolean = false;
    private _isOpen: boolean = false;

    constructor(tag: string, classes: string[] = []) {
        super(tag, classes);
    }

    resetCell() {
        this._hasBomb = false;
        this._isOpen = false;
    }

    get hasBomb() {
        return this._hasBomb;
    }

    set hasBomb(value: boolean) {
        this._hasBomb = value;
    }

    get isOpen() {
        return this._isOpen;
    }

    set isOpen(value: boolean) {
        this._isOpen = value;
    }
}