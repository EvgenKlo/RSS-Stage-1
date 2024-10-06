import {gameSound, gameState, howManyBombsAreLeft} from '../index.ts';
import {Cell} from '../components/cell/cell.ts';

export function maybeBomb(cell: Cell) {
    if (!cell.isOpen && !cell.isMaybeBomb && gameState.steps > 0) {
        gameSound.playCheckCell();
        cell.addClassName('maybeBomb');
        cell.isMaybeBomb = true;
        gameState.flags++;
    } else if (!cell.isOpen && cell.isMaybeBomb && gameState.steps > 0) {
        gameSound.playCheckCell();
        cell.removeClassName('maybeBomb');
        cell.isMaybeBomb = false;
        gameState.flags--;
    }
    howManyBombsAreLeft();
}
