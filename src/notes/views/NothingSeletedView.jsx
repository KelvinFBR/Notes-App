import StarOutline from "@mui/icons-material/StarOutline";
import { Grid, Typography } from "@mui/material";

export const NothingSeletedView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 110px)",
        backgroundColor: "primary.main",
        borderRadius: 2,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: "firstWhite.main" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="firstWhite.main" variant="h6">
          Select or Create a note
        </Typography>
      </Grid>
    </Grid>
  );
};
