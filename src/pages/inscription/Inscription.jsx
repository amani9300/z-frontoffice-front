import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nom"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="prenom"
          value={prenom}
          onChange={(e) => setprenom(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />
        <br />
        <button>S'inscrire</button>
      </form>
    </div>
  );
}
