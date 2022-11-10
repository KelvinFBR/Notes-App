import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#1DA756",
    },
    secondary: {
      main: "#0D122E",
    },
    third: {
      main: "#3C413F",
    },

    firstWhite: {
      main: "#F9FBFC",
    },

    error: {
      main: red.A400,
    },
  },
});
