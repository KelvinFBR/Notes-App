import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { colorTheme } from "./";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={colorTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
