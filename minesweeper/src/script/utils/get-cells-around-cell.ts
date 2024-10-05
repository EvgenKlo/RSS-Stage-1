import {Cell} from "../components/cell/cell.ts";
import {gameState} from "../index.ts";

/**
 * Возвращает массив ячеек, находящихся вокруг заданной ячейки.
 * @param cell
 */
export function getCellsAroundCell(cell: Cell) {
    const rows = gameState.allRows;
    const rowCell = cell.row;
    const numberCell = cell.col;

    const left = rows[rowCell] ? rows[rowCell][numberCell - 1] : undefined;
    const leftTop = rows[rowCell + 1] ? rows[rowCell + 1][numberCell - 1] : undefined;
    const top = rows[rowCell + 1] ? rows[rowCell + 1][numberCell] : undefined;
    const rightTop = rows[rowCell + 1] ? rows[rowCell + 1][numberCell + 1] : undefined;
    const right = rows[rowCell] ? rows[rowCell][numberCell + 1] : undefined;
    const rightBottom = rows[rowCell - 1] ? rows[rowCell - 1][numberCell + 1] : undefined;
    const bottom = rows[rowCell - 1] ? rows[rowCell - 1][numberCell] : undefined;
    const leftBottom = rows[rowCell - 1] ? rows[rowCell - 1][numberCell - 1] : undefined;

    return [left, leftTop, top, rightTop, right, rightBottom, bottom, leftBottom];
}