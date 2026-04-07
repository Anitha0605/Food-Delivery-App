import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx' // இதை இம்போர்ட் செய்யவும்

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider> {/* உங்கள் App-ஐ இப்படி உள்ளே வைக்கவும் */}
      <App />
    </StoreContextProvider>
  </BrowserRouter>
)