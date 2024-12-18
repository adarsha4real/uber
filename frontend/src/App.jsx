import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import UserLogin from './pages/userLogin'
import UserSignup from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'

function App() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captainLogin' element={<CaptainLogin/>}/>
        <Route path='/captainSignup' element={<CaptainSignup/>}/>
        

        </Routes>
      </div>
  )
}

export default App