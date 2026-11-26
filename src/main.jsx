import { createRoot } from 'react-dom/client'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/lora/600.css'
import './styles/global.css'
import App from './App.jsx'

// StrictMode is intentionally omitted: react-pageflip initialises a
// DOM-based engine in an effect and does not tolerate double-mounting.
createRoot(document.getElementById('root')).render(<App />)
