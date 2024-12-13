import React, {useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import Feed from './Feed'
import Users from './Users'
import Profile from './Profile'
import Login from './Login'


const Body = () => {
  return (
    <div className='body-container'>
      
      <Routes>
        <Route path='/' element={<Feed/>} />
        <Route path='/users' element={<Users/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='auth' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default Body
