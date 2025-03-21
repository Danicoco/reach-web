import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'antd/dist/reset.css';
import './App.css'
import './AppCustom.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
