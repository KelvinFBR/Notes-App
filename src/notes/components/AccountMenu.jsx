import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";

export const AccountMenu = ({ photoURL }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ bgcolor: "primary.main", color: "firstWhite.main" }}
              src={photoURL}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            px: 2,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 18,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {/* links */}

        <Link to="/" className="reset-links">
          <MenuItem>
            <HomeIcon
              sx={{
                bgcolor: "primary.main",
                color: "firstWhite.main",
                ml: "-4px",
                mr: "8px",
                p: "4px",
                width: "32px",
                height: "32px",
                borderRadius: 4,
              }}
            />
            Home
          </MenuItem>
        </Link>
        <Link to="/account" className="reset-links">
          <MenuItem>
            <Avatar sx={{ bgcolor: "primary.main" }} /> My account
          </MenuItem>
        </Link>

        <Divider />

        <Link to="/settings" className="reset-links">
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" sx={{ color: "third.main" }} />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
