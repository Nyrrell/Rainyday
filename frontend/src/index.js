import { PersistGate } from "redux-persist/integration/react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { store, persistor } from './reducers/store.js';
import App from './App';

const GlobalStyles = createGlobalStyle`
  html {
    --color-light: rgb(238, 238, 238);
    --color-dark: rgb(24, 26, 27);
    --color-dark-alt: rgb(47, 48, 49);
    --color-gray: rgb(54, 58, 61);
    --color-primary: rgb(78, 204, 163);
    --color-blue: rgb(26, 47, 75);
    --color-yellow: rgb(240, 165, 0);
    --container-size: 65vw;
  }
  
  a {
    text-decoration: none;
    color: inherit;
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