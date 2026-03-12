import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';

import GetGitHubData from './js/github.jsx';
import Login from './js/login.jsx';
import Callback from './js/callback.jsx';
import Dashboard from './js/dashboard.jsx';
import DisplayCommits from './js/Pages/commits.jsx';
import DisplayRepositories from './js/Pages/repositories.jsx';
import DisplayTasks from './js/Pages/tasks.jsx';
import DisplayTime from './js/Pages/time.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/commits" element={<DisplayCommits />} />
        <Route path="/repositories" element={<DisplayRepositories />} />
        <Route path="/tasks" element={<DisplayTasks />} />
        <Route path="/time" element={<DisplayTime />} />
      </Routes>
    </Router>
  </StrictMode>
);