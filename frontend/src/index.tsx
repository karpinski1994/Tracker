import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import './styles/style.scss';

const root = document.querySelector('#root');

ReactDOM.render(<App name="Tracker App"/>, root);