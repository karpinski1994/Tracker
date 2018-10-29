import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root';
import { Test } from './components/Test';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

import { DIComponent } from '../src/di/DIComponent';

const root = document.querySelector('#root');
// ReactDOM.render(<Root/>, root);
ReactDOM.render(<DIComponent><Root/><Test /></DIComponent>, root);
registerServiceWorker();
