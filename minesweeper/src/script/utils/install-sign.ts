import {gameTimer, gameField} from '../index.ts';
import {getCellsAroundCell} from "./get-cells-around-cell.ts";

export function installSign() {
    const cells = gameField.getCells();

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
        if (nearBombs > 0) {
            cell.addClassName(`int${nearBombs}`);
            cell.isBombNear = true;
        }
    });
    gameTimer.tick();
}