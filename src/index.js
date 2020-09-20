import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://em-cooper-api.herokuapp.com/api/v1/";
} else {
  apiUrl = "http://localhost:3000/api/v1";
}
axios.defaults.baseURL = apiUrl;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
