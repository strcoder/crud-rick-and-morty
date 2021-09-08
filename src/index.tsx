import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import App from './App';
import reducers from './redux/reducers';
import './sass/index.scss';

const app = document.getElementById('App');
const history = createBrowserHistory();

const store = createStore(
  reducers,
  {},
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  app
);