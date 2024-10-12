import {BaseComponent} from "../components/base-component.ts";
import {GameField} from "../components/game-field/game-field.ts";
import {gameSound, gameTimer, saveState, gameSettings} from "../index.ts";

/**
 * Проверка, что не открытыми остались только ячеки с бомбами
 * @param gameField
 */
export function checkCellWithBomb(gameField: GameField) {
    const cells = gameField.getCells().filter(item => !item.isOpen);
    if (cells.length === gameSettings.bombsCount) {
        gameSound.playVictory();
        const layoutOnPlayingField = new BaseComponent('div', ['layout-on-playing-field-win']).getComponent();
        layoutOnPlayingField.innerHTML = '<p>Congratulations!!!</p>';
        gameField.getComponent().append(layoutOnPlayingField);
        gameTimer.stopTimer();
        saveState();
    }
}