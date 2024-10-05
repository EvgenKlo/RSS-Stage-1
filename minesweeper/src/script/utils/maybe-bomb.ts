import {gameState, howManyBombsAreLeft} from '../index.ts';
import checkCell from '../../audio/check-cell.mp3';
import {Cell} from '../components/cell/cell.ts';

const checkCellAudio = new Audio(checkCell);

export function maybeBomb(cell: Cell, soundOn: HTMLElement) {
    if (cell.classes.includes('close') && !cell.classes.includes('maybeBomb') && gameState.steps !== 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.currentTime = 0;
            checkCellAudio.play();
        }
        cell.addClassName('maybeBomb');
        gameState.flags++;
    } else if (cell.classes.includes('close') && cell.classes.includes('maybeBomb') && gameState.steps !== 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.currentTime = 0;
            checkCellAudio.play();
        }
        cell.removeClassName('maybeBomb');
        gameState.flags--;
    }
    howManyBombsAreLeft();
}
