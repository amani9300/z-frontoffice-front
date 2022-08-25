import './assets/css/App.css';

import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import AppBar from "@material-ui/core/AppBar";
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { InputBase } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { AuthGuard } from './contexts/Guard';
import { Box } from '@mui/material';
import { Signout } from './pages/auth/Signout';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      {/* <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}          >
            Centimoo
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="navbar">
            {['Contact', 'Products', 'Logout'].map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar> */}

      <AuthContext.Provider value={{ token, setToken }}>
        <Header isLoggedIn={!!token === true} />

        <Routes>
          <Route path="/auth" element={<Signin />} />
          <Route path="/logout" element={<Signout />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="*" element={<AuthGuard />} />
        </Routes>

      </AuthContext.Provider>
    </div>
  )
}
