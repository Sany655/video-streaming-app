import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById("root"));


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

root.render(
  <BrowserRouter>
    {/* <ThemeProvider theme={darkTheme}> */}
      <App />
    {/* </ThemeProvider> */}
  </BrowserRouter>
);
