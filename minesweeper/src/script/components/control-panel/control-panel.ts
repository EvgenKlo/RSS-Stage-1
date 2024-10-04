import {BaseComponent} from '../base-component.ts';

export function createControlPanel() {
    return new BaseComponent('div', ['control-panel']);
}