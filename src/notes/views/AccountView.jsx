import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const AccountView = () => {
  const { email, displayName, photoURL } = useSelector((state) => state.auth);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        color="Secondary.main"
      >
        <Typography variant="h3" sx={{ mb: 4 }}>
          My Account
        </Typography>
        <Grid item position="relative">
          <Avatar
            src={photoURL}
            sx={{ width: "100px", height: "100px", bgcolor: "primary.main" }}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ gap: 4 }}
        >
          <Grid
            item
            className="box-shadow"
            sx={{
              mt: 5,
              pt: 2,
              px: 2,
              textAlign: "center",
              borderRadius: 2,
              minWidth: "280px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: 20, mb: 1, fontWeight: "800" }}
            >
              User Name:
            </Typography>

            <Divider />
            <Box
              component="p"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
              }}
            >
              {displayName}
            </Box>
          </Grid>
          <Grid
            item
            className="box-shadow"
            sx={{
              mt: 5,
              pt: 2,
              px: 2,
              textAlign: "center",
              borderRadius: 2,
              minWidth: "280px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: 20, mb: 1, fontWeight: "800" }}
            >
              Email:
            </Typography>

            <Divider />
            <Box
              component="p"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
              }}
            >
              {email}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
