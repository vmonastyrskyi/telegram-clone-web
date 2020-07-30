import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';

import './index.css';
import {App} from './App';
import {rootReducer} from "./redux/rootReducer";
import {BrowserRouter} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();