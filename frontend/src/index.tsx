import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root';
import './styles/style.scss';
import registerServiceWorker from './registerServiceWorker';

import '../src/services/persons.service';
import '../src/services/http.service';
import '../src/services/helper.service';
import '../src/services/utils.service';
import '../src/services/test.service';
import '../src/services/testtest.service';
// import '../src/services/circularA.service';
// import '../src/services/circularB.service';
// import '../src/services/circularC.service';

import { diContainer } from '../src/di/DIContainer';
let loaded = diContainer.initiate();

const instancesArr = diContainer.getInstances();
console.log(instancesArr)
instancesArr[5].updatePersons();

// if(loaded) {
//   const root = document.querySelector('#root');
//   ReactDOM.render(<Root/>, root);
//   registerServiceWorker();
// }