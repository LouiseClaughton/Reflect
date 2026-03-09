import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';

import GetGitHubData from './js/github.jsx';
import Login from './js/login.jsx';
import Callback from './js/callback.jsx';
import Dashboard from './js/dashboard.jsx';
import DisplayCommits from './js/Pages/commits.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/commits" element={<DisplayCommits />} />
      </Routes>
    </Router>
  </StrictMode>
);