import { Button, Container } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Signup() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.Register({ lastName, firstName, username, password })
      .then((res) => navigate("/auth"))
      .catch((err) => console.log(err.response));
  };

  return (
    <Container className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Signup</h3>
          <div className="form-group mt-3">
            <label> Nom </label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Entrez votre nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label> Prénom </label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Entrez votre prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Entrez votre Adresse Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <Button type="submit" size="large" className="btn btn-primary">S'inscrire</Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
