import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import { useHistory } from "react-router";
import { apiUrl } from "../../../store/siteurl";
import TextField from "@mui/material/TextField";
import { Button, Card, FormControl, Grid, Typography } from "@mui/material";
import BackgroundPaper from "../../utilComp/BackgroundPaper";

const Login = () => {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useStore((state) => state.accessToken);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const setAccessToken = useStore((state) => state.setAccessToken);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password);
  };

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, []);

  const loginUser = (login, pass) => {
    let info = { username: login, password: pass };
    axios
      .post(`${apiUrl}/auth/login/`, info)
      .then((res) => {
        setAccessToken(res.data.access);
        setUserInfo(res.data.access);
        history.push("/");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BackgroundPaper>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3, mt: 10 }}>
        Login To Your Account
      </Typography>

      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ padding: "10px 50px 20px 50px", width: "30vh" }}>
          <FormControl onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              type="text"
              id="login"
              name="username"
              value={username}
              placeholder="Username"
              fullWidth
              onChange={(event) => setUserName(event.target.value)}
            />
            <br />

            <TextField
              type="password"
              id="password"
              name="password"
              fullWidth
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br />
            <Button onClick={handleSubmit} variant="contained" type="submit">
              Log In
            </Button>
            <br />
            <br />
          </FormControl>
        </Card>
      </Grid>
    </BackgroundPaper>
  );
};

export default Login;
