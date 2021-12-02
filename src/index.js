import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppStore from './AppStore';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';

ReactDOM.render(
    <Provider store={AppStore}>
      <AppRouter basename="/">
        <App />
      </AppRouter>
    </Provider>,
  document.getElementById('root')
);