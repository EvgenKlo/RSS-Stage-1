import {gameState, settings} from '../index.ts';
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
        if (rowCell === 0) {
            if (numberCell === 0) {
                if (!rows[rowCell][numberCell + 1].isOpen && !rows[rowCell][numberCell + 1].hasBomb && !rows[rowCell][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell + 1].removeClassName('close');
                    rows[rowCell][numberCell + 1].isOpen = true;
                    openEmptyCells(rows[rowCell][numberCell + 1]);
                }
                if (!rows[rowCell + 1][numberCell + 1].isOpen && !rows[rowCell + 1][numberCell + 1].hasBomb && !rows[rowCell + 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell + 1].removeClassName('close');
                    rows[rowCell + 1][numberCell + 1].isOpen = true;
                    openEmptyCells(rows[rowCell + 1][numberCell + 1]);
                }
                if (rows[rowCell + 1][numberCell].classes.includes('close') && !rows[rowCell + 1][numberCell].hasBomb && !rows[rowCell + 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell]);
                }
            } else if (numberCell === settings.playingFieldSize - 1) {
                if (rows[rowCell][numberCell - 1].classes.includes('close') && !rows[rowCell][numberCell - 1].hasBomb && !rows[rowCell][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell - 1].classes.includes('close') && !rows[rowCell + 1][numberCell - 1].hasBomb && !rows[rowCell + 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell].classes.includes('close') && !rows[rowCell + 1][numberCell].hasBomb && !rows[rowCell + 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell]);
                }
            } else {
                if (rows[rowCell][numberCell - 1].classes.includes('close') && !rows[rowCell][numberCell - 1].hasBomb && !rows[rowCell][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell - 1].classes.includes('close') && !rows[rowCell + 1][numberCell - 1].hasBomb && !rows[rowCell + 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell - 1]);
                }
                if (rows[rowCell][numberCell + 1].classes.includes('close') && !rows[rowCell][numberCell + 1].hasBomb && !rows[rowCell][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell + 1]);
                }
                if (rows[rowCell + 1][numberCell + 1].classes.includes('close') && !rows[rowCell + 1][numberCell + 1].hasBomb && !rows[rowCell + 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell + 1]);
                }
                if (rows[rowCell + 1][numberCell].classes.includes('close') && !rows[rowCell + 1][numberCell].hasBomb && !rows[rowCell + 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell]);
                }
            }
        } else if (rowCell === settings.playingFieldSize - 1) {
            if (numberCell === 0) {
                if (rows[rowCell][numberCell + 1].classes.includes('close') && !rows[rowCell][numberCell + 1].hasBomb && !rows[rowCell][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell + 1].classes.includes('close') && !rows[rowCell - 1][numberCell + 1].hasBomb && !rows[rowCell - 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell].classes.includes('close') && !rows[rowCell - 1][numberCell].hasBomb && !rows[rowCell - 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell]);
                }
            } else if (numberCell === settings.playingFieldSize - 1) {
                if (rows[rowCell][numberCell - 1].classes.includes('close') && !rows[rowCell][numberCell - 1].hasBomb && !rows[rowCell][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell - 1]);
                }
                if (rows[rowCell - 1][numberCell - 1].classes.includes('close') && !rows[rowCell - 1][numberCell - 1].hasBomb && !rows[rowCell - 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell - 1]);
                }
                if (rows[rowCell - 1][numberCell].classes.includes('close') && !rows[rowCell - 1][numberCell].hasBomb && !rows[rowCell - 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell]);
                }
            } else {
                if (rows[rowCell][numberCell - 1].classes.includes('close') && !rows[rowCell][numberCell - 1].hasBomb && !rows[rowCell][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell - 1]);
                }
                if (rows[rowCell - 1][numberCell - 1].classes.includes('close') && !rows[rowCell - 1][numberCell - 1].hasBomb && !rows[rowCell - 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell - 1]);
                }
                if (rows[rowCell][numberCell + 1].classes.includes('close') && !rows[rowCell][numberCell + 1].hasBomb && !rows[rowCell][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell + 1].classes.includes('close') && !rows[rowCell - 1][numberCell + 1].hasBomb && !rows[rowCell - 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell].classes.includes('close') && !rows[rowCell - 1][numberCell].hasBomb && !rows[rowCell - 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell]);
                }
            }
        } else {
            if (numberCell === 0) {
                if (rows[rowCell + 1][numberCell].classes.includes('close') && !rows[rowCell + 1][numberCell].hasBomb && !rows[rowCell + 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell]);
                }
                if (rows[rowCell + 1][numberCell + 1].classes.includes('close') && !rows[rowCell + 1][numberCell + 1].hasBomb && !rows[rowCell + 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell + 1]);
                }
                if (rows[rowCell][numberCell + 1].classes.includes('close') && !rows[rowCell][numberCell + 1].hasBomb && !rows[rowCell][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell + 1].classes.includes('close') && !rows[rowCell - 1][numberCell + 1].hasBomb && !rows[rowCell - 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell].classes.includes('close') && !rows[rowCell - 1][numberCell].hasBomb && !rows[rowCell - 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell]);
                }
            } else if (numberCell === settings.playingFieldSize - 1) {
                if (rows[rowCell - 1][numberCell].classes.includes('close') && !rows[rowCell - 1][numberCell].hasBomb && !rows[rowCell - 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell]);
                }
                if (rows[rowCell - 1][numberCell - 1].classes.includes('close') && !rows[rowCell - 1][numberCell - 1].hasBomb && !rows[rowCell - 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell - 1]);
                }
                if (rows[rowCell][numberCell - 1].classes.includes('close') && !rows[rowCell][numberCell - 1].hasBomb && !rows[rowCell][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell - 1].classes.includes('close') && !rows[rowCell + 1][numberCell - 1].hasBomb && !rows[rowCell + 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell].classes.includes('close') && !rows[rowCell + 1][numberCell].hasBomb && !rows[rowCell + 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell]);
                }
            } else {
                if (rows[rowCell][numberCell - 1].classes.includes('close') && !rows[rowCell][numberCell - 1].hasBomb && !rows[rowCell][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell - 1].classes.includes('close') && !rows[rowCell + 1][numberCell - 1].hasBomb && !rows[rowCell + 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell - 1]);
                }
                if (rows[rowCell + 1][numberCell].classes.includes('close') && !rows[rowCell + 1][numberCell].hasBomb && !rows[rowCell + 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell]);
                }
                if (rows[rowCell + 1][numberCell + 1].classes.includes('close') && !rows[rowCell + 1][numberCell + 1].hasBomb && !rows[rowCell + 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell + 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell + 1][numberCell + 1]);
                }
                if (rows[rowCell][numberCell + 1].classes.includes('close') && !rows[rowCell][numberCell + 1].hasBomb && !rows[rowCell][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell + 1].classes.includes('close') && !rows[rowCell - 1][numberCell + 1].hasBomb && !rows[rowCell - 1][numberCell + 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell + 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell + 1]);
                }
                if (rows[rowCell - 1][numberCell].classes.includes('close') && !rows[rowCell - 1][numberCell].hasBomb && !rows[rowCell - 1][numberCell].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell]);
                }
                if (rows[rowCell - 1][numberCell - 1].classes.includes('close') && !rows[rowCell - 1][numberCell - 1].hasBomb && !rows[rowCell - 1][numberCell - 1].classes.includes('maybeBomb')) {
                    rows[rowCell - 1][numberCell - 1].removeClassName('close');
                    openEmptyCells(rows[rowCell - 1][numberCell - 1]);
                }
            }
        }
    }
}