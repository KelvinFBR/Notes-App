import { useDispatch } from "react-redux";
import { startLogout } from "../../store/slices/auth/thunks";

import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

export const NavBar = ({ drawerWidth = 240, setIsSideBarOpen }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  //!   este funcion es futuro
  const onToggleSideBar = () => {
    setIsSideBarOpen((isOpen) => !isOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}` },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onToggleSideBar}
          edge="start"
          sx={{
            color: "white",
            mr: 2,
            display: { sm: "none" },
          }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "firstwhite.main" }}
          >
            NotesApp
          </Typography>

          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
