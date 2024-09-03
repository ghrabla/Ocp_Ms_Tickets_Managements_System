import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {TicketProvider} from './Context';
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TicketProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TicketProvider>
);

reportWebVitals();
