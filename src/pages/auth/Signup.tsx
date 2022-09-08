import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { AuthLayout } from '../../layout/auth';
import { Alert } from "@mui/material";

const AppName = "Centimoo Stock Management";

export default function Signup() {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    api.Register({ lastName, firstName, username, password })
      .then((res) => navigate("/auth"))
      .catch((err) => setError(err.message));
  };

  return (
    <AuthLayout>
      <p>Welcome to {AppName}</p>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        {error && <Alert className="alert" severity="error">{error}</Alert>}
        <div className="userLogin">

          <TextField
            fullWidth
            id="standard-basic"
            label="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            value={lastName}
            variant="outlined"

          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            value={firstName}
            variant="outlined"

          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Enter your email adress"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            variant="outlined"
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            variant="outlined"
            type="password"
          />
          <div className="button-container">
            <button className="btn btn-primary" >Register</button>
          </div>

        </div>

      </form>
    </AuthLayout>
  );
}
