import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
   </Router>
  )
}

export default App
