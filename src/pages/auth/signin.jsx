import "../../assets/css/login.css";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import loginFrontPic from "../../assets/images/loginFrontPic.png";
import AuthContext from "../../contexts/AuthContext";

export default function Signin() {
  const AppName = "Centimoo Stock Management";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    seterror(false);
    const user = { username, password };
    setloading(true);
    axios
      .get("/json/login.json", user)
      .then((res) => {
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          navigate("/products");
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
    <div className="App">
      <div className="loginWhole">
        <div className="logo">
          <img className="logoPic" src={loginFrontPic} alt="Front Page"></img>
        </div>
        <div className="loginRight">
          <form onSubmit={submitHandler}>
            <p>Welcome to {AppName}</p>
            <h2>Sign in</h2>
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
              <div className="signIn">
                <a onClick={submitHandler}>Sign In</a>
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
    </div >
  );
}
