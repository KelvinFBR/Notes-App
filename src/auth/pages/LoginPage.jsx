import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Link, TextField, Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import Google from "@mui/icons-material/Google";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hook";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/slices/auth";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange, formState } = useForm(formData);

  const isAutheticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(formState));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Example@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAutheticating}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ color: "white" }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAutheticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
                sx={{ color: "white" }}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
