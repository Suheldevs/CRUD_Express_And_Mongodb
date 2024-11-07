
import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import FormHook from './Components/FormHook'
import Dashboard2 from './Components/Dashboard2'

function App() {
  

  return (
   <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard2' element={<Dashboard2/>}/>
      <Route path='/formhook' element={<FormHook/>}/>
    </Routes>
   </Router>
  )
}

export default App
