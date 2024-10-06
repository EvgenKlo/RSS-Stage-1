import {Cell} from "../components/cell/cell.ts";
import {
    clickCountPanel, gameSound,
    gameState,
    gameTimer,
    playingField,
    selectBombsCountBlur,
    settings,
} from "../index.ts";
import {installBombs} from "./install-bombs.ts";
import {installSign} from "./install-sign.ts";
import {openEmptyCells} from "./open-empty-cells.ts";
import {BaseComponent} from "../components/base-component.ts";
import {checkCellWithBomb} from "./check-cell-with-bomb.ts";

// Кликхендлеры на ячейки поля

export function cellClickHandler(this: Cell) {
    const baseItem = this;
    if (!baseItem.isOpen) {
        baseItem.removeClassName('close');
        baseItem.isOpen = true;
        gameState.steps++;
        clickCountPanel.update();
    }
    if (gameState.steps === 1) {
        gameSound.playCheckCell();
        selectBombsCountBlur.addClassName('active');
        baseItem.isFirstClicked = true;
        installBombs(settings.bombsCount);
        installSign();
        if (!baseItem.isBombNear) {
            openEmptyCells(baseItem);
        }
    } else if (!baseItem.isMaybeBomb) {
        if (baseItem.hasBomb) {
            gameSound.playMineExplosion();
            const cells = gameState.allRows.flatMap(item => item);
            cells.map(item => {
                if (item.hasBomb) {
                    item.removeClassName('close');
                    item.isOpen = true;
                }
            })
            const layoutOnPlayingField = new BaseComponent('div', ['layout-on-playing-field']).getComponent();
            layoutOnPlayingField.innerHTML = '<p>ПОТРАЧЕНО =(</p>';
            playingField.getComponent().append(layoutOnPlayingField);
            gameTimer.stopTimer();
        } else if (!baseItem.isBombNear) {
            gameSound.playCheckCell();
            openEmptyCells(baseItem);
        } else {
            gameSound.playCheckCell();
        }
    }
    checkCellWithBomb(playingField);
}