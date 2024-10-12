import {BaseComponent} from '../components/base-component.ts';
import {gameSettings} from '../index.ts';
import {GameField} from '../components/game-field/game-field.ts';
import {Cell} from '../components/cell/cell.ts';
import {maybeBomb} from './maybe-bomb.ts';
import {cellClickHandler} from "./cell-click-handler.ts";

export function createGameField() {
    const size = gameSettings.playingFieldSize;

    const gameField = new GameField('div', ['playing-field', `playing-field-${size}`]);
    const gameFieldComponent = gameField.getComponent();

    gameField.rows = Array(gameSettings.playingFieldSize).fill([]);

    for (let i = 0; i < size; i++) {
        const row = new BaseComponent('div', ['row']).getComponent();
        gameField.rows[i] = []
        for (let j = 0; j < size; j++) {
            const cell = new Cell('div', ['item', 'close'], i, j);
            gameField.rows[i][j] = cell;
            const cellComponent = cell.getComponent();
            cellComponent.addEventListener('click', cellClickHandler.bind(cell));
            cellComponent.addEventListener('contextmenu', () => maybeBomb(cell));
            row.append(cellComponent);
        }
        gameFieldComponent.append(row);
    }

    const stateWindow = new BaseComponent('div', ['state-window']);
    const stateWindowComponent = stateWindow.getComponent();
    gameFieldComponent.append(stateWindowComponent);

    const stateTableContainer = new BaseComponent('div', ['state-table-container']);
    const stateTableContainerComponent = stateTableContainer.getComponent();
    stateWindowComponent.append(stateTableContainerComponent);

    const layoutSavePlayingField = new BaseComponent('div', ['layout-save-playing-field']);
    const layoutSavePlayingFieldComponent = layoutSavePlayingField.getComponent();
    layoutSavePlayingFieldComponent.innerHTML = '<p>Game saved.<br>To continue the game, press the button "Continue"</p>';
    gameFieldComponent.append(layoutSavePlayingFieldComponent);

    return {gameField, stateTableContainer, stateWindow, layoutSavePlayingField};
}