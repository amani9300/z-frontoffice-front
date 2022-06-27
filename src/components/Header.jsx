import React, { useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Container , Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


export default function Header() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();



  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    
    <>
      <Navbar bg="primary" variant="dark">
     
     <Container>
      
       <Nav className="me-auto">
       <Navbar.Brand>Stock</Navbar.Brand>
      
       {token === "" ? (
         <><Nav.Link className="navbar-nav mr-auto" href="/"> Connexion </Nav.Link>
         <Nav.Link className="navbar-nav mr-auto" href="/inscription">Inscription </Nav.Link>
        
      
      </>
     ) : (
       <>
        
        <Nav.Link className="navbar-nav mr-auto" href="/produit"> Produit </Nav.Link>
        <Nav.Link className="navbar-nav mr-auto" href="/listProduit"> Liste des Produits </Nav.Link>

        <NavLink className="navbar-nav mr-auto" to="/" onClick={logout}>
          Logout
          
        </ NavLink> 
  
      </>
      
     )}
    </Nav>
    </Container>
    </Navbar>
    </>
  );
}
