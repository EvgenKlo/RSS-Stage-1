import {gameState, howManyBombsAreLeft} from '../index.ts';
import checkCell from '../../audio/check-cell.mp3';
import {Cell} from '../components/cell/cell.ts';

const checkCellAudio = new Audio(checkCell);

export function maybeBomb(cell: Cell, soundOn: HTMLElement) {
    const cellComponent = cell.getComponent();
    if (cell.classes.includes('close') && !cell.classes.includes('maybeBomb') && gameState.steps !== 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.currentTime = 0;
            checkCellAudio.play();
        }
        cellComponent.classList.add('maybeBomb');
        cell.addClassName('maybeBomb');
        gameState.flags++;
    } else if (cell.classes.includes('close') && cell.classes.includes('maybeBomb') && gameState.steps !== 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.currentTime = 0;
            checkCellAudio.play();
        }
        cellComponent.classList.remove('maybeBomb');
        cell.removeClassName('maybeBomb');
        gameState.flags--;
    }
    howManyBombsAreLeft();
}
