import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import Stock from "./pages/stock/Stock";
import Inscription from "./pages/inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import Produit from "./pages/produit/Produit";
import DetailProduit from "./pages/detailProduit/DetailProduit"
import ListProduit from "./pages/produit/Produit"
import AuthContext from "./AuthContext";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
 import Header from "./components/Header";



export default function App() {
    const initToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const [token, setToken] = useState(initToken);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Header/>

      <Routes>
       
        <Route path="/" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/produit" element={<Produit />} />
        <Route path="/produit/:id" element={<DetailProduit />} />
        <Route path="/listproduit" element={<ListProduit />} />

        
        
        
      </Routes>
    </AuthContext.Provider>
  )
}
