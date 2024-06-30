import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

test("renders App component", () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
});
