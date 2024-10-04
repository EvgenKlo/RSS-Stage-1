import './style.scss';
import {appContainer} from './script';

// Убираю стандартное поведение при нажатии на правую кнопку мыши

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

const app = document.querySelector<HTMLDivElement>('#app')!;


function renderApp() {
    app.append(appContainer);
}

renderApp();
