import './style.scss';
import {appContainer} from './script';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.append(appContainer);
