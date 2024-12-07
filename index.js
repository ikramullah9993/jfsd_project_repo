import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root using createRoot

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
