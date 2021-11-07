import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/Client';


const accessToken = storage.get('token');
setAuthorizationHeader(accessToken);

ReactDOM.render(
  <React.StrictMode>
    <App isInitiallyLogged={!! accessToken}/>
  </React.StrictMode>,
  document.getElementById('root')
);
