import {BaseComponent} from '../components/base-component.ts';
import {cellClickHandler, settings} from '../index.ts';
import {GameField} from '../components/game-field/game-field.ts';
import {Cell} from '../components/cell/cell.ts';

export function createPlayingField() {
    const size = settings.playingFieldSize;
    const playingField = new GameField('div', ['playing-field', `playing-field-${size}`]);
    const playingFieldComponent = playingField.getComponent();
    for (let i = 0; i < size; i++) {
        const row = new BaseComponent('div', ['row', `row-${i}`]).getComponent();
        for (let j = 0; j < size; j++) {
            const cell = new Cell('div', ['item', `item-${j}`, 'close']);
            const cellComponent = cell.getComponent();
            cellComponent.addEventListener('click', cellClickHandler.bind(cell));
            row.append(cellComponent);
            playingField.addCell(cell);
        }
        playingFieldComponent.append(row);
    }

    const stateWindow = new BaseComponent('div', ['state-window']);
    const stateWindowComponent = new BaseComponent('div', ['state-window']).getComponent();
    playingFieldComponent.append(stateWindowComponent);

    const stateTableContainer = new BaseComponent('div', ['state-table-container']);
    const stateTableContainerComponent = new BaseComponent('div', ['state-table-container']).getComponent();
    stateWindowComponent.append(stateTableContainerComponent);

    const layoutSavePlayingField = new BaseComponent('div', ['layout-save-playing-field']);
    const layoutSavePlayingFieldComponent = layoutSavePlayingField.getComponent();
    layoutSavePlayingFieldComponent.innerHTML = '<p>Game saved.<br>To continue the game, press the button "Continue"</p>';
    playingFieldComponent.append(layoutSavePlayingFieldComponent);

    return {playingField, stateTableContainer, stateWindow, layoutSavePlayingField};
}