import HomePage from './Pages/HomePage.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import ScenePage from './Pages/ScenePage.jsx'
import { Routes, Route } from 'react-router-dom';
import { Canvas, useThree, extend } from '@react-three/fiber'

import './App.css'

function App() {

  return (
    <div style={{height :'100vh'}}>
      <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/menu' element={<MenuPage/>}/>
          <Route path='/scene' element={<ScenePage/>}/>
      </Routes>
    </div>
    
  )
}

export default App
