import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { NavBar, SideBar } from "../components";

const drawerWidth = 280;

export const NotesLayout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* Navbar */}
      <NavBar drawerWidth={drawerWidth} setIsSideBarOpen={setIsSideBarOpen} />
      {/* SideBar */}
      <SideBar
        drawerWidth={drawerWidth}
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* ToolBar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
