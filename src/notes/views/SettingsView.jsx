import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useEditProfile } from "../hooks/useEditProfile";
import EditOutlined from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useForm } from "../../hook/useForm";

export const SettingsView = () => {
  const { email, password, displayName, photoURL, isSaving } = useSelector(
    (state) => state.auth
  );

  const PhotoEditRef = useRef();
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const {
    onPhotoEdit,
    onEmailEdit,
    onActiveEmailEdit,
    onActiveDisplayNameEdit,
    onDisplayNameEdit,
    onPasswordEdit,
    onActivePasswordEdit,
    onActiveVisibledPassword,
    // States
    isActiveNameEdit,
    isActiveEmailedit,
    isActivePasswordEdit,
  } = useEditProfile(displayNameRef, emailRef, passwordRef);

  const initialState = useMemo(
    () => ({
      email,
      displayName,
      photoURL,
      password: "*********",
    }),
    []
  );

  const { formState, onInputChange } = useForm(initialState);

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
          Settings
        </Typography>
        <Grid item position="relative">
          <Avatar
            src={photoURL}
            sx={{ width: "100px", height: "100px", bgcolor: "primary.main" }}
          />
          <IconButton
            onClick={() => PhotoEditRef.current.click()}
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              display: "flex",
              justifyContent: "center",
              transition: "all 0.25s",
              "&:hover > svg": {
                transform: "scale(1.2)",
              },
            }}
            disabled={isSaving}
          >
            <input
              type="file"
              onChange={onPhotoEdit}
              ref={PhotoEditRef}
              style={{ display: "none" }}
            />

            <EditOutlined
              className="bg-edit-photo"
              sx={{
                fontSize: 35,
                p: 0.5,
                transition: "all 0.25s",
                transform: "scale(1.1)",
                color: "firstWhite.main",
                borderRadius: 5,
              }}
            />
          </IconButton>
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
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              {/* input */}
              <Input
                variant="standard"
                value={formState.displayName}
                onChange={onInputChange}
                name="displayName"
                ref={displayNameRef}
                disabled={!isActiveNameEdit}
                autoComplete="off"
              />

              {isActiveNameEdit ? (
                <IconButton
                  component="span"
                  sx={{ ml: 2, bgcolor: "secondary.main" }}
                  onClick={() => onDisplayNameEdit(formState.displayName)}
                  disabled={isSaving}
                >
                  <EditOutlined
                    sx={{
                      transition: "all 0.25s",
                      color: "primary.main",
                      borderRadius: 5,
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  component="span"
                  sx={{ ml: 2 }}
                  onClick={onActiveDisplayNameEdit}
                  disabled={isSaving}
                >
                  <EditOutlined
                    sx={{
                      transition: "all 0.25s",
                      color: "primary.main",
                      borderRadius: 5,
                    }}
                  />
                </IconButton>
              )}
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
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              {/* input */}
              <Input
                variant="standard"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                ref={emailRef}
                disabled={!isActiveEmailedit}
                autoComplete="off"
              />
              {isActiveEmailedit ? (
                <IconButton
                  component="span"
                  sx={{ ml: 2, bgcolor: "secondary.main" }}
                  onClick={() => onEmailEdit(formState.email)}
                >
                  <EditOutlined
                    sx={{
                      transition: "all 0.25s",
                      color: "primary.main",
                      borderRadius: 5,
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  component="span"
                  sx={{ ml: 2 }}
                  onClick={onActiveEmailEdit}
                >
                  <EditOutlined
                    sx={{
                      transition: "all 0.25s",
                      color: "primary.main",
                      borderRadius: 5,
                    }}
                  />
                </IconButton>
              )}
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
              Password:
            </Typography>

            <Divider />
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              {/* input */}
              <Input
                type="password"
                variant="standard"
                value={formState.password}
                onChange={onInputChange}
                name="password"
                ref={passwordRef}
                disabled={!isActivePasswordEdit}
              />

              {isActivePasswordEdit ? (
                <>
                  <IconButton
                    component="span"
                    sx={{ ml: 2 }}
                    onClick={onActiveVisibledPassword}
                  >
                    <RemoveRedEyeOutlinedIcon
                      sx={{
                        transition: "all 0.25s",
                        color: "primary.main",
                        borderRadius: 5,
                      }}
                    />
                  </IconButton>
                  <IconButton
                    component="span"
                    sx={{ ml: 2, bgcolor: "secondary.main" }}
                    onClick={() => onPasswordEdit(formState.password)}
                  >
                    <EditOutlined
                      sx={{
                        transition: "all 0.25s",
                        color: "primary.main",
                        borderRadius: 5,
                      }}
                    />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  component="span"
                  sx={{ ml: 2 }}
                  onClick={onActivePasswordEdit}
                >
                  <EditOutlined
                    sx={{
                      transition: "all 0.25s",
                      color: "primary.main",
                      borderRadius: 5,
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
