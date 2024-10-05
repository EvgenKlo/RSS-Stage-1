import {gameState, settings} from '../index.ts';

/**
 * Функция для расстановки бомб на игоровом поле.
 * @param count
 */
export function installBombs(count: number) {
    const rows = gameState.allRows;
    const randomRow = Math.floor(Math.random() * settings.playingFieldSize);
    const randomItem = Math.floor(Math.random() * settings.playingFieldSize);
    const item = rows[randomRow][randomItem];
    if (!item.hasBomb && !item.classes.includes('no-bomb')) {
        item.hasBomb = true;
        item.addClassName('bomb');
        count--;
        if (count > 0) {
            installBombs(count);
        }
    } else {
        installBombs(count);
    }
}