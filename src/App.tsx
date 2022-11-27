import './assets/css/App.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';

import { AuthGuard } from './contexts/Guard';
import { Signout } from './pages/auth/Signout';

export const App = () => {
  
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  return (
    <div className="App">
     

      <AuthContext.Provider value={{ token, setToken }}>
        <Header isLoggedIn={!!token === true} />

        <Routes>
          <Route path="/auth" element={<Signin />} />
          <Route path="/logout" element={<Signout />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<AuthGuard />} />
        </Routes>

      </AuthContext.Provider>
    </div>
  )
}
