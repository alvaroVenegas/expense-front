import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {

    families: ['Montserrat:300,400,700', 'sans-serif' ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

