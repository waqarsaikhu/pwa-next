import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import { Roboto } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material";
import "../styles/tailwind.css";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Change this to your desired primary color
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
