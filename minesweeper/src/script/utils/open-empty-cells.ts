import {Cell} from "../components/cell/cell.ts";
import {getCellsAroundCell} from "./get-cells-around-cell.ts";

/**
 * Раскрываю часть поля при клике на пустую ячейку
 * @param cell
 */
export function openEmptyCells(cell: Cell) {
    const classCountEmptyCell = 1;

    if (!cell.hasBomb || cell.classes.length === classCountEmptyCell) {
        const cellsAroundCell = getCellsAroundCell(cell);

        cellsAroundCell.map(item => {
            if (item && !item.isOpen && !item.hasBomb && !item.classes.includes('maybeBomb')) {
                item.removeClassName('close');
                item.isOpen = true;
                openEmptyCells(item);
            }
        })
    }
}