import {State} from './State';
import {DifficultSelect} from './components/difficult-select/difficult-select.ts';
import {BaseComponent} from './components/base-component.ts';
import {BombsCount, DifficultLevel, Settings, ThemeColor} from './app/settings.ts';
import {GameState} from './app/game-state.ts';
import {ClickCountPanel} from './components/click-count-panel/click-count-panel.ts';
import {createPlayingField} from './utils/create-playing-field.ts';
import {changeTopic} from './utils/change-topic.ts';
import {Timer} from "./app/timer.ts";
import {clickHandlerOnStateBtn} from "./utils/click-handler-on-state-button.ts";

const time = new BaseComponent('div').getComponent();
time.innerText = 'Timer: 00:00';

export const settings = Settings.getInstance(DifficultLevel.Easy, ThemeColor.Light, true);
export const gameState = GameState.getInstance();
export const gameTimer = Timer.getInstance(time)

export const appContainer = new BaseComponent('div', ['appContainer']).getComponent();

// Переключатель звука

export const soundOn = new BaseComponent('div', ['sound-on']).getComponent();

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
controlPanel.append(timer);
timer.append(time);

// Добавляю кнопку Refresh

const refreshBtn = new BaseComponent('div', ['refresh-btn']).getComponent();
refreshBtn.innerText = 'New Game';
controlPanel.append(refreshBtn);
refreshBtn.addEventListener('click', refresh);

function refresh() {
    selectBombsCountBlur.removeClassName('active');
    gameTimer.resetTimer();
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

export const clickCountPanel = new ClickCountPanel('div', ['click-count-panel']);
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

export const selectBombsCountBlur = new BaseComponent('div', ['select-bombs-count-blur']);
const selectBombsCountBlurComponent = selectBombsCountBlur.getComponent();
selectBombsCount.append(selectBombsCountBlurComponent);

// Добавляю кнопки изменения уровня сложности в DOM

controlPanel.append(difficultComponent);

// Создаю игровое поле

const fieldContainer = new BaseComponent('div', ['fieldContainer']).getComponent();
appContainer.append(fieldContainer);

export const {playingField, stateTableContainer, stateWindow, layoutSavePlayingField} = createPlayingField(soundOn);

fieldContainer.append(playingField.getComponent());

// Сохраняем статистику

export let state: State[] = [];

export const saveState = () => {
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

// Вешаю кликхэндлеры на кнопки Save и Continue

gameSaveBtn.addEventListener('click', () => {
    if (!layoutSavePlayingField.classes.includes('active')) {
        gameTimer.stopTimer();
        layoutSavePlayingField.addClassName('active');
        // setLocalStorage();
    }
});

gameContinueBtn.addEventListener('click', () => {
    if (layoutSavePlayingField.classes.includes('active')) {
        // getLocalStorage();
        layoutSavePlayingField.removeClassName('active');
        if (gameState.steps !== 0) {
            gameTimer.tick();
        }
    }
});
