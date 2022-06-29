import React, { useContext } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function Header() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand>Stock</Navbar.Brand>

            {!!token === false ? (
              <><Nav.Link className="navbar-nav mr-auto" href="/auth"> Connexion </Nav.Link>
                <Nav.Link className="navbar-nav mr-auto" href="/inscription">Inscription </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="navbar-nav mr-auto" href="/produit"> Produit </Nav.Link>
                <Nav.Link className="navbar-nav mr-auto" href="/produit/listProduit"> Liste des Produits </Nav.Link>
                <Nav.Link className="navbar-nav mr-auto" to="/" onClick={logout}>Logout</ Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
