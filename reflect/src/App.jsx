import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './js/dashboard'
import DisplayCommits from './js/Pages/commits'

<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/callback" element={<Callback />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/commits" element={<DisplayCommits />} />
</Routes>