import './App.css';
import Body from './components/Body';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  //const location = useLocation();
  const isAuthPage = window.location.pathname === '/auth';

  return (
    <div className="App">
      <BrowserRouter> 
        <div className='main-container'>
          <Routes>
            <Route path='/auth' element={<Login />} />
          </Routes>
          {!isAuthPage && <Body />}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
