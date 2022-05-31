import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.interceptors.request.use(
  (request) => {
console.log(request);
     return request;
  },
  (err) => {
     return Promise.reject(err);
  }
);


axios.interceptors.response.use(
  (response) => {
     // Add configurations here
     if (response.status === 201) {
        console.log('Posted Successfully');
     }
     console.log(response);
     return response;
  },
  (err) => {
     return Promise.reject(err);
  }
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
