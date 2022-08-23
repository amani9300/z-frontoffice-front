import TextField from '@mui/material/TextField';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import loginFrontPic from "../../assets/images/loginFrontPic.png";
import AuthContext from "../../contexts/AuthContext";
import { api } from "../../services/api";

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
    <div className="login">
      <div className="logo">
        <img className="logoPic" src={loginFrontPic} alt="Front Page"></img>
      </div>
      <div className="loginRight">
        <form onSubmit={submitHandler}>
          <p>Welcome to {AppName}</p>
          <h2>Sign in</h2>
          {error && <div className=''>{error}</div>}
          <div className="userLogin">
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
            <TextField
              fullWidth
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <div className="forget">
              <div>forget password?</div>
            </div>
            <div>
              <button className="signin" onClick={submitHandler}>Sign In</button>
            </div>
          </div>
          <div className="orDiv">
            <div className="divider"></div>
            <div className="or">or</div>
            <div className="divider"></div>
          </div>
          <button className="sign-in-button">Sign in with Google</button>
        </form>
        <div className="createAccountDiv">
          New to {AppName}?{" "}
          <span className="createAccount">
            <Link to="/createAccount">Create Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
