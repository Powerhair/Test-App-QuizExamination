// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';

const App: React.FC = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
