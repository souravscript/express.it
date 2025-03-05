import './App.css';
import Body from './components/Body';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  //const location = useLocation();
 // const isAuthPage = window.location.pathname === '/auth';

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter> 
        <div className='main-container'>
          <Routes>
            <Route path='/auth' element={<Login />} />
          </Routes>
          <ProtectedRoute><Body /></ProtectedRoute>
        </div>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
