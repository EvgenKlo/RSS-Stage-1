import {State} from './State';
import checkCell from '../audio/check-cell.mp3';
import bah from '../audio/bah.mp3';
import victory from '../audio/victory.mp3';
import {ClickCountPanel} from './components/click-count-panel/click-count-panel.ts';
import {BaseComponent} from './utils/base-component.ts';
import {DifficultSelect} from './components/difficult-select/difficult-select.ts';

export const appContainer = new BaseComponent('div', ['appContainer']).getComponent();

// Звуки при кликах

const checkCellAudio = new Audio(checkCell);

const mineExplosion = new Audio(bah);

const victorySound = new Audio(victory);

// Сохранение статистики и состояния игры в Local Storage при перезагрзке страницы

function setLocalStorage() {
    const saveStateInLS = JSON.stringify(state);
    localStorage.setItem('resultsYourLastGame', saveStateInLS);
    localStorage.setItem('field', fieldContainer.innerHTML);
    localStorage.setItem('time-seconds', seconds.toString());
    localStorage.setItem('time-minutes', minutes.toString());
    localStorage.setItem('timer-value', time.innerText);
    localStorage.setItem('steps', clickCountPanel.clickCount.toString());
    localStorage.setItem('flags-count', checkedBombsCount.innerText);
    localStorage.setItem('how-need-bombs', difficult.howNeedBombs.toString());
    localStorage.setItem('difficult-slider', JSON.stringify(selectBombsCountBlur.classList));
    localStorage.setItem('playing-field-size', difficult.playingFieldSize.toString());
    const getDifficult = () => {
        const difficultButtons = document.querySelectorAll('.difficult-dtn');
        let btnText = '';
        difficultButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                btnText = btn.innerText;
            }
        });
        return btnText;
    };
    localStorage.setItem('difficult', getDifficult());
    const topicSelection = document.querySelector('.topic-selection');
    localStorage.setItem('topic-selection', topicSelection.classList);
    localStorage.setItem('sound-on-off', soundOn.classList);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('resultsYourLastGame')) {
        state = JSON.parse(localStorage.resultsYourLastGame);
    }
    if (localStorage.getItem('field')) {
        fieldContainer.innerHTML = localStorage.getItem('field');
    }
    if (localStorage.getItem('playing-field-size')) {
        difficult.playingFieldSize = localStorage.getItem('playing-field-size') * 1;
    }
    if (localStorage.getItem('steps')) {
        clickCountPanel.clickCount = localStorage.getItem('steps') * 1;
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            addClickHandlerOnCells(item);
        });
    }
    if (localStorage.getItem('time-seconds') || localStorage.getItem('time-minutes')) {
        seconds = localStorage.getItem('time-seconds') * 1;
        minutes = localStorage.getItem('time-minutes') * 1;
        const layoutSavePlayingField = document.querySelector('.layout-save-playing-field.active');
        if (layoutSavePlayingField) {
            clearTimeout(t);
        } else if (seconds > 0 || minutes > 0) {
            gameTimer();
        }
    }
    if (localStorage.getItem('timer-value')) {
        time.innerText = localStorage.getItem('timer-value');
    }
    if (localStorage.getItem('flags-count')) {
        checkedBombsCount.innerText = localStorage.getItem('flags-count');
    }
    if (localStorage.getItem('how-need-bombs')) {
        difficult.howNeedBombs = localStorage.getItem('how-need-bombs') * 1;
    }
    if (localStorage.getItem('difficult')) {
        const savedifficult = localStorage.getItem('difficult');
        const difficultButtons = document.querySelectorAll('.difficult-dtn');
        difficultButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        difficultButtons.forEach(btn => {
            if (btn.classList.contains(savedifficult)) {
                btn.classList.add('active');
            }
        });
        selectLineInput.value = difficult.howNeedBombs;
    }
    if (localStorage.getItem('difficult-slider')) {
        selectBombsCountBlur.classList = localStorage.getItem('difficult-slider');
    }
    if (localStorage.getItem('topic-selection')) {
        const topicSelection = document.querySelector('.topic-selection');
        topicSelection.classList = localStorage.getItem('topic-selection');
        changeTopic(topicSelection.classList);
    }
    if (localStorage.getItem('sound-on-off')) {
        soundOn.classList = localStorage.getItem('sound-on-off');
    }
    maybeBomb();

    // Закрытие статистики

    const closeStateBtn = document.querySelector('.close-state');
    if (closeStateBtn) {
        closeStateBtn.addEventListener('click', () => {
            const stateWindow = document.querySelector('.state-window');
            stateWindow.classList.toggle('active');
        });
    }
}

window.addEventListener('load', getLocalStorage);


// Убираю стандартное поведение при нажатии на правую кнопку мыши

// document.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
// });

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

function gameTimer() {
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
refreshBtn.addEventListener('click', () => {
    refresh();
});

function refresh() {
    selectBombsCountBlur.classList.remove('active');
    clearTimeout(t);
    seconds = 0;
    minutes = 0;
    time.innerText = 'Timer: 00:00';
    checkedBombsCount.innerText = `x ${difficult.howNeedBombs}`;
    clickCountPanel.clickCount = 0;
    const playingField = document.querySelector('.playing-field');
    playingField.remove();
    createPlayingField(difficult.playingFieldSize);
    invisPlayingField();
    maybeBomb();
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
controlPanel.append(clickCountPanelComponent);

// Добавляю кнопки изменения уровня сложности

const difficult = new DifficultSelect('div', ['difficult']);
const difficultComponent = difficult.getComponent();
difficult.render(clickCountPanel.clickCount);

// Добавляю счетчик отмеченных бомб

const checkedBombs = new BaseComponent('div', ['checked-bombs']).getComponent();
const bombImg = new BaseComponent('div', ['bomb-img']).getComponent();
controlPanel.append(checkedBombs);
checkedBombs.append(bombImg);
const checkedBombsCount = new BaseComponent('div', ['checked-bombs-count']).getComponent();
checkedBombs.append(checkedBombsCount);
checkedBombsCount.innerText = `x ${difficult.howNeedBombs}`;

function howManyBombsAreLeft(bombsCount: number) {
    const flagsCount = document.querySelectorAll('.maybeBomb').length;
    checkedBombsCount.innerText = `x ${bombsCount - flagsCount}`;
}

//Добавляю выбор колличества бомб

const selectBombsCount = new BaseComponent('div', ['select-bombs-count']).getComponent();
checkedBombs.append(selectBombsCount);

const selectLineInput = new BaseComponent<HTMLInputElement>('input', ['select-line-input']).getComponent();
selectLineInput.type = 'range';
selectLineInput.min = '10';
selectLineInput.max = '99';
selectLineInput.value = '10';
selectBombsCount.append(selectLineInput);

const changeBombsCount = () => {
    checkedBombsCount.innerText = `x ${selectLineInput.value}`;
    difficult.howNeedBombs = +selectLineInput.value;
};

selectLineInput.addEventListener('mousedown', () => {
    selectLineInput.addEventListener('mousemove', () => {
        changeBombsCount();
    });
    selectLineInput.addEventListener('mouseup', () => {
        changeBombsCount();
    });
});

const selectBombsCountBlur = new BaseComponent('div', ['select-bombs-count-blur']).getComponent();
selectBombsCount.append(selectBombsCountBlur);

// Добавляю кнопки изменения уровня сложности в DOM

controlPanel.append(difficultComponent);

// Создаю игровое поле

const fieldContainer = new BaseComponent('div', ['fieldContainer']).getComponent();
appContainer.append(fieldContainer);

function createPlayingField(size: number) {
    const playingField = new BaseComponent('div', ['playing-field', `playing-field-${size}`]);
    const playingFieldComponent = new BaseComponent('div', ['playing-field', `playing-field-${size}`]).getComponent();
    for (let i = 0; i < size; i++) {
        const row = new BaseComponent('div', ['row', `row-${i}`]).getComponent();
        for (let j = 0; j < size; j++) {
            const item = new BaseComponent('div', ['item', `item-${j}`]).getComponent();
            row.append(item);
        }
        playingFieldComponent.append(row);
    }
    fieldContainer.append(playingFieldComponent);

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

const {playingField, stateTableContainer, stateWindow, layoutSavePlayingField} = createPlayingField(difficult.playingFieldSize);

// Расставляю бомбы

function installBombs(count: number) {
    let randomRow = Math.floor(Math.random() * difficult.playingFieldSize);
    const rows = document.getElementsByClassName('row');
    let randomItem = Math.floor(Math.random() * difficult.playingFieldSize);
    const item = rows[randomRow].childNodes[randomItem];
    if (!item.classList.contains('bomb') && !item.classList.contains('no-bomb')) {
        item.classList.add('bomb');
        count--;
        if (count > 0) {
            installBombs(count);
        }
    } else {
        installBombs(count);
    }
}

// Расставляю указатели около бомб

function installSign() {
    const cells = document.querySelectorAll('.item');
    cells.forEach(cell => {
        const rowCell = cell.parentElement.classList[1].split('-')[1] * 1;
        const numberCell = cell.classList[1].split('-')[1] * 1;
        const rows = document.getElementsByClassName('row');
        let nearBombs = 0;
        if (!cell.classList.contains('bomb')) {
            if (rowCell === 0) {
                if (numberCell === 0) {
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else if (numberCell === difficult.playingFieldSize - 1) {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                }
            } else if (rowCell === difficult.playingFieldSize - 1) {
                if (numberCell === 0) {
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else if (numberCell === difficult.playingFieldSize - 1) {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                }
            } else {
                if (numberCell === 0) {
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else if (numberCell === difficult.playingFieldSize - 1) {
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                } else {
                    if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
                        nearBombs++;
                    }
                    if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
                        nearBombs++;
                    }
                }
            }
        }
        if (nearBombs !== 0) {
            cell.classList.add(`int${nearBombs}`);
        }
    });
    gameTimer();
}

// Скрываю игровое поле

function invisPlayingField() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.classList.add('close');
        addClickHandlerOnCells(item);
    });
}

invisPlayingField();

// Добавляю кликхендлеры на ячейки поля

function addClickHandlerOnCells(item: Element) {
    item.addEventListener('click', () => {
        if (clickCountPanel.clickCount === 0) {
            if (!soundOn.classList.contains('active')) {
                checkCellAudio.play();
            }
            selectBombsCountBlur.classList.add('active');
            item.classList.add('no-bomb');
            item.classList.remove('close');
            clickCountPanel.clickCounter();
            installBombs(difficult.howNeedBombs);
            installSign();
            if (item.classList.length === 3) {
                openEmptyCells(item);
            }
        } else if (!item.classList.contains('maybeBomb') && item.classList.contains('close')) {
            item.classList.remove('close');
            clickCountPanel.clickCounter();
            if (item.classList.contains('bomb')) {
                if (!soundOn.classList.contains('active')) {
                    mineExplosion.play();
                }
                for (let item of items) {
                    if (item.classList.contains('bomb')) {
                        item.classList.remove('close');
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
                openEmptyCells(item);
            } else {
                if (!soundOn.classList.contains('active')) {
                    checkCellAudio.currentTime = 0;
                    checkCellAudio.play();
                }
            }
        }
        checkCellWithBomb();
    });
}

// Ставлю предположение о бомбе

const items = document.getElementsByClassName('item');

function maybeBomb() {
    for (let item of items) {
        item.addEventListener('contextmenu', (event) => {
            if (event.target.classList.contains('close') && !event.target.classList.contains('maybeBomb') && clickCountPanel.clickCount !== 0) {
                if (!soundOn.classList.contains('active')) {
                    checkCellAudio.currentTime = 0;
                    checkCellAudio.play();
                }
                event.target.classList.add('maybeBomb');
            } else if (event.target.classList.contains('close') && event.target.classList.contains('maybeBomb') && clickCountPanel.clickCount !== 0) {
                if (!soundOn.classList.contains('active')) {
                    checkCellAudio.currentTime = 0;
                    checkCellAudio.play();
                }
                event.target.classList.remove('maybeBomb');
            }
            howManyBombsAreLeft(difficult.howNeedBombs);
        });
    }
}

maybeBomb();

// Проверка, что не открытыми остались только ячеки с бомбами

function checkCellWithBomb() {
    const cells = document.querySelectorAll('.close');
    if (cells.length === difficult.howNeedBombs) {
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

// Раскрываю часть поля при клике на пустую ячейку

function openEmptyCells(cell) {
    const classCountEmptyCell = 2;
    const rowCell = cell.parentElement.classList[1].split('-')[1] * 1;
    const numberCell = cell.classList[1].split('-')[1] * 1;
    const rows = document.getElementsByClassName('row');
    if (cell.classList.contains('no-bomb') || cell.classList.length === classCountEmptyCell) {
        if (rowCell === 0) {
            if (numberCell === 0) {
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            } else if (numberCell === difficult.playingFieldSize - 1) {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            } else {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            }
        } else if (rowCell === difficult.playingFieldSize - 1) {
            if (numberCell === 0) {
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            } else if (numberCell === difficult.playingFieldSize - 1) {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            } else {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            }
        } else {
            if (numberCell === 0) {
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
            } else if (numberCell === difficult.playingFieldSize - 1) {
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
            } else {
                if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
                }
                if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
                }
                if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
                }
                if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
                }
                if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
                    rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
                    openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
                }
            }
        }
    }
}

// Сохраняем статистику

let state: State[] = [];

const saveState = () => {
    const result = new State(time.innerText, clickCountPanel.clickCount, difficult.difficult, difficult.howNeedBombs);
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

const topicSelectionItem = new BaseComponent('div', ['topic-selection-item']).getComponent();
topicSelectionComponent.append(topicSelectionItem);

// Переключатель звука

const soundOn = new BaseComponent('div', ['sound-on']).getComponent();
footer.append(soundOn);

soundOn.addEventListener('click', () => {
    soundOn.classList.toggle('active');
});

// Создаю кнопку для показа статистики

const stateBtn = new BaseComponent('div', ['state-btn']).getComponent();
const stateBtnTitle = new BaseComponent('p', ['state-btn-title']).getComponent();
stateBtnTitle.innerText = 'Statistics';
stateBtn.append(stateBtnTitle);
footer.append(stateBtn);

function addClickHendlerOnStateBtn() {
    stateBtn.addEventListener('click', () => {
        stateWindow.toggleClassName('active');
        if (stateWindow.classes.includes('active')) {
            const stateTableContainerComponent = stateTableContainer.getComponent();
            stateTableContainerComponent.innerHTML = '';
            const closeState = document.createElement('div');
            closeState.classList.add('close-state');
            stateTableContainerComponent.append(closeState);
            closeState.addEventListener('click', () => {
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
                    rowItem.innerText = `${item[data]}`;
                }
            });
        }
    });
}

addClickHendlerOnStateBtn();

// Вешаю кликхэндлеры на кнопки Save и Continue

gameSaveBtn.addEventListener('click', () => {
    if (!layoutSavePlayingField.classes.includes('active')) {
        clearTimeout(t);
        layoutSavePlayingField.addClassName('active');
        setLocalStorage();
    }
});

gameContinueBtn.addEventListener('click', () => {
    if (layoutSavePlayingField.classes.includes('active')) {
        getLocalStorage();
        layoutSavePlayingField.removeClassName('active');
        if (clickCountPanel.clickCount !== 0) {
            gameTimer();
        }
    }
});

// Выбор темы

topicSelectionComponent.addEventListener('click', () => {
    topicSelection.toggleClassName('dark');
    changeTopic();
});

const body = document.body;

function changeTopic() {
    const otherWindowAndBtn = document.querySelectorAll('.timer, .refresh-btn, .refresh-btn, .game-save-btn, .game-continue-btn, .click-count-panel, .difficult, .topic-selection, .state-btn, .sound-on');
    const difficultButtons = difficult.difficultButtons;
    if (topicSelection.classes.includes('dark')) {
        body.classList.add('dark');
        otherWindowAndBtn.forEach(item => {
            item.classList.add('dark');
        });
        difficultButtons.forEach(item => {
            item.addClassName('dark');
        });
    } else {
        body.classList.remove('dark');
        otherWindowAndBtn.forEach(item => {
            item.classList.remove('dark');
        });
        difficultButtons.forEach(item => {
            item.removeClassName('dark');
        });
    }
}
