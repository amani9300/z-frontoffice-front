import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';

export const Signout = () => {

    const navigate = useNavigate();
    const { setToken } = React.useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem("token");
        setToken();
        navigate("/auth");
    });

    return (
        <></>
    )
}