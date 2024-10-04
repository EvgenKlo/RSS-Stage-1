import {gameTimer, settings} from '../index.ts';

export function installSign() {
    const cells = document.querySelectorAll('.item');
    cells.forEach(cell => {
        const rowCell = cell.parentElement.classList[1].split('-')[1] * 1;
        const numberCell = cell.classList[1].split('-')[1] * 1;
        const rows = document.getElementsByClassName('row');
        let nearBombs = 0;
        if (!cell.classList.contains('bomb')) {
            if (rowCell === 0) {
                if (numberCell === 0) {
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else if (numberCell === settings.playingFieldSize - 1) {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                }
            } else if (rowCell === settings.playingFieldSize - 1) {
                if (numberCell === 0) {
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else if (numberCell === settings.playingFieldSize - 1) {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                }
            } else {
                if (numberCell === 0) {
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else if (numberCell === settings.playingFieldSize - 1) {
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                }
            }
        }
        if (nearBombs !== 0) {
            cell.classList.add(`int${nearBombs}`);
        }
    });
    gameTimer();
}