import {BaseComponent} from '../base-component.ts';
import {Cell} from '../cell/cell.ts';

export class GameField extends BaseComponent<HTMLElement> {
    public rows: Cell[][] = [];

    // private hasCells: boolean;

    constructor(tag: string, classes: string[] = []) {
        super(tag, classes);
        // this.hasCells = false;
    }

    // public addCell(cell: Cell) {
    //     this._cells.push(cell);
    //     this.hasCells = true;
    // }

    // public resetField() {
    //     this._cells = [];
    //     this.classes.splice(0);
    // }
    //
    // public buildField() {
    //     console.log(this._cells);
    // }

    // public installBombs(count: number) {
    //     if (this.hasCells) {
    //         for (let i = 0; i < count; i++) {
    //             const index = Math.floor(Math.random() * (this._cells.length));
    //             this._cells[index].hasBomb = true;
    //         }
    //     } else {
    //         alert('Ячейки не добавлены на пооле!');
    //     }
    // }

    getCells() {
        return this.rows.flatMap(item => item);
    }
}