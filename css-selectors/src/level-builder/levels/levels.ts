import './style.scss';
import { ILevel } from '../../types/types';

export const levels: ILevel[] = [
  {
    levelNumber: 1,
    levelTitle: 'Сhoose right cube',
    items: ['cube', 'cube'],
    classes: [null, 'move'],
    answer: ['.right-cube'],
    markup: ['<cube class="left-cube" />', '<cube class="right-cube" />'],
    hints: ['<cube class="left-cube"></cube>', '<cube class="right-cube"></cube>']
  },
  {
    levelNumber: 2,
    levelTitle: 'Сhoose red big balls',
    items: ['ball', 'little-ball', 'ball'],
    classes: ['move', null, 'move'],
    answer: ['ball'],
    markup: ['<ball />', '<little-ball />', '<ball />'],
    hints: ['<ball></ball>', '<little-ball></little-ball>', '<ball></ball>']
  },
  {
    levelNumber: 3,
    levelTitle: 'Сhoose little cube',
    items: ['little-cube', 'cube', 'ball'],
    classes: ['move', null, null],
    answer: ['#little-cube'],
    markup: ['<cube id="little-cube" />', '<cube />', '<ball />'],
    hints: ['<cube id="little-cube></cube>', '<cube></cube>', '<ball></ball>']
  },
  {
    levelNumber: 4,
    levelTitle: 'Сhoose white cubes',
    items: ['ball', 'cube', 'cube'],
    classes: [null, 'move', 'move'],
    answer: ['cube'],
    markup: ['<ball />', '<cube />', '<cube />'],
    hints: ['<ball></ball>', '<cube></cube>', '<cube></cube>']
  },
  {
    levelNumber: 5,
    levelTitle: 'Сhoose white cubes and ball',
    items: ['ball', 'cube', 'cube', 'ball','ball'],
    classes: [null, 'move', 'move', 'move', null],
    answer: ['cube, .select-ball', '.select-ball, cube'],
    markup: ['<ball />', '<cube />', '<cube />', '<ball class="select-ball" />','<ball />'],
    hints: ['<ball></ball>', '<cube></cube>', '<cube></cube>', '<ball class="select-ball"></ball>', '<ball></ball>']
  },
  {
    levelNumber: 6,
    levelTitle: 'Сhoose pyramid',
    items: ['cube', 'pyramid', 'little-cube', 'pyramid','ball'],
    classes: [null, 'move', null, 'move', null],
    answer: ['pyramid'],
    markup: ['<cube />', '<pyramid />', '<little-cube />', '<pyramid />','<ball />'],
    hints: ['<cube></cube>', '<pyramid></pyramid>', '<little-cube></little-cube>', '<pyramid></pyramid>', '<ball></ball>']
  },
  {
    levelNumber: 7,
    levelTitle: 'Сhoose balls',
    items: ['pyramid', 'little-ball', 'pyramid', 'little-cube','ball'],
    classes: [null, 'move', null, null, 'move'],
    answer: ['.ball'],
    markup: ['<pyramid />', '<little-ball class="ball" />', '<pyramid />', '<little-cube />','<ball class="ball" />'],
    hints: ['<pyramid></pyramid>', '<little-ball class="ball"></little-ball>', '<pyramid></pyramid>', '<little-cube></little-cube>', '<ball class="ball"></ball>']
  },
  {
    levelNumber: 8,
    levelTitle: 'Сhoose pyramids and balls',
    items: ['pyramid', 'little-cube', 'little-ball', 'pyramid','ball'],
    classes: ['move', null, 'move', 'move', 'move'],
    answer: ['pyramid, .ball', '.ball, pyramid'],
    markup: ['<pyramid />', '<little-cube />', '<little-ball class="ball" />', '<pyramid />','<ball class="ball" />'],
    hints: ['<pyramid></pyramid>', '<little-cube></little-cube>', '<little-ball class="ball"></little-ball>', '<pyramid></pyramid>', '<ball class="ball"></ball>']
  },
  {
    levelNumber: 9,
    levelTitle: 'Сhoose pyramid and little cube',
    items: ['little-ball', 'pyramid', 'ball', 'pyramid','little-cube'],
    classes: [null, null, null, 'move', 'move'],
    answer: ['pyramid:nth-child(2), little-cube', 'little-cube, pyramid:nth-child(2)'],
    markup: ['<little-ball />', '<pyramid />', '<ball />', '<pyramid />','<little-cube />'],
    hints: ['<little-ball></little-ball>', '<pyramid></pyramid>', '<ball></ball>', '<pyramid></pyramid>', '<little-cube></little-cube>']
  },
  {
    levelNumber: 10,
    levelTitle: 'Сhoose pyramids and little cube',
    items: ['pyramid', 'little-ball', 'pyramid', 'little-cube','ball'],
    classes: ['move', null, 'move', 'move', null],
    answer: ['pyramid, little-cube', 'little-cube, pyramid'],
    markup: ['<pyramid />', '<little-ball />', '<pyramid />', '<little-cube />','<ball />'],
    hints: ['<pyramid></pyramid>', '<little-ball></little-ball>', '<pyramid></pyramid>', '<little-cube></little-cube>', '<ball></ball>']
  }
]
