import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';

import App from './App';
import reducers from './redux/reducers';
import './sass/index.scss';

const composeEnhancers = compose;
const history = createBrowserHistory();
const app = document.getElementById('App');

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  app
);