import {BaseComponent} from "../components/base-component.ts";
import {state, stateTableContainer, stateWindow} from "../index.ts";
import {StateKeys} from "../State.ts";

export function clickHandlerOnStateBtn() {
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
            for (const data in item) {
                const rowItem = new BaseComponent('td', ['table-row', `table-row-${data}`]).getComponent();
                tableRow.append(rowItem);
                rowItem.innerText = `${item.getProperty(data as StateKeys)}`;
            }
        });
    }
}