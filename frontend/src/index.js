import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { store, persistor } from './redux/store.js';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
      <App/>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
;