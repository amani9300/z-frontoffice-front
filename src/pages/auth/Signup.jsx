import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AuthLayout } from '../../layout/auth';
import { Alert } from "@mui/material";

const AppName = "Centimoo Stock Management";

export default function Signup() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.Register({ lastName, firstName, username, password })
      .then((res) => navigate("/auth"))
      .catch((err) => setError(err.message));
  };

  return (
    <AuthLayout>
      <p>Welcome to {AppName}</p>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>

      {error && <Alert className="alert" severity="error">{error}</Alert>}
        <div className="userLogin">

          <TextField
            fullWidth
            id="standard-basic"
            label="Entrez votre nom"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            variant="outlined"

          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Entrez votre prénom"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            variant="outlined"

          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Entrez votre Adresse Email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            variant="outlined"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Entrez votre mot de passe"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            variant="outlined"
            type="password"
          />
          <div className="button-container">
            <button className="btn btn-primary" >S'inscrire</button>
          </div>

        </div>

      </form>
    </AuthLayout>
  );
}
