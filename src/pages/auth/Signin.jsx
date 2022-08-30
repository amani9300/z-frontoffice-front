import TextField from '@mui/material/TextField';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../layout/auth';

import AuthContext from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { Alert } from '@mui/material';

export default function Signin() {

  const AppName = "Centimoo Stock Management";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setError();
    setloading(true);
    api.Login({ username, password })
      .then((res) => {
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          navigate("/");
          return;
        }
      })
      .catch((err) => {
        console.error('error: ', err);
        try {
          const e = err.response.data.message;
          setError(e);
        } catch (_) {
          setError(`An error has occurred`);
        }
      })
      .finally(() => setloading(false));
  };

  return (
    <AuthLayout>
      <p>Welcome to {AppName}</p>
      <h1>Sign in</h1>

      <form onSubmit={submitHandler}>

        {error && <Alert severity="error">{error}</Alert>}
        <div className="userLogin">
          <TextField
            fullWidth
            id="standard-basic"
            label="Email"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            variant="outlined"

          />
          <TextField
            fullWidth
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            variant="outlined"

          />
          <span className="forget">forget password?</span>
          <button className="btn btn-primary" onClick={submitHandler}>Sign In</button>
        </div>
      </form>

      <div className="orDiv">
        <div className="divider"></div>
        <div className="or">or</div>
        <div className="divider"></div>
      </div>
      <button className="sign-in-button">Sign in with Google</button>
      <div className="createAccountDiv">
        New to {AppName}?{" "}
        <span className="createAccount">
          <Link to="/register">Create Account</Link>
        </span>
      </div>
    </AuthLayout>
  );
}
