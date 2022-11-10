import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";

import { setActiveNote } from "../../store/slices/notes";
import { useIsActive } from "../../hook";

export const SideBarItem = ({
  id,
  title = "",
  body,
  date,
  imagesURLs = [],
}) => {
  const { isActive } = useIsActive(id);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imagesURLs }));

    navigate("/");
  };

  return (
    <ListItem
      disablePadding
      sx={{
        mt: 1,
      }}
    >
      <Grid
        item
        component="span"
        sx={{
          position: "absolute",
          width: isActive ? "0.4rem" : "",
          height: "100%",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          transition: "all 0.25s",
          backgroundColor: "primary.main",
        }}
      />

      <ListItemButton
        onClick={onActiveNote}
        className="animate__animated animate__lightSpeedInRight animate__faster"
      >
        <ListItemIcon sx={{ color: "primary.main" }}>
          <TurnedInNot
            className={`animate__animated animate__faster ${
              isActive ? "animate__lightSpeedInLeft" : ""
            }`}
          />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
