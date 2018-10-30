import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root';
import { Test } from './components/Test';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

import './services/persons.service';
import './services/http.service';
import './services/helper.service';
import './services/utils.service';
import './services/test.service';
import './services/testtest.service';

import { diContainer } from '../src/di/DIContainer';
diContainer.initiate();

const root = document.querySelector('#root');
// ReactDOM.render(<Root/>, root);
ReactDOM.render(<div><Root/><Test /></div>, root);
registerServiceWorker();
