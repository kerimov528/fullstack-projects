import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import store from 'app/store'

setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

