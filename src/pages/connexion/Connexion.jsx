import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../AuthContext";
import Spinner from "../../components/Spinner";
import MessageError from "../../components/MessageError";
import { Button } from 'react-bootstrap';

export default function Connexion() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror(false);
    const user = { email, password };
    setloading(true);
    axios
      .post("/api/user/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data);
        setToken(res.data);
        navigate("/");
      })
      .catch((err) => seterror(true))
      .finally(() => setloading(false));
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && <MessageError />}

      <form onSubmit={handleSubmit}>
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
        <Button>Se connecter</Button>
      </form>
    </div>
  );
}
