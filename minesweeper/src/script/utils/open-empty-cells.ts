import {gameState} from '../index.ts';
import {Cell} from "../components/cell/cell.ts";

/**
 * Раскрываю часть поля при клике на пустую ячейку
 * @param cell
 */
export function openEmptyCells(cell: Cell) {
    const classCountEmptyCell = 2;
    const rowCell = cell.row;
    const numberCell = cell.col;
    const rows = gameState.allRows;
    if (cell.classes.includes('no-bomb') || cell.classes.length === classCountEmptyCell) {
        const left = rows[rowCell] ? rows[rowCell][numberCell - 1] : undefined;
        const leftTop = rows[rowCell + 1] ? rows[rowCell + 1][numberCell - 1] : undefined;
        const top = rows[rowCell + 1] ? rows[rowCell + 1][numberCell] : undefined;
        const rightTop = rows[rowCell + 1] ? rows[rowCell + 1][numberCell + 1] : undefined;
        const right = rows[rowCell] ? rows[rowCell][numberCell + 1] : undefined;
        const rightBottom = rows[rowCell - 1] ? rows[rowCell - 1][numberCell + 1] : undefined;
        const bottom = rows[rowCell - 1] ? rows[rowCell - 1][numberCell] : undefined;
        const leftBottom = rows[rowCell - 1] ? rows[rowCell - 1][numberCell - 1] : undefined;

        const nearCells = [left, leftTop, top, rightTop, right, rightBottom, bottom, leftBottom];

        nearCells.map(item => {
            if (item && !item.isOpen && !item.hasBomb && !item.classes.includes('maybeBomb')) {
                item.removeClassName('close');
                item.isOpen = true;
                openEmptyCells(item);
            }
        })
    }
}