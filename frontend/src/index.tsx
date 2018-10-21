import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

const root = document.querySelector('#root');
ReactDOM.render(<Root/>, root);
registerServiceWorker();
