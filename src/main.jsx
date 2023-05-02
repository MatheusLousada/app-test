import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/navbar.sass';
import './styles/main.sass';
import './styles/footer.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);