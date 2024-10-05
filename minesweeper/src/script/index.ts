import {State, StateKeys} from './State';
import checkCell from '../audio/check-cell.mp3';
import bah from '../audio/bah.mp3';
import victory from '../audio/victory.mp3';
import {DifficultSelect} from './components/difficult-select/difficult-select.ts';
import {BaseComponent} from './components/base-component.ts';
import {installBombs} from './utils/install-bombs.ts';
import {BombsCount, DifficultLevel, Settings, ThemeColor} from './app/settings.ts';
import {GameState} from './app/game-state.ts';
import {ClickCountPanel} from './components/click-count-panel/click-count-panel.ts';
import {createPlayingField} from './utils/create-playing-field.ts';
import {openEmptyCells} from './utils/open-empty-cells.ts';
import {changeTopic} from './utils/change-topic.ts';
import {Cell} from './components/cell/cell.ts';
import {installSign} from "./utils/install-sign.ts";

export const settings = Settings.getInstance(DifficultLevel.Easy, ThemeColor.Light, true);
export const gameState = GameState.getInstance();

export const appContainer = new BaseComponent('div', ['appContainer']).getComponent();

// Переключатель звука

const soundOn = new BaseComponent('div', ['sound-on']).getComponent();

// Звуки при кликах

const checkCellAudio = new Audio(checkCell);

const mineExplosion = new Audio(bah);

const victorySound = new Audio(victory);

// Сохранение статистики и состояния игры в Local Storage при перезагрзке страницы

// function setLocalStorage() {
//     const saveStateInLS = JSON.stringify(state);
//     localStorage.setItem('resultsYourLastGame', saveStateInLS);
//     localStorage.setItem('field', fieldContainer.innerHTML);
//     localStorage.setItem('time-seconds', seconds.toString());
//     localStorage.setItem('time-minutes', minutes.toString());
//     localStorage.setItem('timer-value', time.innerText);
//     localStorage.setItem('steps', clickCountPanel.clickCount.toString());
//     localStorage.setItem('flags-count', checkedBombsCount.innerText);
//     localStorage.setItem('how-need-bombs', difficult.howNeedBombs.toString());
//     localStorage.setItem('difficult-slider', JSON.stringify(selectBombsCountBlurComponent.classList));
//     localStorage.setItem('playing-field-size', difficult.playingFieldSize.toString());
//     const getDifficult = () => {
//         const difficultButtons = document.querySelectorAll('.difficult-dtn');
//         let btnText = '';
//         difficultButtons.forEach(btn => {
//             if (btn.classList.contains('active')) {
//                 btnText = btn.innerText;
//             }
//         });
//         return btnText;
//     };
//     localStorage.setItem('difficult', getDifficult());
//     const topicSelection = document.querySelector('.topic-selection');
//     localStorage.setItem('topic-selection', topicSelection.classList);
//     localStorage.setItem('sound-on-off', soundOn.classList);
// }
//
// window.addEventListener('beforeunload', setLocalStorage);
//
// function getLocalStorage() {
//     if (localStorage.getItem('resultsYourLastGame')) {
//         state = JSON.parse(localStorage.resultsYourLastGame);
//     }
//     if (localStorage.getItem('field')) {
//         fieldContainer.innerHTML = localStorage.getItem('field');
//     }
//     if (localStorage.getItem('playing-field-size')) {
//         difficult.playingFieldSize = localStorage.getItem('playing-field-size') * 1;
//     }
//     if (localStorage.getItem('steps')) {
//         clickCountPanel.clickCount = localStorage.getItem('steps') * 1;
//         const items = document.querySelectorAll('.item');
//         items.forEach(item => {
//             addClickHandlerOnCells(item);
//         });
//     }
//     if (localStorage.getItem('time-seconds') || localStorage.getItem('time-minutes')) {
//         seconds = localStorage.getItem('time-seconds') * 1;
//         minutes = localStorage.getItem('time-minutes') * 1;
//         const layoutSavePlayingField = document.querySelector('.layout-save-playing-field.active');
//         if (layoutSavePlayingField) {
//             clearTimeout(t);
//         } else if (seconds > 0 || minutes > 0) {
//             gameTimer();
//         }
//     }
//     if (localStorage.getItem('timer-value')) {
//         time.innerText = localStorage.getItem('timer-value');
//     }
//     if (localStorage.getItem('flags-count')) {
//         checkedBombsCount.innerText = localStorage.getItem('flags-count');
//     }
//     if (localStorage.getItem('how-need-bombs')) {
//         difficult.howNeedBombs = localStorage.getItem('how-need-bombs') * 1;
//     }
//     if (localStorage.getItem('difficult')) {
//         const savedifficult = localStorage.getItem('difficult');
//         const difficultButtons = document.querySelectorAll('.difficult-dtn');
//         difficultButtons.forEach(btn => {
//             btn.classList.remove('active');
//         });
//         difficultButtons.forEach(btn => {
//             if (btn.classList.contains(savedifficult)) {
//                 btn.classList.add('active');
//             }
//         });
//         selectLineInput.value = difficult.howNeedBombs;
//     }
//     if (localStorage.getItem('difficult-slider')) {
//         selectBombsCountBlurComponent.classList = localStorage.getItem('difficult-slider');
//     }
//     if (localStorage.getItem('topic-selection')) {
//         const topicSelection = document.querySelector('.topic-selection');
//         topicSelection.classList = localStorage.getItem('topic-selection');
//         changeTopic(topicSelection.classList);
//     }
//     if (localStorage.getItem('sound-on-off')) {
//         soundOn.classList = localStorage.getItem('sound-on-off');
//     }
//     maybeBomb();
//
//     // Закрытие статистики
//
//     const closeStateBtn = document.querySelector('.close-state');
//     if (closeStateBtn) {
//         closeStateBtn.addEventListener('click', () => {
//             const stateWindow = document.querySelector('.state-window');
//             stateWindow.classList.toggle('active');
//         });
//     }
// }
//
// window.addEventListener('load', getLocalStorage);

// Добавляю заголовок

const title = new BaseComponent('h1', ['title']).getComponent();
appContainer.append(title);
title.innerText = 'Minesweeper';

// Добавляю панель управления

const controlPanel = new BaseComponent('div', ['control-panel']).getComponent();
appContainer.append(controlPanel);

// Добавляю таймер

const timer = new BaseComponent('div', ['timer']).getComponent();
const time = new BaseComponent('div').getComponent();
time.innerText = 'Timer: 00:00';
controlPanel.append(timer);
timer.append(time);
let seconds = 0;
let minutes = 0;
let t: NodeJS.Timeout;

export function gameTimer() {
    seconds++;
    if (seconds < 10 && minutes < 10) {
        time.innerText = `Timer: 0${minutes}:0${seconds}`;
    } else if (seconds > 9 && seconds < 60 && minutes < 10) {
        time.innerText = `Timer: 0${minutes}:${seconds}`;
    } else if (seconds > 59 && minutes < 10) {
        minutes++;
        seconds = 0;
        if (minutes < 10) {
            time.innerText = `Timer: 0${minutes}:0${seconds}`;
        } else if (minutes > 9) {
            time.innerText = `Timer: ${minutes}:0${seconds}`;
        }
    } else if (minutes > 9 && seconds < 10) {
        time.innerText = `Timer: ${minutes}:0${seconds}`;
    } else if (minutes > 9 && seconds > 9 && seconds < 60) {
        time.innerText = `Timer: ${minutes}:${seconds}`;
    } else if (minutes > 9 && seconds > 59) {
        minutes++;
        seconds = 0;
        time.innerText = `Timer: ${minutes}:0${seconds}`;
    }
    t = setTimeout(() => {
        gameTimer();
    }, 1000);
}

// Добавляю кнопку Refresh

const refreshBtn = new BaseComponent('div', ['refresh-btn']).getComponent();
refreshBtn.innerText = 'New Game';
controlPanel.append(refreshBtn);
refreshBtn.addEventListener('click', refresh);

function refresh() {
    selectBombsCountBlur.removeClassName('active');
    clearTimeout(t);
    seconds = 0;
    minutes = 0;
    time.innerText = 'Timer: 00:00';
    checkedBombsCount.innerText = `x ${settings.bombsCount}`;
    gameState.reset();
    clickCountPanel.update();
    const playingFieldOld = document.querySelector('.playing-field');
    playingFieldOld?.remove();
    const {playingField} = createPlayingField(soundOn);
    fieldContainer.append(playingField.getComponent());
}

// Сохранение игры

const gameSaveContinue = new BaseComponent('div', ['game-save-continue-container']).getComponent();
controlPanel.append(gameSaveContinue);

const gameSaveBtn = new BaseComponent('div', ['game-save-btn']).getComponent();
gameSaveBtn.innerHTML = '<p>Save Game</p>';
gameSaveContinue.append(gameSaveBtn);

const gameContinueBtn = new BaseComponent('div', ['game-continue-btn']).getComponent();
gameContinueBtn.innerHTML = '<p>Continue</p>';
gameSaveContinue.append(gameContinueBtn);

// Добавляем счетчик кликов

const clickCountPanel = new ClickCountPanel('div', ['click-count-panel']);
const clickCountPanelComponent = clickCountPanel.getComponent();
clickCountPanel.update();
controlPanel.append(clickCountPanelComponent);

// Добавляю кнопки изменения уровня сложности

const difficult = new DifficultSelect('div', ['difficult']);
const difficultComponent = difficult.getComponent();
difficult.render();

// Добавляю счетчик отмеченных бомб

const checkedBombs = new BaseComponent('div', ['checked-bombs']).getComponent();
const bombImg = new BaseComponent('div', ['bomb-img']).getComponent();
controlPanel.append(checkedBombs);
checkedBombs.append(bombImg);
const checkedBombsCount = new BaseComponent('div', ['checked-bombs-count']).getComponent();
checkedBombs.append(checkedBombsCount);
checkedBombsCount.innerText = `x ${settings.bombsCount}`;

export function howManyBombsAreLeft() {
    checkedBombsCount.innerText = `x ${settings.bombsCount - gameState.flags}`;
}

//Добавляю выбор колличества бомб

const selectBombsCount = new BaseComponent('div', ['select-bombs-count']).getComponent();
checkedBombs.append(selectBombsCount);

const selectLineInput = new BaseComponent<HTMLInputElement>('input', ['select-line-input']).getComponent();
selectLineInput.type = 'range';
selectLineInput.min = BombsCount.Easy.toString();
selectLineInput.max = BombsCount.Hard.toString();
selectLineInput.value = BombsCount.Easy.toString();
selectBombsCount.append(selectLineInput);

const changeBombsCount = () => {
    checkedBombsCount.innerText = `x ${selectLineInput.value}`;
    settings.bombsCount = +selectLineInput.value;
};

selectLineInput.addEventListener('mousedown', () => {
    selectLineInput.addEventListener('mousemove', changeBombsCount);
    selectLineInput.addEventListener('mouseup', changeBombsCount);
});

const selectBombsCountBlur = new BaseComponent('div', ['select-bombs-count-blur']);
const selectBombsCountBlurComponent = selectBombsCountBlur.getComponent();
selectBombsCount.append(selectBombsCountBlurComponent);

// Добавляю кнопки изменения уровня сложности в DOM

controlPanel.append(difficultComponent);

// Создаю игровое поле

const fieldContainer = new BaseComponent('div', ['fieldContainer']).getComponent();
appContainer.append(fieldContainer);

const {playingField, stateTableContainer, stateWindow, layoutSavePlayingField} = createPlayingField(soundOn);

fieldContainer.append(playingField.getComponent());

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
        gameState.steps++;
        clickCountPanel.update();
        installBombs(settings.bombsCount);
        installSign();
        if (baseItem.classes.length === 3) {
            openEmptyCells(baseItem);
        }
    } else if (!baseItem.classes.includes('maybeBomb') && baseItem.classes.includes('close')) {
        baseItem.removeClassName('close');
        gameState.steps++;
        clickCountPanel.update();
        if (baseItem.classes.includes('bomb')) {
            if (!soundOn.classList.contains('active')) {
                mineExplosion.play();
            }
            const cells = gameState.allRows.flatMap(item=>item)
            for (let item of cells) {
                if (item.classes.includes('bomb')) {
                    baseItem.removeClassName('close');
                }
            }
            const layoutOnPlayingField = new BaseComponent('div', ['layout-on-playing-field']).getComponent();
            layoutOnPlayingField.innerHTML = '<p>ПОТРАЧЕНО =(</p>';
            playingField.getComponent().append(layoutOnPlayingField);
            clearTimeout(t);
            seconds = 0;
            minutes = 0;
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
    checkCellWithBomb();
}

// Проверка, что не открытыми остались только ячеки с бомбами

function checkCellWithBomb() {
    const cells = playingField.cells.filter(item => item.classes.includes('close'));
    if (cells.length === settings.bombsCount) {
        if (!soundOn.classList.contains('active')) {
            victorySound.play();
        }
        const layoutOnPlayingField = new BaseComponent('div', ['layout-on-playing-field-win']).getComponent();
        layoutOnPlayingField.innerHTML = '<p>Congratulations!!!</p>';
        playingField.getComponent().append(layoutOnPlayingField);
        clearTimeout(t);
        seconds = 0;
        minutes = 0;
        saveState();
    }
}

// Сохраняем статистику

let state: State[] = [];

const saveState = () => {
    const result = new State(time.innerText, gameState.steps, settings.difficult, settings.bombsCount);
    if (state.length === 10) {
        state.unshift(result);
        state.pop();
    } else {
        state.unshift(result);
    }
};

// Добавляю подвал

const footer = new BaseComponent('div', ['footer']).getComponent();
appContainer.append(footer);

// Переключатель выбора темы

const topicSelection = new BaseComponent('div', ['topic-selection']);
const topicSelectionComponent = new BaseComponent('div', ['topic-selection']).getComponent();
footer.append(topicSelectionComponent);

// Выбор темы

topicSelectionComponent.addEventListener('click', () => {
    topicSelection.toggleClassName('dark');
    settings.changeTheme();
    changeTopic(difficult);
});

const topicSelectionItem = new BaseComponent('div', ['topic-selection-item']).getComponent();
topicSelectionComponent.append(topicSelectionItem);


footer.append(soundOn);

soundOn.addEventListener('click', () => {
    soundOn.classList.toggle('active');
});

// Создаю кнопку для показа статистики

const stateBtn = new BaseComponent('div', ['state-btn']).getComponent();
const stateBtnTitle = new BaseComponent('p', ['state-btn-title']).getComponent();
stateBtnTitle.innerText = 'Statistics';
stateBtn.append(stateBtnTitle);
stateBtn.addEventListener('click', clickHandlerOnStateBtn);
footer.append(stateBtn);

function clickHandlerOnStateBtn() {
    stateWindow.toggleClassName('active');
    if (stateWindow.classes.includes('active')) {
        const stateTableContainerComponent = stateTableContainer.getComponent();
        stateTableContainerComponent.innerHTML = '';
        const closeState = new BaseComponent('div', ['close-state']);
        const closeStateComponent = closeState.getComponent();
        stateTableContainerComponent.append(closeStateComponent);
        closeStateComponent.addEventListener('click', () => {
            stateWindow.toggleClassName('active');
        });
        const tableTittle = new BaseComponent('h2', ['table-tittle']).getComponent();
        tableTittle.innerText = 'Statistics last 10 games';
        stateTableContainerComponent.append(tableTittle);
        const table = new BaseComponent('table', ['table']).getComponent();
        stateTableContainerComponent.append(table);
        const tableTittleName = ['№', 'Time', 'Steps', 'Difficult', 'Bombs'];
        tableTittleName.forEach(item => {
            const headerName = new BaseComponent('th', ['header-name', `header-${item}`]).getComponent();
            headerName.innerText = `${item}`;
            table.append(headerName);
        });
        let numberItemInArray = 1;
        state.forEach(item => {
            const tableRow = new BaseComponent('tr', ['table-item']).getComponent();
            table.append(tableRow);
            const rowItem = new BaseComponent('td', ['table-row', 'table-row-№']).getComponent();
            tableRow.append(rowItem);
            rowItem.innerText = `${numberItemInArray}`;
            numberItemInArray++;
            for (let data in item) {
                const rowItem = new BaseComponent('td', ['table-row', `table-row-${data}`]).getComponent();
                tableRow.append(rowItem);
                rowItem.innerText = `${item.getProperty(data as StateKeys)}`;
            }
        });
    }
}

// Вешаю кликхэндлеры на кнопки Save и Continue

gameSaveBtn.addEventListener('click', () => {
    if (!layoutSavePlayingField.classes.includes('active')) {
        clearTimeout(t);
        layoutSavePlayingField.addClassName('active');
        // setLocalStorage();
    }
});

gameContinueBtn.addEventListener('click', () => {
    if (layoutSavePlayingField.classes.includes('active')) {
        // getLocalStorage();
        layoutSavePlayingField.removeClassName('active');
        if (gameState.steps !== 0) {
            gameTimer();
        }
    }
});
