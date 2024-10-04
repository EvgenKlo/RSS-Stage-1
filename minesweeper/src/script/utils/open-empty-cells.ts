import {settings} from '../index.ts';

/**
 * Раскрываю часть поля при клике на пустую ячейку
 * @param cell
 */
export function openEmptyCells(cell: Element) {
    const classCountEmptyCell = 2;
    const rowCell = cell.parentElement.classList[1].split('-')[1] * 1;
    const numberCell = cell.classList[1].split('-')[1] * 1;
    const rows = document.getElementsByClassName('row');
    if (cell.classList.contains('no-bomb') || cell.classList.length === classCountEmptyCell) {
        if (rowCell === 0) {
            if (numberCell === 0) {
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            } else if (numberCell === settings.playingFieldSize - 1) {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            } else {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            }
        } else if (rowCell === settings.playingFieldSize - 1) {
            if (numberCell === 0) {
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            } else if (numberCell === settings.playingFieldSize - 1) {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            } else {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            }
        } else {
            if (numberCell === 0) {
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            } else if (numberCell === settings.playingFieldSize - 1) {
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            } else {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
            }
        }
    }
}