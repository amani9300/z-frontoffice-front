import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Connexion from './pages/connexion/Connexion';
import DetailProduit from './pages/detailProduit/DetailProduit';
import Inscription from './pages/inscription/Inscription';
import ListProduit from './pages/produit/ListProduit';
import Produit from './pages/produit/Produit';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
   <div className="App"> 

      
    
      <AuthContext.Provider value={{ token, setToken }}>
        <Header />

        <Routes>
          <Route path="/auth" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/produit/ListProduit" element={<ListProduit  />} />
          <Route path="/produit/:id" element={<DetailProduit />} />
        </Routes>

      </AuthContext.Provider>
    </div>
  )
}
