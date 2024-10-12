import {gameSettings, gameField} from '../index.ts';

/**
 * Функция для расстановки бомб на игоровом поле.
 * @param count
 */
export function installBombs(count: number) {
    const rows = gameField.rows;
    const randomRow = Math.floor(Math.random() * gameSettings.playingFieldSize);
    const randomItem = Math.floor(Math.random() * gameSettings.playingFieldSize);
    const item = rows[randomRow][randomItem];
    if (!item.hasBomb && !item.isFirstClicked) {
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