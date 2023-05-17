import State from "./script/State";

// Сохранение статистики в Local Storage

function setLocalStorage() {
  const saveStateInLS = JSON.stringify(state);
  localStorage.setItem('resultsYourLastGame', saveStateInLS);
  localStorage.setItem('field', fieldContainer.innerHTML);

  localStorage.setItem('time-seconds', seconds);
  localStorage.setItem('time-minutes', minutes);
  localStorage.setItem('timer-value', time.innerText);
  localStorage.setItem('steps', clickCount);
  localStorage.setItem('flags-count', checkedBombsCount.innerText);
  localStorage.setItem('how-need-boms', howNeedBobms);
  localStorage.setItem('difficult-slider', selectBombsCountBlur.classList);
  localStorage.setItem('playing-field-size', playingFieldSize);
  const getDifficult = () => {
    const difficultBtns = document.querySelectorAll('.difficult-dtn');
    let btnText = '';
    difficultBtns.forEach(btn => {
      if (btn.classList.contains('active')) {
        btnText = btn.innerText;
      }
    })
    return btnText;
  };
  localStorage.setItem('difficult', getDifficult());
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
    playingFieldSize = localStorage.getItem('playing-field-size');
  }
  if (localStorage.getItem('steps')) {
    clickCount = localStorage.getItem('steps') * 1;
    clickCountPanel.innerText = `Steps: ${clickCount}`;
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      addClickHandlerOnCells(item);
    })
  }
  if (localStorage.getItem('time-seconds') || localStorage.getItem('time-minutes')) {
    seconds = localStorage.getItem('time-seconds') * 1;
    minutes = localStorage.getItem('time-minutes') * 1;
    if(seconds > 0 || minutes > 0)
    gameTimer();
  }
  if (localStorage.getItem('timer-value')){
    time.innerText = localStorage.getItem('timer-value');
  }
  if (localStorage.getItem('flags-count')){
    checkedBombsCount.innerText = localStorage.getItem('flags-count');
  }
  if (localStorage.getItem('how-need-boms')) {
    howNeedBobms = localStorage.getItem('how-need-boms');
  }
  if (localStorage.getItem('difficult')) {
    const savedifficult = localStorage.getItem('difficult');
    const difficultBtns = document.querySelectorAll('.difficult-dtn');
    difficultBtns.forEach(btn => {
      btn.classList.remove('active');
    })
    difficultBtns.forEach(btn => {
      if (btn.classList.contains(savedifficult)) {
        btn.classList.add('active');
      }
    })
    selectSlider.style.left = `${coefficient * howNeedBobms}px`;
    sliderPosition = window.getComputedStyle(selectSlider).left.replace('px', '') * 1;
  }
  if (localStorage.getItem('difficult-slider')) {
    selectBombsCountBlur.classList = localStorage.getItem('difficult-slider');
  }
  maybeBomb();
}
window.addEventListener('load', getLocalStorage);

let playingFieldSize = 10; // Размер игрового поля

let clickCount = 0; // Колличество кликов по игровому полю

let howNeedBobms = 10; // Сколько нужно бомб

// Добавляю класс body к body

const body = document.querySelector('body');
body.classList.add('body');

// Убираю стандартное поведение при нажатии на правую кнопку мыши

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
})

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

function gameTimer () {
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
refreshBtn.innerText = 'New Game';
controlPanel.append(refreshBtn);
refreshBtn.addEventListener('click', () => {
  refresh();
})

function refresh () {
  selectBombsCountBlur.classList.remove('active');
  clearTimeout(t);
  seconds = 0;
  minutes = 0;
  time.innerText = 'Timer: 00:00';
  checkedBombsCount.innerText = `x ${howNeedBobms}`;
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

function clickCounter () {
  clickCountPanel.innerText = `Steps: ${clickCount}`;
}

// Добавляю счетчик отмеченных бомб

const checkedBombs = document.createElement('div');
checkedBombs.classList.add('checked-bombs');
const bombImg = document.createElement('div');
bombImg.classList.add('bomb-img');
controlPanel.append(checkedBombs);
checkedBombs.append(bombImg);
const checkedBombsCount = document.createElement('div');
checkedBombsCount.classList.add('checked-bombs-count');
checkedBombs.append(checkedBombsCount);
checkedBombsCount.innerText = `x ${howNeedBobms}`;

function howManyBombsAreLeft (bombsCount) {
  const flagsCount = document.querySelectorAll('.maybeBomb').length;
  checkedBombsCount.innerText = `x ${bombsCount - flagsCount}`;
}

//Добавляю выбор колличества бомб

const selectBombsCount = document.createElement('div');
selectBombsCount.classList.add('select-bombs-count');
checkedBombs.append(selectBombsCount);

const selectLine = document.createElement('div');
selectLine.classList.add('select-line');
selectBombsCount.append(selectLine);

const selectSlider = document.createElement('div');
selectSlider.classList.add('select-slider');
selectBombsCount.append(selectSlider);

const selectBombsCountBlur = document.createElement('div');
selectBombsCountBlur.classList.add('select-bombs-count-blur');
selectBombsCount.append(selectBombsCountBlur);

const widthSelectLine = window.getComputedStyle(selectLine).width.replace('px', '') * 1; // Ширина полоски выбора колличества бомб
const widthSlider = window.getComputedStyle(selectSlider).width.replace('px', '') * 1; // Ширина ползунка выбора колличества бомб

let layerX;
let clientX;
let crossX;
const coefficient = (widthSelectLine - widthSlider) / 99;

selectSlider.style.left = `${coefficient * 10}px`;

let sliderPosition = window.getComputedStyle(selectSlider).left.replace('px', '') * 1;

const moveSelectSlider = (event) => {
  clientX = event.clientX;
  layerX = event.layerX;
  selectSlider.classList.add('active');
  selectSlider.addEventListener('mousemove', moveSlider);
}

const choosNumberBombs = () => {
  selectSlider.classList.remove('active');
  selectSlider.removeEventListener('mousemove', moveSlider);
}

const moveSlider = (event) => {
  crossX = event.clientX - clientX;
  clientX = event.clientX;
  if (sliderPosition + crossX > coefficient * 10 - 1 && sliderPosition + crossX < widthSelectLine - widthSlider + 1) {
    event.target.style.left = `${sliderPosition + crossX}px`;
    sliderPosition = window.getComputedStyle(selectSlider).left.replace('px', '') * 1;
    const intBombs = Math.round(sliderPosition / coefficient);
    if(intBombs > 9) {
      howNeedBobms = intBombs;
      checkedBombsCount.innerText = `x ${howNeedBobms}`;
    }
  } else {
    selectSlider.classList.remove('active');
    selectSlider.removeEventListener('mousemove', moveSlider);
  }
}

selectSlider.addEventListener('mousedown', moveSelectSlider);
selectSlider.addEventListener('mouseup', choosNumberBombs);

// Добавляю кнопки изменения уровня сложности

const difficult = document.createElement('div');
difficult.classList.add('difficult');
controlPanel.append(difficult);
const difficultTitle = document.createElement('p');
difficultTitle.classList.add('difficult-title')
difficultTitle.innerText = 'Difficult';
difficult.append(difficultTitle);
const difficultBtns = ['Easy', 'Medium', 'Hard'];
difficultBtns.forEach(btn => {
  const difficultBtn = document.createElement('div');
  difficultBtn.classList.add('difficult-dtn', `${btn}`);
  if (btn === 'Easy' && clickCount === 0) {
    difficultBtn.classList.add('active');
  }
  difficultBtn.innerText = `${btn}`;
  difficult.append(difficultBtn);
})

// Выбор сложности

function difficultCelect () {
  const difficultBtns = document.querySelectorAll('.difficult-dtn');
  difficultBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (btn.classList.contains('Easy')) {
        playingFieldSize = 10;
        howNeedBobms = 10;
      } else if (btn.classList.contains('Medium')) {
        playingFieldSize = 15;
        howNeedBobms = 42;
      } else if (btn.classList.contains('Hard')) {
        playingFieldSize = 25;
        howNeedBobms = 99;
      }
      selectSlider.style.left = `${coefficient * howNeedBobms}px`;
      sliderPosition = window.getComputedStyle(selectSlider).left.replace('px', '') * 1;
      difficultBtns.forEach(btn => {
        btn.classList.remove('active');
      })
      btn.classList.add('active');
      refresh();
    })
  })
}

difficultCelect();

// Создаю игровое поле

const fieldContainer = document.createElement('div');
fieldContainer.classList.add('field-container');
body.append(fieldContainer);

function createPlayingField (size) {
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
  fieldContainer.append(playingField);

  const stateWindow = document.createElement('div');
  stateWindow.classList.add('state-window');
  playingField.append(stateWindow);

  const stateTableContainer = document.createElement('div');
  stateTableContainer.classList.add('state-table-container');
  stateWindow.append(stateTableContainer);
}

createPlayingField(playingFieldSize);

// Расставляю бомбы

function installBombs (count) {
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

function installSign () {
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
  })
  gameTimer();
}

// Скрываю игровое поле

function invisPlayingField () {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.classList.add('close');
    addClickHandlerOnCells(item);
  })
}

invisPlayingField();

// Добавляю кликхендлеры на ячейки поля

function addClickHandlerOnCells (item) {
  item.addEventListener('click', () => {
    if (clickCount === 0) {
      selectBombsCountBlur.classList.add('active'); 
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
        layoutOnPlaingField.innerText = 'ПОТРАЧЕНО =('
        playingField.append(layoutOnPlaingField);
        clearTimeout(t);
        seconds = 0;
        minutes = 0;
        saveState(layoutOnPlaingField.classList[0]);
      } else if (item.classList.length === 2) {
        openEmptyCells(item);
      }
    }
    checkCellWithBomb();
    clickCounter();
  })
}

// Ставлю предположение о бомбе

const items = document.getElementsByClassName('item');

function maybeBomb () {
  for (let item of items) {
    item.addEventListener('contextmenu', (event) => {
      if (event.target.classList.contains('close') && !event.target.classList.contains('maybeBomb') && clickCount !== 0) {
        event.target.classList.add('maybeBomb');
      } else if (event.target.classList.contains('close') && event.target.classList.contains('maybeBomb') && clickCount !== 0) {
        event.target.classList.remove('maybeBomb');
      };
      howManyBombsAreLeft(howNeedBobms);
    })
  }
}

maybeBomb();

// Проверка, что не открытыми остались только ячеки с бомбами

function checkCellWithBomb () {
  const cells = document.querySelectorAll('.close');
  if (cells.length === howNeedBobms) {
    const playingField = document.querySelector('.playing-field');
    const layoutOnPlaingField = document.createElement('div');
    layoutOnPlaingField.classList.add('layout-on-plaing-field-win');
    layoutOnPlaingField.innerText = 'Congratulations!!!'
    playingField.append(layoutOnPlaingField);
    clearTimeout(t);
    seconds = 0;
    minutes = 0;
    saveState(layoutOnPlaingField.classList[0]);
  }
}

// Раскрываю часть поля при клике на пустую ячейку

function openEmptyCells (cell) {
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
        };
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        };
      } else if (numberCell === playingFieldSize - 1) {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        };
      } else {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        };
      };
    } else if (rowCell === playingFieldSize - 1) {
      if (numberCell === 0) {
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        };
      } else if (numberCell === playingFieldSize - 1) {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        };
      } else {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        };
      };
    } else {
      if (numberCell === 0) {
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        };
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        };
      } else if (numberCell === playingFieldSize - 1) {
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        };
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        };
      } else {
        if (rows[rowCell].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell - 1]);
        };
        if (rows[rowCell + 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell]);
        };
        if (rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell + 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell + 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell + 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell + 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell + 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell + 1]);
        };
        if (rows[rowCell - 1].childNodes[numberCell].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell]);
        };
        if (rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('close') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('bomb') && !rows[rowCell - 1].childNodes[numberCell - 1].classList.contains('maybeBomb')) {
          rows[rowCell - 1].childNodes[numberCell - 1].classList.remove('close');
          openEmptyCells(rows[rowCell - 1].childNodes[numberCell - 1]);
        };
      };
    };
  };
};

// Сохраняем статистику

let state = [];

const saveState = (layoutClass) => {
  const difficult = document.querySelector('.difficult-dtn.active');
  const result = new State (time.innerText, clickCount, difficult.innerText, howNeedBobms, layoutClass);
  if (state.length === 10) {
    state.unshift(result);
    state.pop();
  } else {
    state.unshift(result);
  }
}

// Создаю кнопку для показа статистики

const stateBtn = document.createElement('div');
stateBtn.classList.add('state-btn');
const stateBtnTitle = document.createElement('p');
stateBtnTitle.classList.add('state-btn-title');
stateBtnTitle.innerText = 'Statistics'
stateBtn.append(stateBtnTitle);
body.append(stateBtn);

function addClickHendlerOnStateBtn () {
  stateBtn.addEventListener('click', () => {
    const stateWindow = document.querySelector('.state-window');
    stateWindow.classList.toggle('active');
    if (stateWindow.classList.contains('active')) {
      const stateTableContainer = document.querySelector('.state-table-container');
      stateTableContainer.innerHTML = '';
      const tableTittle = document.createElement('h2');
      tableTittle.classList.add('table-tittle');
      tableTittle.innerText = 'Statistics last 10 games'
      stateTableContainer.append(tableTittle);
      const table = document.createElement('table');
      table.classList.add('table');
      stateTableContainer.append(table);
      const tableTittleName = ['№', 'Time', 'Steps', 'Difficult', 'Bombs', 'Result'];
      tableTittleName.forEach(item => {
        const headerName = document.createElement('th');
        headerName.classList.add('header-name', `header-${item}`);
        headerName.innerText = `${item}`;
        table.append(headerName);
      })
      let numberItemInArray = 1;
      state.forEach(item => {
        const tableRow = document.createElement('tr');
        tableRow.classList.add('table-item');
        table.append(tableRow);
        const rowItem = document.createElement('td');
        rowItem.classList.add('table-row', 'table-row-№');
        tableRow.append(rowItem);
        rowItem.innerText = `${numberItemInArray}`;
        numberItemInArray++;
        for (let data in item) {
          const rowItem = document.createElement('td');
          rowItem.classList.add('table-row', `table-row-${data}`);
          tableRow.append(rowItem);
          rowItem.innerText = `${item[data]}`;
        }
      })
    }
  })
}

addClickHendlerOnStateBtn();
