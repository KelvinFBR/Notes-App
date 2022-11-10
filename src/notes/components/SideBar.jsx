import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { SideBarItem } from "./";
import { AccountMenu } from "./AccountMenu";

export const SideBar = ({
  drawerWidth = 240,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.notes);

  const onToggleSideBar = () => {
    setIsSideBarOpen((isOpen) => !isOpen);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="persistent"
        open={isSideBarOpen}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar
          sx={{
            px: 1,
          }}
        >
          <AccountMenu photoURL={photoURL} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              ml: 1,
              color: "secondary.main",
              fontSize: 18,
            }}
          >
            {displayName}
          </Typography>
          <IconButton
            onClick={onToggleSideBar}
            edge="start"
            sx={{
              color: "secondary.main",
              ml: 1,
              display: { sm: "none" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
