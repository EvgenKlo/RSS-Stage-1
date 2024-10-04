import {ThemeColor} from '../app/settings.ts';
import {settings} from '../index.ts';
import {DifficultSelect} from '../components/difficult-select/difficult-select.ts';

const body = document.body;

export function changeTopic(difficult: DifficultSelect) {
    const otherWindowAndBtn = document.querySelectorAll('.timer, .refresh-btn, .refresh-btn, .game-save-btn, .game-continue-btn, .click-count-panel, .difficult, .topic-selection, .state-btn, .sound-on');
    const difficultButtons = difficult.difficultButtons;
    if (settings.themeColor === ThemeColor.Dark) {
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