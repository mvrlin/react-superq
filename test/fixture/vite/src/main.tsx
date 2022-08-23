import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { MediaQueryManager, MediaQueryProvider } from '../../../../src'

new MediaQueryManager().usePreset('tailwind')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MediaQueryProvider>
      <App />
    </MediaQueryProvider>
  </React.StrictMode>,
)
