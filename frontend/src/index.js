import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { store, persistor } from './redux/store.js';
import App from './App';

const GlobalStyles = createGlobalStyle`
  html {
    --color-light: rgb(238, 238, 238);
    --color-dark: #181a1b;
    --color-dark-alt: #2f3031;
    --color-gray: #363a3d;
    --color-primary: rgb(78, 204, 163);
    --color-blue: #1A2F4B;
    --color-yellow: rgb(240, 165, 0);
    --container-size: 65vw;
  }

  #root {
    background-color: var(--color-dark);
    color: var(--color-light);
  }
`;

document.title = process.env.REACT_APP_NAME;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles/>
        <App/>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
;