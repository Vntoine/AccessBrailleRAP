import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Modal from 'react-modal'

require('purecss')

ReactDOM.render(<App />, document.getElementById('root'));
Modal.setAppElement(document.getElementById('root'));
registerServiceWorker();
