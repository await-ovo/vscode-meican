import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

const GlobalStyle = createGlobalStyle`
  body {
    padding-left: 0;
    padding-right: 0;
    height: 100vh;
    width: 100vw;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
);
