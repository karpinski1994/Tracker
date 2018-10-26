import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

import '../src/services/persons.service';
import '../src/services/http.service';
import '../src/services/helper.service';
import '../src/services/utils.service';

import { diContainer } from '../src/di/DIContainer';
diContainer.initiate();


/*
if(loaded) {
  const root = document.querySelector('#root');
  ReactDOM.render(<Root/>, root);
  registerServiceWorker();
}

*/