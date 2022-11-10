import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useForm } from "../../hook";
import { startCreatingUserWithEmailPassword } from "../../store/slices/auth";
import { AuthLayout } from "../layout/AuthLayout";

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => emailRegex.test(value), "Format email invalid"],
  password: [(value) => value.length >= 6, "Min 6 characters"],
  displayName: [(value) => value.length >= 3, "Name is required"],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formSumitted, setFormSumitted] = useState(false);

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const isAutheticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSumitted(true);

    //* Si algun campo no es valido return
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Create account">
      <form onSubmit={onSubmit}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="e.g Pablo martinez"
              autoComplete="off"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSumitted}
              helperText={formSumitted && displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Example@gmail.com"
              autoComplete="off"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSumitted}
              helperText={formSumitted && emailValid}
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
              error={!!passwordValid && formSumitted}
              helperText={formSumitted && passwordValid}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                disabled={isAutheticating}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ color: "white" }}
              >
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
