import {BaseComponent} from '../components/base-component.ts';
import {cellClickHandler, settings} from '../index.ts';
import {GameField} from '../components/game-field/game-field.ts';
import {Cell} from '../components/cell/cell.ts';
import {maybeBomb} from './maybe-bomb.ts';

export function createPlayingField(soundOn: HTMLElement) {
    const size = settings.playingFieldSize;
    const playingField = new GameField('div', ['playing-field', `playing-field-${size}`]);
    const playingFieldComponent = playingField.getComponent();
    for (let i = 0; i < size; i++) {
        const row = new BaseComponent('div', ['row', `row-${i}`]).getComponent();
        for (let j = 0; j < size; j++) {
            const cell = new Cell('div', ['item', `item-${j}`, 'close'], i, j);
            const cellComponent = cell.getComponent();
            cellComponent.addEventListener('click', cellClickHandler.bind(cell));
            cellComponent.addEventListener('contextmenu', () => maybeBomb(cell, soundOn));
            row.append(cellComponent);
            playingField.addCell(cell);
        }
        playingFieldComponent.append(row);
    }

    const stateWindow = new BaseComponent('div', ['state-window']);
    const stateWindowComponent = stateWindow.getComponent();
    playingFieldComponent.append(stateWindowComponent);

    const stateTableContainer = new BaseComponent('div', ['state-table-container']);
    const stateTableContainerComponent = stateTableContainer.getComponent();
    stateWindowComponent.append(stateTableContainerComponent);

    const layoutSavePlayingField = new BaseComponent('div', ['layout-save-playing-field']);
    const layoutSavePlayingFieldComponent = layoutSavePlayingField.getComponent();
    layoutSavePlayingFieldComponent.innerHTML = '<p>Game saved.<br>To continue the game, press the button "Continue"</p>';
    playingFieldComponent.append(layoutSavePlayingFieldComponent);

    return {playingField, stateTableContainer, stateWindow, layoutSavePlayingField};
}