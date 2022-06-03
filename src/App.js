import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Stock from "./pages/stock/Stock";
import Inscription from "./pages/inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import Navbar from "./components/Navbar";
import AuthContext from "./AuthContext";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function App() {
    const initToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const [token, setToken] = useState(initToken);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Navbar />
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/" element={<Stock />} />
        
        
      </Routes>
    </AuthContext.Provider>
  )
}
