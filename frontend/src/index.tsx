import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

import '../src/services/persons.service';
import '../src/services/http.service';

import { diContainer } from '../src/di/DIContainer';
const instances = diContainer.initiate();

// console.log(instances)

const root = document.querySelector('#root');
ReactDOM.render(<Root/>, root);
registerServiceWorker();
