import * as React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {HashRouter } from "react-router-dom" 
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const root = createRoot(document.getElementById('root'))

root.render(
  <>
    <StyledEngineProvider injectFirst>
      <HashRouter >
       <App/>
      </HashRouter >
    </StyledEngineProvider>
      
  </>
)
