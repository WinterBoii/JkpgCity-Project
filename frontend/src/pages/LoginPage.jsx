// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BackgroundImg from "../assets/background.jpg";

const styles = {
  background: {
    backgroundImage: `url(${BackgroundImg})`,
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        JkpgCity
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      //TODO handleLogin
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          //backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
        className={styles.background}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          backgroundColor: "#d5bda2",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" color={"white"}>
            Jönköping City
          </Typography>

          <Box borderBottom={2}></Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              inputProps={{
                style: {
                  color: "#d5bca2",
                  backgroundColor: "white",
                },
                autoComplete: "email",
              }}
              InputLabelProps={{
                style: {
                  color: "#242424",
                },
              }}
              sx={{ borderRadius: "40px" }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputProps={{
                style: {
                  color: "#d5bca2",
                  backgroundColor: "white",
                },
                autoComplete: "email",
              }}
              InputLabelProps={{
                style: {
                  color: "#242424",
                },
              }}
            />
            <Grid container justifyContent={"space-between"}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    checked={checked}
                    onChange={handleCheck}
                    color="secondary"
                    sx={{ color: "white" }}
                  />
                }
                label="Remember me"
                style={{ color: "white" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  mt: 2,
                  mb: 2,
                  alignSelf: "flex-end",
                }}
              >
                Sign In
              </Button>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
