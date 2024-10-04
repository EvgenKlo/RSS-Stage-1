import {gameState, howManyBombsAreLeft} from '../index.ts';
import checkCell from '../../audio/check-cell.mp3';

const checkCellAudio = new Audio(checkCell);

export function maybeBomb(soundOn: HTMLElement) {
    const items = document.querySelectorAll('.item');
    for (let item of items) {
        item.addEventListener('contextmenu', (event) => {
            if (event.target.classList.contains('close') && !event.target.classList.contains('maybeBomb') && gameState.steps !== 0) {
                if (!soundOn.classList.contains('active')) {
                    checkCellAudio.currentTime = 0;
                    checkCellAudio.play();
                }
                event.target.classList.add('maybeBomb');
                gameState.flags++;
            } else if (event.target.classList.contains('close') && event.target.classList.contains('maybeBomb') && gameState.steps !== 0) {
                if (!soundOn.classList.contains('active')) {
                    checkCellAudio.currentTime = 0;
                    checkCellAudio.play();
                }
                event.target.classList.remove('maybeBomb');
                gameState.flags--;
            }
            howManyBombsAreLeft();
        });
    }
}
