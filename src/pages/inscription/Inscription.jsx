import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';

export default function Inscription() {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { nom, prenom, email, password };
    axios
      .post("/api/user/register", user)
      .then((res) => navigate("/connexion"))
      .catch((err) => console.log(err.response));
  };

  return (
    <Container className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
      <div className="Auth-form-content">
      <h3 className="Auth-form-title">Inscription</h3>
      <div className="form-group mt-3">
      <label> Nom </label>
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Entrez votre nom"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
        </div>
        <div className="form-group mt-3">
        <label> Prénom </label>
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Entrez votre prénom"
          value={prenom}
          onChange={(e) => setprenom(e.target.value)}
        />
        </div>
        <label>Email address</label>
        <input
          type="email"
          className="form-control mt-1"
          placeholder="Entrez votre Adresse Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <div className="form-group mt-3">
          <label>Mot de passe</label>
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        </div>
        <div className="d-grid gap-2 mt-3">
        <Button type="submit"  variant="primary" size="lg" className="btn btn-primary">S'inscrire</Button>
      </div>
      </div>
      </form>
    </Container>
  );
}
