import {gameState, gameTimer, settings} from '../index.ts';

export function installSign() {
    const rows = gameState.allRows;
    const cells = rows.flatMap(item=>item);
    cells.forEach(cell => {
        const rowCell = cell.row;
        const numberCell = cell.col;
        let nearBombs = 0;
        if (!cell.hasBomb) {
            if (rowCell === 0) {
                if (numberCell === 0) {
                    if (rows[rowCell][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                } else if (numberCell === settings.playingFieldSize - 1) {
                    if (rows[rowCell][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                }
            } else if (rowCell === settings.playingFieldSize - 1) {
                if (numberCell === 0) {
                    if (rows[rowCell][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                } else if (numberCell === settings.playingFieldSize - 1) {
                    if (rows[rowCell][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                }
            } else {
                if (numberCell === 0) {
                    if (rows[rowCell - 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                } else if (numberCell === settings.playingFieldSize - 1) {
                    if (rows[rowCell - 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell - 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell - 1].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell].hasBomb) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1][numberCell + 1].hasBomb) {
                        nearBombs++;
                    }
                }
            }
        }
        if (nearBombs !== 0) {
            cell.addClassName(`int${nearBombs}`);
        }
    });
    gameTimer();
}