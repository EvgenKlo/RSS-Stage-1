import {BaseComponent} from '../base-component.ts';
import {Cell} from '../cell/cell.ts';

export class GameField extends BaseComponent<HTMLElement> {
    private _cells: Cell[];
    private hasCells: boolean;
    private _fieldSize: number | null;

    constructor(tag: string, classes: string[] = []) {
        super(tag, classes);
        this._cells = [];
        this.hasCells = false;
        this._fieldSize = null;
    }

    public addCell(cell: Cell) {
        this._cells.push(cell);
        this.hasCells = true;
    }

    public resetField() {
        this._cells = [];
        this.classes.splice(0);
    }

    public buildField() {
        console.log(this._cells);
    }

    public installBombs(count: number) {
        if (this.hasCells) {
            for (let i = 0; i < count; i++) {
                const index = Math.floor(Math.random() * (this._cells.length));
                this._cells[index].hasBomb = true;
            }
        } else {
            alert('Ячейки не добавлены на пооле!');
        }
    }

    get cells() {
        return this._cells;
    }

    get fieldSize() {
        return this._fieldSize;
    }

    set fieldSize(value: number | null) {
        this._fieldSize = value;
    }
}