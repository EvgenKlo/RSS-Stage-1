import {settings} from '../index.ts';

/**
 * Функция для расстановки бомб на игоровом поле.
 * @param count
 */
export function installBombs(count: number) {
    const randomRow = Math.floor(Math.random() * settings.playingFieldSize);
    const rows = document.getElementsByClassName('row');
    const randomItem = Math.floor(Math.random() * settings.playingFieldSize);
    const item = rows[randomRow].childNodes[randomItem] as HTMLElement;
    if (!item.classList.contains('bomb') && !item.classList.contains('no-bomb')) {
        item.classList.add('bomb');
        count--;
        if (count > 0) {
            installBombs(count);
        }
    } else {
        installBombs(count);
    }
}