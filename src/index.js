import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/assets/styles/Botones.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
