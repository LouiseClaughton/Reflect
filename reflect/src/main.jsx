import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import GetGitHubData from './services/github.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GetGitHubData />
    <h1 className="text-blue-500">Hello World</h1>
  </StrictMode>,
)