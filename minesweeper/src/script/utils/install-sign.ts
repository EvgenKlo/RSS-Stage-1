import {gameState, gameTimer} from '../index.ts';

export function installSign() {
    const rows = gameState.allRows;
    const cells = rows.flatMap(item => item);
    cells.forEach(cell => {
        const rowCell = cell.row;
        const numberCell = cell.col;
        let nearBombs = 0;
        if (!cell.hasBomb) {
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
                if (item && item.hasBomb) {
                    nearBombs++;
                }
            })

        }
        if (nearBombs !== 0) {
            cell.addClassName(`int${nearBombs}`);
        }
    });
    gameTimer();
}