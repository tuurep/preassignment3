import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

const options = {
  // you can also just use 'top center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const AlertTemplate = ({ style, message }) => (
  <div style={style}>
    {message}
  </div>
)

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
