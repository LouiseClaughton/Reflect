import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';

import GetGitHubData from './services/github.jsx';
import Login from './services/login.jsx';
import Callback from './services/callback.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<GetGitHubData />} />
      </Routes>
    </Router>
  </StrictMode>
);