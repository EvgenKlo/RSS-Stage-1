import {BaseComponent} from "../components/base-component.ts";
import {GameField} from "../components/game-field/game-field.ts";
import {gameTimer, saveState, settings, soundOn} from "../index.ts";
import victory from "../../audio/victory.mp3";

const victorySound = new Audio(victory);

/**
 * Проверка, что не открытыми остались только ячеки с бомбами
 * @param playingField
 */
export function checkCellWithBomb(playingField: GameField) {
    const cells = playingField.cells.filter(item => !item.isOpen);
    if (cells.length === settings.bombsCount) {
        if (!soundOn.classList.contains('active')) {
            victorySound.play();
        }
        const layoutOnPlayingField = new BaseComponent('div', ['layout-on-playing-field-win']).getComponent();
        layoutOnPlayingField.innerHTML = '<p>Congratulations!!!</p>';
        playingField.getComponent().append(layoutOnPlayingField);
        gameTimer.stopTimer();
        saveState();
    }
}