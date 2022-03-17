import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './App';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Urbanist', sans-serif;
  }

  html,
  body {
    height: 100%;

  }
  
  :root {
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
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

document.title = process.env.REACT_APP_NAME;

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyles/>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);