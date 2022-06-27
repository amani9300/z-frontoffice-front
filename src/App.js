import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Inscription from "./pages/inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import Produit from "./pages/produit/Produit";
import DetailProduit from "./pages/detailProduit/DetailProduit"
import AuthContext from "./AuthContext";
import ListContext from"./pages/produit/ListProduit";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
 import Header from "./components/Header";



export default function App() {
    const initToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const [token, setToken] = useState(initToken);
  const [listProduit, setlistProduit] = useState([]);

  return (
  <ListContext.Provider value={{listProduit, setlistProduit}}>
    <AuthContext.Provider value={{ listProduit, setlistProduit }}>
      
      <Header/>

      <Routes>
       
        <Route path="/" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/produit" element={<Produit />} />
        <Route path="/produit/ListProduit" element={<ListProduit />} />

        <Route path="/produit/:id" element={<DetailProduit />} />

        
        
        
      </Routes>
      
    </AuthContext.Provider>
    </ListContext.Provider>
  )
}
