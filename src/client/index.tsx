import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import 'windi.css';

const GlobalStyle = createGlobalStyle`
  body {
    padding-left: 0;
    padding-right: 0;
    height: 100vh;
    width: 100vw;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
);
