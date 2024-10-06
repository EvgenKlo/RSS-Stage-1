import {BaseComponent} from "../components/base-component.ts";
import {GameField} from "../components/game-field/game-field.ts";
import {gameSound, gameState, gameTimer, saveState, settings} from "../index.ts";

/**
 * Проверка, что не открытыми остались только ячеки с бомбами
 * @param playingField
 */
export function checkCellWithBomb(playingField: GameField) {
    const cells = gameState.allRows.flatMap(item => item).filter(item => !item.isOpen);
    if (cells.length === settings.bombsCount) {
        gameSound.playVictory();
        const layoutOnPlayingField = new BaseComponent('div', ['layout-on-playing-field-win']).getComponent();
        layoutOnPlayingField.innerHTML = '<p>Congratulations!!!</p>';
        playingField.getComponent().append(layoutOnPlayingField);
        gameTimer.stopTimer();
        saveState();
    }
}