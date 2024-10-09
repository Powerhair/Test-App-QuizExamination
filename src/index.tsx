// src/index.tsx
import React from 'react';
import { createRoot } from "react-dom/client";

import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

const container = document.getElementById("root")!;
const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
