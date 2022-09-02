import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ProductList from '../pages/product/ProductList';
import AuthContext from './AuthContext';

export const AuthGuard = () => {

    const { token, setToken } = React.useContext(AuthContext);

    if (!token) return <Navigate to='/auth' replace />

    return (
        <Routes>
            {/* <Route path="/produit" element={<Produit />} /> */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/" element={<Navigate to='/products' />} />
            {/* <Route path="/produits/:id" element={<DetailProduit />} /> */}
        </Routes>
    )
}