import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="animate__animated animate__fadeIn animate__faster box-shadow"
        xs={3}
        sx={{
          width: { sm: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" textAlign="center" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
