import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import AuthContext from '../../contexts/AuthContext';

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
      .get("/json/login.json", user)
      .then((res) => {
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          navigate("/produit");
          return;
        }
        seterror(true);
      })
      .catch((err) => {
        seterror(true);
        console.error('error: ', err);
      })
      .finally(() => setloading(false));
  };

  return (
    <Container className="Auth-form-container">
      {loading && <Spinner />}

      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Connexion</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Entez votre email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Entez votre mot de passe"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="forgot-password text-right mt-2" htmlFor="customCheck1">
                Remember me
              </label>
            </div>

          </div>

          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="primary" size="lg" className="btn btn-primary">Se connecter</Button>
          </div>

          <div className="error-msg">
            {error && <Message />}
          </div>

        </div>
        <p className="mt-5 text-muted center-text">&copy; 2022-2023</p>
      </form>

    </Container>
  );
}
