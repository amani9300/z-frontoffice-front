import './assets/css/App.css';

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import Signup from './pages/auth/signup';
import Signin from './pages/auth/signin';
import NotFoundPage from './pages/NotFound';
import ProductList from './pages/product/productList';

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
          {/* <Route path="/produit" element={<Produit />} /> */}
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/produits/:id" element={<DetailProduit />} /> */}
          <Route path="*" component={NotFoundPage} />
        </Routes>

      </AuthContext.Provider>
    </div>
  )
}
