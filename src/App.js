import './assets/css/App.css';

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Inscription from './pages/auth/signup';
import Connexion from './pages/auth/signin';
import NotFoundPage from './pages/NotFound';
import ListProduit from './pages/product/productList';
import DetailProduit from './pages/productDetails';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
        {
         !!token === true ? <Header /> : null 
        }

        <Routes>
          <Route path="/auth" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          {/* <Route path="/produit" element={<Produit />} /> */}
          <Route path="/" element={<ListProduit />} />
          <Route path="/products" element={<ListProduit />} />
          <Route path="/produits/:id" element={<DetailProduit />} />
          <Route path="*" component={NotFoundPage} />
        </Routes>

      </AuthContext.Provider>
    </div>
  )
}
