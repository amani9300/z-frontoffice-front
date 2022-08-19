import './assets/css/App.css';

import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';

import { AuthGuard } from './contexts/Guard';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
        {
          !!token === true ? <Header /> : null
        }

        <Routes>
          <Route path="/auth" element={<Signin />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="*" element={<AuthGuard />} />
        </Routes>

      </AuthContext.Provider>
    </div>
  )
}
