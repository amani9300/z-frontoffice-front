import './assets/css/App.css';

import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography } from '@material-ui/core';
import { InputBase } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { AuthGuard } from './contexts/Guard';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <InputBase placeholder="Search topics" startAdornment={<SearchIcon fontSize="small" />} />
          <Typography variant="h6">
            Centimoo Stock Management
          </Typography>
        </Toolbar>
      </AppBar>

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
