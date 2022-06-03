import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Container } from 'react-bootstrap';


export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Container>
      <NavLink to="/"> Stock </NavLink>
      {token === "" ? (
        <>
          <NavLink to="/connexion"> Connexion </NavLink>
          <NavLink to="/inscription"> Inscription </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </>
      )}
    </Container>
  );
}
