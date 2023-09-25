import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'

export default function Index() {
  return (
    <Routes>
        <Route path='signup' element={<SignUp/>}/>
    </Routes>
  )
}
