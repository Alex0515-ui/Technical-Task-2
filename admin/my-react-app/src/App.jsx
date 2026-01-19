import { useState } from 'react'
import Admin from './Admin'
import Login from './Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Protect_admin from './Protect_admin'
function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}/>

            <Route path='/admin' element={
              <Protect_admin>
                <Admin/>
              </Protect_admin>
            }/>
            <Route path='/' element={<Login/>}/>
        </Routes>
        </BrowserRouter>
  )
}

export default App
