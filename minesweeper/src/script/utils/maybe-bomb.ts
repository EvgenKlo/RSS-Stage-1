import {gameState, howManyBombsAreLeft} from '../index.ts';
import checkCell from '../../audio/check-cell.mp3';
import {Cell} from '../components/cell/cell.ts';

const checkCellAudio = new Audio(checkCell);

export function maybeBomb(cell: Cell, soundOn: HTMLElement) {
    if (!cell.isOpen && !cell.isMaybeBomb && gameState.steps > 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.currentTime = 0;
            checkCellAudio.play();
        }
        cell.addClassName('maybeBomb');
        cell.isMaybeBomb = true;
        gameState.flags++;
    } else if (!cell.isOpen && cell.isMaybeBomb && gameState.steps > 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.currentTime = 0;
            checkCellAudio.play();
        }
        cell.removeClassName('maybeBomb');
        cell.isMaybeBomb = false;
        gameState.flags--;
    }
    howManyBombsAreLeft();
}
