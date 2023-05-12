/******/ (() => { // webpackBootstrap
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let playingFieldSize = 10; // Размер игрового поля

let clickCount = 0; // Колличество кликов по игровому полю

let howNeedBobms = 10; // Сколько нужно бомб

// Добавляю класс body к body

const body = document.querySelector('body');
body.classList.add('body');

// Убираю стандартное поведение при нажатии на правую кнопку мыши

document.addEventListener('contextmenu', event => {
  event.preventDefault();
});

// Добавляю заголовок

const title = document.createElement('h1');
title.classList.add('title');
title.innerText = 'Minesweeper';
body.append(title);

// Добавляю панель управления

const controlPanel = document.createElement('div');
controlPanel.classList.add('control-panel');
body.append(controlPanel);

// Добавляю таймер

const timer = document.createElement('div');
timer.classList.add('timer');
const time = document.createElement('time');
time.innerText = 'Timer: 00:00';
controlPanel.append(timer);
timer.append(time);
let seconds = 0;
let minutes = 0;
let t;
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

const refreshBtn = document.createElement('div');
refreshBtn.classList.add('refresh-btn');
refreshBtn.innerText = 'Refresh';
controlPanel.append(refreshBtn);
refreshBtn.addEventListener('click', () => {
  refresh();
});
function refresh() {
  clearTimeout(t);
  seconds = 0;
  minutes = 0;
  time.innerText = 'Timer: 00:00';
  clickCount = 0;
  clickCounter();
  const playingField = document.querySelector('.playing-field');
  playingField.remove();
  createPlayingField(playingFieldSize);
  invisPlayingField();
  maybeBomb();
}

// Добавляем счетчик кликов

const clickCountPanel = document.createElement('div');
clickCountPanel.classList.add('click-count-panel');
clickCountPanel.innerText = `Steps: ${clickCount}`;
controlPanel.append(clickCountPanel);
function clickCounter() {
  clickCountPanel.innerText = `Steps: ${clickCount}`;
}

// Добавляю кнопки изменения уровня сложности

const difficult = document.createElement('div');
difficult.classList.add('difficult');
controlPanel.append(difficult);
const difficultTitle = document.createElement('p');
difficultTitle.classList.add('difficult-title');
difficultTitle.innerText = 'Difficult';
difficult.append(difficultTitle);
const difficultBtns = ['Easy', 'Medium', 'Hard'];
difficultBtns.forEach(btn => {
  const difficultBtn = document.createElement('div');
  difficultBtn.classList.add('difficult-dtn', `${btn}`);
  difficultBtn.innerText = `${btn}`;
  difficult.append(difficultBtn);
});

// Выбор сложности

function difficultCelect() {
  const difficultBtns = document.querySelectorAll('.difficult-dtn');
  difficultBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (btn.classList.contains('Easy')) {
        playingFieldSize = 10;
      } else if (btn.classList.contains('Medium')) {
        playingFieldSize = 15;
      } else if (btn.classList.contains('Hard')) {
        playingFieldSize = 25;
      }
      difficultBtns.forEach(btn => {
        btn.classList.remove('active');
      });
      btn.classList.add('active');
      refresh();
    });
  });
}
difficultCelect();

// Создаю игровое полеs

function createPlayingField(size) {
  const playingField = document.createElement('div');
  playingField.classList.add('playing-field', `playing-field-${size}`);
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList.add('row', `row-${i}`);
    for (let j = 0; j < size; j++) {
      const item = document.createElement('div');
      item.classList.add('item', `item-${j}`);
      row.append(item);
    }
    playingField.append(row);
  }
  body.append(playingField);
}
createPlayingField(playingFieldSize);

// Расставляю бомбы

function installBombs(count) {
  let randomRow = Math.floor(Math.random() * playingFieldSize);
  const rows = document.getElementsByClassName('row');
  let randomItem = Math.floor(Math.random() * playingFieldSize);
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
        } else if (numberCell === playingFieldSize - 1) {
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
      } else if (rowCell === playingFieldSize - 1) {
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
        } else if (numberCell === playingFieldSize - 1) {
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
        } else if (numberCell === playingFieldSize - 1) {
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

function addClickHandlerOnCells(item) {
  item.addEventListener('click', () => {
    if (clickCount === 0) {
      item.classList.add('no-bomb');
      item.classList.remove('close');
      clickCount++;
      installBombs(howNeedBobms);
      installSign();
      if (item.classList.length === 3) {
        openEmptyCells(item);
      }
    } else if (!item.classList.contains('maybeBomb')) {
      item.classList.remove('close');
      clickCount++;
      if (item.classList.contains('bomb')) {
        for (let item of items) {
          if (item.classList.contains('bomb')) {
            item.classList.remove('close');
          }
        }
        const playingField = document.querySelector('.playing-field');
        const layoutOnPlaingField = document.createElement('div');
        layoutOnPlaingField.classList.add('layout-on-plaing-field');
        layoutOnPlaingField.innerText = 'ПОТРАЧЕНО =(';
        playingField.append(layoutOnPlaingField);
        clearTimeout(t);
        seconds = 0;
        minutes = 0;
      } else if (item.classList.length === 2) {
        openEmptyCells(item);
      }
    }
    checkCellWithBomb();
    clickCounter();
  });
}

// Ставлю предположение о бомбе

const items = document.getElementsByClassName('item');
function maybeBomb() {
  for (let item of items) {
    item.addEventListener('contextmenu', event => {
      if (event.target.classList.contains('close') && !event.target.classList.contains('maybeBomb') && clickCount !== 0) {
        event.target.classList.add('maybeBomb');
      } else if (event.target.classList.contains('close') && event.target.classList.contains('maybeBomb') && clickCount !== 0) {
        event.target.classList.remove('maybeBomb');
      }
    });
  }
}
maybeBomb();

// Проверка, что не открытыми остались только ячеки с бомбами

function checkCellWithBomb() {
  const cells = document.querySelectorAll('.close');
  if (cells.length === howNeedBobms) {
    const playingField = document.querySelector('.playing-field');
    const layoutOnPlaingField = document.createElement('div');
    layoutOnPlaingField.classList.add('layout-on-plaing-field-win');
    layoutOnPlaingField.innerText = 'Congratulations!!!';
    playingField.append(layoutOnPlaingField);
    clearTimeout(t);
    seconds = 0;
    minutes = 0;
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
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        }
        ;
      } else if (numberCell === playingFieldSize - 1) {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        }
        ;
      } else {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        }
        ;
      }
      ;
    } else if (rowCell === playingFieldSize - 1) {
      if (numberCell === 0) {
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        }
        ;
      } else if (numberCell === playingFieldSize - 1) {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        }
        ;
      } else {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        }
        ;
      }
      ;
    } else {
      if (numberCell === 0) {
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        }
        ;
      } else if (numberCell === playingFieldSize - 1) {
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        }
        ;
      } else {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        }
        ;
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        }
        ;
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        }
        ;
      }
      ;
    }
    ;
  }
  ;
}
;
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=script.js.map