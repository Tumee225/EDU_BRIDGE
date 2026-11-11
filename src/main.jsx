import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppErrorBoundary } from './ui.jsx';
import '../style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary locale="mn">
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);