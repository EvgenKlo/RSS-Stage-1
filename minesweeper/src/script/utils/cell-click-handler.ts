import {Cell} from "../components/cell/cell.ts";
import {
    clickCountPanel,
    gameState,
    gameTimer,
    playingField,
    selectBombsCountBlur,
    settings,
    soundOn
} from "../index.ts";
import checkCell from "../../audio/check-cell.mp3";
import bah from "../../audio/bah.mp3";
import {installBombs} from "./install-bombs.ts";
import {installSign} from "./install-sign.ts";
import {openEmptyCells} from "./open-empty-cells.ts";
import {BaseComponent} from "../components/base-component.ts";
import {checkCellWithBomb} from "./check-cell-with-bomb.ts";

const checkCellAudio = new Audio(checkCell);

const mineExplosion = new Audio(bah);

// Кликхендлеры на ячейки поля

export function cellClickHandler(this: Cell) {
    const item = this.getComponent();
    const baseItem = this;
    if (gameState.steps === 0) {
        if (!soundOn.classList.contains('active')) {
            checkCellAudio.play();
        }
        selectBombsCountBlur.addClassName('active');
        baseItem.addClassName('no-bomb');
        baseItem.removeClassName('close');
        baseItem.isOpen = true;
        gameState.steps++;
        clickCountPanel.update();
        installBombs(settings.bombsCount);
        installSign();
        if (baseItem.classes.length === 3) {
            openEmptyCells(baseItem);
        }
    } else if (!baseItem.classes.includes('maybeBomb') && baseItem.classes.includes('close')) {
        baseItem.removeClassName('close');
        baseItem.isOpen = true;
        gameState.steps++;
        clickCountPanel.update();
        if (baseItem.hasBomb) {
            if (!soundOn.classList.contains('active')) {
                mineExplosion.play();
            }
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
        } else if (item.classList.length === 2) {
            if (!soundOn.classList.contains('active')) {
                checkCellAudio.currentTime = 0;
                checkCellAudio.play();
            }
            openEmptyCells(baseItem);
        } else {
            if (!soundOn.classList.contains('active')) {
                checkCellAudio.currentTime = 0;
                checkCellAudio.play();
            }
        }
    }
    checkCellWithBomb(playingField);
}