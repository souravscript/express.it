import React, {} from 'react'
import {Routes,Route} from 'react-router-dom'
import Feed from './Feed'
import Users from './Users'
import Profile from './Profile'
import Header from './Header'


const Body = () => {
  return (
    <div className='body-container'>
      <Header/>
      <Routes>
        <Route path='/' element={<Feed/>} />
        <Route path='/users' element={<Users/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default Body
