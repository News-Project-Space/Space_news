import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from "react-cookie"; // استيراد CookiesProvider

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider> {/* تغليف التطبيق بـ CookiesProvider */}
      <App />
    </CookiesProvider>
  </StrictMode>,
)
