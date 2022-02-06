import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { SnackbarProvider } from "notistack";
const appId = "YUGiP2kchladfYe2yBqDN454flfFMo7LjV1POUE9";
const serverUrl = "https://n5ctiltdblai.usemoralis.com:2053/server";

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      hideIconVariant={false}
    >
      <App />
    </SnackbarProvider>
  </MoralisProvider>,
  document.getElementById("root")
);
