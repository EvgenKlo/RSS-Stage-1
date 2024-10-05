import {gameState, gameTimer} from '../index.ts';
import {getCellsAroundCell} from "./get-cells-around-cell.ts";

export function installSign() {
    const rows = gameState.allRows;
    const cells = rows.flatMap(item => item);

    cells.forEach(cell => {
        let nearBombs = 0;
        if (!cell.hasBomb) {
            const cellsAroundCell = getCellsAroundCell(cell);

            cellsAroundCell.map(item => {
                if (item && item.hasBomb) {
                    nearBombs++;
                }
            })
        }
        if (nearBombs !== 0) {
            cell.addClassName(`int${nearBombs}`);
        }
    });
    gameTimer.tick();
}