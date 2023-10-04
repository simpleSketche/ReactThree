import HomePage from './Pages/HomePage.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import ScenePage from './Pages/ScenePage.jsx'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';

import './App.css'

function App() {

  // const store = new Store();

  return (
    <div style={{height :'100vh'}}>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/menu' element={<MenuPage/>}/>
          <Route path='/scene/:ghFileName' element={<ScenePage/>}/>
        </Routes>
    </div>
    
  )
}

export default App
