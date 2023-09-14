import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))

/**
 * Initiate React App
 */
root.render(
    <div>
        <App>
            <h1>APP TITLE</h1>
            <h2>APP subTITLE</h2>
        </App>
    </div>
    
)