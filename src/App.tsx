// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
