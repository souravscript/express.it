import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { useState } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Login from './components/Login'

function App() {
  const[isLoggedIN,setIsLoggedIn]=useState(true)
  return (
    <div className="App">


      <BrowserRouter>
      {!isLoggedIN && <Login/> }
       {isLoggedIN && 
        <div className='main-container'>
          <Header/>
          <Body/>
        </div>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
